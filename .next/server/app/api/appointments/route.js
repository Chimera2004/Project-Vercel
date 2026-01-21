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
exports.id = "app/api/appointments/route";
exports.ids = ["app/api/appointments/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fappointments%2Froute&page=%2Fapi%2Fappointments%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fappointments%2Froute.ts&appDir=D%3A%5CCode%5Cclinicappdatabase-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CCode%5Cclinicappdatabase-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fappointments%2Froute&page=%2Fapi%2Fappointments%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fappointments%2Froute.ts&appDir=D%3A%5CCode%5Cclinicappdatabase-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CCode%5Cclinicappdatabase-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_Code_clinicappdatabase_main_app_api_appointments_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/appointments/route.ts */ \"(rsc)/./app/api/appointments/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/appointments/route\",\n        pathname: \"/api/appointments\",\n        filename: \"route\",\n        bundlePath: \"app/api/appointments/route\"\n    },\n    resolvedPagePath: \"D:\\\\Code\\\\clinicappdatabase-main\\\\app\\\\api\\\\appointments\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_Code_clinicappdatabase_main_app_api_appointments_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/appointments/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhcHBvaW50bWVudHMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmFwcG9pbnRtZW50cyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmFwcG9pbnRtZW50cyUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDQ29kZSU1Q2NsaW5pY2FwcGRhdGFiYXNlLW1haW4lNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUQlM0ElNUNDb2RlJTVDY2xpbmljYXBwZGF0YWJhc2UtbWFpbiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDa0I7QUFDL0Y7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS12MC1wcm9qZWN0Lz84N2U5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkQ6XFxcXENvZGVcXFxcY2xpbmljYXBwZGF0YWJhc2UtbWFpblxcXFxhcHBcXFxcYXBpXFxcXGFwcG9pbnRtZW50c1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXBwb2ludG1lbnRzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXBwb2ludG1lbnRzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hcHBvaW50bWVudHMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJEOlxcXFxDb2RlXFxcXGNsaW5pY2FwcGRhdGFiYXNlLW1haW5cXFxcYXBwXFxcXGFwaVxcXFxhcHBvaW50bWVudHNcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2FwcG9pbnRtZW50cy9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fappointments%2Froute&page=%2Fapi%2Fappointments%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fappointments%2Froute.ts&appDir=D%3A%5CCode%5Cclinicappdatabase-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CCode%5Cclinicappdatabase-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/appointments/route.ts":
/*!***************************************!*\
  !*** ./app/api/appointments/route.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   runtime: () => (/* binding */ runtime)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n// app/api/appointments/route.ts\nconst runtime = \"nodejs\";\n\n\n\n\n\nasync function getAuthUserId() {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_3__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_4__.authOptions);\n    if (session?.user?.id) return session.user.id;\n    const cookieStore = (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)();\n    const auth = cookieStore.get(\"auth\")?.value;\n    const userId = cookieStore.get(\"userId\")?.value;\n    if (auth !== \"true\" || !userId) return null;\n    return userId;\n}\nasync function POST(req) {\n    try {\n        const userId = await getAuthUserId();\n        if (!userId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const { date, timeSlot, type, mode, notes, doctorId } = await req.json();\n        if (!date || !timeSlot || !type || !mode || !doctorId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Missing required fields\"\n            }, {\n                status: 400\n            });\n        }\n        const doctor = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma.doctor.findUnique({\n            where: {\n                id: doctorId\n            }\n        });\n        if (!doctor || !doctor.isActive) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Doctor not found or inactive\"\n            }, {\n                status: 400\n            });\n        }\n        const existing = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma.appointment.findFirst({\n            where: {\n                doctorId,\n                date: new Date(date),\n                timeSlot,\n                status: {\n                    not: \"CANCELLED\"\n                }\n            }\n        });\n        if (existing) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Time slot already booked\"\n            }, {\n                status: 400\n            });\n        }\n        const appointment = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma.appointment.create({\n            data: {\n                userId,\n                doctorId,\n                date: new Date(date),\n                timeSlot,\n                type,\n                mode,\n                notes: notes || null,\n                status: \"PENDING\"\n            },\n            include: {\n                doctor: true\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(appointment, {\n            status: 201\n        });\n    } catch (err) {\n        console.error(err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Internal server error\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function GET() {\n    try {\n        const userId = await getAuthUserId();\n        if (!userId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const appointments = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma.appointment.findMany({\n            where: {\n                userId\n            },\n            orderBy: {\n                createdAt: \"desc\"\n            },\n            include: {\n                doctor: true\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(appointments);\n    } catch (err) {\n        console.error(err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Internal server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FwcG9pbnRtZW50cy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxnQ0FBZ0M7QUFDekIsTUFBTUEsVUFBVSxTQUFTO0FBRVc7QUFDSjtBQUNEO0FBQ087QUFDSjtBQUd6QyxlQUFlTTtJQUNiLE1BQU1DLFVBQVUsTUFBTUgsMkRBQWdCQSxDQUFDQyxrREFBV0E7SUFDbEQsSUFBSUUsU0FBU0MsTUFBTUMsSUFBSSxPQUFPRixRQUFRQyxJQUFJLENBQUNDLEVBQUU7SUFFN0MsTUFBTUMsY0FBY1IscURBQU9BO0lBQzNCLE1BQU1TLE9BQU9ELFlBQVlFLEdBQUcsQ0FBQyxTQUFTQztJQUN0QyxNQUFNQyxTQUFTSixZQUFZRSxHQUFHLENBQUMsV0FBV0M7SUFDMUMsSUFBSUYsU0FBUyxVQUFVLENBQUNHLFFBQVEsT0FBTztJQUN2QyxPQUFPQTtBQUNUO0FBRU8sZUFBZUMsS0FBS0MsR0FBWTtJQUNyQyxJQUFJO1FBQ0YsTUFBTUYsU0FBUyxNQUFNUjtRQUNyQixJQUFJLENBQUNRLFFBQVE7WUFDWCxPQUFPYixxREFBWUEsQ0FBQ2dCLElBQUksQ0FBQztnQkFBRUMsU0FBUztZQUFlLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUN0RTtRQUVBLE1BQU0sRUFBRUMsSUFBSSxFQUFFQyxRQUFRLEVBQUVDLElBQUksRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUVDLFFBQVEsRUFBRSxHQUFHLE1BQU1ULElBQUlDLElBQUk7UUFFdEUsSUFBSSxDQUFDRyxRQUFRLENBQUNDLFlBQVksQ0FBQ0MsUUFBUSxDQUFDQyxRQUFRLENBQUNFLFVBQVU7WUFDckQsT0FBT3hCLHFEQUFZQSxDQUFDZ0IsSUFBSSxDQUN0QjtnQkFBRUMsU0FBUztZQUEwQixHQUNyQztnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsTUFBTU8sU0FBUyxNQUFNdkIsK0NBQU1BLENBQUN1QixNQUFNLENBQUNDLFVBQVUsQ0FBQztZQUM1Q0MsT0FBTztnQkFBRW5CLElBQUlnQjtZQUFTO1FBQ3hCO1FBRUEsSUFBSSxDQUFDQyxVQUFVLENBQUNBLE9BQU9HLFFBQVEsRUFBRTtZQUMvQixPQUFPNUIscURBQVlBLENBQUNnQixJQUFJLENBQ3RCO2dCQUFFQyxTQUFTO1lBQStCLEdBQzFDO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxNQUFNVyxXQUFXLE1BQU0zQiwrQ0FBTUEsQ0FBQzRCLFdBQVcsQ0FBQ0MsU0FBUyxDQUFDO1lBQ2xESixPQUFPO2dCQUNMSDtnQkFDQUwsTUFBTSxJQUFJYSxLQUFLYjtnQkFDZkM7Z0JBQ0FGLFFBQVE7b0JBQUVlLEtBQUs7Z0JBQVk7WUFDN0I7UUFDRjtRQUVBLElBQUlKLFVBQVU7WUFDWixPQUFPN0IscURBQVlBLENBQUNnQixJQUFJLENBQ3RCO2dCQUFFQyxTQUFTO1lBQTJCLEdBQ3RDO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxNQUFNWSxjQUFjLE1BQU01QiwrQ0FBTUEsQ0FBQzRCLFdBQVcsQ0FBQ0ksTUFBTSxDQUFDO1lBQ2xEQyxNQUFNO2dCQUNKdEI7Z0JBQ0FXO2dCQUNBTCxNQUFNLElBQUlhLEtBQUtiO2dCQUNmQztnQkFDQUM7Z0JBQ0FDO2dCQUNBQyxPQUFPQSxTQUFTO2dCQUNoQkwsUUFBUTtZQUNWO1lBQ0FrQixTQUFTO2dCQUNQWCxRQUFRO1lBQ1Y7UUFDRjtRQUVBLE9BQU96QixxREFBWUEsQ0FBQ2dCLElBQUksQ0FBQ2MsYUFBYTtZQUFFWixRQUFRO1FBQUk7SUFDdEQsRUFBRSxPQUFPbUIsS0FBSztRQUNaQyxRQUFRQyxLQUFLLENBQUNGO1FBQ2QsT0FBT3JDLHFEQUFZQSxDQUFDZ0IsSUFBSSxDQUN0QjtZQUFFQyxTQUFTO1FBQXdCLEdBQ25DO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGO0FBRU8sZUFBZXNCO0lBQ3BCLElBQUk7UUFDRixNQUFNM0IsU0FBUyxNQUFNUjtRQUNyQixJQUFJLENBQUNRLFFBQVE7WUFDWCxPQUFPYixxREFBWUEsQ0FBQ2dCLElBQUksQ0FBQztnQkFBRUMsU0FBUztZQUFlLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUN0RTtRQUVBLE1BQU11QixlQUFlLE1BQU12QywrQ0FBTUEsQ0FBQzRCLFdBQVcsQ0FBQ1ksUUFBUSxDQUFDO1lBQ3JEZixPQUFPO2dCQUFFZDtZQUFPO1lBQ2hCOEIsU0FBUztnQkFBRUMsV0FBVztZQUFPO1lBQzdCUixTQUFTO2dCQUFFWCxRQUFRO1lBQUs7UUFDMUI7UUFFQSxPQUFPekIscURBQVlBLENBQUNnQixJQUFJLENBQUN5QjtJQUMzQixFQUFFLE9BQU9KLEtBQUs7UUFDWkMsUUFBUUMsS0FBSyxDQUFDRjtRQUNkLE9BQU9yQyxxREFBWUEsQ0FBQ2dCLElBQUksQ0FDdEI7WUFBRUMsU0FBUztRQUF3QixHQUNuQztZQUFFQyxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL215LXYwLXByb2plY3QvLi9hcHAvYXBpL2FwcG9pbnRtZW50cy9yb3V0ZS50cz82OTI0Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGFwcC9hcGkvYXBwb2ludG1lbnRzL3JvdXRlLnRzXHJcbmV4cG9ydCBjb25zdCBydW50aW1lID0gXCJub2RlanNcIjtcclxuXHJcbmltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5pbXBvcnQgeyBjb29raWVzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xyXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XHJcbmltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoXCI7XHJcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSBcIkAvbGliL2F1dGhcIjtcclxuXHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRBdXRoVXNlcklkKCkge1xyXG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKTtcclxuICBpZiAoc2Vzc2lvbj8udXNlcj8uaWQpIHJldHVybiBzZXNzaW9uLnVzZXIuaWQ7XHJcblxyXG4gIGNvbnN0IGNvb2tpZVN0b3JlID0gY29va2llcygpO1xyXG4gIGNvbnN0IGF1dGggPSBjb29raWVTdG9yZS5nZXQoXCJhdXRoXCIpPy52YWx1ZTtcclxuICBjb25zdCB1c2VySWQgPSBjb29raWVTdG9yZS5nZXQoXCJ1c2VySWRcIik/LnZhbHVlO1xyXG4gIGlmIChhdXRoICE9PSBcInRydWVcIiB8fCAhdXNlcklkKSByZXR1cm4gbnVsbDtcclxuICByZXR1cm4gdXNlcklkO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IFJlcXVlc3QpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgdXNlcklkID0gYXdhaXQgZ2V0QXV0aFVzZXJJZCgpO1xyXG4gICAgaWYgKCF1c2VySWQpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgbWVzc2FnZTogXCJVbmF1dGhvcml6ZWRcIiB9LCB7IHN0YXR1czogNDAxIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHsgZGF0ZSwgdGltZVNsb3QsIHR5cGUsIG1vZGUsIG5vdGVzLCBkb2N0b3JJZCB9ID0gYXdhaXQgcmVxLmpzb24oKTtcclxuXHJcbiAgICBpZiAoIWRhdGUgfHwgIXRpbWVTbG90IHx8ICF0eXBlIHx8ICFtb2RlIHx8ICFkb2N0b3JJZCkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBtZXNzYWdlOiBcIk1pc3NpbmcgcmVxdWlyZWQgZmllbGRzXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkb2N0b3IgPSBhd2FpdCBwcmlzbWEuZG9jdG9yLmZpbmRVbmlxdWUoe1xyXG4gICAgICB3aGVyZTogeyBpZDogZG9jdG9ySWQgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghZG9jdG9yIHx8ICFkb2N0b3IuaXNBY3RpdmUpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgbWVzc2FnZTogXCJEb2N0b3Igbm90IGZvdW5kIG9yIGluYWN0aXZlXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBleGlzdGluZyA9IGF3YWl0IHByaXNtYS5hcHBvaW50bWVudC5maW5kRmlyc3Qoe1xyXG4gICAgICB3aGVyZToge1xyXG4gICAgICAgIGRvY3RvcklkLFxyXG4gICAgICAgIGRhdGU6IG5ldyBEYXRlKGRhdGUpLFxyXG4gICAgICAgIHRpbWVTbG90LFxyXG4gICAgICAgIHN0YXR1czogeyBub3Q6IFwiQ0FOQ0VMTEVEXCIgfSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChleGlzdGluZykge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBtZXNzYWdlOiBcIlRpbWUgc2xvdCBhbHJlYWR5IGJvb2tlZFwiIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYXBwb2ludG1lbnQgPSBhd2FpdCBwcmlzbWEuYXBwb2ludG1lbnQuY3JlYXRlKHtcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHVzZXJJZCwgLy8g4pyFIGRhcmkgY29va2llIHVzZXJJZFxyXG4gICAgICAgIGRvY3RvcklkLFxyXG4gICAgICAgIGRhdGU6IG5ldyBEYXRlKGRhdGUpLFxyXG4gICAgICAgIHRpbWVTbG90LFxyXG4gICAgICAgIHR5cGUsXHJcbiAgICAgICAgbW9kZSxcclxuICAgICAgICBub3Rlczogbm90ZXMgfHwgbnVsbCxcclxuICAgICAgICBzdGF0dXM6IFwiUEVORElOR1wiLFxyXG4gICAgICB9LFxyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgZG9jdG9yOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGFwcG9pbnRtZW50LCB7IHN0YXR1czogMjAxIH0pO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IG1lc3NhZ2U6IFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIgfSxcclxuICAgICAgeyBzdGF0dXM6IDUwMCB9XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgdXNlcklkID0gYXdhaXQgZ2V0QXV0aFVzZXJJZCgpO1xyXG4gICAgaWYgKCF1c2VySWQpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgbWVzc2FnZTogXCJVbmF1dGhvcml6ZWRcIiB9LCB7IHN0YXR1czogNDAxIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFwcG9pbnRtZW50cyA9IGF3YWl0IHByaXNtYS5hcHBvaW50bWVudC5maW5kTWFueSh7XHJcbiAgICAgIHdoZXJlOiB7IHVzZXJJZCB9LCBcclxuICAgICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6IFwiZGVzY1wiIH0sXHJcbiAgICAgIGluY2x1ZGU6IHsgZG9jdG9yOiB0cnVlIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oYXBwb2ludG1lbnRzKTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgeyBtZXNzYWdlOiBcIkludGVybmFsIHNlcnZlciBlcnJvclwiIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbInJ1bnRpbWUiLCJOZXh0UmVzcG9uc2UiLCJjb29raWVzIiwicHJpc21hIiwiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwiZ2V0QXV0aFVzZXJJZCIsInNlc3Npb24iLCJ1c2VyIiwiaWQiLCJjb29raWVTdG9yZSIsImF1dGgiLCJnZXQiLCJ2YWx1ZSIsInVzZXJJZCIsIlBPU1QiLCJyZXEiLCJqc29uIiwibWVzc2FnZSIsInN0YXR1cyIsImRhdGUiLCJ0aW1lU2xvdCIsInR5cGUiLCJtb2RlIiwibm90ZXMiLCJkb2N0b3JJZCIsImRvY3RvciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImlzQWN0aXZlIiwiZXhpc3RpbmciLCJhcHBvaW50bWVudCIsImZpbmRGaXJzdCIsIkRhdGUiLCJub3QiLCJjcmVhdGUiLCJkYXRhIiwiaW5jbHVkZSIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsIkdFVCIsImFwcG9pbnRtZW50cyIsImZpbmRNYW55Iiwib3JkZXJCeSIsImNyZWF0ZWRBdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/appointments/route.ts\n");

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/uuid","vendor-chunks/oauth","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/bcryptjs","vendor-chunks/preact","vendor-chunks/oidc-token-hash","vendor-chunks/object-hash","vendor-chunks/lru-cache","vendor-chunks/cookie"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fappointments%2Froute&page=%2Fapi%2Fappointments%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fappointments%2Froute.ts&appDir=D%3A%5CCode%5Cclinicappdatabase-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CCode%5Cclinicappdatabase-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();