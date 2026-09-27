/* Coding Learning Studio - original level-based Python experience */
(() => {
  const BASE_LEVELS = [
    {kind:"learn", label:"Learn", icon:"1"},
    {kind:"predict", label:"Predict", icon:"2"},
    {kind:"modify", label:"Modify", icon:"3"},
    {kind:"build", label:"Build", icon:"4", project:true},
    {kind:"master", label:"Master", icon:"✓", mastery:true}
  ];
  const VIDEO_LEVEL = {kind:"video", label:"Video", icon:"▶"};
  const VIDEO_LESSONS = {
    "python-1:0": {
      title:"Welcome to Python",
      duration:66.12,
      heygenId:"64ed184239e7918cf79bb8c3e30b7c06",
      pageUrl:"https://app.heygen.com/videos/64ed184239e7918cf79bb8c3e30b7c06",
      src:"https://files2.heygen.ai/movio/video/64ed184239e7918cf79bb8c3e30b7c06/01005fbbbed741e583d560a2fb6eb3e4/caption.mp4?Expires=1791088371&Signature=pkfPDJJoBQrwqTw3KAyboiMHKV4s6S6HTHTBXoG6u4f1TxKk0YKjmBXeyfvb~FmLidKrZBWA2eq0f8b~4QgCjeD-IoBot0lmW8TsV5~N~dn0MT8jmfuR2GH5FuZM0McYYr3n22YPBTKYIqZoKL6ajgrBx6IzAbh3r4V25HrtooFXEyi7a3Dn0EagIZsKR1TpGJo1gQ6ZA9ecVZhnZtsJR0~Mqr1ggktMSqjFiFlkyb4y75xLiEePCR8x8-TlVoAI1OBIPXOpNoBIEFU8hMcFMfwf5WWeN15J6NMbSC~1ond0jROSwabeWqwMrQIUH8vSwC-cUfajuqEFKitX-TVHQw__&Key-Pair-Id=K38HBHX5LX3X2H"
    }
  };

  function levelsForLesson(courseId, lessonIndex) {
    return VIDEO_LESSONS[courseId + ":" + lessonIndex] ? [VIDEO_LEVEL, ...BASE_LEVELS] : BASE_LEVELS;
  }

  function currentLevels() {
    return levelsForLesson(state.courseId, state.lessonIndex);
  }

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
  const videoWatched = JSON.parse(localStorage.getItem("cl-studio-video-watched") || "{}");
  const codingActivity = JSON.parse(localStorage.getItem("cl-coding-activity-v1") || "{}");
  const expandedLessons = new Set();

  // The original first lesson had 5 numeric Studio levels. Shift only that
  // lesson's saved local level markers once so the new Video level can be index 0.
  if (localStorage.getItem("cl-studio-video-migration") !== "1") {
    for (let oldIndex = 4; oldIndex >= 0; oldIndex--) {
      const oldKey = "python-1:0:" + oldIndex;
      if (levelProgress[oldKey]) {
        levelProgress["python-1:0:" + (oldIndex + 1)] = true;
        delete levelProgress[oldKey];
      }
    }
    localStorage.setItem("cl-studio-level-progress", JSON.stringify(levelProgress));
    localStorage.setItem("cl-studio-video-migration", "1");
  }

  function levelKey(courseId, lessonIndex, index) {
    return courseId + ":" + lessonIndex + ":" + index;
  }

  function levelDone(courseId, lessonIndex, index) {
    if (isDone(courseId, lessonIndex)) return true;
    const level = levelsForLesson(courseId, lessonIndex)[index];
    if (!level) return false;
    if (level.kind === "video" && videoWatched[courseId + ":" + lessonIndex]) return true;
    if ((level.kind === "modify" || level.kind === "build") && state.practice[lessonKey(courseId, lessonIndex)]) return true;
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
    const levels = levelsForLesson(courseId, lessonIndex);
    if (isDone(courseId, lessonIndex)) return levels.length - 1;
    for (let i = 0; i < levels.length; i++) {
      if (!levelDone(courseId, lessonIndex, i)) return i;
    }
    return levels.length - 1;
  }

  function normalize(code) {
    return String(code).split("\n").map((line) => line.replace(/#.*$/, "").trim()).filter(Boolean).join("\n");
  }

  function localDateKey(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }

  function recordCodingActivity(type = "run") {
    const key = localDateKey();
    const day = codingActivity[key] || {runs:0, completions:0};
    if (type === "run") day.runs = Number(day.runs || 0) + 1;
    if (type === "completion") day.completions = Number(day.completions || 0) + 1;
    codingActivity[key] = day;
    localStorage.setItem("cl-coding-activity-v1", JSON.stringify(codingActivity));
    if (!qs("#studioMapPanel")?.hidden) renderCourseStats();
  }

  function codingDays() {
    return Object.entries(codingActivity).filter(([, v]) => Number(v?.runs || 0) + Number(v?.completions || 0) > 0).map(([k]) => k);
  }

  function codingStreak() {
    const active = new Set(codingDays());
    if (!active.size) return 0;
    let cursor = new Date();
    cursor.setHours(0,0,0,0);
    if (!active.has(localDateKey(cursor))) {
      cursor.setDate(cursor.getDate() - 1);
      if (!active.has(localDateKey(cursor))) return 0;
    }
    let streak = 0;
    while (active.has(localDateKey(cursor))) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }

  function courseActivityMetrics(course) {
    let total = 0;
    let done = 0;
    course.lessons.forEach((lesson, li) => {
      const levels = levelsForLesson(course.id, li);
      total += levels.length;
      levels.forEach((_, idx) => { if (levelDone(course.id, li, idx)) done++; });
    });
    return {total, done, pct: total ? Math.round(done / total * 100) : 0};
  }

  function activityDisplay(level) {
    const map = {
      video:{icon:"🎥", type:"Video"},
      learn:{icon:"📘", type:"Example"},
      predict:{icon:"✅", type:"Check for Understanding"},
      modify:{icon:"🛠️", type:"Debugging"},
      build:{icon:"⌨️", type:"Exercise"},
      master:{icon:"🏆", type:"Mastery Check"}
    };
    return map[level.kind] || {icon:"•",type:level.label};
  }

  function courseBadges(course) {
    const mastered = completedCount(course);
    const runs = Object.values(codingActivity).reduce((sum, day) => sum + Number(day?.runs || 0), 0);
    const streak = codingStreak();
    const xp = typeof totalXP === "function" ? totalXP() : 0;
    return [
      {icon:"🚀",name:"First Run",desc:"Run Python once",unlocked:runs >= 1},
      {icon:"⌨️",name:"Practice 5",desc:"Run code 5 times",unlocked:runs >= 5},
      {icon:"🎓",name:"First Lesson",desc:"Master one lesson",unlocked:mastered >= 1},
      {icon:"🔥",name:"3 Day Streak",desc:"Code three days in a row",unlocked:streak >= 3},
      {icon:"💯",name:"Course Complete",desc:"Finish this course",unlocked:coursePercent(course) >= 100},
      {icon:"⚡",name:"1K Points",desc:"Earn 1,000 XP",unlocked:xp >= 1000}
    ];
  }

  function renderCodingActivity() {
    const el = qs("#studioCodingActivity");
    if (!el) return;
    const days = [];
    for (let offset = 13; offset >= 0; offset--) {
      const date = new Date();
      date.setHours(0,0,0,0);
      date.setDate(date.getDate() - offset);
      const key = localDateKey(date);
      const day = codingActivity[key] || {runs:0,completions:0};
      const score = Number(day.runs || 0) + Number(day.completions || 0) * 2;
      days.push({date,key,score,runs:Number(day.runs || 0),completions:Number(day.completions || 0)});
    }
    const max = Math.max(1, ...days.map(x => x.score));
    const totalRuns = days.reduce((sum,x) => sum + x.runs,0);
    qs("#studioActivityTotal").textContent = totalRuns + (totalRuns === 1 ? " run" : " runs");
    el.innerHTML = days.map((day, i) => {
      const height = day.score ? Math.max(12, Math.round(day.score / max * 100)) : 5;
      const label = i % 2 === 0 ? day.date.toLocaleDateString(undefined,{weekday:"short"}).slice(0,1) : "";
      return "<div class='studio-activity-day' title='" + day.key + ": " + day.runs + " runs, " + day.completions + " completions'><div class='studio-activity-bar-wrap'><i style='height:" + height + "%' class='" + (day.score ? "active" : "") + "'></i></div><small>" + label + "</small></div>";
    }).join("");
  }

  function renderCourseStats() {
    const course = courseById(selectedCourse);
    if (!course) return;
    const metrics = courseActivityMetrics(course);
    const badges = courseBadges(course);
    const unlocked = badges.filter(x => x.unlocked).length;
    qs("#studioDashboardTitle").textContent = course.title + " • " + course.subtitle;
    qs("#studioDashboardSubtitle").textContent = course.description;
    qs("#studioCourseProgressPct").textContent = metrics.pct + "%";
    qs("#studioCourseProgressBar").style.width = metrics.pct + "%";
    qs("#studioCourseProgressText").textContent = metrics.done + " of " + metrics.total + " activities complete";
    qs("#studioActivitySummary").textContent = metrics.total + " activities";
    qs("#studioPoints").textContent = typeof totalXP === "function" ? totalXP() : 0;
    qs("#studioBadgesCount").textContent = unlocked;
    qs("#studioDaysCoding").textContent = codingDays().length;
    qs("#studioCodingStreak").textContent = codingStreak();
    qs("#studioBadges").innerHTML = badges.map(b => "<div class='studio-badge " + (b.unlocked ? "unlocked" : "") + "' title='" + escapeHtml(b.desc) + "'><span>" + b.icon + "</span><div><strong>" + escapeHtml(b.name) + "</strong><small>" + escapeHtml(b.desc) + "</small></div></div>").join("");
    renderCodingActivity();
  }

  function currentCourse() { return courseById(state.courseId); }
  function currentLesson() { return currentCourse().lessons[state.lessonIndex]; }

  function levelData(index) {
    const lesson = currentLesson();
    const course = currentCourse();
    const key = lessonKey(course.id, state.lessonIndex);
    const level = currentLevels()[index];

    if (level?.kind === "video") return {
      type:"VIDEO LESSON", title:"Watch: " + lesson.title,
      text:"Start with the short video lesson. It combines an AI instructor, code screens, captions, a prediction prompt, and a mini challenge.",
      concept:"<strong>Active watching</strong><p>Pause when the video asks you to predict. Do not worry about memorizing everything—the next levels make you use it.</p>",
      code:"", hint:"Use captions, pause, rewind, or change playback speed if you need more time.", check:"video"
    };

    if (level?.kind === "learn") return {
      type:"CONCEPT", title:"Learn: " + lesson.title, text:lesson.summary,
      concept:"<strong>Goals</strong><ul>" + lesson.learn.map((x) => "<li>" + escapeHtml(x) + "</li>").join("") + "</ul><p>Read the example and focus on what each important line does.</p>",
      code:lesson.code, hint:"Understand the purpose first. You do not need to memorize every symbol yet.", check:"learn"
    };

    if (level?.kind === "predict") return {
      type:"PREDICTION PUZZLE", title:"Predict before you run",
      text:"Add a first-line comment beginning with # Prediction: and write what you think the code will do. Then run it and compare.",
      concept:"<strong>Why predict?</strong><p>Prediction makes you trace the program instead of only reading it.</p>",
      code:"# Prediction: write your prediction here\n" + lesson.code,
      hint:"Trace values, conditions, loops, function calls, and print statements from top to bottom.", check:"predict"
    };

    if (level?.kind === "modify") return {
      type:"MODIFY", title:"Change the program",
      text:"Change at least one real Python line so the behavior changes, then run it successfully.",
      concept:"<strong>Modify challenge</strong><p>Change a value, condition, argument, collection item, loop range, or function call related to this lesson.</p>",
      code:lesson.code, hint:"Make one small change using this idea: " + escapeHtml(lesson.learn[0] || lesson.title), check:"modify"
    };

    if (level?.kind === "build") return {
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
    const levels = currentLevels();
    el.innerHTML = levels.map((level, i) => {
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
    const isVideo = data.check === "video";
    qs("#studioCourseName").textContent = course.title + " • " + course.subtitle;
    qs("#studioLessonName").textContent = lesson.title;
    qs("#studioLevelType").textContent = data.type;
    qs("#studioTaskTitle").textContent = data.title;
    qs("#studioTaskText").textContent = data.text;
    qs("#studioConceptBox").innerHTML = data.concept;
    qs("#studioHintBox").hidden = true;
    qs("#studioHintBox").textContent = data.hint;

    qs("#studioVideoPane").hidden = !isVideo;
    qs(".studio-editor-pane").hidden = isVideo;
    qs(".studio-output-pane").hidden = isVideo;

    if (isVideo) {
      const videoKey = course.id + ":" + state.lessonIndex;
      const meta = VIDEO_LESSONS[videoKey];
      const player = qs("#studioLessonVideo");
      qs("#studioVideoTitle").textContent = meta?.title || lesson.title;
      qs("#studioVideoFallback").href = meta?.pageUrl || "#";
      if (meta && player.dataset.videoId !== meta.heygenId) {
        player.src = meta.src;
        player.dataset.videoId = meta.heygenId;
        player.load();
      }
      const watched = Boolean(videoWatched[videoKey]);
      qs("#studioVideoProgress").textContent = watched ? "✓ Watched" : "0% watched";
      qs("#studioCheckBtn").disabled = !watched;
      qs("#studioCheckBtn").textContent = watched ? "Continue to Learn →" : "Watch video to continue";
    } else {
      qs("#studioOutput").textContent = "Run your code to see output here.";
      qs("#studioFeedback").textContent = "";
      qs("#studioFeedback").className = "studio-feedback";
      qs("#studioEditor").value = data.code;
      starterCode = data.code;
      runCode = "";
      runOk = false;
      qs("#studioRunBtn").disabled = data.check === "master";
      qs("#studioCheckBtn").disabled = false;
      qs("#studioCheckBtn").textContent = data.check === "master" ? (isDone(course.id, state.lessonIndex) ? "Continue →" : "Open mastery check →") : "Check →";
    }

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
    const defaultOpen = next >= 0 ? next : 0;
    const defaultKey = course.id + ":" + defaultOpen;
    if (![...expandedLessons].some(k => k.startsWith(course.id + ":"))) expandedLessons.add(defaultKey);

    let rows = "";
    course.lessons.forEach((lesson, i) => {
      const done = isDone(course.id, i);
      const unlocked = lessonUnlocked(course, i);
      const current = i === next && unlocked && !done;
      const key = course.id + ":" + i;
      const expanded = expandedLessons.has(key);
      const levels = levelsForLesson(course.id, i);
      const completedActivities = levels.filter((_, li) => levelDone(course.id, i, li)).length;
      const activityPct = levels.length ? Math.round(completedActivities / levels.length * 100) : 0;
      const activityRows = levels.map((level, li) => {
        const info = activityDisplay(level);
        const complete = levelDone(course.id, i, li);
        const locked = li > 0 && !levelDone(course.id, i, li - 1) && !done;
        return "<button class='studio-activity-row " + (complete ? "complete " : "") + (locked ? "locked" : "") + "' data-activity-lesson='" + i + "' data-activity-level='" + li + "'" + (locked ? " disabled" : "") + ">" +
          "<span class='studio-activity-icon'>" + info.icon + "</span>" +
          "<span class='studio-activity-type'>" + escapeHtml(info.type) + "</span>" +
          "<strong>" + (i + 1) + "." + (li + 1) + " " + escapeHtml(lesson.title) + "</strong>" +
          "<span class='studio-activity-status'>" + (complete ? "✓" : locked ? "🔒" : "→") + "</span></button>";
      }).join("");

      rows += "<article class='studio-module " + (expanded ? "expanded " : "") + (done ? "done " : "") + (current ? "current " : "") + (!unlocked && !done ? "locked" : "") + "'>" +
        "<button class='studio-module-head' data-lesson-toggle='" + i + "'>" +
          "<span class='studio-module-number'>" + (done ? "✓" : (i + 1)) + "</span>" +
          "<span class='studio-module-copy'><strong>" + (i + 1) + ". " + escapeHtml(lesson.title) + "</strong><small>" + escapeHtml(lesson.summary) + "</small></span>" +
          "<span class='studio-module-progress'><b>" + activityPct + "%</b><i><em style='width:" + activityPct + "%'></em></i></span>" +
          "<span class='studio-module-chevron'>" + (expanded ? "−" : "+") + "</span>" +
        "</button>" +
        "<div class='studio-activity-list'" + (expanded ? "" : " hidden") + ">" + activityRows + "</div></article>";
    });

    el.innerHTML = rows;

    el.querySelectorAll("[data-lesson-toggle]").forEach(button => button.addEventListener("click", () => {
      const i = Number(button.dataset.lessonToggle);
      const course = courseById(selectedCourse);
      if (!lessonUnlocked(course, i) && !isDone(course.id, i)) return toast("Finish the previous lesson first.");
      const key = course.id + ":" + i;
      if (expandedLessons.has(key)) expandedLessons.delete(key); else expandedLessons.add(key);
      renderLessonPath();
    }));

    el.querySelectorAll("[data-activity-lesson]").forEach(button => button.addEventListener("click", () => {
      const i = Number(button.dataset.activityLesson);
      const li = Number(button.dataset.activityLevel);
      const course = courseById(selectedCourse);
      if (!lessonUnlocked(course, i) && !isDone(course.id, i)) return toast("Finish the previous lesson first.");
      openWorkspace(course.id, i, li);
    }));
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
    renderCourseStats();
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
      recordCodingActivity("run");
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

    if (data.check === "video") {
      const videoKey = course.id + ":" + state.lessonIndex;
      if (!videoWatched[videoKey]) return;
      saveLevel(course.id, state.lessonIndex, levelIndex);
      recordCodingActivity("completion");
      toast("Video complete. Now use what you saw in the Learn level.");
    } else if (data.check === "learn") {
      saveLevel(course.id, state.lessonIndex, levelIndex);
      recordCodingActivity("completion");
      feedback("Concept level complete. Next: predict what the code will do.", true);
    } else if (data.check === "predict") {
      const hasPrediction = /^\s*#\s*Prediction:\s*.+/mi.test(qs("#studioEditor").value);
      if (!hasPrediction) return feedback("Write your prediction after # Prediction: first.", false);
      if (!runOk) return feedback("Run the code after making your prediction.", false);
      saveLevel(course.id, state.lessonIndex, levelIndex);
      recordCodingActivity("completion");
      feedback("Prediction level complete. Compare your prediction with the real output.", true);
    } else if (data.check === "modify") {
      if (!runOk) return feedback("Run your changed program successfully first.", false);
      if (normalize(runCode) === normalize(starterCode)) return feedback("Change at least one real Python line. Comment-only changes do not count.", false);
      try { await savePractice(); } catch { return feedback("Code worked, but cloud progress could not be saved. Try Check again.", false); }
      saveLevel(course.id, state.lessonIndex, levelIndex);
      recordCodingActivity("completion");
      feedback("Great — you changed real code and kept it working.", true);
    } else if (data.check === "build") {
      if (!runOk) return feedback("Your build must run successfully first.", false);
      if (normalize(runCode).split("\n").filter(Boolean).length < 2) return feedback("Build a little more working Python before checking.", false);
      try { await savePractice(); } catch { return feedback("Build worked, but cloud progress could not be saved.", false); }
      saveLevel(course.id, state.lessonIndex, levelIndex);
      recordCodingActivity("completion");
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
    if (levelIndex + 1 < currentLevels().length) {
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

  qs("#studioLessonVideo")?.addEventListener("timeupdate", (event) => {
    const player = event.currentTarget;
    if (!player.duration || !Number.isFinite(player.duration)) return;
    const pct = Math.min(100, Math.round((player.currentTime / player.duration) * 100));
    const key = state.courseId + ":" + state.lessonIndex;
    const alreadyWatched = Boolean(videoWatched[key]);
    qs("#studioVideoProgress").textContent = alreadyWatched ? "✓ Watched" : pct + "% watched";
    if (!alreadyWatched && pct >= 90) {
      videoWatched[key] = true;
      localStorage.setItem("cl-studio-video-watched", JSON.stringify(videoWatched));
      qs("#studioVideoProgress").textContent = "✓ Watched";
      qs("#studioCheckBtn").disabled = false;
      qs("#studioCheckBtn").textContent = "Continue to Learn →";
      renderBubbles();
    }
  });
  qs("#studioLessonVideo")?.addEventListener("ended", () => {
    const key = state.courseId + ":" + state.lessonIndex;
    const wasWatched = Boolean(videoWatched[key]);
    videoWatched[key] = true;
    localStorage.setItem("cl-studio-video-watched", JSON.stringify(videoWatched));
    qs("#studioVideoProgress").textContent = "✓ Watched";
    qs("#studioCheckBtn").disabled = false;
    qs("#studioCheckBtn").textContent = "Continue to Learn →";
    if (!wasWatched) recordCodingActivity("completion");
    renderBubbles();
  });
  qs("#studioLessonVideo")?.addEventListener("error", () => {
    qs("#studioVideoProgress").textContent = "Playback unavailable";
    toast("The hosted video link could not load. Use Open in HeyGen for the source video.");
  });

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
    qs("#chatInput").value = "I'm working in Coding Learning Studio on " + currentCourse().title + ", lesson '" + currentLesson().title + "', level '" + currentLevels()[levelIndex].label + "'. Help me learn without giving the full answer immediately. Task: " + data.text;
    setView("ai");
    qs("#chatInput").focus();
  });
  qs("#studioContinueBtn")?.addEventListener("click", () => {
    const next = nextLesson();
    openWorkspace(next.course.id, next.index);
  });
  qs("#runCodeBtn")?.addEventListener("click", () => recordCodingActivity("run"));

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
