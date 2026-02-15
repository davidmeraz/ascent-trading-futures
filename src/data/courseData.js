import { module1 } from './modules/noob/module1';
import { module2 } from './modules/noob/module2';
import { module3 } from './modules/noob/module3';
import { module4 } from './modules/noob/module4';
import { module5 } from './modules/noob/module5';
import { module6 } from './modules/noob/module6';
import { module7 } from './modules/noob/module7';
import { module8 } from './modules/noob/module8';
import { proModule1 } from './modules/pro/module1';
import { proModule2 } from './modules/pro/module2';
import { proModule3 } from './modules/pro/module3';
import { proModule4 } from './modules/pro/module4';
import { expertModule1 } from './modules/expert/module1';
import { expertModule2 } from './modules/expert/module2';
import { expertModule3 } from './modules/expert/module3';
import { expertModule4 } from './modules/expert/module4';

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
    "pro-module-2": proModule2,
    "pro-module-3": proModule3,
    "pro-module-4": proModule4,
    "expert-module-1": expertModule1,
    "expert-module-2": expertModule2,
    "expert-module-3": expertModule3,
    "expert-module-4": expertModule4,
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
        "pro-module-2": proModule2,
        "pro-module-3": proModule3,
        "pro-module-4": proModule4,
    },
    expert: {
        "expert-module-1": expertModule1,
        "expert-module-2": expertModule2,
        "expert-module-3": expertModule3,
        "expert-module-4": expertModule4,
    },
};
