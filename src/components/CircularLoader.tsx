"use client";

import React from 'react';

interface CircularLoaderProps {
    label?: string;
    value?: number;
    size?: string;
    color?: string;
    isLoader?: boolean;
}

const CircularLoader: React.FC<CircularLoaderProps> = ({
    label,
    value = 0,
    size = "w-24 h-24",
    color = "#FE0002",
    isLoader = false
}) => {
    // For the loader, we use a fixed percentage (e.g. 30%) and spin it
    const displayValue = isLoader ? 30 : value;
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - displayValue / 100);

    return (
        <div className="flex flex-col items-center">
            <div className={`relative ${size} flex items-center justify-center ${isLoader ? 'animate-spin' : ''}`}>
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="transparent"
                        className="text-white/10"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke={color}
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
                {!isLoader && (
                    <span className="absolute text-xl font-display font-black italic text-white">
                        {value}%
                    </span>
                )}
            </div>
            {label && (
                <p className="mt-2 text-[10px] font-bold uppercase tracking-tighter text-gray-400">
                    {label}
                </p>
            )}
        </div>
    );
};

export default CircularLoader;
