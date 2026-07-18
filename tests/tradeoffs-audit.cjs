"use strict";
const assert = require("node:assert/strict");
const { auditCaseLab } = require("./case-lab-audit-helper.cjs");
const result = auditCaseLab({ configFile: "tradeoffs-config.js", htmlFile: "tradeoffs.html", expectedId: "tradeoffs", expectedFamilies: 8 });
const { api, config, reset } = result;
const uniform = (family) => Object.fromEntries(config.cases.map((question) => [question.id, family]));

reset({ opening: "sum", final: "sum", ...uniform("sum"), headaches: "constraint", scan: "lexical" });
assert.ok(api.caseLabSeams().some((seam) => seam.id === "limits-inside-total"), "repeated trade-blocking answers must be compared with a final common scale");
reset({ opening: "constraint", final: "constraint", ...uniform("constraint"), promise: "sum" });
assert.ok(api.caseLabSeams().some((seam) => seam.id === "promise-override"), "an aggregated promise emergency must be compared with a constraint final rule");
reset({ opening: "lexical", final: "lexical", ...uniform("lexical"), talents: "procedure" });
assert.ok(api.caseLabSeams().some((seam) => seam.id === "same-rank-tie"), "a same-rank tie must expose the need for a secondary lexical rule");
reset({ opening: "commitment", final: "commitment", ...uniform("commitment") });
assert.equal(api.caseLabSeams().length, 0, "a uniform non-realist settlement path must not receive an invented seam");
assert.match(result.html, /Settling a choice does not prove that every value has one true price/, "the lab must distinguish settlement from objective ranking");
assert.match(config.opening.context, /not whether the values are objective facts/, "the opening must define comparison without assuming realism");
console.log(`Tradeoffs audit passed: ${result.profiles.toLocaleString()} complete case profiles, eight exact comparison methods, settlement/ranking boundaries, scope seams, and full AI context verified.`);
