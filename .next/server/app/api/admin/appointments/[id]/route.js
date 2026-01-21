"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/admin/appointments/[id]/route";
exports.ids = ["app/api/admin/appointments/[id]/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fappointments%2F%5Bid%5D%2Froute&page=%2Fapi%2Fadmin%2Fappointments%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fappointments%2F%5Bid%5D%2Froute.ts&appDir=D%3A%5CCode%5Cclinicappdatabase-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CCode%5Cclinicappdatabase-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fappointments%2F%5Bid%5D%2Froute&page=%2Fapi%2Fadmin%2Fappointments%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fappointments%2F%5Bid%5D%2Froute.ts&appDir=D%3A%5CCode%5Cclinicappdatabase-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CCode%5Cclinicappdatabase-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_Code_clinicappdatabase_main_app_api_admin_appointments_id_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/admin/appointments/[id]/route.ts */ \"(rsc)/./app/api/admin/appointments/[id]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/appointments/[id]/route\",\n        pathname: \"/api/admin/appointments/[id]\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/appointments/[id]/route\"\n    },\n    resolvedPagePath: \"D:\\\\Code\\\\clinicappdatabase-main\\\\app\\\\api\\\\admin\\\\appointments\\\\[id]\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_Code_clinicappdatabase_main_app_api_admin_appointments_id_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/admin/appointments/[id]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRmFwcG9pbnRtZW50cyUyRiU1QmlkJTVEJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhZG1pbiUyRmFwcG9pbnRtZW50cyUyRiU1QmlkJTVEJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYWRtaW4lMkZhcHBvaW50bWVudHMlMkYlNUJpZCU1RCUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDQ29kZSU1Q2NsaW5pY2FwcGRhdGFiYXNlLW1haW4lNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUQlM0ElNUNDb2RlJTVDY2xpbmljYXBwZGF0YWJhc2UtbWFpbiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDK0I7QUFDNUc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS12MC1wcm9qZWN0Lz9mNDg1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkQ6XFxcXENvZGVcXFxcY2xpbmljYXBwZGF0YWJhc2UtbWFpblxcXFxhcHBcXFxcYXBpXFxcXGFkbWluXFxcXGFwcG9pbnRtZW50c1xcXFxbaWRdXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hZG1pbi9hcHBvaW50bWVudHMvW2lkXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2FkbWluL2FwcG9pbnRtZW50cy9baWRdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hZG1pbi9hcHBvaW50bWVudHMvW2lkXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkQ6XFxcXENvZGVcXFxcY2xpbmljYXBwZGF0YWJhc2UtbWFpblxcXFxhcHBcXFxcYXBpXFxcXGFkbWluXFxcXGFwcG9pbnRtZW50c1xcXFxbaWRdXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hZG1pbi9hcHBvaW50bWVudHMvW2lkXS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fappointments%2F%5Bid%5D%2Froute&page=%2Fapi%2Fadmin%2Fappointments%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fappointments%2F%5Bid%5D%2Froute.ts&appDir=D%3A%5CCode%5Cclinicappdatabase-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CCode%5Cclinicappdatabase-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/admin/appointments/[id]/route.ts":
/*!**************************************************!*\
  !*** ./app/api/admin/appointments/[id]/route.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PATCH: () => (/* binding */ PATCH)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nasync function PATCH(req, ctx) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session?.user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        if (session.user.role !== \"ADMIN\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Forbidden\"\n            }, {\n                status: 403\n            });\n        }\n        const { id } = await ctx.params;\n        const body = await req.json();\n        const existing = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.appointment.findUnique({\n            where: {\n                id\n            },\n            select: {\n                id: true,\n                status: true\n            }\n        });\n        if (!existing) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Not found\"\n            }, {\n                status: 404\n            });\n        }\n        // Biar aman: appointment completed tidak boleh diutak-atik\n        if (existing.status === _prisma_client__WEBPACK_IMPORTED_MODULE_4__.AppointmentStatus.COMPLETED) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Completed appointment cannot be changed\"\n            }, {\n                status: 400\n            });\n        }\n        if (body.action === \"CANCEL\") {\n            const updated = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.appointment.update({\n                where: {\n                    id\n                },\n                data: {\n                    status: _prisma_client__WEBPACK_IMPORTED_MODULE_4__.AppointmentStatus.CANCELLED,\n                    notes: body.notes ?? null\n                },\n                select: {\n                    id: true,\n                    status: true,\n                    date: true,\n                    timeSlot: true,\n                    doctorId: true,\n                    notes: true,\n                    updatedAt: true\n                }\n            });\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                appointment: updated\n            });\n        }\n        if (body.action === \"CONFIRM\") {\n            const updated = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.appointment.update({\n                where: {\n                    id\n                },\n                data: {\n                    status: _prisma_client__WEBPACK_IMPORTED_MODULE_4__.AppointmentStatus.CONFIRMED,\n                    notes: body.notes ?? null\n                },\n                select: {\n                    id: true,\n                    status: true,\n                    date: true,\n                    timeSlot: true,\n                    doctorId: true,\n                    notes: true,\n                    updatedAt: true\n                }\n            });\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                appointment: updated\n            });\n        }\n        if (body.action === \"RESCHEDULE\") {\n            const updated = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.appointment.update({\n                where: {\n                    id\n                },\n                data: {\n                    date: new Date(body.date),\n                    timeSlot: body.timeSlot,\n                    doctorId: body.doctorId,\n                    // optional changes (kalau kamu mau)\n                    ...body.mode ? {\n                        mode: body.mode\n                    } : {},\n                    ...body.type ? {\n                        type: body.type\n                    } : {},\n                    // ini sesuai konsep kita: setelah diubah, status balik PENDING\n                    status: _prisma_client__WEBPACK_IMPORTED_MODULE_4__.AppointmentStatus.PENDING,\n                    // notes untuk jelasin ke user tanpa ubah total UI user\n                    notes: body.notes ?? \"Jadwal diubah oleh klinik. Silakan cek detail appointment Anda.\"\n                },\n                select: {\n                    id: true,\n                    status: true,\n                    date: true,\n                    timeSlot: true,\n                    doctorId: true,\n                    notes: true,\n                    updatedAt: true\n                }\n            });\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                appointment: updated\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Invalid action\"\n        }, {\n            status: 400\n        });\n    } catch (err) {\n        console.error(err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Failed to update appointment\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FkbWluL2FwcG9pbnRtZW50cy9baWRdL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQTBDO0FBQ0U7QUFDSjtBQUNIO0FBTWQ7QUFxQmhCLGVBQWVLLE1BQ3BCQyxHQUFZLEVBQ1pDLEdBQXdDO0lBRXhDLElBQUk7UUFDRixNQUFNQyxVQUFVLE1BQU1QLDJEQUFnQkEsQ0FBQ0Msa0RBQVdBO1FBQ2xELElBQUksQ0FBQ00sU0FBU0MsTUFBTTtZQUNsQixPQUFPVCxxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO2dCQUFFQyxTQUFTO1lBQWUsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3RFO1FBQ0EsSUFBSUosUUFBUUMsSUFBSSxDQUFDSSxJQUFJLEtBQUssU0FBUztZQUNqQyxPQUFPYixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO2dCQUFFQyxTQUFTO1lBQVksR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ25FO1FBRUEsTUFBTSxFQUFFRSxFQUFFLEVBQUUsR0FBRyxNQUFNUCxJQUFJUSxNQUFNO1FBQy9CLE1BQU1DLE9BQVEsTUFBTVYsSUFBSUksSUFBSTtRQUU1QixNQUFNTyxXQUFXLE1BQU1kLCtDQUFNQSxDQUFDZSxXQUFXLENBQUNDLFVBQVUsQ0FBQztZQUNuREMsT0FBTztnQkFBRU47WUFBRztZQUNaTyxRQUFRO2dCQUFFUCxJQUFJO2dCQUFNRixRQUFRO1lBQUs7UUFDbkM7UUFFQSxJQUFJLENBQUNLLFVBQVU7WUFDYixPQUFPakIscURBQVlBLENBQUNVLElBQUksQ0FBQztnQkFBRUMsU0FBUztZQUFZLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUNuRTtRQUVBLDJEQUEyRDtRQUMzRCxJQUFJSyxTQUFTTCxNQUFNLEtBQUtSLDZEQUFpQkEsQ0FBQ2tCLFNBQVMsRUFBRTtZQUNuRCxPQUFPdEIscURBQVlBLENBQUNVLElBQUksQ0FDdEI7Z0JBQUVDLFNBQVM7WUFBMEMsR0FDckQ7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLElBQUlJLEtBQUtPLE1BQU0sS0FBSyxVQUFVO1lBQzVCLE1BQU1DLFVBQVUsTUFBTXJCLCtDQUFNQSxDQUFDZSxXQUFXLENBQUNPLE1BQU0sQ0FBQztnQkFDOUNMLE9BQU87b0JBQUVOO2dCQUFHO2dCQUNaWSxNQUFNO29CQUNKZCxRQUFRUiw2REFBaUJBLENBQUN1QixTQUFTO29CQUNuQ0MsT0FBT1osS0FBS1ksS0FBSyxJQUFJO2dCQUN2QjtnQkFDQVAsUUFBUTtvQkFDTlAsSUFBSTtvQkFDSkYsUUFBUTtvQkFDUmlCLE1BQU07b0JBQ05DLFVBQVU7b0JBQ1ZDLFVBQVU7b0JBQ1ZILE9BQU87b0JBQ1BJLFdBQVc7Z0JBQ2I7WUFDRjtZQUNBLE9BQU9oQyxxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO2dCQUFFUSxhQUFhTTtZQUFRO1FBQ2xEO1FBRUEsSUFBSVIsS0FBS08sTUFBTSxLQUFLLFdBQVc7WUFDN0IsTUFBTUMsVUFBVSxNQUFNckIsK0NBQU1BLENBQUNlLFdBQVcsQ0FBQ08sTUFBTSxDQUFDO2dCQUM5Q0wsT0FBTztvQkFBRU47Z0JBQUc7Z0JBQ1pZLE1BQU07b0JBQ0pkLFFBQVFSLDZEQUFpQkEsQ0FBQzZCLFNBQVM7b0JBQ25DTCxPQUFPWixLQUFLWSxLQUFLLElBQUk7Z0JBQ3ZCO2dCQUNBUCxRQUFRO29CQUNOUCxJQUFJO29CQUNKRixRQUFRO29CQUNSaUIsTUFBTTtvQkFDTkMsVUFBVTtvQkFDVkMsVUFBVTtvQkFDVkgsT0FBTztvQkFDUEksV0FBVztnQkFDYjtZQUNGO1lBQ0EsT0FBT2hDLHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7Z0JBQUVRLGFBQWFNO1lBQVE7UUFDbEQ7UUFFQSxJQUFJUixLQUFLTyxNQUFNLEtBQUssY0FBYztZQUNoQyxNQUFNQyxVQUFVLE1BQU1yQiwrQ0FBTUEsQ0FBQ2UsV0FBVyxDQUFDTyxNQUFNLENBQUM7Z0JBQzlDTCxPQUFPO29CQUFFTjtnQkFBRztnQkFDWlksTUFBTTtvQkFDSkcsTUFBTSxJQUFJSyxLQUFLbEIsS0FBS2EsSUFBSTtvQkFDeEJDLFVBQVVkLEtBQUtjLFFBQVE7b0JBQ3ZCQyxVQUFVZixLQUFLZSxRQUFRO29CQUN2QixvQ0FBb0M7b0JBQ3BDLEdBQUlmLEtBQUttQixJQUFJLEdBQUc7d0JBQUVBLE1BQU1uQixLQUFLbUIsSUFBSTtvQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDeEMsR0FBSW5CLEtBQUtvQixJQUFJLEdBQUc7d0JBQUVBLE1BQU1wQixLQUFLb0IsSUFBSTtvQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFFeEMsK0RBQStEO29CQUMvRHhCLFFBQVFSLDZEQUFpQkEsQ0FBQ2lDLE9BQU87b0JBRWpDLHVEQUF1RDtvQkFDdkRULE9BQ0VaLEtBQUtZLEtBQUssSUFDVjtnQkFDSjtnQkFDQVAsUUFBUTtvQkFDTlAsSUFBSTtvQkFDSkYsUUFBUTtvQkFDUmlCLE1BQU07b0JBQ05DLFVBQVU7b0JBQ1ZDLFVBQVU7b0JBQ1ZILE9BQU87b0JBQ1BJLFdBQVc7Z0JBQ2I7WUFDRjtZQUNBLE9BQU9oQyxxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO2dCQUFFUSxhQUFhTTtZQUFRO1FBQ2xEO1FBRUEsT0FBT3hCLHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7WUFBRUMsU0FBUztRQUFpQixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUN4RSxFQUFFLE9BQU8wQixLQUFLO1FBQ1pDLFFBQVFDLEtBQUssQ0FBQ0Y7UUFDZCxPQUFPdEMscURBQVlBLENBQUNVLElBQUksQ0FDdEI7WUFBRUMsU0FBUztRQUErQixHQUMxQztZQUFFQyxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL215LXYwLXByb2plY3QvLi9hcHAvYXBpL2FkbWluL2FwcG9pbnRtZW50cy9baWRdL3JvdXRlLnRzPzRiNzYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCJcclxuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGhcIlxyXG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gXCJAL2xpYi9hdXRoXCJcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiXHJcbmltcG9ydCB7XHJcbiAgQXBwb2ludG1lbnRTdGF0dXMsXHJcbiAgQXBwb2ludG1lbnRUaW1lU2xvdCxcclxuICBBcHBvaW50bWVudE1vZGUsXHJcbiAgQXBwb2ludG1lbnRUeXBlLFxyXG59IGZyb20gXCJAcHJpc21hL2NsaWVudFwiXHJcblxyXG50eXBlIFBhdGNoQm9keSA9XHJcbiAgfCB7XHJcbiAgICAgIGFjdGlvbjogXCJDQU5DRUxcIlxyXG4gICAgICBub3Rlcz86IHN0cmluZ1xyXG4gICAgfVxyXG4gIHwge1xyXG4gICAgICBhY3Rpb246IFwiQ09ORklSTVwiXHJcbiAgICAgIG5vdGVzPzogc3RyaW5nXHJcbiAgICB9XHJcbiAgfCB7XHJcbiAgICAgIGFjdGlvbjogXCJSRVNDSEVEVUxFXCJcclxuICAgICAgZGF0ZTogc3RyaW5nIC8vIElTTyBzdHJpbmdcclxuICAgICAgdGltZVNsb3Q6IEFwcG9pbnRtZW50VGltZVNsb3RcclxuICAgICAgZG9jdG9ySWQ6IHN0cmluZ1xyXG4gICAgICBtb2RlPzogQXBwb2ludG1lbnRNb2RlXHJcbiAgICAgIHR5cGU/OiBBcHBvaW50bWVudFR5cGVcclxuICAgICAgbm90ZXM/OiBzdHJpbmdcclxuICAgIH1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQQVRDSChcclxuICByZXE6IFJlcXVlc3QsXHJcbiAgY3R4OiB7IHBhcmFtczogUHJvbWlzZTx7IGlkOiBzdHJpbmcgfT4gfVxyXG4pIHtcclxuICB0cnkge1xyXG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpXHJcbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgbWVzc2FnZTogXCJVbmF1dGhvcml6ZWRcIiB9LCB7IHN0YXR1czogNDAxIH0pXHJcbiAgICB9XHJcbiAgICBpZiAoc2Vzc2lvbi51c2VyLnJvbGUgIT09IFwiQURNSU5cIikge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiBcIkZvcmJpZGRlblwiIH0sIHsgc3RhdHVzOiA0MDMgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IGlkIH0gPSBhd2FpdCBjdHgucGFyYW1zXHJcbiAgICBjb25zdCBib2R5ID0gKGF3YWl0IHJlcS5qc29uKCkpIGFzIFBhdGNoQm9keVxyXG5cclxuICAgIGNvbnN0IGV4aXN0aW5nID0gYXdhaXQgcHJpc21hLmFwcG9pbnRtZW50LmZpbmRVbmlxdWUoe1xyXG4gICAgICB3aGVyZTogeyBpZCB9LFxyXG4gICAgICBzZWxlY3Q6IHsgaWQ6IHRydWUsIHN0YXR1czogdHJ1ZSB9LFxyXG4gICAgfSlcclxuXHJcbiAgICBpZiAoIWV4aXN0aW5nKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG1lc3NhZ2U6IFwiTm90IGZvdW5kXCIgfSwgeyBzdGF0dXM6IDQwNCB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEJpYXIgYW1hbjogYXBwb2ludG1lbnQgY29tcGxldGVkIHRpZGFrIGJvbGVoIGRpdXRhay1hdGlrXHJcbiAgICBpZiAoZXhpc3Rpbmcuc3RhdHVzID09PSBBcHBvaW50bWVudFN0YXR1cy5DT01QTEVURUQpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgbWVzc2FnZTogXCJDb21wbGV0ZWQgYXBwb2ludG1lbnQgY2Fubm90IGJlIGNoYW5nZWRcIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGJvZHkuYWN0aW9uID09PSBcIkNBTkNFTFwiKSB7XHJcbiAgICAgIGNvbnN0IHVwZGF0ZWQgPSBhd2FpdCBwcmlzbWEuYXBwb2ludG1lbnQudXBkYXRlKHtcclxuICAgICAgICB3aGVyZTogeyBpZCB9LFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHN0YXR1czogQXBwb2ludG1lbnRTdGF0dXMuQ0FOQ0VMTEVELFxyXG4gICAgICAgICAgbm90ZXM6IGJvZHkubm90ZXMgPz8gbnVsbCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlbGVjdDoge1xyXG4gICAgICAgICAgaWQ6IHRydWUsXHJcbiAgICAgICAgICBzdGF0dXM6IHRydWUsXHJcbiAgICAgICAgICBkYXRlOiB0cnVlLFxyXG4gICAgICAgICAgdGltZVNsb3Q6IHRydWUsXHJcbiAgICAgICAgICBkb2N0b3JJZDogdHJ1ZSxcclxuICAgICAgICAgIG5vdGVzOiB0cnVlLFxyXG4gICAgICAgICAgdXBkYXRlZEF0OiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pXHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGFwcG9pbnRtZW50OiB1cGRhdGVkIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGJvZHkuYWN0aW9uID09PSBcIkNPTkZJUk1cIikge1xyXG4gICAgICBjb25zdCB1cGRhdGVkID0gYXdhaXQgcHJpc21hLmFwcG9pbnRtZW50LnVwZGF0ZSh7XHJcbiAgICAgICAgd2hlcmU6IHsgaWQgfSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBzdGF0dXM6IEFwcG9pbnRtZW50U3RhdHVzLkNPTkZJUk1FRCxcclxuICAgICAgICAgIG5vdGVzOiBib2R5Lm5vdGVzID8/IG51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWxlY3Q6IHtcclxuICAgICAgICAgIGlkOiB0cnVlLFxyXG4gICAgICAgICAgc3RhdHVzOiB0cnVlLFxyXG4gICAgICAgICAgZGF0ZTogdHJ1ZSxcclxuICAgICAgICAgIHRpbWVTbG90OiB0cnVlLFxyXG4gICAgICAgICAgZG9jdG9ySWQ6IHRydWUsXHJcbiAgICAgICAgICBub3RlczogdHJ1ZSxcclxuICAgICAgICAgIHVwZGF0ZWRBdDogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KVxyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBhcHBvaW50bWVudDogdXBkYXRlZCB9KVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChib2R5LmFjdGlvbiA9PT0gXCJSRVNDSEVEVUxFXCIpIHtcclxuICAgICAgY29uc3QgdXBkYXRlZCA9IGF3YWl0IHByaXNtYS5hcHBvaW50bWVudC51cGRhdGUoe1xyXG4gICAgICAgIHdoZXJlOiB7IGlkIH0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgZGF0ZTogbmV3IERhdGUoYm9keS5kYXRlKSxcclxuICAgICAgICAgIHRpbWVTbG90OiBib2R5LnRpbWVTbG90LFxyXG4gICAgICAgICAgZG9jdG9ySWQ6IGJvZHkuZG9jdG9ySWQsXHJcbiAgICAgICAgICAvLyBvcHRpb25hbCBjaGFuZ2VzIChrYWxhdSBrYW11IG1hdSlcclxuICAgICAgICAgIC4uLihib2R5Lm1vZGUgPyB7IG1vZGU6IGJvZHkubW9kZSB9IDoge30pLFxyXG4gICAgICAgICAgLi4uKGJvZHkudHlwZSA/IHsgdHlwZTogYm9keS50eXBlIH0gOiB7fSksXHJcblxyXG4gICAgICAgICAgLy8gaW5pIHNlc3VhaSBrb25zZXAga2l0YTogc2V0ZWxhaCBkaXViYWgsIHN0YXR1cyBiYWxpayBQRU5ESU5HXHJcbiAgICAgICAgICBzdGF0dXM6IEFwcG9pbnRtZW50U3RhdHVzLlBFTkRJTkcsXHJcblxyXG4gICAgICAgICAgLy8gbm90ZXMgdW50dWsgamVsYXNpbiBrZSB1c2VyIHRhbnBhIHViYWggdG90YWwgVUkgdXNlclxyXG4gICAgICAgICAgbm90ZXM6XHJcbiAgICAgICAgICAgIGJvZHkubm90ZXMgPz9cclxuICAgICAgICAgICAgXCJKYWR3YWwgZGl1YmFoIG9sZWgga2xpbmlrLiBTaWxha2FuIGNlayBkZXRhaWwgYXBwb2ludG1lbnQgQW5kYS5cIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlbGVjdDoge1xyXG4gICAgICAgICAgaWQ6IHRydWUsXHJcbiAgICAgICAgICBzdGF0dXM6IHRydWUsXHJcbiAgICAgICAgICBkYXRlOiB0cnVlLFxyXG4gICAgICAgICAgdGltZVNsb3Q6IHRydWUsXHJcbiAgICAgICAgICBkb2N0b3JJZDogdHJ1ZSxcclxuICAgICAgICAgIG5vdGVzOiB0cnVlLFxyXG4gICAgICAgICAgdXBkYXRlZEF0OiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pXHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGFwcG9pbnRtZW50OiB1cGRhdGVkIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgbWVzc2FnZTogXCJJbnZhbGlkIGFjdGlvblwiIH0sIHsgc3RhdHVzOiA0MDAgfSlcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHVwZGF0ZSBhcHBvaW50bWVudFwiIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwicHJpc21hIiwiQXBwb2ludG1lbnRTdGF0dXMiLCJQQVRDSCIsInJlcSIsImN0eCIsInNlc3Npb24iLCJ1c2VyIiwianNvbiIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJyb2xlIiwiaWQiLCJwYXJhbXMiLCJib2R5IiwiZXhpc3RpbmciLCJhcHBvaW50bWVudCIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsInNlbGVjdCIsIkNPTVBMRVRFRCIsImFjdGlvbiIsInVwZGF0ZWQiLCJ1cGRhdGUiLCJkYXRhIiwiQ0FOQ0VMTEVEIiwibm90ZXMiLCJkYXRlIiwidGltZVNsb3QiLCJkb2N0b3JJZCIsInVwZGF0ZWRBdCIsIkNPTkZJUk1FRCIsIkRhdGUiLCJtb2RlIiwidHlwZSIsIlBFTkRJTkciLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/admin/appointments/[id]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n\n\n\nconst authOptions = {\n    session: {\n        strategy: \"jwt\"\n    },\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {},\n                password: {}\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) return null;\n                const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user) return null;\n                const valid = await bcryptjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"].compare(credentials.password, user.password);\n                if (!valid) return null;\n                return user;\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            // ⬅️ SAAT LOGIN\n            if (user) {\n                token.id = user.id;\n                token.role = user.role // 🔥 INI KUNCI\n                ;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            // ⬅️ SETIAP REQUEST API\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n            }\n            return session;\n        }\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ2lFO0FBQzVCO0FBQ1I7QUFFdEIsTUFBTUcsY0FBK0I7SUFDMUNDLFNBQVM7UUFDUEMsVUFBVTtJQUNaO0lBQ0FDLFdBQVc7UUFDVE4sMkVBQW1CQSxDQUFDO1lBQ2xCTyxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLE9BQU8sQ0FBQztnQkFDUkMsVUFBVSxDQUFDO1lBQ2I7WUFDQSxNQUFNQyxXQUFVSCxXQUFXO2dCQUN6QixJQUFJLENBQUNBLGFBQWFDLFNBQVMsQ0FBQ0QsYUFBYUUsVUFBVSxPQUFPO2dCQUUxRCxNQUFNRSxPQUFPLE1BQU1YLCtDQUFNQSxDQUFDVyxJQUFJLENBQUNDLFVBQVUsQ0FBQztvQkFDeENDLE9BQU87d0JBQUVMLE9BQU9ELFlBQVlDLEtBQUs7b0JBQUM7Z0JBQ3BDO2dCQUVBLElBQUksQ0FBQ0csTUFBTSxPQUFPO2dCQUVsQixNQUFNRyxRQUFRLE1BQU1iLHdEQUFjLENBQ2hDTSxZQUFZRSxRQUFRLEVBQ3BCRSxLQUFLRixRQUFRO2dCQUdmLElBQUksQ0FBQ0ssT0FBTyxPQUFPO2dCQUVuQixPQUFPSDtZQUNUO1FBQ0Y7S0FDRDtJQUNESyxXQUFXO1FBQ1QsTUFBTUMsS0FBSSxFQUFFQyxLQUFLLEVBQUVQLElBQUksRUFBRTtZQUN2QixnQkFBZ0I7WUFDaEIsSUFBSUEsTUFBTTtnQkFDUk8sTUFBTUMsRUFBRSxHQUFHUixLQUFLUSxFQUFFO2dCQUNsQkQsTUFBTUUsSUFBSSxHQUFHVCxLQUFLUyxJQUFJLENBQUcsZUFBZTs7WUFDMUM7WUFDQSxPQUFPRjtRQUNUO1FBQ0EsTUFBTWYsU0FBUSxFQUFFQSxPQUFPLEVBQUVlLEtBQUssRUFBRTtZQUM5Qix3QkFBd0I7WUFDeEIsSUFBSWYsUUFBUVEsSUFBSSxFQUFFO2dCQUNoQlIsUUFBUVEsSUFBSSxDQUFDUSxFQUFFLEdBQUdELE1BQU1DLEVBQUU7Z0JBQzFCaEIsUUFBUVEsSUFBSSxDQUFDUyxJQUFJLEdBQUdGLE1BQU1FLElBQUk7WUFDaEM7WUFDQSxPQUFPakI7UUFDVDtJQUNGO0FBQ0YsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL215LXYwLXByb2plY3QvLi9saWIvYXV0aC50cz9iZjdlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRBdXRoT3B0aW9ucyB9IGZyb20gXCJuZXh0LWF1dGhcIlxyXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiXHJcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9wcmlzbWFcIlxyXG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiXHJcblxyXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcclxuICBzZXNzaW9uOiB7XHJcbiAgICBzdHJhdGVneTogXCJqd3RcIixcclxuICB9LFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XHJcbiAgICAgIG5hbWU6IFwiQ3JlZGVudGlhbHNcIixcclxuICAgICAgY3JlZGVudGlhbHM6IHtcclxuICAgICAgICBlbWFpbDoge30sXHJcbiAgICAgICAgcGFzc3dvcmQ6IHt9LFxyXG4gICAgICB9LFxyXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcclxuICAgICAgICBpZiAoIWNyZWRlbnRpYWxzPy5lbWFpbCB8fCAhY3JlZGVudGlhbHM/LnBhc3N3b3JkKSByZXR1cm4gbnVsbFxyXG5cclxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XHJcbiAgICAgICAgICB3aGVyZTogeyBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwgfSxcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBpZiAoIXVzZXIpIHJldHVybiBudWxsXHJcblxyXG4gICAgICAgIGNvbnN0IHZhbGlkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoXHJcbiAgICAgICAgICBjcmVkZW50aWFscy5wYXNzd29yZCxcclxuICAgICAgICAgIHVzZXIucGFzc3dvcmRcclxuICAgICAgICApXHJcblxyXG4gICAgICAgIGlmICghdmFsaWQpIHJldHVybiBudWxsXHJcblxyXG4gICAgICAgIHJldHVybiB1c2VyXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIGNhbGxiYWNrczoge1xyXG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xyXG4gICAgICAvLyDirIXvuI8gU0FBVCBMT0dJTlxyXG4gICAgICBpZiAodXNlcikge1xyXG4gICAgICAgIHRva2VuLmlkID0gdXNlci5pZFxyXG4gICAgICAgIHRva2VuLnJvbGUgPSB1c2VyLnJvbGUgICAvLyDwn5SlIElOSSBLVU5DSVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0b2tlblxyXG4gICAgfSxcclxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XHJcbiAgICAgIC8vIOKshe+4jyBTRVRJQVAgUkVRVUVTVCBBUElcclxuICAgICAgaWYgKHNlc3Npb24udXNlcikge1xyXG4gICAgICAgIHNlc3Npb24udXNlci5pZCA9IHRva2VuLmlkIGFzIHN0cmluZ1xyXG4gICAgICAgIHNlc3Npb24udXNlci5yb2xlID0gdG9rZW4ucm9sZSBhcyBcIkFETUlOXCIgfCBcIlVTRVJcIlxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzZXNzaW9uXHJcbiAgICB9LFxyXG4gIH0sXHJcbn1cclxuIl0sIm5hbWVzIjpbIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJwcmlzbWEiLCJiY3J5cHQiLCJhdXRoT3B0aW9ucyIsInNlc3Npb24iLCJzdHJhdGVneSIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwidmFsaWQiLCJjb21wYXJlIiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJpZCIsInJvbGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\",\n        \"error\"\n    ]\n});\nif (true) {\n    globalForPrisma.prisma = prisma;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3QyxNQUFNQyxrQkFBa0JDO0FBSWpCLE1BQU1DLFNBQ1hGLGdCQUFnQkUsTUFBTSxJQUN0QixJQUFJSCx3REFBWUEsQ0FBQztJQUNmSSxLQUFLO1FBQUM7UUFBUztLQUFRO0FBQ3pCLEdBQUU7QUFFSixJQUFJQyxJQUFxQyxFQUFFO0lBQ3pDSixnQkFBZ0JFLE1BQU0sR0FBR0E7QUFDM0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS12MC1wcm9qZWN0Ly4vbGliL3ByaXNtYS50cz85ODIyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiXHJcblxyXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWxUaGlzIGFzIHVua25vd24gYXMge1xyXG4gIHByaXNtYTogUHJpc21hQ2xpZW50IHwgdW5kZWZpbmVkXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBwcmlzbWEgPVxyXG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz9cclxuICBuZXcgUHJpc21hQ2xpZW50KHtcclxuICAgIGxvZzogW1wicXVlcnlcIiwgXCJlcnJvclwiXSxcclxuICB9KVxyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xyXG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWFcclxufVxyXG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsImxvZyIsInByb2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fappointments%2F%5Bid%5D%2Froute&page=%2Fapi%2Fadmin%2Fappointments%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fappointments%2F%5Bid%5D%2Froute.ts&appDir=D%3A%5CCode%5Cclinicappdatabase-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CCode%5Cclinicappdatabase-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();