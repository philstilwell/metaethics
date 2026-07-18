"use strict";

const mapApi = window.MoralCompassSuiteMap;
const mapEls = {
  count: document.querySelector("#mapSavedCount"),
  grid: document.querySelector("#mapLabGrid"),
  connections: document.querySelector("#mapConnectionGrid"),
  copy: document.querySelector("#copyMapButton"),
  download: document.querySelector("#downloadMapButton"),
  erase: document.querySelector("#eraseMapButton"),
  status: document.querySelector("#mapControlStatus"),
};

function metric(record, label) {
  return record?.metrics?.find((item) => item.label === label)?.value || "";
}

function readableDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Saved on this device" : `Saved ${date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}`;
}

function createLabCard(labId, lab, record) {
  const article = document.createElement("article");
  article.className = `map-lab-card${record ? " saved" : " empty"}`;
  const heading = document.createElement("h3");
  heading.textContent = lab.title;
  const state = document.createElement("span");
  state.className = "map-card-state";
  state.textContent = record ? readableDate(record.savedAt) : "Not saved yet";
  article.append(state, heading);

  if (record) {
    const headline = document.createElement("p");
    headline.className = "map-card-headline";
    headline.textContent = record.headline;
    const metrics = document.createElement("dl");
    record.metrics.forEach((item) => {
      const row = document.createElement("div");
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = item.label;
      dd.textContent = item.value;
      row.append(dt, dd);
      metrics.append(row);
    });
    const actions = document.createElement("div");
    actions.className = "map-card-actions";
    const replace = document.createElement("a");
    replace.href = lab.href;
    replace.textContent = "Run again";
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Remove";
    remove.addEventListener("click", () => {
      mapApi.removeResult(labId);
      renderMap();
      mapEls.status.textContent = `${lab.title} was removed from this device.`;
    });
    actions.append(replace, remove);
    article.append(headline, metrics, actions);
  } else {
    const copy = document.createElement("p");
    copy.textContent = "Complete this lab, then choose “Save to My Metaethical Map” on its result page.";
    const link = document.createElement("a");
    link.href = lab.href;
    link.textContent = "Open this lab →";
    article.append(copy, link);
  }
  return article;
}

function connection(title, copy, labs) {
  return { title, copy, labs };
}

function buildConnections(map) {
  const items = [];
  const has = (...ids) => ids.every((id) => map[id]);

  if (has("profile", "meaning")) {
    const stance = metric(map.profile, "Metaethical stance");
    const interpretation = metric(map.meaning, "Closest interpretation");
    items.push(connection(
      "Reasoning pattern and meaning",
      `Your profile recorded “${stance},” while the Meaning Lab’s closest interpretation was “${interpretation}.” Ask whether those describe different questions or whether one should change the other.`,
      ["Moral Profile", "Meaning Lab"],
    ));
  }
  if (has("meaning", "after")) items.push(connection(
    "Meaning and post-error policy",
    `You treated moral claims most often as “${metric(map.meaning, "Closest interpretation")}.” Your practical policy leaned toward “${metric(map.after, "Most-used strategy")}.” Does that policy preserve the meaning you identified, revise it, or quietly replace it?`,
    ["Meaning Lab", "After Moral Facts"],
  ));
  if (has("obligation", "reasons")) items.push(connection(
    "Obligation and reasons",
    `The obligation lab ended with “${metric(map.obligation, "Final answer category")}.” The Reasons Lab most often used “${metric(map.reasons, "Most-used source")}.” Ask whether having a reason is weaker than being obligated, and exactly where the extra authority would enter.`,
    ["Missing Ought", "Reasons Lab"],
  ));
  if (has("obligation", "builder")) items.push(connection(
    "Authority and construction",
    `Your obligation result was “${metric(map.obligation, "Assessment")},” while your community code relied most on “${metric(map.builder, "Leading foundations")}.” Can those foundations support the code without claiming the wider authority the obligation lab examined?`,
    ["Missing Ought", "Community-Code Simulator"],
  ));
  if (has("reasons", "builder")) items.push(connection(
    "Practical reasons and public rules",
    `The Reasons Lab most often used “${metric(map.reasons, "Most-used source")}.” Your community code relied most on “${metric(map.builder, "Leading foundations")}.” Ask whether that source gives each resident a reason, merely supports a public justification, or does different work for different people.`,
    ["Reasons Lab", "Community-Code Simulator"],
  ));
  if (has("reasons", "evidence")) items.push(connection(
    "Practical and epistemic reasons",
    `Your action cases most often used “${metric(map.reasons, "Most-used source")}.” Your belief cases most often used “${metric(map.evidence, "Most-used account")}.” Ask whether these are two forms of the same favoring relation or whether evidence receives a different source and scope.`,
    ["Reasons Lab", "Evidence Lab"],
  ));
  if (has("builder", "criticize")) items.push(connection(
    "Building and criticizing rules",
    `Your code leaned on “${metric(map.builder, "Leading foundations")}.” Your social criticism most often used “${metric(map.criticize, "Most-used ground")}.” Would that ground also permit criticism of the code you built?`,
    ["Community-Code Simulator", "Social Criticism Lab"],
  ));
  if (has("standing", "builder")) items.push(connection(
    "Standing and code membership",
    `The Standing Lab most often used “${metric(map.standing, "Most-used ground")}.” Your community code relied most on “${metric(map.builder, "Leading foundations")}.” Ask whether everyone with direct standing is represented by the code, and whether membership creates standing or only institutional protection.`,
    ["Standing Lab", "Community-Code Simulator"],
  ));
  if (has("standing", "tradeoffs")) items.push(connection(
    "Inclusion and comparison",
    `Your standing boundary most often used “${metric(map.standing, "Most-used ground")}.” Your value conflicts most often used “${metric(map.tradeoffs, "Most-used method")}.” Ask how an included claim enters that comparison and whether any method quietly excludes parties the standing lab counted.`,
    ["Standing Lab", "Value Conflict Lab"],
  ));
  if (has("profile", "tradeoffs")) items.push(connection(
    "Choice signals and comparison rules",
    `Your Moral Profile’s leading reason was “${metric(map.profile, "Leading reason")}.” The Value Conflict Lab most often used “${metric(map.tradeoffs, "Most-used method")}.” Ask whether the comparison rule explains that signal across cases or changes when another value becomes salient.`,
    ["Moral Profile", "Value Conflict Lab"],
  ));
  if (has("after", "blame")) items.push(connection(
    "Blame language and blame’s purpose",
    `Your post-error practice leaned toward “${metric(map.after, "Most-used strategy")}.” In the Blame Laboratory, your most-used response was “${metric(map.blame, "Most-used response")},” and the zero-purpose control was “${metric(map.blame, "Pure-desert control")}.” Ask what your blame words communicate about purpose and desert.`,
    ["After Moral Facts", "Blame Laboratory"],
  ));
  if (has("blame", "emotions")) items.push(connection(
    "Blame responses and emotional roles",
    `Your blame cases most often used “${metric(map.blame, "Most-used response")}.” Your emotion cases most often used “${metric(map.emotions, "Most-used account")}.” Ask whether the emotion serves that same human purpose, communicates a different one, or preserves desert after the policy has rejected it.`,
    ["Blame Laboratory", "Moral Emotions Lab"],
  ));
  if (has("after", "emotions")) items.push(connection(
    "Post-error language and emotion",
    `Your post-error language policy leaned toward “${metric(map.after, "Most-used strategy")}.” Your moral-emotion cases most often used “${metric(map.emotions, "Most-used account")}.” Ask whether the emotion’s expression matches the meaning and honesty rules of that language policy.`,
    ["After Moral Facts", "Moral Emotions Lab"],
  ));
  if (has("genealogy", "reasons")) items.push(connection(
    "Origins and reasons",
    `Your genealogy result reported “${metric(map.genealogy, "Unsupported refutations")}” unsupported refutations. Your Reasons Lab leaned on “${metric(map.reasons, "Most-used source")}.” Does learning where that source came from merely explain it, or change whether it counts in favor?`,
    ["Value Genealogy", "Reasons Lab"],
  ));
  if (has("decoder", "criticize")) items.push(connection(
    "Disagreement and reform",
    `Your decoder result for the eight layers was “${metric(map.decoder, "Eight layers")}.” Your most-used ground for criticism was “${metric(map.criticize, "Most-used ground")}.” Which parts of a disagreement over reform could evidence settle, and which still depend on that ground?`,
    ["Disagreement Decoder", "Social Criticism Lab"],
  ));

  if (!items.length) items.push(connection(
    "Save two related labs to begin",
    "Good starting pairs are Meaning → After Moral Facts, Reasons → Evidence, Standing → Value Conflict, Build → Criticize, and Blame → Moral Emotions.",
    ["Suggested route"],
  ));
  return items;
}

function renderConnections(map) {
  mapEls.connections.replaceChildren();
  buildConnections(map).forEach((item) => {
    const article = document.createElement("article");
    const tags = document.createElement("p");
    tags.className = "map-connection-tags";
    tags.textContent = item.labs.join(" × ");
    const heading = document.createElement("h3");
    heading.textContent = item.title;
    const copy = document.createElement("p");
    copy.textContent = item.copy;
    article.append(tags, heading, copy);
    mapEls.connections.append(article);
  });
}

function readableSummary(map) {
  const saved = Object.values(map);
  const lines = [
    "MY METAETHICAL MAP",
    "Generated locally by The Moral Compass. These are saved summaries, not a coherence score.",
    "",
  ];
  saved.forEach((record) => {
    lines.push(record.title.toUpperCase(), record.headline, record.summary);
    record.metrics.forEach((item) => lines.push(`${item.label}: ${item.value}`));
    lines.push("");
  });
  lines.push("CROSS-LAB QUESTIONS");
  buildConnections(map).forEach((item, index) => lines.push(`${index + 1}. ${item.title}: ${item.copy}`));
  return lines.join("\n");
}

function renderMap() {
  const map = mapApi.readMap();
  const count = Object.keys(map).length;
  mapEls.count.textContent = `${count} of ${Object.keys(mapApi.LABS).length} labs saved`;
  mapEls.grid.replaceChildren();
  Object.entries(mapApi.LABS).forEach(([labId, lab]) => mapEls.grid.append(createLabCard(labId, lab, map[labId])));
  renderConnections(map);
  mapEls.copy.disabled = count === 0;
  mapEls.download.disabled = count === 0;
  mapEls.erase.disabled = count === 0;
}

mapEls.copy.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(readableSummary(mapApi.readMap()));
    mapEls.status.textContent = "Readable summary copied.";
  } catch {
    mapEls.status.textContent = "Copying was blocked. Download the map data instead.";
  }
});

mapEls.download.addEventListener("click", () => {
  const payload = {
    exportedAt: new Date().toISOString(),
    note: "Saved summaries from The Moral Compass. This file is not a coherence score.",
    labs: mapApi.readMap(),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "my-metaethical-map.json";
  link.click();
  URL.revokeObjectURL(url);
  mapEls.status.textContent = "Map data downloaded.";
});

mapEls.erase.addEventListener("click", () => {
  const confirmed = window.confirm("Erase every saved lab summary from this browser? Your answers inside any currently open lab will not be changed.");
  if (!confirmed) return;
  mapApi.clearMap();
  renderMap();
  mapEls.status.textContent = "All saved lab summaries were erased from this device.";
});

renderMap();
