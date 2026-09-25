
/* Coding Learning V2 enhancements */
(() => {
  const PLAYGROUND_EXAMPLES = {
    rps: `import random

def play_rps():
    choices = ["rock", "paper", "scissors"]
    print("=== Rock, Paper, Scissors ===")
    user_choice = input("Choose rock, paper, or scissors: ").strip().lower()

    if user_choice not in choices:
        print("Invalid choice. Try rock, paper, or scissors.")
        return

    computer_choice = random.choice(choices)
    print(f"Computer chose: {computer_choice}")

    if user_choice == computer_choice:
        print("It's a tie!")
    elif (
        (user_choice == "rock" and computer_choice == "scissors") or
        (user_choice == "paper" and computer_choice == "rock") or
        (user_choice == "scissors" and computer_choice == "paper")
    ):
        print("You win!")
    else:
        print("You lose! Computer wins.")

play_rps()`,
    guess: `import random

secret = random.randint(1, 20)
attempts = 0

print("Guess the number from 1 to 20!")

while True:
    guess = int(input("Your guess: "))
    attempts += 1

    if guess < secret:
        print("Too low.")
    elif guess > secret:
        print("Too high.")
    else:
        print(f"Correct! You got it in {attempts} tries.")
        break`,
    calculator: `def calculate(a, op, b):
    if op == "+":
        return a + b
    if op == "-":
        return a - b
    if op == "*":
        return a * b
    if op == "/":
        if b == 0:
            return "Cannot divide by zero"
        return a / b
    return "Unknown operator"

a = float(input("First number: "))
op = input("Operator (+ - * /): ").strip()
b = float(input("Second number: "))

print("Result:", calculate(a, op, b))`,
    oop: `class Character:
    def __init__(self, name, hp=100):
        self.name = name
        self.hp = hp

    def attack(self, target, damage):
        target.hp = max(0, target.hp - damage)
        print(f"{self.name} hit {target.name} for {damage} damage!")

hero = Character("Nova", 120)
enemy = Character("Shadow", 90)

hero.attack(enemy, 35)
print(f"{enemy.name} HP: {enemy.hp}")`,
    data: `scores = [84, 92, 77, 95, 88, 91]

average = sum(scores) / len(scores)
highest = max(scores)
lowest = min(scores)
passed = [score for score in scores if score >= 80]

print("Average:", round(average, 1))
print("Highest:", highest)
print("Lowest:", lowest)
print("80+ scores:", passed)`
  };

  state.tutorMode = state.tutorMode || "coach";

  function showToast(message) {
    let toast = document.querySelector(".v2-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "v2-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function getMetrics() {
    const totalLessons = COURSES.reduce((sum, course) => sum + course.lessons.length, 0);
    const mastered = Object.values(state.completed).filter(Boolean).length;
    const practiceCount = Object.values(state.practice).filter(Boolean).length;
    const reviewStages = Object.values(state.reviews).map(r => Number(r?.stage || 0));
    const reviewed = reviewStages.filter(stage => stage > 0).length;
    const dueKeys = Object.entries(state.reviews)
      .filter(([, review]) => review?.next && Number(review.next) <= Date.now())
      .map(([key]) => key);

    return {
      totalLessons,
      mastered,
      practiceCount,
      reviewed,
      dueKeys,
      pct: totalLessons ? Math.round(mastered / totalLessons * 100) : 0,
      xp: totalXP()
    };
  }

  function getCourseProgress(course) {
    return {
      done: completedCount(course),
      pct: coursePercent(course)
    };
  }

  function getNextLesson() {
    const preferred = courseById(state.courseId);
    let index = preferred.lessons.findIndex((_, i) => !isDone(preferred.id, i));
    if (index >= 0) return { course: preferred, index, lesson: preferred.lessons[index] };

    for (const course of COURSES) {
      index = course.lessons.findIndex((_, i) => !isDone(course.id, i));
      if (index >= 0) return { course, index, lesson: course.lessons[index] };
    }

    const last = COURSES[COURSES.length - 1];
    return { course: last, index: last.lessons.length - 1, lesson: last.lessons[last.lessons.length - 1] };
  }

  function parseReviewKey(key) {
    const [courseId, index] = String(key).split(":");
    const course = courseById(courseId);
    const lessonIndex = Number(index);
    return { course, lessonIndex, lesson: course.lessons[lessonIndex] };
  }

  function localAchievements(profile = {}) {
    const m = getMetrics();
    const p1 = getCourseProgress(COURSES[0]).pct;
    const p2 = getCourseProgress(COURSES[1]).pct;
    const p3 = getCourseProgress(COURSES[2]).pct;
    const streak = Number(profile.current_streak || 0);
    return [
      { icon:"🌱", name:"First Step", desc:"Master 1 lesson", unlocked:m.mastered >= 1 },
      { icon:"⌨️", name:"Hands On", desc:"Run 5 lesson practices", unlocked:m.practiceCount >= 5 },
      { icon:"🧠", name:"Memory", desc:"Pass a spaced review", unlocked:m.reviewed >= 1 },
      { icon:"🔥", name:"On Fire", desc:"Reach a 3-day streak", unlocked:streak >= 3 },
      { icon:"🐍", name:"Python I", desc:"Finish Foundations", unlocked:p1 >= 100 },
      { icon:"⚡", name:"Python II", desc:"Finish Intermediate", unlocked:p2 >= 100 },
      { icon:"💎", name:"1K Club", desc:"Earn 1,000 XP", unlocked:m.xp >= 1000 },
      { icon:"👑", name:"Python Master", desc:"Finish all courses", unlocked:p3 >= 100 && m.pct >= 100 }
    ];
  }

  async function getCloudDashboardData() {
    if (!state.user || !supabaseClient) return { profile: null, events: [] };

    const since = new Date();
    since.setHours(0, 0, 0, 0);
    since.setDate(since.getDate() - 6);

    const [profileResult, eventsResult] = await Promise.all([
      supabaseClient
        .from("profiles")
        .select("display_name,total_xp,current_streak,best_streak,last_active_on")
        .eq("user_id", state.user.id)
        .single(),
      supabaseClient
        .from("xp_events")
        .select("xp,created_at,event_type")
        .eq("user_id", state.user.id)
        .gte("created_at", since.toISOString())
        .order("created_at", { ascending: true })
    ]);

    return {
      profile: profileResult.data || null,
      events: eventsResult.data || []
    };
  }

  function renderActivity(events) {
    const container = document.querySelector("#activityChart");
    if (!container) return;

    const days = [];
    for (let offset = 6; offset >= 0; offset--) {
      const d = new Date();
      d.setHours(0,0,0,0);
      d.setDate(d.getDate() - offset);
      days.push({ date:d, xp:0 });
    }

    for (const event of events) {
      const eventDate = new Date(event.created_at);
      const match = days.find(day =>
        day.date.getFullYear() === eventDate.getFullYear() &&
        day.date.getMonth() === eventDate.getMonth() &&
        day.date.getDate() === eventDate.getDate()
      );
      if (match) match.xp += Number(event.xp || 0);
    }

    if (!state.user && !events.length) {
      days[6].xp = getMetrics().mastered * 100;
    }

    const max = Math.max(100, ...days.map(day => day.xp));
    const weekXP = days.reduce((sum, day) => sum + day.xp, 0);
    document.querySelector("#weekXP").textContent = weekXP + " XP";
    container.innerHTML = days.map(day => {
      const height = Math.max(4, Math.round((day.xp / max) * 100));
      const label = day.date.toLocaleDateString(undefined, { weekday:"short" }).slice(0,3);
      return `<div class="activity-day" title="${day.xp} XP">
        <div class="activity-bar-wrap"><div class="activity-bar" style="height:${height}%"></div></div>
        <small>${label}</small>
      </div>`;
    }).join("");
  }

  function renderReviewQueue() {
    const container = document.querySelector("#reviewQueue");
    if (!container) return;
    const metrics = getMetrics();
    const all = Object.entries(state.reviews)
      .filter(([, review]) => review?.next)
      .sort((a,b) => Number(a[1].next) - Number(b[1].next));

    if (!all.length) {
      container.innerHTML = '<div class="queue-empty">Master lessons to create a spaced-review queue.</div>';
      return;
    }

    container.innerHTML = all.slice(0,6).map(([key, review]) => {
      const { course, lessonIndex, lesson } = parseReviewKey(key);
      const due = Number(review.next) <= Date.now();
      const when = due ? "Due now" : new Date(Number(review.next)).toLocaleDateString(undefined,{month:"short",day:"numeric"});
      return `<div class="review-item" data-review-key="${key}">
        <div class="review-icon">${course.icon}</div>
        <div class="review-copy"><strong>${escapeHtml(lesson?.title || "Lesson")}</strong><span>${escapeHtml(course.title)} • Review stage ${Number(review.stage || 0)}</span></div>
        <div class="review-due">${when}</div>
      </div>`;
    }).join("");

    container.querySelectorAll(".review-item").forEach(item => item.addEventListener("click", () => {
      const { course, lessonIndex } = parseReviewKey(item.dataset.reviewKey);
      state.courseId = course.id;
      state.lessonIndex = lessonIndex;
      persist();
      setView("courses");
    }));

    document.querySelector("#dashReviews").textContent = metrics.dueKeys.length + " due";
  }

  function renderAchievements(profile) {
    const list = localAchievements(profile || {});
    const unlocked = list.filter(item => item.unlocked).length;
    document.querySelector("#achievementCount").textContent = unlocked + " unlocked";
    document.querySelector("#achievementGrid").innerHTML = list.map(item => `
      <div class="achievement ${item.unlocked ? "unlocked" : ""}">
        <span class="achievement-icon">${item.icon}</span>
        <strong>${escapeHtml(item.name)}</strong>
        <small>${escapeHtml(item.desc)}</small>
      </div>`).join("");
  }

  function renderSkillMap() {
    document.querySelector("#skillMap").innerHTML = COURSES.map(course => {
      const progress = getCourseProgress(course);
      return `<div class="skill-node" data-skill-course="${course.id}">
        <div class="skill-node-top"><strong>${course.title}: ${course.subtitle}</strong><span>${course.icon}</span></div>
        <p>${escapeHtml(course.description)}</p>
        <div class="mini-progress"><div style="width:${progress.pct}%;background:${course.color}"></div></div>
        <small>${progress.done}/${course.lessons.length} mastered • ${progress.pct}%</small>
      </div>`;
    }).join("");

    document.querySelectorAll("[data-skill-course]").forEach(node => node.addEventListener("click", () => {
      state.courseId = node.dataset.skillCourse;
      state.lessonIndex = 0;
      persist();
      setView("courses");
    }));
  }

  async function renderV2Dashboard() {
    const metrics = getMetrics();
    const next = getNextLesson();
    const courseProgress = getCourseProgress(next.course);
    const level = Math.floor(metrics.xp / 500) + 1;
    const within = metrics.xp % 500;
    const cloud = await getCloudDashboardData();
    const profile = cloud.profile || {};
    const name = profile.display_name || state.user?.email?.split("@")[0] || "Coder";

    document.querySelector("#dashGreeting").textContent = state.user ? `Welcome back, ${name}` : "Your learning dashboard";
    document.querySelector("#dashLevel").textContent = level;
    document.querySelector("#dashLevelXP").textContent = within + " / 500 XP to next level";
    document.querySelector("#dashLevelBar").style.width = Math.round(within / 500 * 100) + "%";
    document.querySelector("#dashStreak").textContent = Number(profile.current_streak || 0) + " days";
    document.querySelector("#dashBestStreak").textContent = "Best: " + Number(profile.best_streak || 0) + " days";
    document.querySelector("#dashMastered").textContent = metrics.mastered;
    document.querySelector("#dashMasteryPct").textContent = metrics.pct + "% of curriculum";
    document.querySelector("#dashReviews").textContent = metrics.dueKeys.length + " due";

    const badge = document.querySelector("#dashCloudBadge");
    badge.textContent = state.user ? "☁ Cloud synced" : "Local only";
    badge.classList.toggle("online", Boolean(state.user));

    document.querySelector("#dashContinueCard").innerHTML = `
      <div class="continue-card-v2" style="--course:${next.course.color}">
        <div class="course-line"><span>${next.course.icon}</span><span>${escapeHtml(next.course.title)} • ${escapeHtml(next.course.subtitle)}</span></div>
        <h3>${escapeHtml(next.lesson.title)}</h3>
        <p>${escapeHtml(next.lesson.summary)}</p>
        <div class="continue-actions">
          <div class="continue-progress">
            <span><i>Course progress</i><b>${courseProgress.pct}%</b></span>
            <div class="mini-progress"><div style="width:${courseProgress.pct}%;background:${next.course.color}"></div></div>
          </div>
          <button class="btn primary" id="continueLessonV2">Open lesson →</button>
        </div>
      </div>`;

    document.querySelector("#continueLessonV2").addEventListener("click", () => {
      state.courseId = next.course.id;
      state.lessonIndex = next.index;
      persist();
      setView("courses");
    });

    renderActivity(cloud.events || []);
    renderReviewQueue();
    renderAchievements(profile);
    renderSkillMap();
  }

  function enhanceLessonV2() {
    const viewer = document.querySelector("#lessonViewer");
    if (!viewer) return;

    const key = lessonKey(state.courseId, state.lessonIndex);
    const done = isDone(state.courseId, state.lessonIndex);
    const practiced = Boolean(state.practice[key]);

    const kicker = viewer.querySelector(".lesson-kicker");
    if (kicker && !kicker.querySelector(".focus-toggle")) {
      const button = document.createElement("button");
      button.className = "small-btn focus-toggle";
      button.textContent = document.body.classList.contains("focus-learning") ? "Exit focus" : "Focus mode";
      button.addEventListener("click", () => {
        document.body.classList.toggle("focus-learning");
        button.textContent = document.body.classList.contains("focus-learning") ? "Exit focus" : "Focus mode";
      });
      kicker.appendChild(button);
    }

    if (!viewer.querySelector(".lesson-progress-strip")) {
      const strip = document.createElement("div");
      strip.className = "lesson-progress-strip";
      const flags = [true, done, practiced, done, done];
      strip.innerHTML = flags.map((flag, i) => `<span class="${flag ? (done ? "done" : "on") : ""}" title="${["Learn","Recall","Code","Check","Master"][i]}"></span>`).join("");
      const summary = viewer.querySelector(".lesson-summary");
      summary?.insertAdjacentElement("afterend", strip);
    }

    const list = document.querySelectorAll(".lesson-item");
    list.forEach(x => x.classList.remove("current-next"));
    const course = courseById(state.courseId);
    const nextIndex = course.lessons.findIndex((_, i) => !isDone(course.id, i));
    if (nextIndex >= 0) {
      const node = document.querySelector(`.lesson-item[data-index="${nextIndex}"]`);
      if (node && nextIndex !== state.lessonIndex) node.classList.add("current-next");
    }
  }

  function setupPlaygroundV2() {
    const select = document.querySelector("#exampleSelect");
    const editor = document.querySelector("#codeEditor");
    if (!select || !editor) return;

    const saved = localStorage.getItem("cl-v2-playground-code");
    if (saved && !state.activePracticeKey) editor.value = saved;

    select.addEventListener("change", () => {
      const code = PLAYGROUND_EXAMPLES[select.value];
      if (!code) return;
      editor.value = code;
      localStorage.setItem("cl-v2-playground-code", code);
      showToast("Example loaded. Change it and make it yours.");
      select.value = "";
    });

    editor.addEventListener("input", () => {
      localStorage.setItem("cl-v2-playground-code", editor.value);
    });
  }

  function setupTutorModes() {
    const container = document.querySelector("#tutorModes");
    if (!container) return;
    container.addEventListener("click", event => {
      const button = event.target.closest("[data-mode]");
      if (!button) return;
      state.tutorMode = button.dataset.mode;
      container.querySelectorAll("button").forEach(x => x.classList.toggle("active", x === button));
      const labels = {
        coach:"Coach mode: hints, explanations, and next steps.",
        socratic:"Socratic mode: Qwen will teach mostly by asking you questions.",
        debug:"Debugger mode: focus on tracing bugs and testing fixes.",
        quiz:"Quiz mode: Qwen will test you instead of giving answers."
      };
      showToast(labels[state.tutorMode]);
    });
  }

  const originalSetView = setView;
  setView = function(view) {
    originalSetView(view);
    if (view === "dashboard") renderV2Dashboard();
    if (view === "courses") setTimeout(enhanceLessonV2, 0);
  };

  const originalRenderLesson = renderLesson;
  renderLesson = function() {
    originalRenderLesson();
    enhanceLessonV2();
  };

  const originalRenderCourseWorkspace = renderCourseWorkspace;
  renderCourseWorkspace = function() {
    originalRenderCourseWorkspace();
    enhanceLessonV2();
  };

  if (typeof loadCloudProgress === "function") {
    const originalLoadCloudProgress = loadCloudProgress;
    loadCloudProgress = async function() {
      const result = await originalLoadCloudProgress();
      if (state.currentView === "dashboard") await renderV2Dashboard();
      return result;
    };
  }

  document.querySelector("#dashContinueBtn")?.addEventListener("click", () => {
    const next = getNextLesson();
    state.courseId = next.course.id;
    state.lessonIndex = next.index;
    persist();
    setView("courses");
  });

  document.querySelector("#reviewAllBtn")?.addEventListener("click", () => {
    const first = getMetrics().dueKeys[0];
    if (!first) return showToast("No reviews are due right now.");
    const { course, lessonIndex } = parseReviewKey(first);
    state.courseId = course.id;
    state.lessonIndex = lessonIndex;
    persist();
    setView("courses");
  });

  setupPlaygroundV2();
  setupTutorModes();
  enhanceLessonV2();
})();
