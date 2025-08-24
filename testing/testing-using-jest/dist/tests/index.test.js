"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const __1 = require("..");
(0, globals_1.describe)("tests for add", () => {
    (0, globals_1.it)("should return sum correctly", () => {
        const finalAns = (0, __1.sum)(1, 2);
        (0, globals_1.expect)(finalAns).toBe(3);
    });
});
