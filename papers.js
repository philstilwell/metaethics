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
  "moral-intuitions-realm": ["meaning", "obligation", "after", "genealogy", "evidence", "emotions"],
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
    id: "moral-intuitions-realm",
    title: "Moral Intuitions without a Moral Realm: Development, Reification, and the Affective Genealogy of Value",
    author: "Phil Stilwell",
    year: 2026,
    approach: "Project source",
    core: true,
    url: "https://philstilwell.github.io/metaethics/output/pdf/moral-intuitions-without-a-moral-realm.pdf",
    note: "The project’s account of why a learned moral judgment can feel immediate, external, and authoritative. It argues that a well-supported genealogy can undercut an intuition’s automatic use as evidence for a non-natural moral realm without proving every moral claim false or refuting naturalist realism by itself.",
  },
  {
    id: "conditions-coherence",
    title: "The Conditions of Moral Coherence: A Non-Realist Framework for Evaluating Moral Systems",
    author: "Phil Stilwell",
    year: 2026,
    approach: "How moral systems fit together",
    url: "https://www.academia.edu/169048095/_The_Conditions_of_Moral_Coherence_A_Non_Realist_Framework_for_Evaluating_Moral_Systems",
    note: "A compact statement of thirteen conditions for a system whose claims fit together. It treats moral systems as human-built structures and asks whether each claim is supported by the definitions, evidence, priorities, and decision rules it needs.",
  },
  {
    id: "stevenson-emotive-meaning",
    title: "The Emotive Meaning of Ethical Terms",
    author: "C. L. Stevenson",
    year: 1937,
    approach: "How moral language works",
    url: "https://doi.org/10.1093/mind/XLVI.181.14",
    note: "A foundational paper behind the Disagreement Decoder. Stevenson argues that moral disputes can combine two different clashes: people may believe different things about the world, and they may support incompatible actions or plans.",
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
    approach: "Doubts about deserved blame",
    url: "https://doi.org/10.1093/acprof:oso/9780199685516.003.0007",
    note: "A direct foundation for the Blame Laboratory. Pereboom argues that protection, reconciliation, requests for apology, and efforts to improve conduct can survive even if people do not deserve blame or pain merely because of what they did.",
  },
  {
    id: "pereboom-regret-protest",
    title: "Responsibility, Regret, and Protest",
    author: "Derk Pereboom",
    year: 2017,
    approach: "Doubts about deserved blame",
    url: "https://doi.org/10.1093/oso/9780198805601.003.0007",
    note: "Develops blame as protest meant to protect people, support reform, and repair relationships rather than make someone suffer as payback. It supports the lab’s distinction between public condemnation and deserved suffering.",
  },
  {
    id: "caruso-quarantine",
    title: "The Public Health-Quarantine Model",
    author: "Gregg D. Caruso",
    year: 2017,
    approach: "Doubts about deserved blame",
    url: "https://doi.org/10.2139/ssrn.3068021",
    note: "Presents an approach to criminal sanctions that rejects suffering as payback and instead focuses on prevention, humane limits on dangerous people, rehabilitation, and the social causes of harm. The model remains controversial and still needs limits, humane treatment, fair procedures, and review.",
  },
  {
    id: "plunkett-sundell-disagreement",
    title: "Disagreement and the Semantics of Normative and Evaluative Terms",
    author: "David Plunkett & Timothy Sundell",
    year: 2013,
    approach: "How moral disagreement works",
    url: "https://openresearch-repository.anu.edu.au/items/8e67e7f3-9a77-4821-a803-b0611d1b03d1",
    note: "Shows why some disputes that sound like disagreements about facts also involve a struggle over which words and definitions should organize the discussion. This supports the Decoder’s instruction to clear up wording first and then ask what deeper disagreement remains.",
  },
  {
    id: "blackburn-antirealist",
    title: "How to Be an Ethical Antirealist",
    author: "Simon Blackburn",
    year: 1988,
    approach: "Moral claims as commitments",
    url: "https://philpapers.org/rec/SIMHTB",
    note: "A classic expressivist route: moral claims mainly express commitments, accepted rules, and plans. Blackburn explores how people can still reason, criticize, and guide action without treating those claims as reports of special moral properties.",
  },
  {
    id: "street-darwinian",
    title: "A Darwinian Dilemma for Realist Theories of Value",
    author: "Sharon Street",
    year: 2006,
    approach: "Evolution and moral belief",
    url: "https://philpapers.org/rec/STRADD",
    note: "Asks how belief in objective moral facts can explain the large role evolution played in shaping human values. Street argues that a view without independent moral truths can explain that history more easily because it need not claim that evolution guided us toward those truths.",
  },
  {
    id: "street-constructivism",
    title: "What Is Constructivism in Ethics and Metaethics?",
    author: "Sharon Street",
    year: 2010,
    approach: "Constructivism",
    url: "https://doi.org/10.1111/j.1747-9991.2009.00280.x",
    note: "A direct foundation for the community-code simulator. Street separates major forms of constructivism: views on which answers are built through a procedure of reasoning rather than discovered as independent moral facts. Her version begins from a person’s existing values and asks what survives informed and consistent reflection.",
  },
  {
    id: "joyce-irrealism-genealogy",
    title: "Irrealism and the Genealogy of Morals",
    author: "Richard Joyce",
    year: 2014,
    approach: "Evolution and moral belief",
    url: "https://catalogimages.wiley.com/images/db/pdf/9781118837412.excerpt.pdf",
    note: "The direct foundation for the Value Genealogy Lab. Joyce separates several ways a belief’s history can lower confidence. His strongest conclusion is limited: if the process would have produced the belief whether it was true or false, the belief needs independent support. That history does not automatically prove all moral claims false.",
  },
  {
    id: "garner-abolishing",
    title: "Abolishing Morality",
    author: "Richard Garner",
    year: 2007,
    approach: "Abolitionism",
    url: "https://philpapers.org/rec/GARAM-2",
    note: "Introduces a major dispute among people who think ordinary moral claims try and fail to state objective facts: should people keep the language, knowingly treat it as a useful fiction, revise its meaning, or stop using it?",
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
    approach: "Moral claims as failed fact claims",
    url: "https://philpapers.org/rec/JOYMSA",
    note: "A clear map of moral error theory—the view that ordinary moral claims try but fail to state objective facts—and the main choices that follow: stop the talk, preserve it as a fiction, or keep parts of present practice.",
  },
  {
    id: "joyce-error-to-fiction",
    title: "Morality: From Error to Fiction",
    author: "Richard Joyce",
    year: 2024,
    approach: "Life after moral error theory",
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
    approach: "Life after moral error theory",
    url: "https://doi.org/10.1111/rati.12030",
    note: "Proposes that people who accept moral error theory should change what moral language does: instead of trying to state moral facts, it should openly express commitments, accepted rules, and plans.",
  },
  {
    id: "jaquet-sorting-solutions",
    title: "Sorting Out Solutions to the Now-What Problem",
    author: "François Jaquet",
    year: 2020,
    approach: "Life after moral error theory",
    url: "https://jesp.org/index.php/jesp/article/view/812",
    note: "Shows that the options after moral error theory answer different questions: what to believe, which words to use, and how to act. Some proposed revisions may therefore be ways of ending literal moral belief rather than completely separate alternatives.",
  },
  {
    id: "eriksson-olson",
    title: "Moral Practice after Error Theory: Negotiationism",
    author: "Björn Eriksson & Jonas Olson",
    year: 2019,
    approach: "Life after moral error theory",
    url: "https://philpapers.org/rec/ERIMPA",
    note: "Offers a practical answer after moral error theory. Instead of looking for one perfect replacement for every setting, it recommends negotiation that responds to the concerns people actually have in each context.",
  },
  {
    id: "sep-reasons-roles",
    title: "Reasons for Action: Justification, Motivation, Explanation",
    author: "Stanford Encyclopedia of Philosophy",
    year: 2016,
    approach: "What gives a reason",
    labs: ["reasons"],
    url: "https://plato.stanford.edu/entries/reasons-just-vs-expl/",
    note: "The Reasons Lab’s first distinction comes from this entry. A fact may explain why an action happened, be the thought that moved a person, or genuinely support doing the action. These jobs can overlap, but they are not identical.",
  },
  {
    id: "sep-internal-external",
    title: "Reasons for Action: Internal vs. External",
    author: "Stanford Encyclopedia of Philosophy",
    year: 2022,
    approach: "What gives a reason",
    labs: ["reasons"],
    url: "https://plato.stanford.edu/entries/reasons-internal-external/",
    note: "Maps disputes about whether a reason to act must connect with something a person already wants or values, or can apply even when the person does not care. It also warns that philosophers use ‘internal’ and ‘external’ for several different versions of that question.",
  },
  {
    id: "williams-internal-external",
    title: "Internal and External Reasons",
    author: "Bernard Williams",
    year: 1981,
    approach: "Reasons tied to a person’s aims",
    labs: ["reasons"],
    url: "https://doi.org/10.1017/CBO9781139165860.009",
    note: "A classic argument that a person has a reason only when accurate information and careful thought can connect it with something the person already wants or values. It supports the lab’s answer based on what a person would want after reflection.",
  },
  {
    id: "street-constructivism-reasons",
    title: "Constructivism about Reasons",
    author: "Sharon Street",
    year: 2008,
    approach: "Constructivism",
    labs: ["reasons", "builder"],
    url: "https://doi.org/10.1093/oso/9780199542062.003.0009",
    note: "Develops a constructivist view of reasons: what a person has reason to do is worked out from within a practical outlook through reflection, rather than discovered as a completely independent fact waiting outside every person’s values.",
  },
  {
    id: "schroeder-slaves-passions",
    title: "Slaves of the Passions",
    author: "Mark Schroeder",
    year: 2007,
    approach: "Reasons tied to a person’s aims",
    labs: ["reasons"],
    url: "https://doi.org/10.1093/acprof:oso/9780199299508.001.0001",
    note: "A systematic defense of the view that a person’s desires give them reasons. It helps test that view against cases involving weak, manipulated, cruel, or entirely absent desires.",
  },
  {
    id: "joyce-myth-morality",
    title: "The Myth of Morality",
    author: "Richard Joyce",
    year: 2001,
    approach: "Moral claims as failed fact claims",
    labs: ["obligation", "after", "reasons"],
    url: "https://www.richard-joyce.com/the-myth-of-morality",
    note: "Connects moral error theory with questions about authority and reasons for action. It asks whether morality claims to bind people in a way that their ordinary aims, desires, and effective means cannot supply by themselves.",
  },
  {
    id: "callahan-epistemic-normative",
    title: "Why Are Epistemic Reasons Normative?",
    author: "Laura Frances Callahan",
    year: 2023,
    approach: "What gives a reason to believe",
    labs: ["evidence"],
    url: "https://doi.org/10.1017/epi.2023.13",
    note: "Asks why evidence does more than predict which belief is likely to be true. What, if anything, makes evidence give a person a reason to believe one claim rather than another? This is the Evidence Lab’s central question.",
  },
  {
    id: "kiesewetter-epistemic-reasons",
    title: "Are Epistemic Reasons Normative?",
    author: "Benjamin Kiesewetter",
    year: 2022,
    approach: "What gives a reason to believe",
    labs: ["evidence"],
    url: "https://doi.org/10.1111/nous.12379",
    note: "Develops the challenge that we may explain good belief-forming methods without adding a further fact that anyone should use them. It helps the Evidence Lab present that skeptical answer as a serious view rather than as confusion about what evidence predicts.",
  },
  {
    id: "joyce-companions-guilt",
    title: "Moral Anti-Realism and the Companions-in-Guilt Strategy",
    author: "Richard Joyce",
    year: 2009,
    approach: "What gives a reason to believe",
    labs: ["evidence", "reasons"],
    url: "https://philpapers.org/archive/JOYMAE.pdf",
    note: "Examines an argument that links moral reasons with reasons to follow evidence: if one kind is real, perhaps the other is too. It supports the lab’s warning that rejecting objective moral facts does not automatically settle what evidence gives us reason to believe.",
  },
  {
    id: "sep-grounds-moral-status",
    title: "The Grounds of Moral Status",
    author: "Stanford Encyclopedia of Philosophy",
    year: 2021,
    approach: "Who or what counts",
    labs: ["standing"],
    url: "https://plato.stanford.edu/entries/grounds-moral-status/",
    note: "Surveys views about what can make a being matter for its own sake: conscious experience, the ability to choose, relationships, and other features. It anchors the Standing Lab’s distinction between being included at all and receiving equal weight or winning a conflict.",
  },
  {
    id: "sep-weighing-reasons",
    title: "Weighing Reasons",
    author: "Stanford Encyclopedia of Philosophy",
    year: 2016,
    approach: "Comparing different values",
    labs: ["tradeoffs", "reasons"],
    url: "https://plato.stanford.edu/entries/weighing-reasons/",
    note: "Maps different views about how reasons combine, defeat one another, or support a final choice. It grounds the Value Conflict Lab’s distinction between naming the reasons on each side and stating the rule used to compare them.",
  },
  {
    id: "sep-incommensurable-values",
    title: "Incommensurable Values",
    author: "Stanford Encyclopedia of Philosophy",
    year: 2016,
    approach: "Comparing different values",
    labs: ["tradeoffs"],
    url: "https://plato.stanford.edu/entries/value-incommensurable/",
    note: "Explains several ways values might resist comparison or fail to share one measuring scale. It supports the lab’s central point: even when values cannot be reduced to one number, people may still compare them, use fair procedures, or make a defensible choice.",
  },
  {
    id: "sep-blame",
    title: "Blame: Philosophical Accounts",
    author: "Stanford Encyclopedia of Philosophy",
    year: 2024,
    approach: "Moral emotions",
    labs: ["blame", "emotions"],
    url: "https://plato.stanford.edu/entries/blame/",
    note: "Surveys views that treat blame as a judgment, an emotion, a message, or a tool with practical effects. It supports the Moral Emotions Lab’s separation of what the emotion says, how it is expressed, which relationship it answers to, what it protests, and what it helps people do next.",
  },
  {
    id: "sep-moral-responsibility",
    title: "Moral Responsibility",
    author: "Stanford Encyclopedia of Philosophy",
    year: 2024,
    approach: "Doubts about deserved blame",
    labs: ["blame", "emotions"],
    url: "https://plato.stanford.edu/entries/moral-responsibility/",
    note: "Introduces debates over control, accountability, emotions such as resentment and gratitude, and deserved blame or suffering. It helps both labs keep separate: causing an outcome, being able to answer for it, having responsibilities in a relationship, and deserving pain for its own sake.",
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
