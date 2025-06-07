'use client'

import * as React from 'react';
import { useState, useRef, useEffect } from "react";
import { Category } from "@/models/category";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryProps {
    categories: Category[];
    onClick: (id: string) => void;
}

const CategoryList = ({ categories, onClick }: CategoryProps) => {
    const [value, setValue] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isLeftEnd, setIsLeftEnd] = useState(true);
    const [isRightEnd, setIsRightEnd] = useState(false);

    const handleScroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const scrollAmount = scrollRef.current.offsetWidth / 2;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    const handleChange = (newValue: string) => {
        setValue(newValue);
        onClick(newValue);
    };

    const checkScrollEnds = () => {
        const el = scrollRef.current;
        if (!el) return;

        setIsLeftEnd(el.scrollLeft === 0);
        setIsRightEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        checkScrollEnds(); // 초기 체크

        el.addEventListener("scroll", checkScrollEnds);
        window.addEventListener("resize", checkScrollEnds);

        return () => {
            el.removeEventListener("scroll", checkScrollEnds);
            window.removeEventListener("resize", checkScrollEnds);
        };
    }, []);

    useEffect(() => {
        if (categories && categories.length > 0) {
            setValue(categories[0].id);
        }
    }, [categories]);

    return (
        <div className="relative flex items-center w-full gap-2 mb-2">
            {/* Left Arrow */}
            <button
                onClick={() => handleScroll("left")}
                disabled={isLeftEnd}
                className={`p-1 rounded-full z-10 bg-white hover:bg-gray-100 transition
                    ${isLeftEnd ? "opacity-30 pointer-events-none" : "cursor-pointer"}
                `}
            >
                <ChevronLeft className="w-4 h-4"/>
            </button>
            <div className="relative w-full overflow-hidden">
                <Tabs
                    value={value}
                    onValueChange={handleChange}
                >
                    <div
                        ref={scrollRef}
                        className="flex gap-0 overflow-x-auto no-scrollbar"
                    >
                        <TabsList className="flex w-max gap-1">
                            {categories && categories.map((item) => {
                                if (!item || typeof item.id === "undefined") return null;
                                const isActive = value === item.id;
                                return (
                                    <TabsTrigger
                                        key={item.id}
                                        value={item.id}
                                        className={`
                                            cursor-pointer
                                            shrink-0
                                            whitespace-nowrap
                                            text-xs
                                            px-4
                                            mx-0.5
                                            rounded-md
                                            transition
                                            shadow-sm
                                            ${isActive
                                            ? "bg-white"
                                            : "text-gray-500 border border-zinc-200 bg-white"}
                                            focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
                                            focus-visible:ring-[${item.color}]
                                        `}
                                        style={{
                                            borderColor: isActive ? item.color : "transparent",
                                            color: isActive ? item.color : '',
                                            boxShadow: isActive ? `0 0 5px ${item.color}77` : undefined,
                                        }}
                                    >
                                        {item.content}
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                    </div>
                </Tabs>
            </div>

            <button
                onClick={() => handleScroll("right")}
                disabled={isRightEnd}
                className={`p-1 rounded-full z-10 bg-white hover:bg-gray-100 transition
                    ${isRightEnd ? "opacity-30 pointer-events-none" : "cursor-pointer"}
                `}
            >
                <ChevronRight className="w-4 h-4"/>
            </button>
        </div>
    );
};

export default CategoryList;
