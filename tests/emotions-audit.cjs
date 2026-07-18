"use strict";
const assert = require("node:assert/strict");
const { auditCaseLab } = require("./case-lab-audit-helper.cjs");
const result = auditCaseLab({ configFile: "emotions-config.js", htmlFile: "emotions.html", expectedId: "emotions", expectedFamilies: 8 });
const { api, config, reset } = result;
const uniform = (family) => Object.fromEntries(config.cases.map((question) => [question.id, family]));

reset({ opening: "desert", final: "desert", ...uniform("repair") });
assert.ok(api.caseLabSeams().some((seam) => seam.id === "functions-beyond-desert"), "non-desert emotional functions must be compared with a desert final account");
reset({ opening: "revise", final: "revise", ...uniform("revise"), remorse: "repair" });
assert.ok(api.caseLabSeams().some((seam) => seam.id === "retained-functions"), "retained functions must be described inside a revisionary final account");
reset({ opening: "repair", final: "repair", ...uniform("repair"), resentment: "desert" });
assert.ok(api.caseLabSeams().some((seam) => seam.id === "after-repair"), "resentment after complete repair must be compared with a repair-only final account");
reset({ opening: "revise", final: "revise", ...uniform("revise") });
assert.equal(api.caseLabSeams().length, 0, "a uniform revisionary path must not receive an invented seam");
assert.match(result.html, /Removing desert does not erase harm, trust, protest, repair, or memory/, "the lab must state what survives desert skepticism");
assert.match(config.opening.scope, /not a mental-health assessment/, "the opening must state the non-clinical scope");
console.log(`Emotions audit passed: ${result.profiles.toLocaleString()} complete case profiles, eight exact emotional roles, desert/function and cause/fit boundaries, scope seams, and full AI context verified.`);
