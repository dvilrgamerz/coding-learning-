# 🚀 Coding Learning V2

A modern Python learning platform built around **active learning, coding practice, mastery checks, spaced review, cloud progress, and AI tutoring**. Learners move from Python zero → advanced Python developer by writing and changing real code instead of only reading lessons.

## ✨ V2 highlights

- **Learner Command Center** with level, XP, mastery, streak, review queue, and weekly activity
- **Supabase accounts + cloud sync** for progress across devices
- **Server-managed XP history** and protected progress tables with Row Level Security
- **Learning streaks** tracked by Supabase instead of trusting browser storage
- **Achievement badges** for mastery, practice, reviews, streaks, and course completion
- **Skill map** from Foundations → Intermediate → Advanced
- **Smart Continue Learning** card that finds the next unfinished lesson
- **Spaced-repetition Review Center** showing lessons that are due
- **Trace → Modify → Build** practice ladder
- XP requires active recall, changed/running code, and a mastery check
- **Python Playground V2** with `input()`, automatic supported imports, autosave, and ready-made examples
- Example programs: Rock Paper Scissors, Number Guessing, Calculator, OOP Character, Data Analyzer
- **Focus Mode** for distraction-free lessons
- **Qwen3-Coder-Next tutor modes:** Coach, Socratic, Debugger, and Quiz Me
- Responsive V2 UI for desktop and mobile

## Learning path

### 🐍 Python 1 — Foundations
Start with no coding experience and learn:
- Python syntax and the REPL
- Variables and data types
- Input/output and operators
- Conditions and boolean logic
- `for` and `while` loops
- Strings
- Lists, tuples, dictionaries, and sets
- Functions and scope
- Exceptions
- A final beginner project

### ⚡ Python 2 — Intermediate
Build real programs with:
- Modules, packages, and virtual environments
- Files, JSON, and CSV
- Comprehensions
- Object-oriented programming
- Dataclasses and type hints
- Iterators, generators, and decorators
- Testing and debugging
- Regular expressions
- APIs and HTTP
- SQLite
- Async programming
- An intermediate project

### 🧠 Python Final — Advanced
Finish with professional topics:
- Advanced OOP and Python data model
- Context managers and advanced decorators
- Generics, protocols, and advanced typing
- Async patterns, threads, and processes
- Packaging with `pyproject.toml`
- Testing strategy and CI concepts
- Profiling, memory, and optimization
- Secure Python practices
- Algorithms and data structures
- Architecture and design patterns
- Advanced Python patterns
- A portfolio capstone

## ✨ Features

- V2 command-center dashboard with learner stats, streaks, review queue, achievements, and skill map
- Lesson viewer with explanations, examples, focus mode, and progress indicators
- Active-recall prompts on every lesson
- Code practice required before mastery
- 3-question mastery checks before XP is awarded
- Spaced-review schedule after completion to improve retention
- Supabase cloud progress for signed-in learners, with local fallback when signed out
- Course progress bars, levels, streaks, achievements, and mastery-based XP
- Search/filter lessons
- Browser Python playground powered by Pyodide
- Quiz-style knowledge checks
- Responsive dark UI for desktop and mobile
- Optional Qwen3-Coder-Next coding tutor
- Netlify serverless function keeps the Hugging Face token off the client

## 🤖 Qwen3-Coder-Next setup

The AI tutor uses the official Hugging Face model ID:

`Qwen/Qwen3-Coder-Next`

The frontend calls a Netlify Function, so **learners are never asked for a Hugging Face token or API key**. The site owner configures the provider credential privately on the server.

### Netlify environment variables

Set:

```
HF_TOKEN=hf_your_token_here
QWEN_MODEL=Qwen/Qwen3-Coder-Next
```

`QWEN_MODEL` is optional; the function already defaults to Qwen3-Coder-Next.

The token must have permission to call Hugging Face Inference Providers. Model/provider availability and inference credits are controlled by Hugging Face.

## ▶️ Run locally

The static learning UI works by opening `index.html` in a browser.

For the full Netlify Function experience:

```bash
npm install -g netlify-cli
netlify dev
```

Then open the local URL shown by Netlify.

## 📁 Project structure

```
coding-learning-/
├── index.html
├── styles.css
├── app.js
├── v2.js
├── v2.css
├── netlify.toml
├── netlify/
│   └── functions/
│       └── qwen.js
└── README.md
```

## 🔐 Security

- Do not commit `HF_TOKEN`.
- Keep secrets in Netlify environment variables.
- The AI endpoint validates message shape and limits message size.
- The playground executes Python in the user's browser through Pyodide, not on your server.

## Roadmap

Next upgrades can add fully server-verified mastery quizzes/code tests, certificates, daily challenges, leaderboards, instructor dashboards, and additional language tracks such as JavaScript, Java, C++, C#, SQL, HTML/CSS, Git, and AI/ML.

---

**V2:** built for learning by doing, recalling, testing, and building. 💻