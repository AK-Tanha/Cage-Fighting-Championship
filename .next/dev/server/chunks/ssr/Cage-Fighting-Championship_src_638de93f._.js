module.exports = [
"[project]/Cage-Fighting-Championship/src/constants.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EVENTS",
    ()=>EVENTS,
    "FIGHTERS",
    ()=>FIGHTERS
]);
const FIGHTERS = [
    {
        _id: '1',
        name: 'Alex Silva',
        nickname: 'The Titan',
        weight_class: 'Lightweight',
        record: {
            wins: 18,
            losses: 2,
            draws: 0
        },
        rank: 1,
        image: 'https://picsum.photos/seed/fighter1/600/800',
        fightingStyle: 'Muay Thai',
        stats: {
            striking: 95,
            grappling: 70,
            stamina: 85,
            power: 90
        },
        bio: ''
    },
    {
        _id: '2',
        name: 'Jaxson Forge',
        nickname: 'Iron',
        weight_class: 'Lightweight',
        record: {
            wins: 15,
            losses: 4,
            draws: 1
        },
        rank: 3,
        image: 'https://picsum.photos/seed/fighter2/600/800',
        fightingStyle: 'Brazilian Jiu-Jitsu',
        stats: {
            striking: 65,
            grappling: 98,
            stamina: 88,
            power: 75
        },
        bio: ''
    },
    {
        _id: '3',
        name: 'Marcus "Viper" Vance',
        nickname: 'Viper',
        weight_class: 'Welterweight',
        record: {
            wins: 22,
            losses: 0,
            draws: 0
        },
        rank: 1,
        image: 'https://picsum.photos/seed/fighter3/600/800',
        fightingStyle: 'Wrestling',
        stats: {
            striking: 75,
            grappling: 92,
            stamina: 95,
            power: 82
        },
        bio: ''
    },
    {
        _id: '4',
        name: 'Lena "Storm" Richter',
        nickname: 'Storm',
        weight_class: 'Bantamweight',
        record: {
            wins: 14,
            losses: 1,
            draws: 0
        },
        rank: 2,
        image: 'https://picsum.photos/seed/fighter4/600/800',
        fightingStyle: 'Kickboxing',
        stats: {
            striking: 92,
            grappling: 60,
            stamina: 80,
            power: 85
        },
        bio: ''
    },
    {
        _id: '5',
        name: 'Dante King',
        nickname: 'The Reaper',
        weight_class: 'Heavyweight',
        record: {
            wins: 10,
            losses: 2,
            draws: 0
        },
        rank: 4,
        image: 'https://picsum.photos/seed/fighter5/600/800',
        fightingStyle: 'Boxing',
        stats: {
            striking: 88,
            grappling: 50,
            stamina: 65,
            power: 99
        },
        bio: ''
    }
];
const EVENTS = [
    {
        id: 'cfc-101',
        title: 'CFC 101: SILVA vs FORGE',
        date: '2024-12-15T20:00:00',
        location: 'Las Vegas, NV',
        mainEvent: 'Alex Silva vs Jaxson Forge',
        image: 'https://picsum.photos/seed/event1/1200/600',
        isLive: true
    },
    {
        id: 'cfc-102',
        title: 'CFC 102: CHAMPIONS NIGHT',
        date: '2025-01-20T19:00:00',
        location: 'Miami, FL',
        mainEvent: 'Marcus Vance vs TBA',
        image: 'https://picsum.photos/seed/event2/1200/600'
    },
    {
        id: 'cfc-fight-night',
        title: 'CFC Fight Night: TOKYO',
        date: '2025-02-10T18:00:00',
        location: 'Tokyo, Japan',
        mainEvent: 'Richter vs Tanaka',
        image: 'https://picsum.photos/seed/event3/1200/600'
    }
];
}),
"[project]/Cage-Fighting-Championship/src/components/Events.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Cage-Fighting-Championship/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$src$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Cage-Fighting-Championship/src/constants.ts [app-ssr] (ecmascript)");
"use client";
;
;
const Events = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pt-32 pb-20 max-w-7xl mx-auto px-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-6xl font-oswald font-black italic uppercase tracking-tighter border-b-4 border-[#FE0002] pb-4 inline-block",
                    children: [
                        "SCHEDULED ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[#FE0002]",
                            children: "WARS"
                        }, void 0, false, {
                            fileName: "[project]/Cage-Fighting-Championship/src/components/Events.tsx",
                            lineNumber: 11,
                            columnNumber: 31
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Cage-Fighting-Championship/src/components/Events.tsx",
                    lineNumber: 10,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Cage-Fighting-Championship/src/components/Events.tsx",
                lineNumber: 9,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-12",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$src$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EVENTS"].map((event)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "group relative bg-[#171715] rounded-lg overflow-hidden flex flex-col lg:flex-row hover:shadow-[0_0_30px_rgba(254,0,2,0.15)] transition-all border border-white/5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:w-2/5 h-64 lg:h-auto relative overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: event.image,
                                        alt: event.title,
                                        className: "w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                    }, void 0, false, {
                                        fileName: "[project]/Cage-Fighting-Championship/src/components/Events.tsx",
                                        lineNumber: 19,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    event.isLive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-4 left-4 bg-[#FE0002] text-white px-3 py-1 text-xs font-bold uppercase animate-pulse rounded-full flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-2 h-2 bg-white rounded-full"
                                            }, void 0, false, {
                                                fileName: "[project]/Cage-Fighting-Championship/src/components/Events.tsx",
                                                lineNumber: 26,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "LIVE NOW"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Cage-Fighting-Championship/src/components/Events.tsx",
                                        lineNumber: 25,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Cage-Fighting-Championship/src/components/Events.tsx",
                                lineNumber: 18,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-8 lg:p-12 flex-1 flex flex-col justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[#FE0002] font-bold text-sm tracking-widest mb-2 uppercase",
                                        children: new Date(event.date).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/Cage-Fighting-Championship/src/components/Events.tsx",
                                        lineNumber: 33,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-4xl md:text-5xl font-oswald font-black uppercase mb-4 group-hover:text-[#FE0002] transition-colors",
                                        children: event.title
                                    }, void 0, false, {
                                        fileName: "[project]/Cage-Fighting-Championship/src/components/Events.tsx",
                                        lineNumber: 36,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-6 mb-8 text-gray-400 font-medium",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "fa-solid fa-location-dot text-[#FE0002]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Cage-Fighting-Championship/src/components/Events.tsx",
                                                        lineNumber: 38,
                                                        columnNumber: 75
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    " ",
                                                    event.location
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Cage-Fighting-Championship/src/components/Events.tsx",
                                                lineNumber: 38,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "fa-solid fa-trophy text-[#FE0002]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Cage-Fighting-Championship/src/components/Events.tsx",
                                                        lineNumber: 39,
                                                        columnNumber: 75
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    " ",
                                                    event.mainEvent
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Cage-Fighting-Championship/src/components/Events.tsx",
                                                lineNumber: 39,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Cage-Fighting-Championship/src/components/Events.tsx",
                                        lineNumber: 37,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "bg-[#FE0002] text-white px-8 py-3 font-oswald font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all",
                                                children: "Get Tickets"
                                            }, void 0, false, {
                                                fileName: "[project]/Cage-Fighting-Championship/src/components/Events.tsx",
                                                lineNumber: 42,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "border border-white/20 text-white px-8 py-3 font-oswald font-bold uppercase tracking-widest hover:border-[#FE0002] transition-all",
                                                children: "Fight Details"
                                            }, void 0, false, {
                                                fileName: "[project]/Cage-Fighting-Championship/src/components/Events.tsx",
                                                lineNumber: 45,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Cage-Fighting-Championship/src/components/Events.tsx",
                                        lineNumber: 41,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Cage-Fighting-Championship/src/components/Events.tsx",
                                lineNumber: 32,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, event.id, true, {
                        fileName: "[project]/Cage-Fighting-Championship/src/components/Events.tsx",
                        lineNumber: 17,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/Cage-Fighting-Championship/src/components/Events.tsx",
                lineNumber: 15,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Cage-Fighting-Championship/src/components/Events.tsx",
        lineNumber: 8,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Events;
}),
];

//# sourceMappingURL=Cage-Fighting-Championship_src_638de93f._.js.map