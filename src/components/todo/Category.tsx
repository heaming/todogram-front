'use client'

import * as React from 'react';
import { useState, useRef, useEffect } from "react";
import type { Category } from "@/models/todo";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryProps {
    categories: Category[];
    onClick: (id: number) => void;
}

const Category = ({ categories, onClick }: CategoryProps) => {
    const [value, setValue] = useState(String(categories[0].id));
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
        onClick(Number(newValue));
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
                <ChevronLeft className="w-4 h-4" />
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
                            {categories.map((item) => {
                                if (!item || typeof item.id === "undefined") return null;
                                const isActive = value === String(item.id);
                                return (
                                    <TabsTrigger
                                        key={item.id}
                                        value={String(item.id)}
                                        className={`shrink-0 whitespace-nowrap text-xs px-4 rounded-md transition
                                            ${isActive
                                            ? `bg-white shadow-sm`
                                            : "text-gray-500 border-transparent"}
                                        `}
                                        style={{
                                            borderColor: isActive ? item.color : "transparent",
                                            color: isActive? item.color: '',
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
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Category;
