// components/ui/BouncingLoader.tsx
import React from 'react';

interface BouncingDotsLoaderProps {
    size?: 'sm' | 'md' | 'lg';
    color?: string;
    className?: string;
}

export default function BouncingDotsLoader({
    size = 'md',
    color = 'greenyellow',
    className = '',
}: BouncingDotsLoaderProps) {
    const sizeClasses = {
        sm: 'h-4 w-4 border-4',
        md: 'h-6 w-6 border-5',
        lg: 'h-8 w-8 border-6',
    };

    return (
        <div className={`min-h-screen bg-[#121212] flex items-center justify-center ${className}`}>
            <div className="flex gap-4">
                {[...Array(3)].map((_, i) => (
                    <span
                        key={i}
                        className={`
              rounded-full 
              border-solid 
              border-${color} 
              ${sizeClasses[size]}
              animate-[bounce_0.8s_ease-in-out_alternate_infinite]
            `}
                        style={{
                            animationDelay: `${i * 300}ms`,
                            borderWidth: size === 'sm' ? '4px' : size === 'lg' ? '6px' : '5px',
                        }}
                    />
                ))}
            </div>
        </div>
    );
}