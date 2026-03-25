"use client";

import React from "react";

interface PageHeaderProps {
  topSection?: React.ReactNode;
  title: string;
  subtitle?: React.ReactNode;
  bottomLeftSection?: React.ReactNode;
  bottomRightSection?: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  topSection,
  title,
  subtitle,
  bottomLeftSection,
  bottomRightSection,
  className = "",
}) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 md:px-16 mb-6 ${className}`}>
      <div className="flex flex-col gap-4 border-b-4 border-black/5 pb-6 md:pb-8">
        {/* Top Badges / Info */}
        {topSection && <div>{topSection}</div>}

        {/* Title & Subtitle */}
        <div className="flex flex-col">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-black uppercase italic tracking-tighter leading-[0.85] text-black">
            {title}
          </h1>
          {subtitle && <div className="mt-4">{subtitle}</div>}
        </div>

        {/* Bottom Info Row */}
        {(bottomLeftSection || bottomRightSection) && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-4 gap-6 md:gap-0">
            {/* Stats / Left Info */}
            <div className="flex-1">{bottomLeftSection}</div>

            {/* Actions / Right Info */}
            <div className="shrink-0">{bottomRightSection}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
