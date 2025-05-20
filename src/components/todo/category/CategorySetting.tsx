import {Circle, Menu, Plus, SettingsIcon, Square} from "lucide-react";
import {useEffect, useState} from "react";
import {CSS} from '@dnd-kit/utilities';
import type {Category} from "@/models/todo";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {
    closestCenter,
    DndContext,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import {generateKeyBetween} from "fractional-indexing";
import CategorySortItem from "@/components/todo/category/CategorySortItem";

interface CategorySettingProps {
    categories: Category[];
    onChangeCategorySort: (id: string, order: string) => void;
    onAddCategory: (content: string) => void;
    onChangeCategoryContent: (id: string, content: string) => void;
    onOpen: () => void;
}

const CategorySetting = ({categories, onChangeCategorySort, onChangeCategoryContent, onAddCategory, onOpen}: CategorySettingProps) => {
    const [items, setItems] = useState<Category[]>([]);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handleIsPopoverOpen = (isOpen: boolean) => {
        setIsPopoverOpen(isOpen);

        if (!isOpen) {
            setTimeout(() => {
                onOpen();
            }, 200);
        }
    };
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const generateSort = (newIndex: number) => {
        if (!items || items.length === 0) {
            return generateKeyBetween(null, null);
        }

        const prevItem = items[newIndex - 1] ?? null;
        const nextItem = items[newIndex] ?? null;

        const prevSort = prevItem?.sort ?? null;
        const nextSort = nextItem?.sort ?? null;

        return generateKeyBetween(prevSort, nextSort);
    }

    const onClickAddCategory = () => {
        if (items && items.length > 0 && items.filter(item => item.id === '').length > 0) return;

        const newCategroy: Category = {
            color: "#00BC7DFF",
            content: "",
            createdAt: "",
            deletedAt: "",
            id: "",
            sort: "",
            userId: ""
        }
        setItems([...items, newCategroy]);
    }

    const handleCategoryColor = async (id: string, color: string) => {
        if (id === '' || color === '') return;

        setItems((prev) =>
            prev.map(category => {
                    const isChangedCategory = category.id === id;
                    if (isChangedCategory) {
                        try {
                            window.api.updateCategory(id, {...category, color: color })
                        } catch (e) {
                            console.log(e);
                        }
                        return {...category, color: color };
                    }
                    return category;
                }
            )
        )
    }

    const handleCategoryContent = (id: string|undefined|'', content: string) => {
        if (!content || content === '') return;

        if (id && id.length > 0) {
            onChangeCategoryContent(id, content);
        } else {
            onAddCategory(content);
        }
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active?.id && over?.id && active.id !== over.id) {
            setItems((prevItems) => {
                const changedItem = items.filter(item => item.id === active.id)[0];
                const oldIndex = prevItems.findIndex(item => item.id === active.id);
                const newIndex = prevItems.findIndex(item => item.id === over.id);
                const sort = generateSort(newIndex);

                onChangeCategorySort(changedItem.id, sort);

                return arrayMove(prevItems, oldIndex, newIndex);
            });
        }
    };

    useEffect(() => {
        if (!categories || categories.length === 0) return;
        setItems(categories);
    }, [categories]);

    return (
        <DndContext>
            <Popover
                open={isPopoverOpen}
                onOpenChange={(isOpen) => handleIsPopoverOpen(isOpen)}
            >
                <PopoverTrigger asChild>
                    <SettingsIcon/>
                </PopoverTrigger >
                <PopoverContent className="w-56 bg-white border-zinc-100">
                    <div className="grid gap-4 mb-2">
                        <div className="flex justify-between text-zinc-500 align-middle">
                            <div className="text-sm">카테고리 설정</div>
                            <button
                                className="hover:text-[#166534] cursor-pointer"
                            >
                                <Plus
                                    onClick={onClickAddCategory}
                                    size={15}
                                />
                            </button>
                        </div>
                    </div>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={items.map((item) => item.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {items && items.length > 0 && items.map((category) => (
                                <div className="mb-1"
                                    key={category.id}
                                >
                                    <CategorySortItem
                                        id={category.id}
                                        content={category.content}
                                        color={category.color}
                                        onBlurCategoryContent={handleCategoryContent}
                                        onChangeCategoryColor={handleCategoryColor}
                                    />
                                </div>
                            ))}
                        </SortableContext>
                    </DndContext>
                </PopoverContent>
            </Popover>
        </DndContext>
    );
}

export default CategorySetting;