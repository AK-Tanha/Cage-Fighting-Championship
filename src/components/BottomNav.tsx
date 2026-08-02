"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
    { path: "/", label: "Home", icon: "fa-solid fa-house" },
    { path: "/events", label: "Events", icon: "fa-solid fa-calendar-days" },
    { path: "/fighters", label: "Fighters", icon: "fa-solid fa-user-ninja" },
];

const BottomNav: React.FC = () => {
    const pathname = usePathname();

    if (pathname?.startsWith("/admin")) return null;

    const isActive = (path: string) => {
        if (path === "/") return pathname === "/";
        return pathname.startsWith(path);
    };

    return (
        <nav
            aria-label="Bottom navigation"
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-black/10 pb-[env(safe-area-inset-bottom)]"
        >
            <div className="grid grid-cols-3 h-16">
                {tabs.map((tab) => {
                    const active = isActive(tab.path);
                    return (
                        <Link
                            key={tab.path}
                            href={tab.path}
                            className="relative flex flex-col items-center justify-center gap-1"
                            aria-current={active ? "page" : undefined}
                        >
                            {active && (
                                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#FE0002] rounded-full" />
                            )}
                            <i
                                className={`${tab.icon} text-lg transition-colors ${
                                    active ? "text-[#FE0002]" : "text-gray-500"
                                }`}
                            />
                            <span
                                className={`text-[9px] font-black uppercase tracking-widest ${
                                    active ? "text-black" : "text-gray-400"
                                }`}
                            >
                                {tab.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;