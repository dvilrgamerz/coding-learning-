/* Coding Learning Studio - original level-based Python experience */
(() => {
  const LEVELS = [
    {label:"Learn", icon:"1"},
    {label:"Predict", icon:"2"},
    {label:"Modify", icon:"3"},
    {label:"Build", icon:"4", project:true},
    {label:"Master", icon:"✓", mastery:true}
  ];

  const PROJECTS = [
    {id:"rps",icon:"✊",title:"Rock Paper Scissors",desc:"Input, random choices, and conditions.",code:[
      "import random","","choices = ['rock', 'paper', 'scissors']","","while True:",
      "    user = input('Rock, paper, scissors, or quit: ').strip().lower()",
      "    if user == 'quit':","        print('Thanks for playing!')","        break",
      "    if user not in choices:","        print('Try rock, paper, or scissors.')","        continue",
      "    computer = random.choice(choices)","    print('Computer:', computer)",
      "    if user == computer:","        print('Tie!')",
      "    elif (user == 'rock' and computer == 'scissors') or (user == 'paper' and computer == 'rock') or (user == 'scissors' and computer == 'paper'):",
      "        print('You win!')","    else:","        print('Computer wins!')"
    ].join("\n")},
    {id:"guess",icon:"🎯",title:"Number Guessing",desc:"Loops, comparisons, input, and random numbers.",code:[
      "import random","","secret = random.randint(1, 50)","attempts = 0","","while True:",
      "    guess = int(input('Guess 1-50: '))","    attempts += 1",
      "    if guess < secret:","        print('Too low')","    elif guess > secret:","        print('Too high')",
      "    else:","        print(f'Correct in {attempts} tries!')","        break"
    ].join("\n")},
    {id:"quiz",icon:"🧠",title:"Quiz Game",desc:"Questions, loops, score, and feedback.",code:[
      "questions = [('Function keyword?', 'def'), ('True/False type?', 'bool'), ('Sequence loop?', 'for')]",
      "score = 0","","for question, answer in questions:","    user = input(question + ' ').strip().lower()",
      "    if user == answer:","        score += 1","        print('Correct!')","    else:","        print('Answer:', answer)",
      "","print(f'Score: {score}/{len(questions)}')"
    ].join("\n")},
    {id:"tracker",icon:"📊",title:"Study Tracker",desc:"Functions, lists, menus, and summaries.",code:[
      "sessions = []","","def add_session():","    subject = input('Subject: ').strip()","    minutes = int(input('Minutes: '))",
      "    sessions.append({'subject': subject, 'minutes': minutes})","","def show_summary():",
      "    total = sum(item['minutes'] for item in sessions)","    print('Sessions:', len(sessions))","    print('Total minutes:', total)",
      "","while True:","    command = input('add, summary, or quit: ').strip().lower()",
      "    if command == 'add':","        add_session()","    elif command == 'summary':","        show_summary()",
      "    elif command == 'quit':","        break","    else:","        print('Unknown command')"
    ].join("\n")}
  ];

  const qs = (s) => document.querySelector(s);
  let levelIndex = 0;
  let runOk = false;
  let runCode = "";
  let starterCode = "";
  let selectedCourse = state.courseId || "python-1";
  const levelProgress = JSON.parse(localStorage.getItem("cl-studio-level-progress") || "{}");

  function levelKey(courseId, lessonIndex, index) {
    return courseId + ":" + lessonIndex + ":" + index;
  }

  function levelDone(courseId, lessonIndex, index) {
    if (isDone(courseId, lessonIndex)) return true;
    if ((index === 2 || index === 3) && state.practice[lessonKey(courseId, lessonIndex)]) return true;
    return Boolean(levelProgress[levelKey(courseId, lessonIndex, index)]);
  }

  function saveLevel(courseId, lessonIndex, index) {
    levelProgress[levelKey(courseId, lessonIndex, index)] = true;
    localStorage.setItem("cl-studio-level-progress", JSON.stringify(levelProgress));
  }

  function courseUnlocked(index) {
    return index === 0 || coursePercent(COURSES[index - 1]) >= 100;
  }

  function lessonUnlocked(course, index) {
    const ci = COURSES.findIndex((c) => c.id === course.id);
    if (!courseUnlocked(ci)) return false;
    return index === 0 || isDone(course.id, index - 1);
  }

  function firstIncompleteLevel(courseId, lessonIndex) {
    if (isDone(courseId, lessonIndex)) return 4;
    for (let i = 0; i < LEVELS.length; i++) {
      if (!levelDone(courseId, lessonIndex, i)) return i;
    }
    return 4;
  }

  function normalize(code) {
    return String(code).split("\n").map((line) => line.replace(/#.*$/, "").trim()).filter(Boolean).join("\n");
  }

  function currentCourse() { return courseById(state.courseId); }
  function currentLesson() { return currentCourse().lessons[state.lessonIndex]; }

  function levelData(index) {
    const lesson = currentLesson();
    const course = currentCourse();
    const key = lessonKey(course.id, state.lessonIndex);

    if (index === 0) return {
      type:"CONCEPT", title:"Learn: " + lesson.title, text:lesson.summary,
      concept:"<strong>Goals</strong><ul>" + lesson.learn.map((x) => "<li>" + escapeHtml(x) + "</li>").join("") + "</ul><p>Read the example and focus on what each important line does.</p>",
      code:lesson.code, hint:"Understand the purpose first. You do not need to memorize every symbol yet.", check:"learn"
    };

    if (index === 1) return {
      type:"PREDICTION PUZZLE", title:"Predict before you run",
      text:"Add a first-line comment beginning with # Prediction: and write what you think the code will do. Then run it and compare.",
      concept:"<strong>Why predict?</strong><p>Prediction makes you trace the program instead of only reading it.</p>",
      code:"# Prediction: write your prediction here\n" + lesson.code,
      hint:"Trace values, conditions, loops, function calls, and print statements from top to bottom.", check:"predict"
    };

    if (index === 2) return {
      type:"MODIFY", title:"Change the program",
      text:"Change at least one real Python line so the behavior changes, then run it successfully.",
      concept:"<strong>Modify challenge</strong><p>Change a value, condition, argument, collection item, loop range, or function call related to this lesson.</p>",
      code:lesson.code, hint:"Make one small change using this idea: " + escapeHtml(lesson.learn[0] || lesson.title), check:"modify"
    };

    if (index === 3) return {
      type:"BUILD", title:"Build it yourself", text:lesson.challenge,
      concept:"<strong>Build rules</strong><p>Write a working solution, run it, and use the lesson concept. Different correct solutions are welcome.</p>",
      code:"# " + lesson.challenge + "\n# Build your solution below.\n\n",
      hint:"Break the challenge into tiny steps. Make the simplest version work first.", check:"build"
    };

    return {
      type:"MASTERY", title:"Prove you understand it",
      text:isDone(course.id, state.lessonIndex) ? "You mastered this lesson. Continue when ready." : "Finish recall and mastery checks to earn official lesson XP.",
      concept:"<strong>Mastery is more than completion.</strong><p>You should be able to recall the idea, use it in code, and answer checks correctly.</p>",
      code:state.practice[key] ? "# Practice complete ✓\n# Continue to mastery." : "# Finish the coding levels first.",
      hint:"If something feels unclear, explain the example in your own words before trying the mastery check.", check:"master"
    };
  }

  function renderBubbles() {
    const course = currentCourse();
    const el = qs("#studioLevelBubbles");
    if (!el) return;
    el.innerHTML = LEVELS.map((level, i) => {
      const done = levelDone(course.id, state.lessonIndex, i);
      const locked = i > 0 && !levelDone(course.id, state.lessonIndex, i - 1) && !isDone(course.id, state.lessonIndex);
      let cls = "studio-bubble";
      if (i === levelIndex) cls += " active";
      if (done) cls += " done";
      if (locked) cls += " locked";
      if (level.project) cls += " project";
      if (level.mastery) cls += " mastery";
      return "<button class='" + cls + "' data-studio-level='" + i + "' title='" + level.label + "'" + (locked ? " disabled" : "") + "><span>" + (done && i !== levelIndex ? "✓" : level.icon) + "</span></button>";
    }).join("");
    el.querySelectorAll("[data-studio-level]").forEach((button) => {
      button.addEventListener("click", () => {
        levelIndex = Number(button.dataset.studioLevel);
        renderWorkspaceLevel();
      });
    });
  }

  function renderWorkspaceLevel() {
    const course = currentCourse();
    const lesson = currentLesson();
    const data = levelData(levelIndex);
    qs("#studioCourseName").textContent = course.title + " • " + course.subtitle;
    qs("#studioLessonName").textContent = lesson.title;
    qs("#studioLevelType").textContent = data.type;
    qs("#studioTaskTitle").textContent = data.title;
    qs("#studioTaskText").textContent = data.text;
    qs("#studioConceptBox").innerHTML = data.concept;
    qs("#studioHintBox").hidden = true;
    qs("#studioHintBox").textContent = data.hint;
    qs("#studioOutput").textContent = "Run your code to see output here.";
    qs("#studioFeedback").textContent = "";
    qs("#studioFeedback").className = "studio-feedback";
    qs("#studioEditor").value = data.code;
    starterCode = data.code;
    runCode = "";
    runOk = false;
    qs("#studioRunBtn").disabled = data.check === "master";
    qs("#studioCheckBtn").textContent = data.check === "master" ? (isDone(course.id, state.lessonIndex) ? "Continue →" : "Open mastery check →") : "Check →";
    renderBubbles();
    qs("#studioSaveState").textContent = state.user ? "☁ Cloud progress" : "Saved on this device";
  }

  function openWorkspace(courseId, lessonIndex, preferredLevel) {
    const course = courseById(courseId);
    if (!lessonUnlocked(course, lessonIndex) && !isDone(course.id, lessonIndex)) {
      return toast("Finish the previous lesson first.");
    }
    state.courseId = course.id;
    state.lessonIndex = lessonIndex;
    persist();
    levelIndex = preferredLevel == null ? firstIncompleteLevel(course.id, lessonIndex) : preferredLevel;
    qs("#studioMapPanel").hidden = true;
    qs("#studioWorkspace").hidden = false;
    renderWorkspaceLevel();
    window.scrollTo({top:0,behavior:"smooth"});
  }

  function openMap() {
    qs("#studioWorkspace").hidden = true;
    qs("#studioMapPanel").hidden = false;
    selectedCourse = state.courseId;
    renderMap();
    window.scrollTo({top:0,behavior:"smooth"});
  }

  function renderCourseSelector() {
    const el = qs("#studioCourseSelector");
    el.innerHTML = COURSES.map((course, i) => {
      const pct = coursePercent(course);
      const unlocked = courseUnlocked(i);
      return "<article class='studio-select-card " + (course.id === selectedCourse ? "active " : "") + (unlocked ? "" : "locked") + "' data-course='" + course.id + "' style='--studio-course:" + course.color + "'>" +
        "<div class='studio-select-top'><span class='studio-select-icon'>" + course.icon + "</span><span>" + (unlocked ? pct + "%" : "🔒") + "</span></div>" +
        "<h3>" + escapeHtml(course.title) + " • " + escapeHtml(course.subtitle) + "</h3><p>" + escapeHtml(course.description) + "</p>" +
        "<div class='studio-select-progress'><div class='mini-progress'><div style='width:" + pct + "%;background:" + course.color + "'></div></div><small>" + completedCount(course) + "/" + course.lessons.length + "</small></div></article>";
    }).join("");
    el.querySelectorAll("[data-course]").forEach((card) => {
      card.addEventListener("click", () => {
        const i = COURSES.findIndex((c) => c.id === card.dataset.course);
        if (!courseUnlocked(i)) return toast("Finish the previous Python course to unlock this one.");
        selectedCourse = card.dataset.course;
        renderMap();
      });
    });
  }

  function renderLessonPath() {
    const course = courseById(selectedCourse);
    const el = qs("#studioUnitMap");
    const next = course.lessons.findIndex((_, i) => !isDone(course.id, i));
    let rows = "";
    course.lessons.forEach((lesson, i) => {
      const done = isDone(course.id, i);
      const unlocked = lessonUnlocked(course, i);
      const current = i === next && unlocked && !done;
      const dots = LEVELS.map((_, li) => "<i class='" + (levelDone(course.id, i, li) ? "on" : "") + "'></i>").join("");
      rows += "<div class='studio-lesson-row " + (done ? "done " : "") + (current ? "current " : "") + ((unlocked || done) ? "" : "locked") + "' data-lesson='" + i + "'>" +
        "<div class='studio-lesson-node'>" + (done ? "✓" : unlocked ? i + 1 : "🔒") + "</div>" +
        "<div class='studio-lesson-copy'><strong>" + escapeHtml(lesson.title) + "</strong><span>" + escapeHtml(lesson.summary) + "</span></div>" +
        "<div class='studio-lesson-meta'><div class='studio-level-mini'>" + dots + "</div><span>" + (done ? "Mastered" : current ? "Continue" : unlocked ? "Ready" : "Locked") + "</span></div></div>";
    });
    el.innerHTML = "<div class='studio-unit-head'><div><span class='mini-label' style='color:" + course.color + "'>" + course.icon + " " + escapeHtml(course.title) + "</span><h2>" + escapeHtml(course.subtitle) + " Unit</h2></div><p>" + completedCount(course) + " of " + course.lessons.length + " lessons mastered</p></div><div class='studio-lesson-path'>" + rows + "</div>";
    el.querySelectorAll("[data-lesson]").forEach((row) => {
      row.addEventListener("click", () => {
        const i = Number(row.dataset.lesson);
        if (!lessonUnlocked(course, i) && !isDone(course.id, i)) return toast("This lesson unlocks after the lesson above it.");
        openWorkspace(course.id, i);
      });
    });
  }

  function renderProjects() {
    const el = qs("#studioProjectGrid");
    el.innerHTML = PROJECTS.map((p) => "<article class='studio-project-card' data-project='" + p.id + "'><div class='studio-project-cover'>" + p.icon + "</div><div class='studio-project-body'><strong>" + escapeHtml(p.title) + "</strong><span>" + escapeHtml(p.desc) + "</span></div></article>").join("");
    el.querySelectorAll("[data-project]").forEach((card) => {
      card.addEventListener("click", () => {
        const project = PROJECTS.find((p) => p.id === card.dataset.project);
        qs("#codeEditor").value = project.code;
        localStorage.setItem("cl-v2-playground-code", project.code);
        setView("playground");
      });
    });
  }

  function renderMap() {
    renderCourseSelector();
    renderLessonPath();
    renderProjects();
    qs("#studioSaveState").textContent = state.user ? "☁ Cloud progress" : "Saved on this device";
  }

  async function runStudio() {
    const output = qs("#studioOutput");
    const button = qs("#studioRunBtn");
    const code = qs("#studioEditor").value;
    button.disabled = true;
    button.textContent = "Loading…";
    runOk = false;
    runCode = code;
    output.textContent = "Starting Python…";
    try {
      const py = await ensurePyodide();
      await py.loadPackagesFromImports(code);
      button.textContent = "Running…";
      py.runPython("\nimport sys, io\n_studio_stdout = io.StringIO()\n_studio_stderr = io.StringIO()\nsys.stdout = _studio_stdout\nsys.stderr = _studio_stderr\n");
      const result = await py.runPythonAsync(code);
      const stdout = py.runPython("_studio_stdout.getvalue()");
      const stderr = py.runPython("_studio_stderr.getvalue()");
      output.textContent = (stdout || "") + (stderr || "") + (result !== undefined && result !== null ? "\n=> " + String(result) : "");
      if (!output.textContent.trim()) output.textContent = "Program finished successfully with no printed output.";
      runOk = true;
      feedback("Program ran successfully. Now press Check.", true);
    } catch (error) {
      output.textContent = "Python error:\n" + String(error?.message || error);
      feedback("Read the last line of the error, fix one thing, and run again.", false);
    } finally {
      button.disabled = false;
      button.textContent = "▶ Run";
    }
  }

  function feedback(message, good) {
    const box = qs("#studioFeedback");
    box.textContent = message;
    box.className = "studio-feedback" + (good === true ? " good" : good === false ? " bad" : "");
  }

  function toast(message) {
    let el = document.querySelector(".v2-toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "v2-toast";
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove("show"), 2500);
  }

  async function savePractice() {
    const key = lessonKey(state.courseId, state.lessonIndex);
    state.practice[key] = true;
    persist();
    if (state.user && typeof recordCloudPractice === "function") await recordCloudPractice(key);
  }

  async function checkLevel() {
    const data = levelData(levelIndex);
    const course = currentCourse();

    if (data.check === "learn") {
      saveLevel(course.id, state.lessonIndex, levelIndex);
      feedback("Concept level complete. Next: predict what the code will do.", true);
    } else if (data.check === "predict") {
      const hasPrediction = /^\s*#\s*Prediction:\s*.+/mi.test(qs("#studioEditor").value);
      if (!hasPrediction) return feedback("Write your prediction after # Prediction: first.", false);
      if (!runOk) return feedback("Run the code after making your prediction.", false);
      saveLevel(course.id, state.lessonIndex, levelIndex);
      feedback("Prediction level complete. Compare your prediction with the real output.", true);
    } else if (data.check === "modify") {
      if (!runOk) return feedback("Run your changed program successfully first.", false);
      if (normalize(runCode) === normalize(starterCode)) return feedback("Change at least one real Python line. Comment-only changes do not count.", false);
      try { await savePractice(); } catch { return feedback("Code worked, but cloud progress could not be saved. Try Check again.", false); }
      saveLevel(course.id, state.lessonIndex, levelIndex);
      feedback("Great — you changed real code and kept it working.", true);
    } else if (data.check === "build") {
      if (!runOk) return feedback("Your build must run successfully first.", false);
      if (normalize(runCode).split("\n").filter(Boolean).length < 2) return feedback("Build a little more working Python before checking.", false);
      try { await savePractice(); } catch { return feedback("Build worked, but cloud progress could not be saved.", false); }
      saveLevel(course.id, state.lessonIndex, levelIndex);
      feedback("Build complete. You're ready for mastery.", true);
    } else if (data.check === "master") {
      if (isDone(course.id, state.lessonIndex)) {
        const next = state.lessonIndex + 1;
        if (next < course.lessons.length && lessonUnlocked(course, next)) openWorkspace(course.id, next, 0);
        else openMap();
        return;
      }
      if (!state.practice[lessonKey(course.id, state.lessonIndex)]) return feedback("Finish the coding levels first.", false);
      setView("courses");
      setTimeout(() => document.querySelector("#masteryForm")?.scrollIntoView({behavior:"smooth",block:"start"}), 100);
      return;
    }

    renderBubbles();
    if (levelIndex + 1 < LEVELS.length) {
      setTimeout(() => { levelIndex += 1; renderWorkspaceLevel(); }, 550);
    }
  }

  function nextLesson() {
    for (let ci = 0; ci < COURSES.length; ci++) {
      const course = COURSES[ci];
      const li = course.lessons.findIndex((_, i) => !isDone(course.id, i));
      if (li >= 0 && lessonUnlocked(course, li)) return {course, index:li};
      if (li >= 0) break;
    }
    const course = COURSES[COURSES.length - 1];
    return {course, index:course.lessons.length - 1};
  }

  qs("#studioBackBtn")?.addEventListener("click", openMap);
  qs("#studioRunBtn")?.addEventListener("click", runStudio);
  qs("#studioCheckBtn")?.addEventListener("click", checkLevel);
  qs("#studioResetBtn")?.addEventListener("click", () => {
    qs("#studioEditor").value = starterCode;
    runOk = false;
    runCode = "";
    qs("#studioOutput").textContent = "Run your code to see output here.";
    feedback("Starter code restored.");
  });
  qs("#studioClearBtn")?.addEventListener("click", () => qs("#studioOutput").textContent = "");
  qs("#studioHintBtn")?.addEventListener("click", () => {
    const box = qs("#studioHintBox");
    box.hidden = !box.hidden;
  });
  qs("#studioAskAI")?.addEventListener("click", () => {
    const data = levelData(levelIndex);
    qs("#chatInput").value = "I'm working in Coding Learning Studio on " + currentCourse().title + ", lesson '" + currentLesson().title + "', level '" + LEVELS[levelIndex].label + "'. Help me learn without giving the full answer immediately. Task: " + data.text;
    setView("ai");
    qs("#chatInput").focus();
  });
  qs("#studioContinueBtn")?.addEventListener("click", () => {
    const next = nextLesson();
    openWorkspace(next.course.id, next.index);
  });
  qs("#studioEditor")?.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") runStudio();
    if (event.key === "Tab") {
      event.preventDefault();
      const t = event.currentTarget;
      const start = t.selectionStart;
      const end = t.selectionEnd;
      t.value = t.value.substring(0,start) + "    " + t.value.substring(end);
      t.selectionStart = t.selectionEnd = start + 4;
    }
  });

  document.querySelector("#startLearningBtn")?.addEventListener("click", () => setView("studio"));
  document.addEventListener("click", (event) => {
    const card = event.target.closest(".course-card");
    if (!card) return;
    selectedCourse = card.dataset.course || state.courseId;
    setTimeout(() => setView("studio"), 0);
  });

  const oldSetViewStudio = setView;
  setView = function(view) {
    oldSetViewStudio(view);
    if (view === "studio") openMap();
  };

  renderMap();
})();
