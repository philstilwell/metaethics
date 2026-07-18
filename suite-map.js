"use strict";

(() => {
  const STORAGE_KEY = "moral-compass-suite-map-v1";

  const LABS = {
    profile: {
      title: "Moral Profile",
      href: "profile.html",
      resultSelector: "#resultsView",
      headlineSelector: "#profileResultTitle",
      summarySelector: "#resultsSummary",
      metrics: [
        ["Leading reason", "#primaryTendency"],
        ["Profile shape", "#profileShape"],
        ["Metaethical stance", "#metaStance"],
      ],
    },
    meaning: {
      title: "What Do You Mean by Wrong?",
      href: "wrong.html",
      resultSelector: "#meaningResults",
      headlineSelector: "#meaningResultTitle",
      summarySelector: "#meaningResultSummary",
      metrics: [
        ["Closest interpretation", "#meaningPrimary"],
        ["Pattern", "#meaningPattern"],
        ["Opening → final", "#meaningOpeningFinal"],
      ],
    },
    obligation: {
      title: "The Missing Ought",
      href: "obligation.html",
      resultSelector: "#obligationResults",
      headlineSelector: "#obligationResultTitle",
      summarySelector: "#obligationResultSummary",
      metrics: [
        ["Final answer category", "#supportedCeiling"],
        ["Assessment", "#universalStatus"],
        ["Direct gaps", "#directGapCount"],
      ],
    },
    after: {
      title: "After Moral Facts",
      href: "after.html",
      resultSelector: "#afterResults",
      headlineSelector: "#afterResultTitle",
      summarySelector: "#afterResultSummary",
      metrics: [
        ["Most-used strategy", "#afterPrimary"],
        ["Practice pattern", "#afterPattern"],
        ["Opening → final", "#afterOpeningFinal"],
      ],
    },
    decoder: {
      title: "The Disagreement Decoder",
      href: "decoder.html",
      resultSelector: "#decoderResults",
      headlineSelector: "#decoderResultTitle",
      summarySelector: "#decoderResultSummary",
      metrics: [
        ["Overall separation", "#decoderScore"],
        ["Eight layers", "#decoderLayerScore"],
        ["Restraint and integration", "#decoderFrameScore"],
      ],
    },
    genealogy: {
      title: "The Value Genealogy Lab",
      href: "genealogy.html",
      resultSelector: "#genealogyResults",
      headlineSelector: "#genealogyResultTitle",
      summarySelector: "#genealogyResultSummary",
      metrics: [
        ["Inference classifications", "#genealogyScore"],
        ["Unsupported refutations", "#genealogyOverreach"],
        ["Influence map", "#genealogyInfluenceSummary"],
      ],
    },
    builder: {
      title: "Build a Morality Without Moral Facts",
      href: "build.html",
      resultSelector: "#builderResults",
      headlineSelector: "#builderResultTitle",
      summarySelector: "#builderResultSummary",
      metrics: [
        ["Leading foundations", "#builderPrimaryBases"],
        ["Code–case fit", "#builderFitCount"],
        ["Design seams", "#builderSeamCount"],
      ],
    },
    criticize: {
      title: "Can You Criticize Your Own Society?",
      href: "criticize.html",
      resultSelector: "#criticizeResults",
      headlineSelector: "#criticizeResultTitle",
      summarySelector: "#criticizeResultSummary",
      metrics: [
        ["Most-used ground", "#criticizePrimaryBasis"],
        ["Beyond majority approval", "#criticizeBeyondResult"],
        ["Opening → final", "#criticizeStanceShift"],
      ],
    },
    blame: {
      title: "The Blame Laboratory",
      href: "blame.html",
      resultSelector: "#blameResults",
      headlineSelector: "#blameResultTitle",
      summarySelector: "#blameResultSummary",
      metrics: [
        ["Most-used response", "#blamePrimaryPurpose"],
        ["Purpose-based answers", "#blamePurposeResult"],
        ["Pure-desert control", "#blameZeroAnswer"],
      ],
    },
    reasons: {
      title: "What Gives You a Reason?",
      href: "reasons.html",
      resultSelector: "#reasonsResults",
      headlineSelector: "#reasonsResultTitle",
      summarySelector: "#reasonsResultSummary",
      metrics: [
        ["Most-used source", "#reasonsPrimarySource"],
        ["Reason–motivation link", "#reasonsMotivationResult"],
        ["Scope of skepticism", "#reasonsScopeResult"],
      ],
    },
    evidence: {
      title: "Why Follow the Evidence?",
      href: "evidence.html",
      resultSelector: "#caseResults",
      headlineSelector: "#caseResultTitle",
      summarySelector: "#caseResultSummary",
      metrics: [
        ["Most-used account", "#casePrimary"],
        ["Case pattern", "#casePattern"],
        ["Opening → final", "#caseOpeningFinal"],
      ],
    },
    standing: {
      title: "Who Gets Counted?",
      href: "standing.html",
      resultSelector: "#caseResults",
      headlineSelector: "#caseResultTitle",
      summarySelector: "#caseResultSummary",
      metrics: [
        ["Most-used ground", "#casePrimary"],
        ["Case pattern", "#casePattern"],
        ["Opening → final", "#caseOpeningFinal"],
      ],
    },
    tradeoffs: {
      title: "When Values Won’t Add Up",
      href: "tradeoffs.html",
      resultSelector: "#caseResults",
      headlineSelector: "#caseResultTitle",
      summarySelector: "#caseResultSummary",
      metrics: [
        ["Most-used method", "#casePrimary"],
        ["Case pattern", "#casePattern"],
        ["Opening → final", "#caseOpeningFinal"],
      ],
    },
    emotions: {
      title: "Moral Emotions After Moral Facts",
      href: "emotions.html",
      resultSelector: "#caseResults",
      headlineSelector: "#caseResultTitle",
      summarySelector: "#caseResultSummary",
      metrics: [
        ["Most-used account", "#casePrimary"],
        ["Case pattern", "#casePattern"],
        ["Opening → final", "#caseOpeningFinal"],
      ],
    },
  };

  function cleanText(value, limit = 1200) {
    return typeof value === "string" ? value.trim().slice(0, limit) : "";
  }

  function sanitizeMap(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    const clean = {};
    Object.keys(LABS).forEach((labId) => {
      const record = value[labId];
      if (!record || typeof record !== "object" || Array.isArray(record) || !Array.isArray(record.metrics)) return;
      clean[labId] = {
        labId,
        title: LABS[labId].title,
        href: LABS[labId].href,
        headline: cleanText(record.headline),
        summary: cleanText(record.summary, 2400),
        metrics: LABS[labId].metrics.map(([label], index) => ({
          label,
          value: cleanText(record.metrics[index]?.value),
        })),
        savedAt: cleanText(record.savedAt, 40),
      };
    });
    return clean;
  }

  function readMap() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return sanitizeMap(parsed);
    } catch {
      return {};
    }
  }

  function writeMap(map) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
      return true;
    } catch {
      return false;
    }
  }

  function textFrom(selector) {
    return document.querySelector(selector)?.textContent.trim().replace(/\s+/g, " ") || "";
  }

  function collectResult(labId) {
    const lab = LABS[labId];
    if (!lab) return null;
    return {
      labId,
      title: lab.title,
      href: lab.href,
      headline: textFrom(lab.headlineSelector),
      summary: textFrom(lab.summarySelector),
      metrics: lab.metrics.map(([label, selector]) => ({ label, value: textFrom(selector) })),
      savedAt: new Date().toISOString(),
    };
  }

  function saveResult(labId) {
    const result = collectResult(labId);
    if (!result) return false;
    const map = readMap();
    map[labId] = result;
    return writeMap(map);
  }

  function removeResult(labId) {
    const map = readMap();
    delete map[labId];
    return writeMap(map);
  }

  function clearMap() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch {
      return false;
    }
  }

  function resultIsVisible(result) {
    return result && !result.classList.contains("hidden") && !result.hidden;
  }

  function attachSavePanel() {
    const labId = document.body.dataset.labId;
    const lab = LABS[labId];
    if (!lab) return;
    const result = document.querySelector(lab.resultSelector);
    if (!result || result.querySelector(".suite-save-panel")) return;

    const panel = document.createElement("section");
    panel.className = "report-section suite-save-panel";
    panel.setAttribute("aria-labelledby", "suiteSaveHeading");
    panel.innerHTML = `
      <div class="section-heading suite-save-heading">
        <div>
          <p class="kicker">Optional suite map</p>
          <h2 id="suiteSaveHeading">Keep this summary with your other lab results.</h2>
        </div>
        <p>Nothing is saved unless you choose. Only the result headline and three summary fields are kept in this browser—not your full answers or AI prompt.</p>
      </div>
      <div class="suite-save-actions">
        <button class="primary-button" type="button" data-suite-save>Save to My Metaethical Map</button>
        <a class="secondary-button" href="map.html">View my map</a>
        <button class="text-button" type="button" data-suite-remove>Remove saved result</button>
      </div>
      <p class="suite-save-status" role="status" aria-live="polite"></p>`;

    const resultActions = result.querySelector(".result-actions");
    if (resultActions) result.insertBefore(panel, resultActions);
    else result.append(panel);

    const saveButton = panel.querySelector("[data-suite-save]");
    const removeButton = panel.querySelector("[data-suite-remove]");
    const status = panel.querySelector(".suite-save-status");

    function refresh() {
      const saved = Boolean(readMap()[labId]);
      saveButton.textContent = saved ? "Update saved result" : "Save to My Metaethical Map";
      removeButton.hidden = !saved;
      status.textContent = saved ? "A summary of this lab is currently saved on this device." : "No result from this lab is currently saved.";
    }

    saveButton.addEventListener("click", () => {
      const saved = saveResult(labId);
      refresh();
      status.textContent = saved
        ? "Saved on this device. You can update it, view the map, export it, or erase it at any time."
        : "This browser blocked local saving. Nothing was stored.";
    });

    removeButton.addEventListener("click", () => {
      const removed = removeResult(labId);
      refresh();
      status.textContent = removed ? "The saved summary for this lab was removed." : "This browser blocked the change.";
    });

    const observer = new MutationObserver(() => {
      if (resultIsVisible(result)) refresh();
    });
    observer.observe(result, { attributes: true, attributeFilter: ["class", "hidden"] });
    if (resultIsVisible(result)) refresh();
  }

  window.MoralCompassSuiteMap = {
    STORAGE_KEY,
    LABS,
    readMap,
    writeMap,
    collectResult,
    saveResult,
    removeResult,
    clearMap,
    sanitizeMap,
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", attachSavePanel);
  else attachSavePanel();
})();
