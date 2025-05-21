import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {CircleX, Menu, Minus, Square, Trash} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useEffect, useState} from "react";

export const categoryColors = [
    '#00BC7DFF',
    '#a3e635',
    '#fcd34d',
    '#fb923c',
    '#fb7185',
    '#fda4af',
    '#71717a',
    '#60a5fa',
    '#818cf8',
    '#44403c',
];

interface CategorySortItemProps {
    id: string;
    content: string;
    color: string;
    onBlurCategoryContent: (id: string | undefined | "", content: string) => void;
    onChangeCategoryColor: (id: string, color: string) => void;
}

const CategorySortItem = ({id, content, color, onBlurCategoryContent, onChangeCategoryColor}: CategorySortItemProps)=> {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: id
    });

    const [newContent, setNewContent] = useState(content);
    const [newColor, setNewColor] = useState(color);
    const [colorPopoverOpen, setColorPopoverOpen] = useState(false);
    const [colorButtonDisabled, setColorButtonDisabled] = useState(!id || id.length <= 0 || newContent.length <= 0 || content.length <= 0);

    const handleColorPopoverOpen = (isOpen: boolean) => {
        setColorPopoverOpen(isOpen);
        if (!isOpen) {
            if (color !== newColor) onChangeCategoryColor(id, newColor);
        }
    }

    useEffect(() => {
        setColorButtonDisabled(!id || id.length <= 0 || newContent.length <= 0 || content.length <= 0);
    }, [newContent, id])

    useEffect(() => {
        onChangeCategoryColor(id, newColor);
    }, [newColor]);

    return (
        <div
            className="flex items-center gap-1 border-none shadow-sm rounded-sm bg-white p-2"
            ref={setNodeRef}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
                color: color
            }}
        >
            <div className="flex items-center gap-1 flex-1">
                <button
                    className="cursor-pointer text-zinc-400 opacity-50 flex items-center justify-center h-6 w-6"
                    {...attributes}
                    {...listeners}
                >
                    <Menu strokeWidth={2} size={15}/>
                </button>

                <div className="text-sm flex items-center">
                    <input
                        placeholder={"엔터로 저장"}
                        maxLength={10}
                        className="w-full"
                        value={newContent}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                onBlurCategoryContent(id, newContent);
                            }
                        }}
                        onChange={(e) => setNewContent(e.target.value)}
                        onBlur={(e) => {
                            e.preventDefault();
                            if (newContent !== content) {
                                onBlurCategoryContent(id, newContent);
                            }
                        }}
                    />
                </div>
            </div>
            <Popover
                open={colorPopoverOpen}
                onOpenChange={(isOpen) => handleColorPopoverOpen(isOpen)}
            >
                <PopoverTrigger asChild>
                    <button
                        disabled={colorButtonDisabled}
                        className="cursor-pointer mt-0.5 flex items-center justify-center h-6 w-6 disabled:opacity-50 disabled:cursor-default"
                    >
                        <Square fill={color} strokeWidth={2} size={16}/>
                    </button>
                </PopoverTrigger>
                <PopoverContent side={'right'} className="w-40 bg-white border-zinc-100">
                    <div className="grid grid-cols-5 grid-rows-2">
                        {categoryColors && categoryColors.map((item, index) => {
                            return (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setNewColor(item)
                                    }}
                                    key={item}
                                    className="cursor-pointer mt-0.5 flex items-center justify-center h-6 w-6">
                                    <Square
                                        className={item === newColor ? 'border-1 border-zinc-300 shadow-md' : ''}
                                        color={item}
                                        fill={item}
                                        strokeWidth={2}
                                        size={20}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </PopoverContent>
            </Popover>
            <button
                disabled={colorButtonDisabled}
                className="cursor-pointer mt-0.5 flex items-center justify-center h-4 w-4 disabled:opacity-50 disabled:cursor-default"
            >
                <CircleX color={'#fb7185'} strokeWidth={2} size={16}/>
            </button>
        </div>
    );
}

export default CategorySortItem;