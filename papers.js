"use strict";

const STORAGE_KEY = "coherence-engine-papers-v1";

const CURATED_PAPERS = [
  {
    id: "field-guide",
    title: 'How to Test a "Moral" System: A Field Guide to Metaethics, Value Disagreement, and the Architecture of Values',
    author: "Phil Stilwell",
    year: 2026,
    approach: "Project source",
    core: true,
    url: "https://www.academia.edu/169114427/_How_to_Test_a_Moral_System_A_Field_Guide_to_Metaethics_Value_Disagreement_and_the_Architecture_of_Values",
    note: "A source and methodological counterpoint for the tool. It develops thirteen tests for checking who counts, what matters, how rules are made, how facts enter, and how a system can correct itself.",
  },
  {
    id: "parsimonious-world",
    title: "The Parsimonious World of the Moral Non-Realist: Illegitimate Questions, Surviving Values, and Life Without a Moral Realm",
    author: "Phil Stilwell",
    year: 2026,
    approach: "Project source",
    core: true,
    url: "https://www.academia.edu/169490990/_The_Parsimonious_World_of_the_Moral_Non_Realist_Illegitimate_Questions_Surviving_Values_and_Life_Without_a_Moral_Realm",
    note: "The tool’s non-realist foundation. It separates moral facts from the real human world of pain, care, law, trust, fear, meaning, institutions, and repair.",
  },
  {
    id: "conditions-coherence",
    title: "The Conditions of Moral Coherence: A Non-Realist Framework for Evaluating Moral Systems",
    author: "Phil Stilwell",
    year: 2026,
    approach: "Coherence framework",
    url: "https://www.academia.edu/169048095/_The_Conditions_of_Moral_Coherence_A_Non_Realist_Framework_for_Evaluating_Moral_Systems",
    note: "A compact statement of the thirteen structural conditions. It treats moral systems as human-built value structures and defines coherence as paying the debts created by their claims.",
  },
  {
    id: "stevenson-emotive-meaning",
    title: "The Emotive Meaning of Ethical Terms",
    author: "C. L. Stevenson",
    year: 1937,
    approach: "Moral disagreement",
    url: "https://doi.org/10.1093/mind/XLVI.181.14",
    note: "A foundational non-cognitivist paper behind the Disagreement Decoder. Stevenson argues that ethical disputes can involve both conflicting beliefs about the world and opposed practical attitudes.",
  },
  {
    id: "plunkett-sundell-disagreement",
    title: "Disagreement and the Semantics of Normative and Evaluative Terms",
    author: "David Plunkett & Timothy Sundell",
    year: 2013,
    approach: "Moral disagreement",
    url: "https://openresearch-repository.anu.edu.au/items/8e67e7f3-9a77-4821-a803-b0611d1b03d1",
    note: "Shows why some disputes that sound like disagreements over facts also involve negotiation over which words and concepts should organize the discussion. This supports the Decoder’s separation of verbal clarification from later substantive work.",
  },
  {
    id: "blackburn-antirealist",
    title: "How to Be an Ethical Antirealist",
    author: "Simon Blackburn",
    year: 1988,
    approach: "Expressivism",
    url: "https://philpapers.org/rec/SIMHTB",
    note: "A classic expressivist route. It explores how moral thought can guide, criticize, and reason without treating moral claims as reports of special moral facts.",
  },
  {
    id: "street-darwinian",
    title: "A Darwinian Dilemma for Realist Theories of Value",
    author: "Sharon Street",
    year: 2006,
    approach: "Evolutionary challenge",
    url: "https://philpapers.org/rec/STRADD",
    note: "Asks how moral realism can explain the large role evolution played in shaping human values. Street argues that anti-realism can explain that history without claiming evolution tracked independent moral truths.",
  },
  {
    id: "street-constructivism",
    title: "What Is Constructivism in Ethics and Metaethics?",
    author: "Sharon Street",
    year: 2010,
    approach: "Constructivism",
    url: "https://doi.org/10.1111/j.1747-9991.2009.00280.x",
    note: "A direct foundation for the community-code simulator. Street separates major forms of constructivism and develops the Humean idea that normative conclusions depend on what survives scrutiny from within an agent’s practical point of view, rather than on independent moral facts.",
  },
  {
    id: "joyce-irrealism-genealogy",
    title: "Irrealism and the Genealogy of Morals",
    author: "Richard Joyce",
    year: 2014,
    approach: "Evolutionary challenge",
    url: "https://catalogimages.wiley.com/images/db/pdf/9781118837412.excerpt.pdf",
    note: "The direct foundation for the Value Genealogy Lab. Joyce separates several debunking strategies and argues that the strongest genealogical route is comparatively modest: it shifts an epistemic burden rather than automatically proving that moral error theory is true.",
  },
  {
    id: "garner-abolishing",
    title: "Abolishing Morality",
    author: "Richard Garner",
    year: 2007,
    approach: "Abolitionism",
    url: "https://philpapers.org/rec/GARAM-2",
    note: "Introduces a major dispute inside moral error theory: if ordinary moral claims are false, should people keep moral language, treat it as a useful tool, or leave it behind?",
  },
  {
    id: "joyce-fictionalism",
    title: "Moral Fictionalism: When Falsehoods Are Too Useful to Throw Out",
    author: "Richard Joyce",
    year: 2011,
    approach: "Fictionalism",
    url: "https://philpapers.org/rec/JOYMF",
    note: "A short introduction written for a general audience. It asks whether people can keep useful moral talk while no longer believing that it describes real moral properties.",
  },
  {
    id: "joyce-what-next",
    title: 'Moral Skepticism and the "What Next?" Question',
    author: "Richard Joyce",
    year: 2019,
    approach: "Error theory",
    url: "https://philpapers.org/rec/JOYMSA",
    note: "A clear map of moral error theory and the main choices that follow it: ending moral talk, preserving it as a fiction, or keeping parts of present practice.",
  },
  {
    id: "joyce-error-to-fiction",
    title: "Morality: From Error to Fiction",
    author: "Richard Joyce",
    year: 2024,
    approach: "Post-error practice",
    url: "https://www.richard-joyce.com/morality-from-error-to-fiction",
    note: "A book-length account of the practical question behind the After Moral Facts lab. It develops moral fictionalism as one response to error theory and places it beside abolitionist alternatives.",
  },
  {
    id: "jaquet-naar-conservation",
    title: "Moral Beliefs for the Error Theorist?",
    author: "François Jaquet & Hichem Naar",
    year: 2016,
    approach: "Conservationism",
    url: "https://doi.org/10.1007/s10677-015-9609-1",
    note: "Defines conservationism as continuing to hold moral beliefs despite accepting that they are false, then asks whether this is a stable alternative to fictionalism.",
  },
  {
    id: "kohler-ridge-expressivism",
    title: "Revolutionary Expressivism",
    author: "Sebastian Köhler & Michael Ridge",
    year: 2013,
    approach: "Post-error practice",
    url: "https://doi.org/10.1111/rati.12030",
    note: "Develops the revisionary proposal that people who accept moral error theory should replace ordinary moral judgments with expressivist practical attitudes.",
  },
  {
    id: "jaquet-sorting-solutions",
    title: "Sorting Out Solutions to the Now-What Problem",
    author: "François Jaquet",
    year: 2020,
    approach: "Post-error practice",
    url: "https://jesp.org/index.php/jesp/article/view/812",
    note: "Shows why post-error options do not all sit at the same conceptual level and argues that some proposed revisions may count as forms of abolition rather than independent alternatives.",
  },
  {
    id: "eriksson-olson",
    title: "Moral Practice after Error Theory: Negotiationism",
    author: "Björn Eriksson & Jonas Olson",
    year: 2019,
    approach: "Post-error practice",
    url: "https://philpapers.org/rec/ERIMPA",
    note: "Offers a practical answer to life after error theory. Instead of one perfect replacement, it argues for context-sensitive negotiation around the concerns people actually have.",
  },
];

const state = {
  query: "",
  filter: "All",
  userPapers: loadUserPapers(),
};

const els = {
  grid: document.querySelector("#paperGrid"),
  search: document.querySelector("#paperSearch"),
  filterRow: document.querySelector("#filterRow"),
  count: document.querySelector("#libraryCount"),
  form: document.querySelector("#paperForm"),
  status: document.querySelector("#formStatus"),
};

function loadUserPapers() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function saveUserPapers() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.userPapers));
    return true;
  } catch {
    return false;
  }
}

function allPapers() {
  return [...CURATED_PAPERS, ...state.userPapers.map((paper) => ({ ...paper, user: true }))];
}

function approaches() {
  return ["All", ...new Set(allPapers().map((paper) => paper.approach))];
}

function renderFilters() {
  els.filterRow.replaceChildren();
  approaches().forEach((approach) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-button${state.filter === approach ? " active" : ""}`;
    button.textContent = approach;
    button.setAttribute("aria-pressed", String(state.filter === approach));
    button.addEventListener("click", () => {
      state.filter = approach;
      renderFilters();
      renderPapers();
    });
    els.filterRow.append(button);
  });
}

function filteredPapers() {
  const query = state.query.trim().toLowerCase();
  return allPapers().filter((paper) => {
    const matchesFilter = state.filter === "All" || paper.approach === state.filter;
    const haystack = `${paper.title} ${paper.author} ${paper.approach} ${paper.note}`.toLowerCase();
    return matchesFilter && (!query || haystack.includes(query));
  });
}

function createPaperCard(paper) {
  const article = document.createElement("article");
  article.className = `paper-card${paper.core ? " core" : ""}${paper.user ? " user-paper" : ""}`;

  const top = document.createElement("div");
  top.className = "paper-card-top";
  const type = document.createElement("span");
  type.className = "paper-type";
  type.textContent = paper.user ? `${paper.approach} · Your shelf` : paper.approach;
  const year = document.createElement("span");
  year.className = "paper-year";
  year.textContent = paper.year;
  top.append(type, year);

  const title = document.createElement("h2");
  title.textContent = paper.title;
  const author = document.createElement("p");
  author.className = "paper-author";
  author.textContent = paper.author;
  const note = document.createElement("p");
  note.className = "paper-note";
  note.textContent = paper.note;

  const actions = document.createElement("div");
  actions.className = "paper-actions";
  const link = document.createElement("a");
  link.className = "paper-link";
  link.href = paper.url;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = "Open paper ↗";
  actions.append(link);

  if (paper.user) {
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-paper";
    remove.textContent = "Remove";
    remove.addEventListener("click", () => {
      state.userPapers = state.userPapers.filter((item) => item.id !== paper.id);
      saveUserPapers();
      if (!approaches().includes(state.filter)) state.filter = "All";
      renderFilters();
      renderPapers();
    });
    actions.append(remove);
  }

  article.append(top, title, author, note, actions);
  return article;
}

function renderPapers() {
  const papers = filteredPapers();
  els.grid.replaceChildren();
  papers.forEach((paper) => els.grid.append(createPaperCard(paper)));
  if (!papers.length) {
    const empty = document.createElement("p");
    empty.className = "empty-library";
    empty.textContent = "No papers match that search yet.";
    els.grid.append(empty);
  }
  els.count.textContent = `${papers.length} ${papers.length === 1 ? "paper" : "papers"} shown`;
}

els.search.addEventListener("input", () => {
  state.query = els.search.value;
  renderPapers();
});

els.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(els.form);
  const url = String(data.get("url")).trim();
  let parsed;
  try {
    parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Unsupported link");
  } catch {
    els.status.textContent = "Please enter a full http or https link.";
    return;
  }

  const paper = {
    id: `user-${Date.now()}`,
    title: String(data.get("title")).trim(),
    author: String(data.get("author")).trim(),
    year: Number(data.get("year")),
    url: parsed.href,
    approach: String(data.get("approach")),
    note: String(data.get("note")).trim(),
  };

  state.userPapers.unshift(paper);
  if (!saveUserPapers()) {
    state.userPapers.shift();
    els.status.textContent = "This browser blocked local saving.";
    return;
  }

  state.filter = "All";
  state.query = "";
  els.search.value = "";
  els.form.reset();
  els.status.textContent = "Paper added to this browser.";
  renderFilters();
  renderPapers();
});

renderFilters();
renderPapers();
