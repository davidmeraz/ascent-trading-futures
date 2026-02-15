import { module1 } from './modules/module1';
import { module2 } from './modules/module2';
import { module3 } from './modules/module3';
import { module4 } from './modules/module4';
import { module5 } from './modules/module5';
import { module6 } from './modules/module6';
import { module7 } from './modules/module7';
import { module8 } from './modules/module8';
import { proModule1 } from './modules/pro-module1';

// All content (flat) — backwards compatible
export const COURSE_CONTENT = {
    "module-1": module1,
    "module-2": module2,
    "module-3": module3,
    "module-4": module4,
    "module-5": module5,
    "module-6": module6,
    "module-7": module7,
    "module-8": module8,
    "pro-module-1": proModule1,
};

// Content organized by level
export const COURSE_CONTENT_BY_LEVEL = {
    noob: {
        "module-1": module1,
        "module-2": module2,
        "module-3": module3,
        "module-4": module4,
        "module-5": module5,
        "module-6": module6,
        "module-7": module7,
        "module-8": module8,
    },
    pro: {
        "pro-module-1": proModule1,
    },
    expert: {},
};
