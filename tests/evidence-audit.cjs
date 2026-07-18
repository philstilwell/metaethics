"use strict";
const assert = require("node:assert/strict");
const { auditCaseLab } = require("./case-lab-audit-helper.cjs");
const result = auditCaseLab({ configFile: "evidence-config.js", htmlFile: "evidence.html", expectedId: "evidence", expectedFamilies: 7 });
const { api, config, reset } = result;

const allTruth = Object.fromEntries(config.cases.map((question) => [question.id, "truth"]));
reset({ opening: "truth", final: "none", ...allTruth });
assert.ok(api.caseLabSeams().some((seam) => seam.id === "skeptic-cases"), "final anti-normativism must be compared with case-level favoring answers");
reset({ opening: "useful", final: "useful", ...Object.fromEntries(config.cases.map((question) => [question.id, "useful"])), trivial: "truth" });
assert.ok(api.caseLabSeams().some((seam) => seam.id === "useless-truth"), "a useless truth must be compared with a usefulness-only final account");
reset({ opening: "desire", final: "desire", ...Object.fromEntries(config.cases.map((question) => [question.id, "desire"])), indifferent: "truth" });
assert.ok(api.caseLabSeams().some((seam) => seam.id === "unmoved-agent"), "the indifferent agent must be compared with a desire-only final account");
reset({ opening: "none", final: "none", ...Object.fromEntries(config.cases.map((question) => [question.id, "none"])) });
assert.equal(api.caseLabSeams().length, 0, "a uniform anti-normativist path must not receive an invented seam");
assert.match(result.html, /Moral skepticism and skepticism about evidence are different claims/, "the lab must state its central non-entailment");
assert.match(config.opening.context, /cause of belief or a clue/, "the opening must distinguish evidence from a cause");
console.log(`Evidence audit passed: ${result.profiles.toLocaleString()} complete case profiles, seven exact accounts, truth/use/aim distinctions, scope seams, and full AI context verified.`);
