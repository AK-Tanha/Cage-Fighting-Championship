"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface SelectOption {
    value: string;
    label: string;
    imageUrl?: string;
}

interface SelectWithImageProps {
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    className?: string;
}

const SelectWithImage: React.FC<SelectWithImageProps> = ({
    options,
    value,
    onChange,
    placeholder = "Select...",
    required,
    className = "",
}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selected = options.find((o) => o.value === value);

    return (
        <div ref={ref} className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center gap-2.5 bg-white border border-black/10 rounded-sm px-3 py-2 focus:outline-none focus:border-[#FE0002] transition-colors text-sm font-medium text-left"
            >
                {selected ? (
                    <>
                        {selected.imageUrl && (
                            <div className="relative w-7 h-7 shrink-0 rounded-full overflow-hidden bg-gray-100">
                                <Image
                                    src={selected.imageUrl}
                                    alt={selected.label}
                                    fill
                                    className="object-cover"
                                    sizes="28px"
                                />
                            </div>
                        )}
                        <span className="truncate">{selected.label}</span>
                    </>
                ) : (
                    <span className="text-gray-400">{placeholder}</span>
                )}
                <i className={`fa-solid fa-chevron-down text-[10px] ml-auto transition-transform ${open ? "rotate-180" : ""}`}></i>
            </button>

            {open && (
                <div className="absolute z-50 mt-1 w-full bg-white border border-black/10 rounded-sm shadow-lg max-h-60 overflow-y-auto">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                                onChange(option.value);
                                setOpen(false);
                            }}
                            className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors ${
                                option.value === value ? "bg-red-50 font-semibold" : ""
                            }`}
                        >
                            {option.imageUrl && (
                                <div className="relative w-7 h-7 shrink-0 rounded-full overflow-hidden bg-gray-100">
                                    <Image
                                        src={option.imageUrl}
                                        alt={option.label}
                                        fill
                                        className="object-cover"
                                        sizes="28px"
                                    />
                                </div>
                            )}
                            <span className="truncate">{option.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectWithImage;
