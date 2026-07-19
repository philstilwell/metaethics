"use strict";

const LAB_NAMES = {
  profile: "Moral Profile",
  meaning: "Meaning Lab",
  obligation: "Missing Ought",
  after: "After Moral Facts",
  decoder: "Disagreement Decoder",
  genealogy: "Value Genealogy",
  builder: "Community-Code Simulator",
  criticize: "Social Criticism Lab",
  blame: "Blame Laboratory",
  reasons: "Reasons Lab",
  evidence: "Evidence Lab",
  standing: "Standing Lab",
  tradeoffs: "Value Conflict Lab",
  emotions: "Moral Emotions Lab",
};

const LAB_SUPPORT = {
  "field-guide": Object.keys(LAB_NAMES),
  "parsimonious-world": Object.keys(LAB_NAMES),
  "conditions-coherence": ["profile", "obligation", "builder", "criticize"],
  "stevenson-emotive-meaning": ["meaning", "decoder"],
  "harman-relativism": ["meaning", "criticize"],
  "williams-truth-relativism": ["meaning", "criticize"],
  "pereboom-without-desert": ["blame", "emotions"],
  "pereboom-regret-protest": ["blame", "emotions"],
  "caruso-quarantine": ["blame"],
  "plunkett-sundell-disagreement": ["decoder"],
  "blackburn-antirealist": ["meaning", "after"],
  "street-darwinian": ["genealogy"],
  "street-constructivism": ["builder", "reasons"],
  "joyce-irrealism-genealogy": ["genealogy"],
  "garner-abolishing": ["after"],
  "joyce-fictionalism": ["after"],
  "joyce-what-next": ["after"],
  "joyce-error-to-fiction": ["after"],
  "jaquet-naar-conservation": ["after"],
  "kohler-ridge-expressivism": ["after"],
  "jaquet-sorting-solutions": ["after"],
  "eriksson-olson": ["after"],
};

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
    id: "harman-relativism",
    title: "Moral Relativism Defended",
    author: "Gilbert Harman",
    year: 1975,
    approach: "Moral relativism",
    url: "https://doi.org/10.2307/2184078",
    note: "A direct foundation for the Social Criticism Lab. Harman connects the sense of many moral judgments to implicit agreements, making the relevant agreement and social standpoint central to criticism rather than treating current majority approval as the only possible social standard.",
  },
  {
    id: "williams-truth-relativism",
    title: "The Truth in Relativism",
    author: "Bernard Williams",
    year: 1975,
    approach: "Moral relativism",
    url: "https://doi.org/10.1093/aristotelian/75.1.215",
    note: "Develops a qualified account of what is true in relativism, especially when comparing real historical outlooks. It helps prevent the Social Criticism Lab from collapsing every relativist position into the slogan that the current majority is always right.",
  },
  {
    id: "pereboom-without-desert",
    title: "Moral Responsibility without Basic Desert",
    author: "Derk Pereboom",
    year: 2014,
    approach: "Responsibility skepticism",
    url: "https://doi.org/10.1093/acprof:oso/9780199685516.003.0007",
    note: "A direct foundation for the Blame Laboratory. Pereboom argues that protection, reconciliation, requests for apology, and moral formation can survive even when blame and punishment are not justified by basic desert.",
  },
  {
    id: "pereboom-regret-protest",
    title: "Responsibility, Regret, and Protest",
    author: "Derk Pereboom",
    year: 2017,
    approach: "Responsibility skepticism",
    url: "https://doi.org/10.1093/oso/9780198805601.003.0007",
    note: "Develops blame as forward-looking moral protest aimed at protection, reform, and reconciliation rather than suffering for its own sake. It supports the lab’s separation of public condemnation from retribution.",
  },
  {
    id: "caruso-quarantine",
    title: "The Public Health-Quarantine Model",
    author: "Gregg D. Caruso",
    year: 2017,
    approach: "Responsibility skepticism",
    url: "https://doi.org/10.2139/ssrn.3068021",
    note: "Presents a non-retributive approach to criminal sanctions centered on prevention, humane incapacitation, rehabilitation, and social conditions. The model remains controversial and does not make proportionality, dignity, or due-process concerns disappear.",
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
  {
    id: "sep-reasons-roles",
    title: "Reasons for Action: Justification, Motivation, Explanation",
    author: "Stanford Encyclopedia of Philosophy",
    year: 2016,
    approach: "Reasons and normativity",
    labs: ["reasons"],
    url: "https://plato.stanford.edu/entries/reasons-just-vs-expl/",
    note: "The Reasons Lab’s first distinction comes from this entry: a fact may explain an action, move an agent who treats it as a reason, or genuinely count in favor of acting. These roles can overlap without being identical.",
  },
  {
    id: "sep-internal-external",
    title: "Reasons for Action: Internal vs. External",
    author: "Stanford Encyclopedia of Philosophy",
    year: 2022,
    approach: "Reasons and normativity",
    labs: ["reasons"],
    url: "https://plato.stanford.edu/entries/reasons-internal-external/",
    note: "Maps a family of disputes over whether a practical reason must connect to an agent’s motivations or could apply independently of them. The entry warns that ‘internal’ and ‘external’ name several different claims.",
  },
  {
    id: "williams-internal-external",
    title: "Internal and External Reasons",
    author: "Bernard Williams",
    year: 1981,
    approach: "Reasons internalism",
    labs: ["reasons"],
    url: "https://doi.org/10.1017/CBO9781139165860.009",
    note: "A classic argument that an agent’s reasons must be reachable through sound deliberation from the agent’s existing motivational set. It supplies one major background to the lab’s better-informed-aims route.",
  },
  {
    id: "street-constructivism-reasons",
    title: "Constructivism about Reasons",
    author: "Sharon Street",
    year: 2008,
    approach: "Constructivism",
    labs: ["reasons", "builder"],
    url: "https://doi.org/10.1093/oso/9780199542062.003.0009",
    note: "Develops a constructivist account on which truths about reasons are understood from within a practical point of view rather than as independent normative facts waiting to be discovered.",
  },
  {
    id: "schroeder-slaves-passions",
    title: "Slaves of the Passions",
    author: "Mark Schroeder",
    year: 2007,
    approach: "Reasons internalism",
    labs: ["reasons"],
    url: "https://doi.org/10.1093/acprof:oso/9780199299508.001.0001",
    note: "A systematic defense of a desire-based theory of reasons. It is useful for testing the lab’s current-aim route against hard cases involving weak, distorted, cruel, or absent desires.",
  },
  {
    id: "joyce-myth-morality",
    title: "The Myth of Morality",
    author: "Richard Joyce",
    year: 2001,
    approach: "Error theory",
    labs: ["obligation", "after", "reasons"],
    url: "https://www.richard-joyce.com/the-myth-of-morality",
    note: "Connects moral error theory to questions about practical authority, instrumental reasons, and whether morality claims an inescapable force that ordinary human aims cannot supply by themselves.",
  },
  {
    id: "callahan-epistemic-normative",
    title: "Why Are Epistemic Reasons Normative?",
    author: "Laura Frances Callahan",
    year: 2023,
    approach: "Epistemic normativity",
    labs: ["evidence"],
    url: "https://doi.org/10.1017/epi.2023.13",
    note: "Examines why evidence and other epistemic reasons have normative force rather than merely indicating truth. It directly supports the Evidence Lab’s central demand for an account of why a truth-directed standard gives a person a reason.",
  },
  {
    id: "kiesewetter-epistemic-reasons",
    title: "Are Epistemic Reasons Normative?",
    author: "Benjamin Kiesewetter",
    year: 2022,
    approach: "Epistemic normativity",
    labs: ["evidence"],
    url: "https://doi.org/10.1111/nous.12379",
    note: "Develops the challenge that apparent reasons for belief may be explained without irreducible epistemic normativity. It helps the lab present anti-normativism as a serious account rather than as confusion about what evidence predicts.",
  },
  {
    id: "joyce-companions-guilt",
    title: "Moral Anti-Realism and the Companions-in-Guilt Strategy",
    author: "Richard Joyce",
    year: 2009,
    approach: "Epistemic normativity",
    labs: ["evidence", "reasons"],
    url: "https://philpapers.org/archive/JOYMAE.pdf",
    note: "Addresses attempts to defend moral normativity by linking it to other apparently normative domains, especially epistemic reasons. It supports the lab’s warning that moral and epistemic normativity should not be assumed to stand or fall together.",
  },
  {
    id: "sep-grounds-moral-status",
    title: "The Grounds of Moral Status",
    author: "Stanford Encyclopedia of Philosophy",
    year: 2021,
    approach: "Moral status",
    labs: ["standing"],
    url: "https://plato.stanford.edu/entries/grounds-moral-status/",
    note: "Surveys capacity-based, relational, and other accounts of what can make an entity a direct object of moral concern. It anchors the Standing Lab’s separation of having status from receiving equal weight or winning a conflict.",
  },
  {
    id: "sep-weighing-reasons",
    title: "Weighing Reasons",
    author: "Stanford Encyclopedia of Philosophy",
    year: 2016,
    approach: "Value pluralism",
    labs: ["tradeoffs", "reasons"],
    url: "https://plato.stanford.edu/entries/weighing-reasons/",
    note: "Maps competing accounts of how reasons combine, outweigh one another, and support an all-things-considered conclusion. It grounds the Value Conflict Lab’s distinction between identifying reasons and specifying a comparison rule.",
  },
  {
    id: "sep-incommensurable-values",
    title: "Incommensurable Values",
    author: "Stanford Encyclopedia of Philosophy",
    year: 2016,
    approach: "Value pluralism",
    labs: ["tradeoffs"],
    url: "https://plato.stanford.edu/entries/value-incommensurable/",
    note: "Explains several meanings of incomparability and incommensurability, along with their implications for practical choice. It supports the lab’s refusal to treat the absence of one common scale as the end of reasoned decision-making.",
  },
  {
    id: "sep-blame",
    title: "Blame: Philosophical Accounts",
    author: "Stanford Encyclopedia of Philosophy",
    year: 2024,
    approach: "Moral emotions",
    labs: ["blame", "emotions"],
    url: "https://plato.stanford.edu/entries/blame/",
    note: "Surveys cognitive, emotional, communicative, and functional accounts of blame. It supports the Moral Emotions Lab’s separation of an emotion’s appraisal, expression, relationship, protest, and forward-looking effects.",
  },
  {
    id: "sep-moral-responsibility",
    title: "Moral Responsibility",
    author: "Stanford Encyclopedia of Philosophy",
    year: 2024,
    approach: "Responsibility skepticism",
    labs: ["blame", "emotions"],
    url: "https://plato.stanford.edu/entries/moral-responsibility/",
    note: "Introduces debates over control, accountability, reactive attitudes, and desert. It helps both labs keep causal responsibility, capacity to respond, relational accountability, and intrinsic deserved suffering conceptually distinct.",
  },
];

const state = {
  query: "",
  filter: "All",
  labFilter: "All",
};

const els = {
  grid: document.querySelector("#paperGrid"),
  search: document.querySelector("#paperSearch"),
  labFilter: document.querySelector("#paperLabFilter"),
  filterRow: document.querySelector("#filterRow"),
  count: document.querySelector("#libraryCount"),
};

function allPapers() {
  return CURATED_PAPERS.map((paper) => ({ ...paper, labs: paper.labs || LAB_SUPPORT[paper.id] || [] }));
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
    const matchesLab = state.labFilter === "All" || paper.labs.includes(state.labFilter);
    const labNames = paper.labs.map((lab) => LAB_NAMES[lab] || lab).join(" ");
    const haystack = `${paper.title} ${paper.author} ${paper.approach} ${paper.note} ${labNames}`.toLowerCase();
    return matchesFilter && matchesLab && (!query || haystack.includes(query));
  });
}

function createPaperCard(paper) {
  const article = document.createElement("article");
  article.className = `paper-card${paper.core ? " core" : ""}`;

  const top = document.createElement("div");
  top.className = "paper-card-top";
  const type = document.createElement("span");
  type.className = "paper-type";
  type.textContent = paper.approach;
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

  const labUse = document.createElement("div");
  labUse.className = "paper-lab-use";
  const labLabel = document.createElement("strong");
  labLabel.textContent = "Used by";
  labUse.append(labLabel);
  if (paper.labs.length) {
    paper.labs.forEach((lab) => {
      const badge = document.createElement("span");
      badge.textContent = LAB_NAMES[lab] || lab;
      labUse.append(badge);
    });
  } else {
    const badge = document.createElement("span");
    badge.textContent = "General reading";
    labUse.append(badge);
  }

  const actions = document.createElement("div");
  actions.className = "paper-actions";
  const link = document.createElement("a");
  link.className = "paper-link";
  link.href = paper.url;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = "Open paper ↗";
  actions.append(link);

  article.append(top, title, author, note, labUse, actions);
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

els.labFilter.addEventListener("change", () => {
  state.labFilter = els.labFilter.value;
  renderPapers();
});

renderFilters();
renderPapers();
