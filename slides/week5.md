---
marp: true
theme: week5
size: 16:9
paginate: true
html: true
lang: en
title: "Week 5: LLMs and AI Agents"
author: "Yi-Xin Liu, Fudan University"
footer: "XDSY118019 · Week 5"
---

<!-- _class: cover -->
# Week 5: LLMs and AI Agents

<p class="byline">Dr. Yi-Xin Liu · Fudan University<br>lyx@fudan.edu.cn</p>

<!-- _paginate: false -->
<!-- _footer: "" -->

<!-- Opening question: Does successful execution imply a correct scientific conclusion? Invite one or two answers. Last week introduced neural networks. This week connects language generation to tool-assisted work. Adjust depth to the class; there are no per-slide time limits. -->

---

<!-- _class: figure -->
## Language Modeling

<div class="split"><div class="plate"><img src="assets/classic/jay_gpt2_autoregressive-generation.png" alt="Stepwise language generation, illustrated by Jay Alammar"></div><div><p>Given a prefix, predict the <strong>next-token distribution</strong>.</p><p class="big-equation">P(x<sub>t</sub> | x<sub>&lt;t</sub>)</p><p class="small">Fluent continuation still needs factual checks.</p></div></div>
<p class="source">Jay Alammar · <a href="https://jalammar.github.io/illustrated-gpt2/">The Illustrated GPT-2</a></p>

<!-- Typical autoregressive language modeling predicts a conditional next-token distribution. Ask students to continue “We measured the object’s ...”. A distribution is not a guaranteed factual statement. The figure is a teaching illustration, not a trace from a current frontier model. Post-training and tools can shape behavior without guaranteeing truth. Check: What changes in the conditional probability when the prefix changes? Explore generation on S07 and attention in A01. -->

---

<!-- _class: content -->
## Tokens and Tokenization

<div class="tokens-row"><span class="tok" style="background:#a8def0">scient</span><span class="tok" style="background:#f2cc78">ific</span><span class="tok" style="background:#c3b4ef">␠research</span><small>3 tokens　·　scientific research</small></div>
<div class="tokens-row"><span class="tok" style="background:#a8def0">Scientific</span><span class="tok" style="background:#f2cc78">␠research</span><small>2 tokens　·　Scientific research</small></div>
<div class="tokens-row"><span class="tok" style="background:#a8def0">print</span><span class="tok" style="background:#f2cc78">(&quot;</span><span class="tok" style="background:#c3b4ef">Hello</span><span class="tok" style="background:#abd6bd">,</span><span class="tok" style="background:#edb7a8">␠science</span><span class="tok" style="background:#c3d5ef">!&quot;)</span><small>6 tokens　·　print(&quot;Hello, science!&quot;)</small></div>


<p class="takeaway">A token is a processing unit. Splits depend on the encoding.</p>
<p class="source">Computed with OpenAI <a href="https://github.com/openai/tiktoken">tiktoken</a> · o200k_base · <a href="generated/tokenizer.html" target="_blank">Recorded tokenization</a> · <a href="https://platform.openai.com/tokenizer" target="_blank">Official tokenizer</a></p>

<!-- These are real offline computations with OpenAI’s open-source tiktoken. Inputs, encoding, package version and token IDs are saved in generated/tokenization.json. The explicitly named o200k_base is an example, not a claim about every frontier model. Compare lowercase and capitalized text and a code string. Spaces may attach to words. Any incomplete UTF-8 fragment is shown as hexadecimal bytes, not a replacement character. Check: Does equal character count imply equal token count? The official web tokenizer offers additional encodings. -->

---

<!-- _class: figure -->
## Embeddings and Position

<div class="split"><div class="plate"><img src="generated/embedding-en.svg" alt="English tokens, vocabulary IDs and symbolic embedding vectors"></div><div><p>A vocabulary ID maps to a <strong>numerical vector</strong>.</p><p>The network also needs information about token positions.</p><p class="small">Initial embeddings are fixed per vocabulary item. Later layers add context.</p></div></div>
<p class="source">Course schematic · Concept: <a href="https://jalammar.github.io/illustrated-transformer/">The Illustrated Transformer</a> · IDs: tiktoken o200k_base</p>

<!-- An embedding maps a discrete ID to a numerical representation. Position information lets the network distinguish order. Within a model, the initial token embedding is the same for the same vocabulary item. Contextual representations develop through attention and later layers. The original Transformer adds positional vectors; modern models may use other mechanisms, including rotary positions. Check: At which stage can representations of “bank” in two contexts begin to differ? The English diagram is drawn for this course. Token IDs come from the recorded o200k_base computation; embedding vectors are symbolic, not measured model weights. -->

---

<!-- _class: figure -->
## Self-Attention

<div class="split"><div class="plate"><img src="assets/classic/jay_transformer_self-attention_visualization.png" alt="Attention links between “it” and “animal”"></div><div><p>Each position <strong>combines information</strong> from itself and other allowed positions, using attention weights.</p><p>Compute relevance scores<br>Normalize weights<br>Combine information</p><p class="small"><a href="#31">Explore: Q, K, V and weighted sums</a></p></div></div>
<p class="source">Jay Alammar · <a href="https://jalammar.github.io/illustrated-transformer/">Self-attention visualization</a></p>

<!-- Ask what “it” refers to in the sentence. Q/K matching produces weights used to combine V. Attention links help illustrate information flow; weights alone are not a causal explanation or evidence of human-like understanding. This is an encoder illustration with access to both sides. Introduce the causal mask separately. Optional arithmetic example: weights 0.8 and 0.2 on vectors (1,0) and (0,1) give (0.8,0.2). These are invented teaching values. Check: Does the resulting representation contain only information from its own token? -->

---

<!-- _class: figure -->
## Transformer Architecture

<div class="split"><div class="plate"><img src="assets/classic/vaswani2017_transformer_figure1.png" alt="Encoder–decoder architecture, Attention Is All You Need, Figure 1"></div><div><h3>2017 encoder–decoder</h3><p>Encode the input.<br>Decode the output step by step.</p><p>The decoder also reads <strong>encoder outputs</strong>.</p><p class="small">This original diagram is not the GPT architecture.</p></div></div>
<p class="source">Vaswani et al., 2017 · <a href="https://arxiv.org/abs/1706.03762">Attention Is All You Need</a>, Fig. 1</p>

<!-- Locate the left encoder and right decoder. Follow embeddings, attention, feed-forward blocks and the output distribution. The original architecture targets sequence-to-sequence tasks such as translation; its decoder includes cross-attention. Cropping the right half does not produce a faithful GPT diagram. Click to enlarge. Check: What does the decoder read besides earlier outputs? The next slide follows the repeated steps of autoregressive generation. -->

---

<!-- _class: content -->
## Autoregressive Generation

<div class="flow"><div><h3>Current context</h3><p>Read existing tokens</p></div><span>→</span><div><h3>Predict and select</h3><p>Select the next token</p></div><span>→</span><div><h3>Append to context</h3><p>Predict again</p></div></div>
<div class="aside"><p>Each new token changes the conditions for the next prediction.</p><p class="subtle">Sampling changes output variability. Low temperature does not guarantee factual accuracy.</p></div>
<p class="source">Teaching schematic based on <a href="https://jalammar.github.io/illustrated-gpt2/">The Illustrated GPT-2</a></p>

<!-- This course schematic connects to the distribution on S02. Trace two iterations and identify the newly appended token as part of the next input. The diagram describes the process, not an implementation that recomputes everything. Real systems may cache keys and values. Expand to parallel training versus sequential decoding if useful. Check: Is the second iteration conditioned on the same prefix as the first? -->

---

<!-- _class: content -->
## Training and Inference

<div class="flow"><div><h3>Pretraining</h3><p>Learn prediction patterns<br>from large datasets</p><p><strong>Update weights</strong></p></div><span>→</span><div><h3>Post-training</h3><p>Shape behavior with<br>examples or rewards</p><p><strong>Update weights</strong></p></div><span>→</span><div><h3>Inference</h3><p>Read the current context<br>and generate output</p><p>Usually fixed weights</p></div></div>
<p class="takeaway">Training changes model weights. Inference uses those weights to generate a response.</p>
<p class="source">Teaching schematic based on Ouyang et al., 2022 · <a href="https://arxiv.org/abs/2203.02155">InstructGPT</a> · <a href="#32">Original post-training figure and sources</a></p>

<!-- SFT and RLHF are not mandatory steps in every model recipe. This overview distinguishes weight updates from inference; post-training methods vary. Saving a conversation and using it in later training are separate product-policy and timescale questions, not immediate weight updates during this chat. Check: Will a new conversation necessarily recover all previously pasted documents? A02a provides the original post-training figure. -->

---

<!-- _class: wide -->
## Model Family Evolution

<img class="hero" src="generated/model-timeline.svg" alt="Selected release groups across six major model families">
<p class="source">Selected releases · Time does not encode capability · <a href="#33">Official sources and preview / GA notes</a></p>

<!-- The six-family timeline shows selected release groups. The 2018–2022 region is compressed; a band spans several releases, not one date. Lines indicate release order, not training ancestry. GPT-3.5 refers to the series used for the 2022 chat preview; its Turbo API arrived in 2023. Gemini 2.0 Flash was experimental in 2024 and generally available in 2025. Treat DeepSeek R1 and V as distinct branches. Openness depends on the specific model and license. The 2026 column lists models observed at the October 14 snapshot, not necessarily models first released in 2026. Unverified GPT-6.1 Sol is excluded. See generated/timeline-data.json and the source records. Check: Can this chart identify the most capable model? No capability axis is shown. -->

---

<!-- _class: wide -->
## Frontier Model Benchmarks

<img class="benchmark" src="generated/benchmark.svg" alt="Artificial Analysis Intelligence Index: selected proprietary and open-weight models">
<p class="source">Data: <a href="https://artificialanalysis.ai/leaderboards/models">Artificial Analysis</a> · Redrawn for this course · v4.3.2 · 2026-10-14 · <a href="#34">Configurations, selection rules and metric scope</a></p>

<!-- Compare tested configurations from the same provider and index version. Keep effort and fallback labels. The selection represents four different creators per class, not the global top eight. Color indicates availability of weights, not a controlled causal comparison. The index is not accuracy in percent and does not cover every Chinese-language, multimodal or scientific task. Use this single aggregate metric only. Check: Is the highest score necessarily the best fit for the CSV exercise? Discuss availability and task-specific validation. Verified data and the original official-page snapshots are saved in assets. -->

---

<!-- _class: content context-lesson -->
## Context and Context Window

<div class="split equal"><div>
<h3>Context: information for this response</h3>
<p>It tells the model <strong>what to do</strong> and supplies the information needed to answer.</p>
<div class="context-items"><span>Instructions</span><span>Chat history</span><span>Documents</span><span>Tool results</span></div>
</div><div>
<h3>Window size: a token limit</h3>
<p>The maximum context a specific model version supports.</p>
<table><tr><th>API model</th><th>Window</th></tr><tr><td>GPT-6 Astra</td><td>1,050,000</td></tr><tr><td>Claude Opus 5.5</td><td>1M</td></tr></table>
<p class="subtle">Tokens, not words. App limits can be lower.</p>
</div></div>
<p class="takeaway">A larger window lets a model work with more material in one request.</p>
<p class="source">API specifications, checked 14 Oct 2026: <a href="https://developers.openai.com/api/docs/models/gpt-6-astra">OpenAI</a> · <a href="https://platform.claude.com/docs/en/models/opus-5-5/overview">Anthropic</a></p>

<!-- Context is information actually available in the current model call. It specifies the task, carries the relevant conversation, and can add documents or tool feedback that were not available in training. A file on disk is not context until loaded. Window size is a configuration-specific token capacity, not a number of parameters, a measure of intelligence, or permanent memory. These are official API specifications checked on 2026-10-14, not guarantees about every chat subscription. GPT-6 Astra advertises 1,050,000 context tokens and 128,000 maximum output tokens; Claude Opus 5.5 advertises 1M context and 128K maximum output. Input/output/reasoning accounting depends on the API; output also has its own maximum. If material exceeds the supported budget, the application must select passages, summarize, truncate or reject the request. A longer window permits more material but does not guarantee that every detail will be used correctly. Check question: Why can a model answer questions about a newly supplied article even if it has not been retrained? It can use the article as context. Sources: https://developers.openai.com/api/docs/models/gpt-6-astra and https://platform.claude.com/docs/en/models/opus-5-5/overview . -->

---

<!-- _class: content prompt-lesson -->
## User Prompts, System Prompts, and Engineering

<div class="split equal"><div>
<h3>System prompt</h3><p class="subtle">Set by the application: general behavior</p>
<blockquote>You are a science tutor. Use the supplied sources and state what is unknown.</blockquote>
</div><div>
<h3>User prompt</h3><p class="subtle">Set by the user: the current request</p>
<blockquote>Explain Newton’s third law using a walking example.</blockquote>
</div></div>
<p><strong>Prompt engineering:</strong> design and test instructions to obtain the desired response.</p>
<div class="prompt-methods"><span>Clear task + constraints</span><span>Relevant context</span><span>Examples (few-shot)</span><span>Output format</span></div>
<p class="source"><a href="https://developers.openai.com/api/docs/guides/prompting">OpenAI: Prompting</a> · <a href="https://developers.openai.com/api/docs/guides/prompt-engineering">Prompt engineering</a></p>

<!-- First distinguish where instructions come from. A system prompt supplies application-level behavior, and a user prompt supplies the immediate request. Products and APIs may also expose developer messages; in OpenAI APIs these carry application instructions with higher priority than user requests. Typing “system” inside a user message does not grant it that role. The examples here are course-written illustrations, not copied product system prompts. Prompt engineering means deliberately designing, testing and revising inputs. Explain four practical techniques: specify the task and constraints, provide relevant source context, show one or more examples, and request a useful output structure. Few-shot prompting means supplying examples in the context, not retraining the model. Compare outputs against acceptance criteria across several tasks, since results vary by model and run. Do not promise that any phrase guarantees truth. This prepares E1: change the prompt, keep the supplied materials constant, and inspect the resulting analysis plan. -->

---

<!-- _class: content hallucination-example -->
## Hallucinations: A Paper That Does Not Exist

<div class="split equal"><div>
<h3>A citation produced by GPT-4</h3>
<p class="badge">Fabricated reference · documented in a 2023 study</p>
<blockquote>Kim, Y., &amp; Kim, Y. (2016).<br><em>Overview of Nuclear Power Reactor Types.</em><br>Nuclear Engineering and Technology, 48(5), 1115–1126.</blockquote>
</div><div>
<h3>What the researchers found</h3>
<p>The audit classified this cited work as <strong>fabricated</strong>.</p>
<p>It looks like a normal reference: authors, title, journal, year, and pages.</p>
<p><strong>That format is not evidence that the paper exists.</strong></p>
</div></div>
<p class="takeaway">Open the publisher’s record. Check that the title and authors match.</p>
<p class="source">Walters &amp; Wilder, <a href="https://www.nature.com/articles/s41598-023-41032-5">Scientific Reports (2023)</a> · Supplementary Appendix 3, citation 42.01 · <a href="assets/citation-case.json">Saved audit record</a></p>

<!-- This is an actual citation in the authors’ archived GPT-4 output, not a teacher-invented failure. It appears in Supplementary Appendix 3, worksheet of individual references, Excel row 633, topic 42. The field “Work itself is fabricated” equals 1; the journal field is not classified as fabricated. The original response also supplied a DOI, but its presence did not establish the claimed reference. The main slide omits the DOI to avoid encouraging students to treat it as a valid citation. Explain hallucination as plausible generated content unsupported by the relevant facts or source. Do not infer modern model error rates from this 2023 case, and do not imply that the named researchers actually wrote this nonexistent article. Verification means opening the publisher record and matching the full metadata, not merely asking the same model “is this real?”. For further classroom exploration, compare a real reference with this study-classified fabricated one. Source and row-level evidence are saved in assets/citation-case.json and assets/papers/citation-study-supplement.xlsx. -->

---

<!-- _class: figure -->
## Retrieval-Augmented Generation

<div class="plate"><img class="hero" style="height:320px" src="assets/classic/lewis2020_rag_figure1.png" alt="Retriever and generator in the RAG paper, Figure 1"></div>
<p class="takeaway">Retrieve relevant passages, then let the LLM write an answer using them.</p>
<p class="source">Lewis et al., 2020 · <a href="https://arxiv.org/abs/2005.11401">Retrieval-Augmented Generation</a>, Fig. 1 · <a href="#15">Book-retrieval example</a></p>

<!-- Follow the question, retriever, documents and generator in the original figure. DPR, BART and marginalization over documents are features of this paper, not requirements for all RAG systems. Use this original image for the overall route; map its stages to a passage from Newton’s Principia on the next slide. The generator is the language model that writes the answer. In the original paper it is BART; in many current RAG systems it is an LLM. Check: Where do the documents come from before the answer is generated? -->

---

<!-- _class: content book-rag -->
## RAG Example: Find a Law in a Book

<p class="question">“Which law in Newton’s <em>Principia</em> relates action and reaction?”</p>
<div class="book-rag-grid"><div>
<h3>1 · Retrieve the passage</h3>
<p class="subtle">Axioms, or Laws of Motion · Law III · p. 83</p>
<blockquote>“To every action there is always opposed an equal reaction”</blockquote>
<p class="subtle">Newton, Motte translation, 1846 edition</p>
</div><div>
<h3>2 · Answer with a citation</h3>
<p>It is <strong>Law III</strong>. The two bodies exert equal and opposite forces on each other.</p>
<p class="subtle">[Principia, Law III, p. 83]</p>
<p><a href="generated/retrieval.html">Try the local book-retrieval demo →</a></p>
</div></div>
<p class="source">Real source text: <a href="https://www.gutenberg.org/files/76404/76404-h/76404-h.htm#Page_83">Newton’s Principia, Project Gutenberg</a> · Answer shown is an instructor paraphrase</p>

<!-- This example uses a real book and a locatable passage, not invented course evidence. Newton’s Principia, translated by Andrew Motte, first American edition revised by N. W. Chittenden (1846), page 83, contains the three laws under “Axioms, or Laws of Motion”. The short quotation is exact. The answer is a modern paraphrase for teaching; it is not a real-time LLM output. Separate retrieval from generation: the first stage finds Law III in a local excerpt collection; the language model would then receive that passage and draft the answer with a location. The offline demo runs a visible keyword ranking rule over the three real law passages and displays an instructor-written answer. It does not call an LLM or pretend to search the entire book. Ask students to inspect the original page and verify that the quote and location match. A second question about uniform motion returns Law I; a question outside the excerpt set returns no supporting passage. This gives a practical meaning to grounding without requiring three slides for RAG. -->

---

<!-- _class: exercise exercise-clear -->
## Practice · Improve a Prompt and Check the Answer

1. Give the model <code>motion.csv</code> and <code>motion_notes.md</code>. Ask for an analysis plan: <strong>describe the steps; do not run code.</strong>
2. Revise your prompt to specify units, missing values, and outputs. Ask again using the same files in a new chat.
3. Exchange answers with a partner. Check <strong>cm → m</strong>, <strong>exclude the missing row</strong>, <strong>fit an intercept</strong>, and <strong>do not invent experimental conditions</strong>.

<p class="deliver">Complete the <a href="practice/prompt-check-template.md">provided template</a>: both prompts, both replies, and four checked rows.<br>Save and submit it as <code>prompt-check.md</code>.</p>
<p class="source"><a href="practice/E1.html">Step-by-step instructions</a> · <a href="practice/index.html">Materials and participation routes</a></p>

<!-- Explain “plan” literally: list proposed analysis steps, data-handling rules and expected outputs, but do not claim that a script ran or that fitted values were measured. Both attempts use the full same CSV and notes N1–N4, preferably with the same model/settings in separate chats. The revised prompt should make requirements explicit rather than change the data. Pair review means exchanging the two responses, opening the source notes, and marking each of the four template rows Pass or Needs revision with the supporting N reference. N1 establishes cm and the conversion to m; N2 excludes the missing position at t=2 without zero fill or interpolation; N3 requires a fitted intercept and output files; N4 says temperature, instrument and uncertainty are not supplied. Students submit a single completed prompt-check.md containing both complete prompts and replies plus the checked table, reviewer name and suggested correction. No code, plot or numerical fit is required for this exercise. Without an account, use the explicitly labeled offline sample in the instructions and still perform the same checks. E2 files remain an optional extension, not a required next step in this deck. -->

---

<!-- _class: figure -->
## An Agent Loop

<div class="split"><div><img src="assets/classic/anthropic2024_effective-agents_tool-use-loop.png" alt="Agent and environment feedback loop"></div><div>
<p>A <strong>goal</strong> enters the model. The model selects an action, a tool acts in the environment, and the result informs the next decision.</p>

<p class="takeaway">Evidence of agency comes from actions, feedback, and a stopping condition.</p>
</div></div>

<p class="source">Anthropic, <a href="https://www.anthropic.com/engineering/building-effective-agents">Building effective agents</a></p>

<!--
Core point: This course uses an operational definition. An agent selects actions under constraints, reads environmental feedback, and decides whether to continue or stop.
Explanation: Map environmental feedback to the course example. If reading motion.csv fails, the system must receive that failure before the model can revise the path or report a blocker. Producing a long stream of text alone does not demonstrate task execution.
Check question: If a model says “the file was read” but shows no tool call or return value, what evidence do we actually have?
Expansion: Highlight Goal, Action, Environment feedback, and Stop in sequence, then move to the observable ReAct turn on S17.
Scientific boundary: This loop is a course-level operational framework. Products differ in autonomy, permissions, and termination controls.
Source and image rights: Anthropic, Building effective agents, Autonomous agent figure, https://www.anthropic.com/engineering/building-effective-agents . Confirm reuse terms for the exact image before publication. If reuse is unsuitable, replace it with an attributed instructional schematic.
-->




---

<!-- _class: figure -->
## Reasoning and Acting

<div class="split"><div><img src="assets/classic/yao2023_react_hotpotqa-react-panel.png" alt="Action and Observation detail from ReAct"></div><div>

Task-state summary<br>
Tool call<br>
Tool result

<p class="takeaway">The next step depends on the external result just observed.</p>
</div></div>

<p class="source">Yao et al., <a href="https://react-lm.github.io/">ReAct</a></p>

<!--
Core point: Planning and acting alternate, and external observations can change the next choice.
Explanation: Map one turn in the original figure to the course task. The model requests the CSV, observes a missing position_cm value, then follows the supplied rule to exclude and document that row.
Check question: If a tool returns “file not found,” should the system fit the data or verify the path first? Students must answer from the Observation.
Expansion: Enlarge one Action–Observation pair. For more depth, open Figure 1 and distinguish public interaction traces from language-reasoning traces.
Scientific boundary: ReAct is a classic research paradigm. A visible state summary and tool log do not reveal the model’s complete internal reasoning, and the system need not expose hidden reasoning.
Sources: ReAct project page https://react-lm.github.io/ and paper https://arxiv.org/abs/2210.03629 . Figure 1 appears on page 2 of the paper.
-->




---

<!-- _class: content -->
## Tool Calls

<div class="flow">
  <div><strong>Request</strong><br><code>read_csv(</code><br><code>"motion.csv")</code></div>
  <span>→</span>
  <div><strong>Host</strong><br>Check permission and read the file</div>
  <span>→</span>
  <div><strong>Return</strong><br><code>{rows: 7,</code><br><code>missing: 1}</code></div>
</div>

<p class="source">Instructional schematic</p>
<p class="takeaway">Writing a command and executing it are different events.</p>

<!--
Core point: The model proposes a tool request. The host authorizes and executes it. The return value then enters the context.
Explanation: A tool call leaves at least three observable fields: tool name, arguments, and return value. Real systems may also record errors, elapsed time, or exit status.
Check question: Does a displayed Python command prove that it ran? What return evidence would be needed?
Expansion: Show a failure such as permission denied. Ask whether the model should revise the request, choose another tool, or stop and report the problem.
Scientific boundary: A successful tool call proves only that one action completed. It does not prove sound data handling or a correct scientific conclusion. The host controls permissions, timeouts, and stopping conditions.
Source: Course schematic informed by the Anthropic agent loop, https://www.anthropic.com/engineering/building-effective-agents . The fields are illustrative and do not imitate any product’s exact log format.
-->




---

<!-- _class: figure -->
## Model Context Protocol

<div class="split"><div><img src="generated/mcp-architecture.svg" alt="MCP Host, Client, and Server architecture"></div><div>

A Host manages multiple clients.<br>
Each client connects to one server.<br>
A server exposes tools, resources, and prompts.

<p class="takeaway">MCP standardizes how an application connects to external capabilities.</p>
</div></div>

<p class="source"><a href="https://modelcontextprotocol.io/docs/learn/architecture">MCP Architecture</a>, CC BY 4.0 documentation</p>

<!--
Core point: MCP defines how Hosts, Clients, and Servers interact so an application can connect to external capabilities through a common structure.
Explanation: Use one application connected to a document service and a computation service. A Host can contain several clients, while each client maintains a connection to one server.
Check question: Which component manages several client connections, and how many servers does one client connect to in this architecture?
Expansion: Explain tools, resources, and prompts, then jump to A04 for the comparison. Do not teach protocol messages in the main route.
Scientific boundary: MCP is neither a model nor an autonomous agent. Exposing a capability does not mean the system will use it autonomously or that its results are correct.
Sources: MCP architecture documentation https://modelcontextprotocol.io/docs/learn/architecture and documentation license https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/LICENSE .
-->




---

<!-- _class: content -->
## RAG, Tools, and MCP

<div class="three">
  <div><strong>RAG</strong><br>Retrieve and organize evidence</div>
  <div><strong>Tool</strong><br>Read data or perform a computation</div>
  <div><strong>MCP</strong><br>Connect the host to a capability server</div>
</div>

<p class="takeaway">They solve different problems and can work together.</p>

<!--
Core point: RAG is a process for retrieving evidence and organizing context. Tools provide actions. MCP defines a connection layer.
Explanation: A retriever can be exposed as a tool and connected through MCP. Reliable RAG still needs a retrieval strategy, context assembly, and answer checking.
Check question: Does connecting a file-reading tool through MCP automatically provide reliable RAG? No.
Expansion: Revisit the retrieval and generation path on S14, then open A04 to compare workflow, agent, RAG, and MCP.
Scientific boundary: These layers can overlap but do not replace one another. An MCP connection says nothing about retrieval quality, and retrieved evidence does not show that a computation ran.
Sources: Original RAG paper https://arxiv.org/abs/2005.11401 and MCP architecture https://modelcontextprotocol.io/docs/learn/architecture . The relationship diagram is an instructional schematic.
-->




---

<!-- _class: code -->
## Project Instructions

<div class="split"><div>

<pre><code>practice/
├── AGENTS.md
├── motion.csv
└── motion_notes.md</code></pre>

</div><div>

<pre><code>Preserve the source CSV
Exclude missing positions
Document excluded rows
Plot position in m
Keep code, plot and run log</code></pre>

</div></div>

<p class="takeaway">Project instructions keep durable agreements inside the working directory.</p>

<!--
Core point: Files such as AGENTS.md help a tool load stable working agreements when it enters a project directory.
Explanation: This slide shows a short course example covering material locations, preservation of source data, units, and acceptance criteria. File names, discovery order, and scope vary by tool.
Check question: If a chat request says to overwrite the original CSV but project instructions say to preserve it, what should happen before execution?
Expansion: A06 provides complete short examples and compares AGENTS.md, SKILL.md, and handoff.md.
Scientific boundary: A project instruction influences behavior after it enters the current task context. It does not update model weights and is not a security sandbox or unbreakable access control.
Source: OpenAI, Custom instructions with AGENTS.md, https://learn.chatgpt.com/docs/agent-configuration/agents-md . The example is course-specific and does not copy this workspace’s orchestration configuration.
-->




---

<!-- _class: figure -->
## Agent Skills

<div class="flow">
  <div><code>SKILL.md</code><br>When to use it<br>Steps and checks</div>
  <div>Load as needed</div>
  <div><code>scripts/</code><br>Optional executable scripts</div>
  <div><code>references/</code><br>Detailed guidance and examples</div>
</div>

<p class="takeaway">A Skill packages a repeatable workflow and loads supporting resources when needed.</p>

<p class="source">Anthropic, <a href="https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills">Agent Skills</a></p>

<!--
Core point: A Skill targets a recurring task and can include activation guidance, steps, checks, and optional resources.
Explanation: Compare with S21. Project instructions describe lasting agreements for a project. A Skill describes how to perform a particular class of task. Only an actual load and execution record supports a claim that the Skill was used.
Check question: Does the presence of SKILL.md prove that the current analysis followed it? What record is still needed?
Expansion: A06 shows a complete short course example. For more depth, explain how progressive loading controls what enters the context.
Scientific boundary: A Skill does not modify model weights. Loading, activation, and compatibility depend on the tool, and file presence does not prove execution.
Sources: Anthropic, Equipping agents for the real world with Agent Skills, https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills . See also OpenAI Build skills, https://learn.chatgpt.com/docs/build-skills . This page uses a course schematic.
-->




---

<!-- _class: content memory-lesson -->
## Memory Management

<div class="equal"><div class="plate"><strong>Why memory matters</strong><br>Context windows are finite. Long histories must be compressed, selected, or dropped.</div><div class="plate"><strong>Why continuity matters</strong><br>A new session does not automatically inherit every decision, source, and unfinished step.</div></div>

<div class="equal"><div class="plate"><strong>Compaction</strong><br>Summarize essential state for the current thread.<br><strong>Durable files</strong><br><code>AGENTS.md</code>, <code>CLAUDE.md</code>, <code>handoff.md</code></div><div class="plate"><strong>Retrieval</strong><br>Index many records and recall relevant excerpts.<br><strong>Structured memory</strong><br>Store typed facts, decisions, status, and dates.</div></div>

<p class="takeaway">Memory preserves useful decisions and evidence across long tasks and new sessions.</p>

<!--
Core point: Memory is needed because the active context is finite and work often continues across sessions. Systems preserve continuity by selecting what to summarize, store, index, and recall.
Explanation: Compaction frees context by summarizing a long thread. Durable files keep stable project guidance and handoffs. Retrieval recalls relevant excerpts from a larger collection. Structured memory stores explicit facts, decisions, status, and dates. These strategies can be combined.
Check question: A saved note says “7 valid points,” but the current source file contains a missing value. Which source should be rechecked before analysis?
Expansion: Reuse the context container from S11. Show compaction within a thread, then a handoff file or retrieved record entering a later session.
Scientific boundary: Summaries can omit conditions, retrieval can miss evidence, and structured records can become stale. Reading memory into context does not update model weights or confirm the stored claim.
Sources: OpenAI conversation state and compaction https://developers.openai.com/api/docs/guides/conversation-state ; OpenAI retrieval https://developers.openai.com/api/docs/guides/retrieval ; Claude Code context and project memory https://support.claude.com/en/articles/14553413-claude-code-cheatsheet ; CLAUDE.md guidance https://support.claude.com/en/articles/14553240-give-claude-context-claude-md-and-better-prompts . Verified 2026-10-14.
-->




---

<!-- _class: content landscape-lesson -->
## The Agent Landscape

<div class="equal"><div class="plate"><strong>Coding tools and interfaces</strong><br><strong>CLI:</strong> Codex CLI, Claude Code CLI<br><strong>Desktop code surfaces:</strong> Codex app, Claude Desktop Code tab<br><strong>IDE:</strong> Cursor</div><div class="plate"><strong>Agent harnesses and platforms</strong><br><strong>Harnesses:</strong> Pi, DeepSeek Harness<br><strong>Agent products:</strong> Hermes Agent, OpenClaw</div></div>

<p class="takeaway">An agent harness connects the model to tools, execution, context, and task state.</p>

<!--
Core point: The landscape mixes user interfaces, coding tools, IDEs, agent products, and extensible harnesses. These names do not denote one equivalent product class.
Explanation: Codex and Claude each offer a command-line coding interface and a desktop coding surface. Claude’s precise desktop surface is the Code tab, which starts a Claude Code session. Cursor is an IDE. Pi and DeepSeek describe themselves as agent harnesses, while Hermes Agent and OpenClaw are broader agent products or platforms.
Check question: Why would comparing Cursor, Pi, and Claude Desktop as if they were the same kind of tool produce a misleading table?
Expansion: A05 provides the complete official entry-point index. For a deeper comparison, choose one concrete task and compare the layer each system supplies.
Scientific boundary: Category labels describe product architecture and interface, not relative capability. A named interface also does not identify one fixed underlying model.
Sources: Codex CLI https://learn.chatgpt.com/docs/codex/cli and Codex in the desktop app https://learn.chatgpt.com/docs/app ; Claude Code CLI https://docs.anthropic.com/en/docs/claude-code/cli-usage and Claude Desktop Code sessions https://support.claude.com/en/articles/14729294-open-claude-desktop-with-a-link ; Cursor https://www.cursor.com/ ; Pi https://pi.dev/ ; Hermes Agent https://hermes-agent.nousresearch.com/ ; OpenClaw https://openclaw.ai/ ; DeepSeek Harness https://github.com/deepseek-ai/deepseek-harness . Verified 2026-10-14.
-->




---

<!-- _class: figure case-study -->
## From Expert Feedback to a Textbook Figure

<div class="split"><div><img src="demos/fig6-82-codex-presentation/english-assets/fig6-82-stage-4-arrow-contact.svg" alt="Final archived polymer lamellar-growth diagram generated with editable SVG code"></div><div>
<strong>A real Codex-assisted case</strong>

Generate an editable SVG.<br>Inspect the polymer geometry.<br>Revise details through expert feedback.

<p class="takeaway">Five saved stages show how the figure changed.</p>
<a href="demos/fig6-82-codex-presentation/english.html">Open the English case replay →</a>
</div></div>

<p class="source">Course archive: Fig. 6.82 · actual saved SVGs and revision requests</p>

<!--
Core point: An LLM coding agent can help create a scientific illustration as editable code. Domain expertise supplies the physical meaning and correction criteria.
Explanation: Open the English replay. Compare the baseline with the split layout, revised details, polymer geometry, and final arrow contact. The saved requests show why visual plausibility was not enough: the polymer chains and growth steps had to represent the intended physical process.
Check question: Which revision needs polymer-physics knowledge rather than programming knowledge?
Expansion: The companion links to the original twelve-slide Chinese archive. All projected course content and companion explanations are in English.
Scientific boundary: These are five saved artifacts, not a simulated autonomous execution trace. The baseline generation prompt was not archived. English request summaries are paraphrases. Original user-supplied reference attachments have unverified publication provenance and are not reproduced here.
Source: demos/fig6-82-codex-presentation/english.html and the original fig6-82-codex-teaching-case archive.
-->




---

<!-- _class: content coding-trend -->
## Vibe Coding and AI-Assisted Development

<p><strong>84%</strong> of 2025 Stack Overflow respondents used or planned to use AI tools. <strong>51%</strong> of professional developers reported daily use.</p>

<div class="equal"><div><h3>From autocomplete to agents</h3>Describe a goal → generate code → run tools → revise from feedback.</div><div><h3>A concrete example</h3>Linus Torvalds used Google Antigravity to build the Python visualizer in his <strong>AudioNoise</strong> project.</div></div>

<p class="takeaway">“Vibe coding” emphasizes generating software through conversation. Professional adoption also includes testing, review, and maintenance.</p>

<p class="source"><a href="https://survey.stackoverflow.co/2025/ai">Stack Overflow Developer Survey 2025</a>; Torvalds, <a href="https://github.com/torvalds/AudioNoise">AudioNoise</a> · retrieved 14 Oct 2026</p>

<!--
Core point: AI-assisted coding now spans completion, conversational prototyping, and agents that edit and execute code. Vibe coding is an informal term, not a precise measure of adoption or reliability.
Explanation: The primary example is Torvalds's own AudioNoise README. He describes its Python visualizer as basically written by vibe-coding using Google Antigravity. This is a personal audio project.
Check question: How does asking an agent to implement and test a feature differ from accepting a single autocomplete suggestion?
Scientific boundary: Do not describe this example as AI-generated Linux kernel code. No first-party evidence for that specific claim was established. Nor does this example alone establish what fraction of all programming uses AI.
Sources: https://github.com/torvalds/AudioNoise and https://survey.stackoverflow.co/2025/ai . The 84 percent adoption/planning question had 33,662 responses; 51 percent is the professional-developer subgroup reporting daily use. Self-selected survey respondents are not a census of all programmers. The same survey reports 72 percent saying vibe coding is not part of their professional work, plus 5 percent emphatically rejecting it (26,564 responses). Thus widespread AI assistance is not equivalent to universal vibe coding. Retrieved 2026-10-14.
-->




---

<!-- _class: content math-progress -->
## AI for Mathematics: OpenAI’s October 2026 Release

<p>An internal frontier model produced mathematical manuscripts and proof artifacts.</p>

<div class="three math-stats"><div><strong>719</strong><br>manuscripts released</div><div><strong>372</strong><br>families of results</div><div><strong>≈42%</strong><br>of top-line results<br>formalized in Lean</div></div>

<p class="takeaway">A large research release is an invitation to check proofs. It is not a count of independently accepted solutions to open problems.</p>

<p class="source">OpenAI, <a href="https://openai.com/index/sharing-ai-progress-in-mathematics/">6 Oct 2026 announcement</a>; <a href="https://github.com/openai/math">public manuscripts and Lean artifacts</a> · snapshot 14 Oct 2026</p>

<!--
Core point: Recent general-model progress includes producing mathematical manuscripts at scale, with formal proof artifacts for a subset of results.
Explanation: OpenAI's October 6 research announcement and official repository report 719 manuscripts organized into 372 families, with roughly 42 percent of top-line results formalized in Lean. These are different denominators: do not interpret 42 percent as the share of manuscripts or all intermediate claims.
Check question: What does a Lean proof check that a plausible written argument cannot guarantee?
Scientific boundary: This release uses an unreleased internal frontier model. It is not a peer-reviewed journal collection. Unformalized manuscripts may contain errors; formal verification establishes a statement under its encoded definitions and assumptions. Do not call all 719 manuscripts solved open problems.
Sources: https://openai.com/index/sharing-ai-progress-in-mathematics/ and https://github.com/openai/math . Retrieved 2026-10-14. Counts are rendered as course typography from official data, not an official OpenAI figure.
-->




---

<!-- _class: figure science-paper -->
## AI for Science: Turn a Paper into an Agent

<div class="split"><div><img src="assets/paper2agent-figure1.png" alt="Original Paper2Agent Figure 1: papers, code and data become tested MCP tools that agents can use"></div><div>
<strong>Paper2Agent · Nature, 2026</strong>

Paper + code + data<br>↓<br>Tested MCP tools<br>↓<br>Ask questions and run the paper’s methods

<p class="takeaway">74 of 100 sampled computational-biology papers were converted into paper agents.</p>
</div></div>

<p class="source">Miao et al., <a href="https://doi.org/10.1038/s41586-026-11044-y">Nature (16 Sep 2026)</a>, Fig. 1, unchanged · <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a></p>

<!--
Core point: A paper agent makes a research method executable through an LLM-accessible interface. This is directly about LLMs, tools, MCP and validation.
Explanation: Follow panel a from a paper to an MCP server containing tools, resources and prompts. Panel b shows extraction, environment configuration, tests and iterative refinement. The article reports 74 successful conversions out of 100 sampled computational-biology papers.
Check question: What can a paper agent do that a PDF summary cannot? It can expose and execute the paper's computational methods, subject to the available implementation.
Scientific boundary: Successful conversion and reference-output validation do not prove all later answers correct. The ADHD candidate mechanism in the article still requires experimental validation. Do not describe it as an autonomous wet-lab discovery.
Source: Miao, Davis, Zhang et al., Reimagining research papers as interactive and reliable AI agents, Nature, published 16 September 2026, https://doi.org/10.1038/s41586-026-11044-y . Original Figure 1 is reproduced unchanged for non-commercial teaching under CC BY-NC-ND 4.0. Click to enlarge.
-->

---

<!-- _class: figure science-paper scientist-paper -->
## AI for Science: Propose and Test Hypotheses

<div class="split"><div><img src="assets/coscientist-figure1.png" alt="Original Co-Scientist Figure 1: scientist inputs, multi-agent hypothesis generation and three experimental applications"></div><div>
<strong>Co-Scientist · Nature, 2026</strong>

LLM agents generate, critique, rank, and revise hypotheses.<br><br>
Scientists select candidates and test them in the laboratory.

<p class="takeaway">The paper reports in-vitro validation across three biomedical applications.</p>
<p class="subtle">Earlier example: <a href="https://doi.org/10.1038/s41586-025-09442-9">Virtual Lab, Nature (2025)</a> — LLM scientists helped design nanobodies.</p>
</div></div>

<p class="source">Gottweis et al., <a href="https://doi.org/10.1038/s41586-026-10644-y">Nature 655, 487–496 (2026)</a>, Fig. 1, unchanged · <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a> · Click figure to enlarge</p>

<!--
Core point: LLM agents can organize scientific hypothesis generation, criticism and selection. Experimental evidence remains a distinct stage.
Explanation: Co-Scientist is a Gemini-based multi-agent system. The scientist supplies a research goal, preferences, constraints and feedback. Agents generate hypotheses, critique and rank them, then develop improved proposals. Three applications address drug repurposing for acute myeloid leukaemia, targets for liver fibrosis, and a bacterial gene-transfer mechanism. Human experts guide prioritization and experiments.
Comparison: Swanson et al., The Virtual Lab of AI agents designs new SARS-CoV-2 nanobodies, Nature 646, 716–723 (2025), https://doi.org/10.1038/s41586-025-09442-9 . A language-model principal investigator coordinates specialist LLM agents and scientific software, with human feedback. The study designed 92 candidates and experimentally tested binding. Specialized predictive models appear as tools inside an LLM-led workflow.
Check question: Which claims come from agents, and which require a biological experiment?
Scientific boundary: Initial in-vitro results do not establish clinical efficacy or fully autonomous discovery. These examples support bounded scientific workflows, not a universal AI scientist.
Source: Gottweis et al., Accelerating scientific discovery with Co-Scientist, Nature 655, 487–496 (2026), https://doi.org/10.1038/s41586-026-10644-y . Published online 19 May 2026; version of record 1 July 2026. Figure 1 reproduced unchanged under CC BY 4.0. The complete figure is a visual overview; enlarge it to read the detailed labels. Virtual Lab is linked only; its figure is not reproduced.
-->

---

<!-- _class: appendix -->
## Attention Formula and Causal Mask

$$
\operatorname{Attention}(Q,K,V)=
\operatorname{softmax}\!\left(\frac{QK^{\mathsf T}}{\sqrt{d_k}}+M\right)V
$$

<div class="equal"><div class="plate"><strong>Causal mask</strong><br><code>M</code> makes later positions unavailable. When predicting <code>x_t</code>, the model reads only <code>x_1…x_{t-1}</code>.</div><div class="plate"><strong>Two-vector example</strong><br><code>v₁=(1,0)</code>, <code>v₂=(0,1)</code><br>Weights 0.8 and 0.2 produce <code>(0.8,0.2)</code>.</div></div>

<p class="takeaway">The toy example shows weighted aggregation, not measured model weights.</p>
<a href="#return" class="return">Back to lecture</a>

<!--
Core point: Scaled dot-product attention computes relevance scores, applies softmax weights, and aggregates values. A causal mask prevents a position from reading its target token or later tokens.
Explanation: The two-vector example shows 0.8×v₁+0.2×v₂=(0.8,0.2). It omits how Q and K are formed, multi-head concatenation, residual connections, and later network layers.
Check question: When predicting x_t, can the masked computation read x_t? No. Training inputs and prediction targets are shifted by one position.
Expansion: Return to S05 for pronoun association or S07 for autoregressive generation.
Scientific boundary: Attention weights are not human explanations or causal evidence. The displayed weights are illustrative rather than measured.
Source: Vaswani et al., Attention Is All You Need, https://arxiv.org/abs/1706.03762 , Figure 2 and the attention equations.
-->


---

<!-- _class: appendix figure -->
## Training and Post-training

<div class="split"><div><img src="assets/classic/ouyang2022_instructgpt_figure2.png" alt="InstructGPT training and human-feedback process"></div><div>
<p><strong>Pretraining</strong><br>Learn next-token prediction from a large text corpus.</p>
<p><strong>Post-training</strong><br>Adjust behavior using demonstrations, preferences, or other feedback.</p>
<p><strong>Inference</strong><br>Use the current context without automatically updating weights.</p>
</div></div>

<p class="source">Ouyang et al., <a href="https://arxiv.org/abs/2203.02155">InstructGPT</a></p>
<a href="#return" class="return">Back to lecture</a>

<!--
Core point: Pretraining, post-training, and one inference call are distinct stages. Pasting a document into a conversation normally changes only the current input.
Explanation: The original figure presents one specific InstructGPT process. Use it to relate demonstrations, preference comparisons, and reinforcement learning, then state that modern systems need not follow the identical process.
Check question: Does placing motion_notes.md in the context rewrite the model parameters?
Expansion: Return to S08 to compare “update weights” with “use context,” or open A06 to see how project instructions, Skills, and Memory enter a current task.
Scientific boundary: SFT, preference optimization, and RL are possible routes rather than a universal recipe. Do not present the InstructGPT pipeline as mandatory for every model.
Source: Ouyang et al., Training language models to follow instructions with human feedback, https://arxiv.org/abs/2203.02155 . Confirm reuse terms for the exact figure before publication.
-->


---

<!-- _class: appendix -->
## Model History Sources

<div class="three">
  <div class="plate"><strong>Release records</strong><br>Official news and model directories</div>
  <div class="plate"><strong>Release stage</strong><br>Preview, experimental, or GA</div>
  <div class="plate"><strong>Keep separate</strong><br>Model-card update date and first release date</div>
</div>

GPT, Claude, Gemini, Llama, Qwen, DeepSeek

<p class="takeaway">The main timeline is a representative index, not a training lineage or performance curve.</p>
<a href="#return" class="return">Back to lecture</a>

<!--
Core point: A model history should use first-party release records and distinguish previews, experimental releases, general availability, and documentation updates.
Explanation: The 2022 GPT-3.5 node refers to the model series used in the ChatGPT research preview. The GPT-3.5 Turbo API arrived in 2023. Gemini 2.0 Flash experimental and GA belong to different dates.
Check question: A model card says “updated 2025.” Does that prove the model first launched in 2025?
Expansion: Return to S09 for the six compact lanes. Open the per-node records in references.md when exact dates are needed.
Scientific boundary: Release order within a family does not prove weight inheritance or monotonic capability gains. A family name does not determine whether a particular model is open weights.
Sources: OpenAI https://developers.openai.com/api/docs/models , Anthropic https://www.anthropic.com/news , Gemini https://deepmind.google/models/model-cards/ , Meta Llama https://ai.meta.com/blog/llama-4-multimodal-intelligence/ , Qwen https://github.com/QwenLM/Qwen3 , and DeepSeek https://api-docs.deepseek.com/updates/ .
-->


---

<!-- _class: appendix -->
## Benchmark Reading Rules

<div class="equal"><div class="plate"><strong>One snapshot</strong><br>Fix the benchmark version and access date. Exclude estimated results.</div><div class="plate"><strong>Full configuration</strong><br>Keep model version, effort, fallback, and other labels.</div></div>

<div class="equal"><div class="plate"><strong>Accurate category</strong><br>Distinguish Proprietary from Open weights.</div><div class="plate"><strong>Limited conclusion</strong><br>A composite index cannot cover every language, modality, or research task.</div></div>

<p><a href="generated/benchmark-data.html">Open the saved data, configurations, and source record</a></p>
<p class="source"><a href="https://artificialanalysis.ai/methodology/intelligence-benchmarking">Artificial Analysis methodology</a></p>
<a href="#return" class="return">Back to lecture</a>

<!--
Core point: A leaderboard compares only the recorded model configurations in a fixed benchmark snapshot. The local reference page supplies current scores, so this appendix does not hard-code changing values.
Explanation: Verify benchmark version, date, and model configuration before reading the category and order. Estimated values must be excluded or explicitly marked rather than mixed with measured results.
Check question: Can high and max configurations of the same model be treated as one measurement?
Expansion: Open generated/benchmark-data.html for the saved table, selection rules, and row-level sources. Return to S10 for the projection-friendly chart.
Scientific boundary: Intelligence Index is a composite measure, not an accuracy percentage and not a causal test of open versus proprietary status. If GPQA Diamond is used, it is a separate second metric and must not be added to the composite index.
Sources: Artificial Analysis LLM Leaderboard https://artificialanalysis.ai/leaderboards/models and methodology https://artificialanalysis.ai/methodology/intelligence-benchmarking .
-->


---

<!-- _class: appendix -->
## MCP Responsibility Boundaries

<div class="three">
  <div class="plate"><strong>Host</strong><br>Manage the application, permissions, and multiple clients</div>
  <div class="plate"><strong>Client</strong><br>Maintain a connection to one server</div>
  <div class="plate"><strong>Server</strong><br>Expose tools, resources, and prompts</div>
</div>

<p class="takeaway">A connection layer does not replace retrieval design, tool validation, or scientific judgment.</p>
<a href="#return" class="return">Back to lecture</a>

<!--
Core point: MCP defines roles and connections. The Host still controls permissions and calls, while a Server exposes its capabilities.
Explanation: A retrieval service may be exposed through MCP, but the system must still decide when to retrieve, which passages to use, and how to verify the answer.
Check question: An MCP server returns a file. Who should confirm that its version matches the task?
Expansion: Return to S19 for the official architecture and S20 for the RAG, Tool, and MCP comparison.
Scientific boundary: An MCP server is not an autonomous Agent. A successful protocol connection does not establish sound permissions, security, or correctness.
Sources: Model Context Protocol Architecture, https://modelcontextprotocol.io/docs/learn/architecture and documentation license https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/LICENSE .
-->


---

<!-- _class: appendix -->
## Agent Tool Index

<div class="equal"><div>
<p><a href="https://openai.com/codex/">Codex</a><br><a href="https://docs.anthropic.com/en/docs/claude-code/overview">Claude Code</a><br><a href="https://github.com/google-gemini/gemini-cli">Gemini CLI</a><br><a href="https://www.cursor.com/">Cursor</a><br><a href="https://opencode.ai/">OpenCode</a></p>
</div><div>
<p><a href="https://hermes-agent.nousresearch.com/">Hermes Agent</a><br><a href="https://openclaw.ai/">OpenClaw</a><br><a href="https://www.kimi.com/code/docs/en/">Kimi Code</a><br><a href="https://pi.dev/">Pi</a><br><a href="https://github.com/deepseek-ai/deepseek-harness">DeepSeek Harness</a></p>
</div></div>

<p class="takeaway">Confirm official identity, model, permissions, and working directory before comparing a concrete task.</p>
<a href="#return" class="return">Back to lecture</a>

<!--
Core point: This page preserves every tool name from the original outline and links to verified first-party entry points without making feature comparisons.
Explanation: OpenCode, Hermes Agent, OpenClaw, Kimi Code, and Pi were confirmed from their first-party product or documentation domains on 2026-10-14. DeepSeek Harness was confirmed from the exact repository under the official deepseek-ai GitHub organization. Its repository identifies it as a developer preview.
Check question: After seeing a tool name, what information must be confirmed before using it with course data?
Expansion: Return to S24 for interface types. After identity verification, record the official entry point, environment, and check date in references.md.
Scientific boundary: Brand, interface, and underlying model are different layers. Without official evidence, do not infer features, autonomy, openness, or security boundaries.
Sources: Codex https://openai.com/codex/ , Claude Code https://docs.anthropic.com/en/docs/claude-code/overview , Gemini CLI https://github.com/google-gemini/gemini-cli , Cursor https://www.cursor.com/ , OpenCode https://opencode.ai/ , Hermes Agent https://hermes-agent.nousresearch.com/ , OpenClaw https://openclaw.ai/ , Kimi Code https://www.kimi.com/code/docs/en/ , Pi https://pi.dev/ , and DeepSeek Harness https://github.com/deepseek-ai/deepseek-harness . Verified 2026-10-14.
-->


---

<!-- _class: appendix -->
## Instructions, Skills, and Memory

<div class="three">
  <div class="plate"><strong>AGENTS.md</strong><br>Durable project agreements<br>Read into the current context</div>
  <div class="plate"><strong>SKILL.md</strong><br>A task-specific workflow<br>Load resources when triggered</div>
  <div class="plate"><strong>handoff.md</strong><br>Verified state and next step<br>Read back in a later session</div>
</div>

<p class="takeaway">All three remain outside the model. Reading them does not update weights.</p>
<a href="#return" class="return">Back to lecture</a>

<!--
Core point: Project instructions, Skills, and Memory can all supply information to the current context, but they differ in storage, activation, and purpose.
Explanation: AGENTS.md states project behavior. SKILL.md organizes a task workflow. handoff.md preserves verified state, sources, and unfinished work. Each must follow the actual tool’s discovery rules.
Check question: Does a file’s presence prove that the current session read and followed it? What execution record is required?
Expansion: Return to S21, S22, and S23 for each concept. Complete short files are available in the practice directory.
Scientific boundary: Reading these files is inference-time context management rather than training. Instruction files cannot replace system permission controls, and saved memory must be checked for staleness.
Sources: OpenAI AGENTS.md https://learn.chatgpt.com/docs/agent-configuration/agents-md , OpenAI Build skills https://learn.chatgpt.com/docs/build-skills , and Anthropic Agent Skills https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills . The Memory path is an instructional schematic.
-->


---

<!-- _class: appendix -->
## Practice Verification

<div class="equal"><div class="plate"><strong>Check the input</strong><br>7 rows, with 1 missing position<br>The main analysis uses 6 valid points</div><div class="plate"><strong>Check the result</strong><br>Velocity 0.02 m/s<br>Intercept 0.01 m</div></div>

<p><a href="practice/reference/report.md">Reference report</a>　<a href="practice/reference/motion.png">Reference figure</a>　<a href="demos/replay.html">Reference Script Replay</a></p>

<p class="takeaway">Results, units, handling rules, and execution evidence must agree.</p>
<a href="#return" class="return">Back to lecture</a>

<!--
Core point: Practice verification begins with the input record, then checks missing-value handling, fit parameters, axis units, and actual execution evidence.
Explanation: The position at time_s=2 is missing. The main analysis excludes that row, without filling zero or interpolating. A linear least-squares fit with an intercept uses the remaining 6 points. The figure converts the vertical axis from cm to m.
Check question: A report says “velocity 0.02 m/s,” but the figure still labels the axis in cm. Does the submission pass? Why?
Expansion: Open the reference report, figure, and replay. Return to E1 to review the prompt-comparison worksheet. Execution materials remain an optional extension in the practice guide.
Scientific boundary: The data form a synthetic constant-velocity example with no noise. The result cannot establish real measurement precision, and students must not invent temperature, instrument, or uncertainty information that the source never supplied.
Source: Local practice/motion.csv, motion_notes.md, and the reference directory. Use an absolute tolerance below 1e-8 for floating-point checks.
-->
