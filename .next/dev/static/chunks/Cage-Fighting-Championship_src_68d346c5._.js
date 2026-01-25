(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Cage-Fighting-Championship/src/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllFighters",
    ()=>getAllFighters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Cage-Fighting-Championship/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const api = __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    // Using relative paths to leverage Next.js rewrites in next.config.ts.
    // This avoids CORS errors by proxying requests through the Next.js server.
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});
const getAllFighters = async ()=>{
    try {
        const response = await api.get('/api/fighters/');
        console.log('API Response data:', response.data);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Cage-Fighting-Championship/src/components/Fighters.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Cage-Fighting-Championship/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Cage-Fighting-Championship/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Cage-Fighting-Championship/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Cage-Fighting-Championship/src/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const StatBar = ({ label, value })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between text-[10px] font-bold uppercase mb-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                        lineNumber: 10,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            value,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                        lineNumber: 11,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                lineNumber: 9,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-1 bg-white/10 overflow-hidden rounded-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full bg-[#FE0002] transition-all duration-1000 ease-out",
                    style: {
                        width: `${value}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                    lineNumber: 14,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                lineNumber: 13,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
_c = StatBar;
const FighterCard = ({ fighter })=>{
    const record = typeof fighter.record === 'string' ? fighter.record : `${fighter.record?.wins ?? 0}-${fighter.record?.losses ?? 0}-${fighter.record?.draws ?? 0}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "group relative bg-[#171715] border border-white/5 hover:border-[#FE0002]/50 transition-all duration-500 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "aspect-[4/5] overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: fighter.image || 'https://via.placeholder.com/400x500?text=Fighter',
                    alt: fighter.name,
                    className: "w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                }, void 0, false, {
                    fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                    lineNumber: 30,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                lineNumber: 29,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            fighter.rank !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 left-4 bg-[#FE0002] text-white font-bold text-lg w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30 z-10",
                children: fighter.rank
            }, void 0, false, {
                fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                lineNumber: 38,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            }, void 0, false, {
                fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                lineNumber: 43,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 left-0 right-0 p-6 transform group-hover:-translate-y-2 transition-transform duration-500",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-end mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[#FE0002] font-bold text-sm uppercase tracking-tighter",
                                        children: fighter.weight_class ?? 'Unknown'
                                    }, void 0, false, {
                                        fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                                        lineNumber: 48,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-3xl md:text-4xl font-oswald font-black uppercase tracking-tighter italic",
                                        children: fighter.name
                                    }, void 0, false, {
                                        fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                                        lineNumber: 51,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-300 text-sm italic mt-1",
                                        children: [
                                            '"',
                                            fighter.nickname || 'No nickname',
                                            '"'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                                        lineNumber: 54,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                                lineNumber: 47,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-oswald font-bold text-2xl leading-none",
                                        children: record
                                    }, void 0, false, {
                                        fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                                        lineNumber: 59,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-gray-500 uppercase mt-1",
                                        children: "Pro Record"
                                    }, void 0, false, {
                                        fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                                        lineNumber: 62,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                                lineNumber: 58,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                        lineNumber: 46,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 max-h-0 group-hover:max-h-48 overflow-hidden transition-all duration-700 opacity-0 group-hover:opacity-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-x-5 gap-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatBar, {
                                        label: "Striking",
                                        value: fighter.stats?.striking ?? 0
                                    }, void 0, false, {
                                        fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                                        lineNumber: 68,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatBar, {
                                        label: "Grappling",
                                        value: fighter.stats?.grappling ?? 0
                                    }, void 0, false, {
                                        fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                                        lineNumber: 69,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatBar, {
                                        label: "Stamina",
                                        value: fighter.stats?.stamina ?? 0
                                    }, void 0, false, {
                                        fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                                        lineNumber: 70,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatBar, {
                                        label: "Power",
                                        value: fighter.stats?.power ?? 0
                                    }, void 0, false, {
                                        fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                                        lineNumber: 71,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                                lineNumber: 67,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            fighter.fightingStyle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] text-white/70 mt-4 italic uppercase tracking-wide",
                                children: [
                                    "Style: ",
                                    fighter.fightingStyle
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                                lineNumber: 74,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                        lineNumber: 66,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                lineNumber: 45,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
        lineNumber: 28,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = FighterCard;
const Fighters = ()=>{
    _s();
    const [fighters, setFighters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Fighters.useEffect": ()=>{
            let isMounted = true;
            const loadFighters = {
                "Fighters.useEffect.loadFighters": async ()=>{
                    try {
                        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllFighters"])();
                        if (isMounted) {
                            // If the API returns rank, we trust it. If not, we might need to compute or mock.
                            // For now, assume API returns data consistent with Fighter.
                            // In the last step, I manually passed rank={index+1}.
                            // Let's reinstate that map logic if the data doesn't have rank.
                            console.log('Fighters data:', data);
                            const fightersToShow = Array.isArray(data) ? data : data && typeof data === 'object' && Array.isArray(data.data) ? data.data : [];
                            const rankedData = fightersToShow.map({
                                "Fighters.useEffect.loadFighters.rankedData": (f, index)=>({
                                        ...f,
                                        rank: f.rank ?? index + 1
                                    })
                            }["Fighters.useEffect.loadFighters.rankedData"]);
                            setFighters(rankedData);
                        }
                    } catch (err) {
                        if (isMounted) {
                            setError(err.message || 'Failed to load the roster');
                            console.error('Fetch error:', err);
                        }
                    } finally{
                        if (isMounted) {
                            setLoading(false);
                        }
                    }
                }
            }["Fighters.useEffect.loadFighters"];
            loadFighters();
            return ({
                "Fighters.useEffect": ()=>{
                    isMounted = false;
                }
            })["Fighters.useEffect"];
        }
    }["Fighters.useEffect"], []);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "pt-32 pb-20 flex justify-center items-center min-h-[60vh]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-2xl md:text-3xl text-gray-300 animate-pulse",
                children: "Loading Elite Roster..."
            }, void 0, false, {
                fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                lineNumber: 134,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
            lineNumber: 133,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "pt-32 pb-20 text-center min-h-[60vh]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-2xl md:text-3xl text-red-500 mb-4",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                    lineNumber: 144,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-400",
                    children: [
                        "Make sure your backend is running at ",
                        ("TURBOPACK compile-time value", "http://127.0.0.1:8000") || 'http://127.0.0.1:8000'
                    ]
                }, void 0, true, {
                    fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                    lineNumber: 145,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
            lineNumber: 143,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row items-start md:items-end justify-between mb-16 border-b-4 border-[#FE0002] pb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-5xl md:text-7xl font-oswald font-black italic uppercase tracking-tighter mb-4 md:mb-0",
                        children: [
                            "ELITE ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[#FE0002]",
                                children: "ROSTER"
                            }, void 0, false, {
                                fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                                lineNumber: 157,
                                columnNumber: 27
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                        lineNumber: 156,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-5",
                        children: [
                            'ALL',
                            'LIGHTWEIGHT',
                            'WELTERWEIGHT',
                            'HEAVYWEIGHT'
                        ].map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "text-xs md:text-sm font-bold tracking-widest text-gray-400 hover:text-white transition-colors duration-300",
                                children: cat
                            }, cat, false, {
                                fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                                lineNumber: 161,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                        lineNumber: 159,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                lineNumber: 155,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            fighters.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-20 text-xl text-gray-400",
                children: [
                    "No fighters found in the database yet.",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                        fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                        lineNumber: 174,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm mt-2 block",
                        children: "Add some via Swagger at /docs"
                    }, void 0, false, {
                        fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                        lineNumber: 175,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                lineNumber: 172,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8",
                children: fighters.map((fighter)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Cage$2d$Fighting$2d$Championship$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FighterCard, {
                        fighter: fighter
                    }, fighter._id, false, {
                        fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                        lineNumber: 180,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
                lineNumber: 178,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Cage-Fighting-Championship/src/components/Fighters.tsx",
        lineNumber: 154,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Fighters, "5JGpg7OweoHgoMfxNpet5s/vCwI=");
_c2 = Fighters;
const __TURBOPACK__default__export__ = Fighters;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "StatBar");
__turbopack_context__.k.register(_c1, "FighterCard");
__turbopack_context__.k.register(_c2, "Fighters");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Cage-Fighting-Championship_src_68d346c5._.js.map