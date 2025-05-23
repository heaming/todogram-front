import {Circle, Menu, Plus, SettingsIcon, Square} from "lucide-react";
import {useEffect, useRef, useState} from "react";
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
import {debounce} from "lodash";
import {toast} from "sonner";

interface CategorySettingProps {
    categories: Category[];
    onChangeCategorySort: (id: string, order: string) => void;
    onAddCategory: (content: string) => void;
    onChangeCategoryContent: (id: string, content: string) => void;
    onOpen: () => void;
}

const CategorySetting = ({categories, onChangeCategorySort, onChangeCategoryContent, onAddCategory, onOpen}: CategorySettingProps) => {
    const [items, setItems] = useState<Category[]>([]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const generateSort = (items: Category[], newIndex: number): string | null => {
        if (!items || items.length === 0) {
            return generateKeyBetween(null, null);
        }

        const prevItem = items[newIndex - 1] ?? null;
        const nextItem = items[newIndex] ?? null;

        const prevSort = prevItem?.sort ?? null;
        const nextSort = nextItem?.sort ?? null;

        if (prevSort === null && nextSort === null) {
            return generateKeyBetween(null, null);
        }
        if (prevSort === null) {
            return generateKeyBetween(null, nextSort);
        }
        if (nextSort === null) {
            return generateKeyBetween(prevSort, null);
        }
        if (prevSort === nextSort) {
            return null;
        }
        if (prevSort < nextSort) {
            return generateKeyBetween(prevSort, nextSort);
        }

        return null;
    };

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

    const handleDelete = async (id: string) => {
        if (!id || id === '') return;
        if (items.length <= 1) {
            toast("최소 1개 이상의 카테고리가 필요합니다.", {
                description: "",
                action: {
                    label: `확인`,
                    onClick: () => { return; },
                },
                position: 'top-right',
                className: 'bg-white border-1 border-zinc-300 text-zinc-700',
            });
            return;
        }

        setItems((prev) => prev.filter(category => category.id !== id));

        try {
            await window.api.deleteCategory(id);
        } catch (error) {
            console.log("Failed to remove category", error);
        }
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

    const handleCategoryContent = async (id: string | undefined | '', content: string) => {
        if (!content || content === '') return;

        if (id && id.length > 0) {
            await onChangeCategoryContent(id, content);
        } else {
            await onAddCategory(content);
        }
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active?.id && over?.id && active.id !== over.id) {
            setItems((prevItems) => {
                const oldIndex = prevItems.findIndex((item) => item.id === active.id);
                const newIndex = prevItems.findIndex((item) => item.id === over.id);
                const changedItem = prevItems[oldIndex];

                const newSort = generateSort(prevItems, newIndex);

                if (!changedItem) return prevItems;
                if (!newSort) return prevItems;

                onChangeCategorySort(changedItem.id, newSort);

                return arrayMove(prevItems, oldIndex, newIndex);
            });
        }
    };

    const debouncedDrag = useRef(
        debounce((event: DragEndEvent) => {
            handleDragEnd(event);
        }, 300)
    ).current;

    useEffect(() => {
        return () => {
            debouncedDrag.cancel();
        };
    }, [debouncedDrag]);

    useEffect(() => {
        if (!categories || categories.length === 0) return;
        setItems(categories);
    }, [categories]);

    return (
        <DndContext>
            <Popover
                onOpenChange={(open) => {
                    if (!open) onOpen();
                }}
                >
                <PopoverTrigger asChild>
                    <button className="mr-4 text-zinc-400 rounded-sm cursor-pointer flex justify-center items-center mb-2">
                    <SettingsIcon className="mt-1"
                                  size={17}/>
                        {/*<span className="text-xs font-light pl-1">카테고리 설정</span>*/}
                    </button>
                </PopoverTrigger>
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
                                        onDeleteCategory={handleDelete}
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