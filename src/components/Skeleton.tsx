"use client";

import React from 'react';

interface SkeletonProps {
    className?: string;
    width?: string | number;
    height?: string | number;
    circle?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = "", width, height, circle = false }) => {
    return (
        <div
            className={`animate-pulse bg-gray-200 ${circle ? 'rounded-full' : 'rounded-sm'} ${className}`}
            style={{ 
                width: width, 
                height: height,
            }}
        />
    );
};

export const FighterCardSkeleton = () => (
    <div className="relative aspect-[3/4] overflow-hidden bg-white border border-black/5 rounded-sm p-4">
        <Skeleton className="w-full h-full" />
        <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-6 w-3/4" />
        </div>
    </div>
);

export const EventCardSkeleton = () => (
    <div className="flex flex-col h-full bg-white border border-black/10 transition-all rounded-sm overflow-hidden group">
        <div className="aspect-[16/9] bg-gray-200">
            <Skeleton className="w-full h-full" />
        </div>
        <div className="p-6 space-y-4">
            <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-3 w-1/3" />
            </div>
            <Skeleton className="h-4 w-1/2" />
            <div className="pt-4 border-t border-black/5">
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    </div>
);

export const FighterProfileSkeleton = () => (
    <div className="min-h-screen bg-white pt-24 md:pt-32">
        <div className="max-w-7xl mx-auto px-4 md:px-16 mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-4 border-black/5 pb-12">
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-24" />
                    </div>
                    <Skeleton className="h-20 w-3/4 md:w-[500px]" />
                    <Skeleton className="h-8 w-48" />
                </div>
                <div className="flex flex-col items-end gap-2">
                    <Skeleton className="h-24 w-48 opacity-10" />
                    <Skeleton className="h-4 w-40" />
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-16 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-1 space-y-12">
                    <Skeleton className="aspect-square w-full" />
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-48" />
                        <div className="space-y-2">
                            {[...Array(4)].map((_, i) => (
                                <Skeleton key={i} className="h-16 w-full" />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 space-y-12">
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-48" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-3/4" />
                    </div>
                    <Skeleton className="h-40 w-full" />
                </div>
            </div>
        </div>
    </div>
);

export const HorizontalEventSkeleton = () => (
    <div className="flex flex-col lg:flex-row h-full bg-white border border-black/10 transition-all rounded-sm overflow-hidden group">
        <div className="lg:w-2/5 h-64 lg:h-[350px] bg-gray-200">
            <Skeleton className="w-full h-full" />
        </div>
        <div className="p-8 lg:p-12 flex-1 flex flex-col justify-center space-y-4">
            <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-3/4" />
            </div>
            <div className="flex gap-6">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex gap-4 pt-4">
                <Skeleton className="h-12 w-40" />
                <Skeleton className="h-12 w-40" />
            </div>
        </div>
    </div>
);

export const EventDetailsSkeleton = () => (
    <div className="min-h-screen bg-gray-50 pb-24">
        <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] bg-gray-200 animate-pulse pt-20" />
        <div className="max-w-7xl mx-auto px-6 pt-4 pb-12">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b-4 border-gray-100 pb-10">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-8 w-40 skew-x-[-12deg]" />
                        <Skeleton className="h-px w-12" />
                        <Skeleton className="h-5 w-48" />
                    </div>
                    <div className="space-y-4">
                        <Skeleton className="h-24 w-full md:w-[800px]" />
                    </div>
                    <div className="flex gap-8">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-6 w-48" />
                    </div>
                </div>
                <div className="shrink-0">
                    <Skeleton className="h-24 w-64 skew-x-[-12deg]" />
                </div>
            </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-6">
            <div className="flex justify-between items-end mb-16 border-b-2 border-black/10 pb-8">
                <div className="flex gap-4 items-center">
                    <Skeleton className="h-12 w-2" />
                    <div className="space-y-2">
                        <Skeleton className="h-10 w-64" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
                <Skeleton className="h-12 w-40 rounded-full" />
            </div>
            <div className="space-y-6">
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
            </div>
        </div>
    </div>
);

export const HeroSkeleton = () => (
    <div className="relative min-h-screen flex items-center bg-white overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
            <Skeleton className="w-full h-full opacity-5" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
            <div className="max-w-3xl space-y-8">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-8 w-32 skew-x-[-12deg]" />
                    <Skeleton className="h-[2px] w-12" />
                </div>
                <div className="space-y-3">
                    <Skeleton className="h-20 w-full md:w-[600px]" />
                    <Skeleton className="h-20 w-3/4 md:w-[450px]" />
                </div>
                <div className="border-l-4 border-gray-200 pl-6 py-2">
                    <Skeleton className="h-6 w-full md:w-[400px]" />
                </div>
                <div className="flex flex-wrap gap-5 pt-4">
                    <Skeleton className="h-16 w-44" />
                    <Skeleton className="h-16 w-44" />
                </div>
            </div>
        </div>
    </div>
);

export default Skeleton;
