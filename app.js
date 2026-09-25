const COURSES = [
  {
    id: "python-1",
    title: "Python 1",
    subtitle: "Foundations",
    icon: "🐍",
    color: "#45e0ff",
    description: "Start from zero and learn the core Python skills every programmer needs.",
    lessons: [
      {title:"Welcome to Python",summary:"Learn what Python is, what it is used for, and how a Python program runs.",learn:["What Python is and why it is popular","How source code becomes program behavior","How to use comments and the interactive REPL"],code:`# Your first Python program
print("Hello, developer!")

# Comments start with #
print("Python is readable and powerful.")`,challenge:"Change the program so it prints your name, your favorite app, and one thing you want to build."},
      {title:"Variables & Data Types",summary:"Store information using variables and understand Python's most common built-in types.",learn:["Variables and assignment","str, int, float, bool, and None","The type() function and dynamic typing"],code:`username = "Alex"
level = 1
accuracy = 98.5
is_learning = True

print(username, level)
print(type(accuracy))`,challenge:"Create variables for a game character: name, health, speed, and whether the player is alive. Print each value."},
      {title:"Input, Output & Conversion",summary:"Interact with users and convert text input into useful values.",learn:["input() and print()","String formatting with f-strings","int(), float(), str(), and bool()"],code:`name = input("Name: ")
age = int(input("Age: "))

print(f"Hi {name}! Next year you will be {age + 1}.")`,challenge:"Ask for two numbers and print their sum, difference, product, and average."},
      {title:"Operators",summary:"Use arithmetic, comparison, assignment, identity, and membership operators.",learn:["Arithmetic operators","Comparison operators","and, or, not","in and not in"],code:`score = 87
passed = score >= 70
bonus = score > 90 or score == 87

print(passed)
print(bonus)
print("py" in "python")`,challenge:"Create a temperature variable and print True if it is between 60 and 80 inclusive."},
      {title:"Conditions",summary:"Make programs choose what to do using if, elif, and else.",learn:["if statements","elif chains","Nested conditions","Truthiness"],code:`score = 84

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
else:
    grade = "Keep practicing"

print(grade)`,challenge:"Build a simple ticket-price checker with at least three age ranges."},
      {title:"Loops",summary:"Repeat work efficiently with for loops, while loops, range(), break, and continue.",learn:["for loops","while loops","range()","break and continue"],code:`for level in range(1, 6):
    if level == 3:
        print("Boss fight!")
        continue
    print(f"Level {level}")`,challenge:"Print the numbers 1–30, but print Fizz for multiples of 3 and Buzz for multiples of 5."},
      {title:"Strings",summary:"Work deeply with text using indexing, slicing, methods, and formatting.",learn:["Indexing and slicing","Useful string methods","f-strings","Immutability"],code:`message = "  learn Python  "
clean = message.strip().title()

print(clean)
print(clean[0:5])
print(clean.replace("Python", "Coding"))`,challenge:"Ask for a sentence and print its uppercase form, word count, first character, and reversed text."},
      {title:"Lists & Tuples",summary:"Store ordered collections and choose when data should be mutable or fixed.",learn:["Creating and indexing lists","append, remove, pop, sort","Slicing","Tuples and unpacking"],code:`skills = ["Python", "Git"]
skills.append("SQL")
skills.sort()

x, y = (10, 20)
print(skills)
print(x, y)`,challenge:"Create a to-do list, add three tasks, remove one, and print the remaining tasks with numbers."},
      {title:"Dictionaries & Sets",summary:"Represent key-value data and unique collections.",learn:["Dictionary keys and values","get(), items(), update()","Set uniqueness","Set operations"],code:`student = {"name": "Mia", "xp": 120}
student["level"] = 2

tags = {"python", "coding", "python"}
print(student.get("xp"))
print(tags)`,challenge:"Build a dictionary for a product with name, price, stock, and category. Update the stock and print every key/value pair."},
      {title:"Functions",summary:"Organize reusable logic with parameters, return values, scope, and default arguments.",learn:["def and calling functions","Parameters vs arguments","return","Local/global scope basics"],code:`def calculate_total(price, tax_rate=0.07):
    tax = price * tax_rate
    return price + tax

print(calculate_total(20))
print(calculate_total(20, 0.09))`,challenge:"Write a function called grade(score) that returns A, B, C, D, or F."},
      {title:"Errors & Exceptions",summary:"Understand common errors and recover from expected problems safely.",learn:["Syntax vs runtime errors","try/except","else/finally","Raising errors"],code:`try:
    age = int(input("Age: "))
    if age < 0:
        raise ValueError("Age cannot be negative")
except ValueError as error:
    print("Problem:", error)
else:
    print("Accepted!")`,challenge:"Make a safe division program that handles invalid numbers and division by zero."},
      {title:"Python 1 Final Project",summary:"Combine the foundations into a complete command-line project.",learn:["Planning a small program","Breaking work into functions","Validating input","Refactoring repeated code"],code:`# Project: Study Tracker
# Required features:
# 1. Add a study session
# 2. List sessions
# 3. Calculate total minutes
# 4. Show the longest session
# 5. Keep the menu running until Quit

sessions = []
# Build from here...`,challenge:"Build the Study Tracker. Bonus: organize each menu action into its own function and prevent bad input from crashing the app."}
    ]
  },
  {
    id: "python-2",
    title: "Python 2",
    subtitle: "Intermediate",
    icon: "⚡",
    color: "#9b6cff",
    description: "Build larger programs with files, OOP, testing, databases, APIs, and async code.",
    lessons: [
      {title:"Modules, Packages & Environments",summary:"Organize Python projects and isolate dependencies.",learn:["import styles","Creating your own modules","Packages and __init__.py","venv and dependency isolation"],code:`# math_tools.py
def double(n):
    return n * 2

# main.py
from math_tools import double
print(double(21))`,challenge:"Split a calculator into main.py and a separate calculations.py module."},
      {title:"Files, JSON & CSV",summary:"Persist data and exchange structured information.",learn:["with open(...)","Reading/writing text","json load/dump","csv reader/writer"],code:`import json

profile = {"name": "Coder", "xp": 450}

with open("profile.json", "w") as file:
    json.dump(profile, file, indent=2)`,challenge:"Save a list of study sessions to JSON, then load it and calculate the total duration."},
      {title:"Comprehensions",summary:"Transform and filter collections using concise Python syntax.",learn:["List comprehensions","Conditional comprehensions","Dictionary/set comprehensions","When normal loops are clearer"],code:`numbers = range(1, 11)
squares = [n * n for n in numbers]
even_squares = [n*n for n in numbers if n % 2 == 0]

print(even_squares)`,challenge:"Given a list of words, create a dictionary mapping each word to its length, excluding words shorter than 4 characters."},
      {title:"Object-Oriented Programming",summary:"Model real systems with classes, instances, methods, inheritance, and composition.",learn:["Classes and objects","__init__","Instance/class attributes","Inheritance vs composition"],code:`class Player:
    def __init__(self, name, hp=100):
        self.name = name
        self.hp = hp

    def take_damage(self, amount):
        self.hp = max(0, self.hp - amount)

hero = Player("Nova")
hero.take_damage(25)
print(hero.hp)`,challenge:"Build BankAccount and SavingsAccount classes. Add deposit, withdraw, and interest behavior with validation."},
      {title:"Dataclasses & Type Hints",summary:"Make data models clearer and improve editor/static-analysis support.",learn:["Function annotations","list[str] and dict types","@dataclass","Optional values and unions"],code:`from dataclasses import dataclass

@dataclass
class Course:
    title: str
    lessons: int
    completed: bool = False

python = Course("Python 2", 12)
print(python)`,challenge:"Create a typed dataclass for a Product and a function that returns the total value of a list of products."},
      {title:"Iterators & Generators",summary:"Process data lazily and understand Python's iteration protocol.",learn:["iter() and next()","Iterable vs iterator","yield","Generator expressions"],code:`def countdown(start):
    while start > 0:
        yield start
        start -= 1

for number in countdown(3):
    print(number)`,challenge:"Write a generator that yields only valid numeric values from a mixed list."},
      {title:"Decorators",summary:"Wrap reusable behavior around functions without rewriting their bodies.",learn:["Functions as values","Closures","Decorator syntax","functools.wraps"],code:`from functools import wraps

def announce(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print("Running...")
        return func(*args, **kwargs)
    return wrapper

@announce
def build():
    print("Built!")

build()`,challenge:"Create a @timer decorator that reports how long a function takes."},
      {title:"Testing & Debugging",summary:"Prove code works and find failures systematically.",learn:["Assertions","Unit-test structure","pytest concepts","Debugger and traceback reading"],code:`def add(a, b):
    return a + b

def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0`,challenge:"Write tests for a function that validates passwords. Include normal, boundary, and invalid cases."},
      {title:"Regular Expressions",summary:"Search and validate text patterns with the re module.",learn:["Raw strings","Character classes","Groups","findall/search/fullmatch"],code:`import re

text = "Contact dev@example.com"
match = re.search(r"[\w.-]+@[\w.-]+\.\w+", text)

if match:
    print(match.group())`,challenge:"Extract every hashtag from a social post and validate a simple US ZIP code."},
      {title:"APIs & HTTP",summary:"Understand REST-style APIs, status codes, JSON responses, and robust requests.",learn:["HTTP methods","Status codes","JSON APIs","Timeouts and error handling"],code:`# With the requests package:
import requests

response = requests.get(
    "https://api.github.com",
    timeout=10
)
response.raise_for_status()
print(response.status_code)`,challenge:"Call a public JSON API, handle failure safely, and print three fields from the response."},
      {title:"SQLite Databases",summary:"Store structured data locally with SQL and parameterized queries.",learn:["Connections and cursors","CREATE/INSERT/SELECT","Parameterized queries","Transactions"],code:`import sqlite3

with sqlite3.connect("learning.db") as db:
    db.execute(
        "CREATE TABLE IF NOT EXISTS lessons (name TEXT, done INTEGER)"
    )
    db.execute(
        "INSERT INTO lessons VALUES (?, ?)",
        ("OOP", 1)
    )`,challenge:"Create a small task database with add, list, complete, and delete operations. Never build SQL using string concatenation."},
      {title:"Async Python",summary:"Use async/await for programs that spend time waiting on I/O.",learn:["Coroutines","async def and await","asyncio.run","Gathering concurrent tasks"],code:`import asyncio

async def work(name, delay):
    await asyncio.sleep(delay)
    return f"{name} done"

async def main():
    results = await asyncio.gather(
        work("A", 1),
        work("B", 1)
    )
    print(results)

asyncio.run(main())`,challenge:"Simulate five downloads with random delays and run them concurrently using asyncio.gather()."},
      {title:"Python 2 Final Project",summary:"Create a real intermediate application using multiple modules and persistent data.",learn:["Project structure","Separation of concerns","Persistence","Testing important logic"],code:`# Project: Personal Learning API Client
# Features:
# - CLI menu
# - Fetch data from an API
# - Cache useful results in SQLite
# - Export selected data to JSON
# - Tests for parsing/validation
# - Graceful error handling`,challenge:"Build the project with at least three modules, a database layer, API layer, service layer, and tests for pure logic."}
    ]
  },
  {
    id: "python-final",
    title: "Python Final",
    subtitle: "Advanced",
    icon: "🧠",
    color: "#54e6a5",
    description: "Master advanced Python patterns, performance, architecture, concurrency, packaging, and production thinking.",
    lessons: [
      {title:"The Python Data Model",summary:"Understand the protocols behind Python objects and operator behavior.",learn:["Dunder methods","Object representation","Equality/hash","Callable and container protocols"],code:`class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"`,challenge:"Create a Money class supporting +, ==, repr(), and validation that prevents combining different currencies."},
      {title:"Advanced OOP & Protocol Design",summary:"Use composition, abstract interfaces, properties, slots, and protocols thoughtfully.",learn:["ABC concepts","Properties","Composition","Structural typing"],code:`from typing import Protocol

class Saves(Protocol):
    def save(self, data: str) -> None: ...

def persist(store: Saves, data: str) -> None:
    store.save(data)`,challenge:"Design interchangeable FileStore and MemoryStore classes that satisfy one storage protocol."},
      {title:"Closures & Advanced Decorators",summary:"Build configurable decorators and reason about captured state.",learn:["LEGB and closures","Decorator factories","Class decorators","Preserving metadata"],code:`from functools import wraps

def retry(times=3):
    def decorate(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            last = None
            for _ in range(times):
                try:
                    return func(*args, **kwargs)
                except Exception as exc:
                    last = exc
            raise last
        return wrapper
    return decorate`,challenge:"Build a configurable cache decorator with expiration time and metadata preservation."},
      {title:"Context Managers & Resource Safety",summary:"Control setup/cleanup reliably with with-statements.",learn:["__enter__/__exit__","contextlib.contextmanager","Resource ownership","Exception-safe cleanup"],code:`from contextlib import contextmanager
from time import perf_counter

@contextmanager
def timer():
    start = perf_counter()
    try:
        yield
    finally:
        print(perf_counter() - start)`,challenge:"Create a context manager that temporarily changes a configuration value and always restores it."},
      {title:"Advanced Typing",summary:"Use generics, TypeVar, Protocol, Literal, overload concepts, and narrowed types.",learn:["Generic containers","Protocols","Type narrowing","Typed APIs"],code:`from typing import Generic, TypeVar

T = TypeVar("T")

class Box(Generic[T]):
    def __init__(self, value: T):
        self.value = value

name_box = Box[str]("Python")`,challenge:"Create a generic Result[T] type that can represent success or an error and provide a typed unwrap() method."},
      {title:"Concurrency: Threads, Processes & Async",summary:"Choose the right concurrency model for I/O-bound and CPU-bound workloads.",learn:["GIL concepts","ThreadPoolExecutor","ProcessPoolExecutor","Async I/O tradeoffs"],code:`from concurrent.futures import ThreadPoolExecutor

def fetch(item):
    return f"processed {item}"

with ThreadPoolExecutor(max_workers=4) as pool:
    print(list(pool.map(fetch, range(8))))`,challenge:"Design a benchmark comparing sequential, threaded, and process execution for two different workloads. Explain your results."},
      {title:"Packaging & Project Engineering",summary:"Turn code into a maintainable installable package.",learn:["src layout","pyproject.toml","Semantic versioning","Public APIs and dependencies"],code:`# pyproject.toml idea
[project]
name = "my-tool"
version = "0.1.0"
requires-python = ">=3.12"

[project.scripts]
my-tool = "my_tool.cli:main"`,challenge:"Convert one old project into a src-layout package with pyproject.toml, CLI entry point, tests, and README."},
      {title:"Testing Strategy & CI",summary:"Move beyond unit tests into fixtures, mocking, integration boundaries, and continuous integration.",learn:["Test pyramid","Fixtures","Mocking external boundaries","Coverage and CI concepts"],code:`# pytest-style example
import pytest

@pytest.mark.parametrize(
    "value,expected",
    [(2, 4), (3, 9), (-2, 4)]
)
def test_square(value, expected):
    assert value ** 2 == expected`,challenge:"Create a test plan for an API client: unit tests, contract-like tests with mocked HTTP, database tests, and failure cases."},
      {title:"Performance & Profiling",summary:"Measure before optimizing and understand time/space tradeoffs.",learn:["timeit","cProfile concepts","Big-O reasoning","Memory-conscious iterators"],code:`from timeit import timeit

list_time = timeit(
    "[x*x for x in range(1000)]",
    number=5000
)
print(list_time)`,challenge:"Find a slow part of one of your projects, measure it, optimize it, and record before/after results."},
      {title:"Secure Python",summary:"Avoid common security mistakes in real applications.",learn:["Never eval untrusted input","Secrets and environment variables","Parameterized SQL","Path/input validation"],code:`import os
import sqlite3

token = os.environ.get("APP_TOKEN")

with sqlite3.connect("app.db") as db:
    db.execute(
        "SELECT * FROM users WHERE id = ?",
        (42,)
    )`,challenge:"Audit an older project for hard-coded secrets, unsafe SQL, weak input validation, and over-broad exception handling. Fix each issue."},
      {title:"Algorithms & Data Structures",summary:"Strengthen problem solving with complexity-aware use of stacks, queues, heaps, graphs, and search.",learn:["Big-O","deque and heapq","Graph traversal","Sorting/search tradeoffs"],code:`from collections import deque

def bfs(graph, start):
    seen = {start}
    queue = deque([start])

    while queue:
        node = queue.popleft()
        yield node
        for neighbor in graph[node]:
            if neighbor not in seen:
                seen.add(neighbor)
                queue.append(neighbor)`,challenge:"Implement BFS and DFS for the same graph, then explain their complexity and when each is useful."},
      {title:"Architecture & Design Patterns",summary:"Structure applications around responsibilities, boundaries, and replaceable components.",learn:["Separation of concerns","Dependency inversion","Repository/service patterns","When patterns become overengineering"],code:`class UserService:
    def __init__(self, repository):
        self.repository = repository

    def register(self, user):
        if self.repository.exists(user.email):
            raise ValueError("Already exists")
        self.repository.save(user)`,challenge:"Refactor a monolithic script into domain, service, infrastructure, and interface layers without changing behavior."},
      {title:"Advanced Python Patterns",summary:"Explore descriptors, singledispatch, partials, caching, introspection, and metaprogramming carefully.",learn:["functools tools","Descriptors","Introspection","Metaprogramming tradeoffs"],code:`from functools import singledispatch

@singledispatch
def render(value):
    return str(value)

@render.register
def _(value: list):
    return ", ".join(map(str, value))

print(render([1, 2, 3]))`,challenge:"Build a small plugin system that discovers registered handlers and dispatches work by type or command name."},
      {title:"Final Capstone",summary:"Plan, build, test, document, and ship a portfolio-quality Python application.",learn:["Requirements and milestones","Architecture decisions","Tests and observability","Documentation and deployment"],code:`# Capstone options:
# - Developer productivity CLI
# - Async API monitoring service
# - Local automation platform
# - Data processing pipeline
# - Backend service with database
#
# Required:
# typing, tests, persistence, clean architecture,
# error handling, docs, packaging, performance review`,challenge:"Build one capstone from idea to polished repository. Include architecture notes, automated tests, setup instructions, screenshots/output, and a retrospective explaining tradeoffs."}
    ]
  }
];

const SUPABASE_URL = "https://clgtdilxgpzgqszwwmym.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_4weiwIMD4Ae-KS3jf0jndQ_DmkTE2Ci";
const supabaseClient = window.supabase?.createClient
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
  : null;

const state = {
  currentView: "home",
  courseId: localStorage.getItem("cl-course") || "python-1",
  lessonIndex: Number(localStorage.getItem("cl-lesson") || 0),
  completed: JSON.parse(localStorage.getItem("cl-completed") || "{}"),
  practice: JSON.parse(localStorage.getItem("cl-practice") || "{}"),
  reviews: JSON.parse(localStorage.getItem("cl-reviews") || "{}"),
  activePracticeKey: null,
  practiceStarterCode: null,
  pyodide: null,
  loadingPyodide: false,
  chat: [],
  user: null,
  cloudXP: null,
  authMode: "signin",
  cloudSyncTimer: null
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function courseById(id) {
  return COURSES.find(c => c.id === id) || COURSES[0];
}
function lessonKey(courseId, index) {
  return `${courseId}:${index}`;
}
function isDone(courseId, index) {
  return Boolean(state.completed[lessonKey(courseId, index)]);
}
function completedCount(course) {
  return course.lessons.filter((_, i) => isDone(course.id, i)).length;
}
function coursePercent(course) {
  return Math.round((completedCount(course) / course.lessons.length) * 100);
}
function totalXP() {
  if (state.user && Number.isFinite(state.cloudXP)) return state.cloudXP;
  const masteryXP = Object.values(state.completed).filter(Boolean).length * 100;
  const reviewXP = Object.values(state.reviews).reduce((sum, review) => sum + ((review?.stage || 0) * 20), 0);
  return masteryXP + reviewXP;
}
function persist() {
  localStorage.setItem("cl-course", state.courseId);
  localStorage.setItem("cl-lesson", String(state.lessonIndex));
  localStorage.setItem("cl-completed", JSON.stringify(state.completed));
  localStorage.setItem("cl-practice", JSON.stringify(state.practice));
  localStorage.setItem("cl-reviews", JSON.stringify(state.reviews));
  updateStats();
  queueCloudPositionSync();
}
function updateStats() {
  $("#xpCount").textContent = totalXP();
  $("#lessonTotal").textContent = COURSES.reduce((sum, c) => sum + c.lessons.length, 0);
}

function cloudKeyParts(key) {
  const [courseId, lessonIndex] = String(key).split(":");
  return { courseId, lessonIndex: Number(lessonIndex) };
}
function setAuthMessage(message, type = "") {
  const el = $("#authMessage");
  if (!el) return;
  el.textContent = message || "";
  el.className = "auth-message" + (type ? " " + type : "");
}
function updateAccountUI() {
  const btn = $("#accountBtn");
  const signOut = $("#signOutBtn");
  if (!btn) return;
  if (state.user) {
    btn.textContent = state.user.email?.split("@")[0] || "Account";
    if (signOut) signOut.hidden = false;
  } else {
    btn.textContent = "Sign in";
    if (signOut) signOut.hidden = true;
  }
  updateStats();
}
function setAuthMode(mode) {
  state.authMode = mode;
  $(".auth-tab").forEach(tab => tab.classList.toggle("active", tab.dataset.authMode === mode));
  $("#displayNameRow").hidden = mode !== "signup";
  $("#authSubmit").textContent = mode === "signup" ? "Create account" : "Sign in";
  $("#authPassword").autocomplete = mode === "signup" ? "new-password" : "current-password";
  setAuthMessage("");
}
function openAuthModal() {
  $("#authModal").hidden = false;
  updateAccountUI();
  setAuthMode(state.user ? "signin" : state.authMode);
  if (state.user) {
    setAuthMessage("Signed in as " + state.user.email, "success");
    $("#authForm").hidden = true;
    $(".auth-tabs").forEach(x => x.hidden = true);
  } else {
    $("#authForm").hidden = false;
    $(".auth-tabs").forEach(x => x.hidden = false);
  }
}
function closeAuthModal() {
  $("#authModal").hidden = true;
}
async function loadCloudProgress() {
  if (!supabaseClient || !state.user) return;
  const [{ data: profile, error: profileError }, { data: rows, error: progressError }] = await Promise.all([
    supabaseClient.from("profiles").select("total_xp,current_course,current_lesson,display_name").eq("user_id", state.user.id).single(),
    supabaseClient.from("lesson_progress").select("course_id,lesson_index,practice_passed,recall_passed,mastery_passed,mastery_score,review_stage,next_review_at").eq("user_id", state.user.id)
  ]);
  if (profileError && profileError.code !== "PGRST116") console.warn(profileError);
  if (progressError) console.warn(progressError);

  if (profile) {
    state.cloudXP = Number(profile.total_xp || 0);
    state.courseId = profile.current_course || state.courseId;
    state.lessonIndex = Number(profile.current_lesson || 0);
  }
  state.completed = {};
  state.practice = {};
  state.reviews = {};
  for (const row of rows || []) {
    const key = lessonKey(row.course_id, row.lesson_index);
    if (row.practice_passed) state.practice[key] = true;
    if (row.mastery_passed) state.completed[key] = true;
    if (row.mastery_passed) {
      state.reviews[key] = {
        stage: Number(row.review_stage || 0),
        next: row.next_review_at ? new Date(row.next_review_at).getTime() : null
      };
    }
  }
  persist();
  renderHomeCourses();
  renderCourseWorkspace();
  updateAccountUI();
}
function queueCloudPositionSync() {
  if (!supabaseClient || !state.user) return;
  clearTimeout(state.cloudSyncTimer);
  state.cloudSyncTimer = setTimeout(async () => {
    const { error } = await supabaseClient
      .from("profiles")
      .update({ current_course: state.courseId, current_lesson: state.lessonIndex })
      .eq("user_id", state.user.id);
    if (error) console.warn("Cloud position sync failed", error);
  }, 350);
}
async function recordCloudPractice(key) {
  if (!supabaseClient || !state.user) return;
  const { courseId, lessonIndex } = cloudKeyParts(key);
  const { error } = await supabaseClient.rpc("record_practice", {
    p_course_id: courseId,
    p_lesson_index: lessonIndex,
    p_changed_code: true
  });
  if (error) throw error;
}
async function recordCloudRecall(courseId, lessonIndex, recallText) {
  if (!supabaseClient || !state.user) return;
  const { error } = await supabaseClient.rpc("record_recall", {
    p_course_id: courseId,
    p_lesson_index: lessonIndex,
    p_recall_text: recallText
  });
  if (error) throw error;
}
async function awardCloudMastery(courseId, lessonIndex) {
  const { data, error } = await supabaseClient.rpc("award_lesson_mastery", {
    p_course_id: courseId,
    p_lesson_index: lessonIndex,
    p_recall_passed: true,
    p_practice_passed: true,
    p_mastery_score: 100
  });
  if (error) throw error;
  await loadCloudProgress();
  return data;
}
async function awardCloudReview(courseId, lessonIndex) {
  const { data, error } = await supabaseClient.rpc("award_review_pass", {
    p_course_id: courseId,
    p_lesson_index: lessonIndex,
    p_score: 100
  });
  if (error) throw error;
  await loadCloudProgress();
  return data;
}
async function initCloud() {
  if (!supabaseClient) return;
  const { data } = await supabaseClient.auth.getSession();
  state.user = data.session?.user || null;
  updateAccountUI();
  if (state.user) await loadCloudProgress();

  supabaseClient.auth.onAuthStateChange(async (_event, session) => {
    state.user = session?.user || null;
    state.cloudXP = null;
    updateAccountUI();
    if (state.user) {
      await loadCloudProgress();
    } else {
      state.completed = JSON.parse(localStorage.getItem("cl-completed") || "{}");
      state.practice = JSON.parse(localStorage.getItem("cl-practice") || "{}");
      state.reviews = JSON.parse(localStorage.getItem("cl-reviews") || "{}");
      renderHomeCourses();
      renderCourseWorkspace();
    }
  });
}
function setView(view) {
  state.currentView = view;
  $$(".view").forEach(v => v.classList.remove("active"));
  $$(".nav-link").forEach(v => v.classList.toggle("active", v.dataset.view === view));
  const target = document.getElementById(`${view}View`);
  if (target) target.classList.add("active");
  if (view === "home") renderHomeCourses();
  if (view === "courses") renderCourseWorkspace();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function renderHomeCourses() {
  const target = $("#homeCourseGrid");
  target.innerHTML = COURSES.map(course => {
    const done = completedCount(course);
    const pct = coursePercent(course);
    return `
      <article class="course-card" data-course="${course.id}" style="--course:${course.color}">
        <div class="course-icon">${course.icon}</div>
        <h3>${course.title} <span style="color:var(--muted);font-weight:500">• ${course.subtitle}</span></h3>
        <p>${course.description}</p>
        <div class="course-meta"><span>${course.lessons.length} lessons</span><span>${pct}% complete</span></div>
        <div class="mini-progress"><div style="width:${pct}%"></div></div>
        <div class="course-foot"><span>${done}/${course.lessons.length} completed</span><b>Open course →</b></div>
      </article>`;
  }).join("");
  $$(".course-card").forEach(card => card.addEventListener("click", () => {
    state.courseId = card.dataset.course;
    state.lessonIndex = 0;
    persist();
    setView("courses");
  }));
}
function renderTabs() {
  $("#courseTabs").innerHTML = COURSES.map(c => `
    <button class="course-tab ${c.id === state.courseId ? "active" : ""}" data-course="${c.id}" style="--tab:${c.color}">
      ${c.icon} ${c.title}: ${c.subtitle}
    </button>`).join("");
  $$(".course-tab").forEach(btn => btn.addEventListener("click", () => {
    state.courseId = btn.dataset.course;
    state.lessonIndex = 0;
    persist();
    renderCourseWorkspace();
  }));
}
function renderCourseWorkspace() {
  const course = courseById(state.courseId);
  if (state.lessonIndex >= course.lessons.length) state.lessonIndex = 0;
  renderTabs();
  $("#sidebarTitle").textContent = `${course.title} — ${course.subtitle}`;
  const pct = coursePercent(course);
  $("#sidebarProgress").textContent = `${pct}%`;
  $("#sidebarProgressBar").style.width = `${pct}%`;
  renderLessonList();
  renderLesson();
}
function renderLessonList() {
  const course = courseById(state.courseId);
  const q = ($("#lessonSearch").value || "").trim().toLowerCase();
  const visible = course.lessons.map((lesson, index) => ({lesson, index}))
    .filter(({lesson}) => !q || lesson.title.toLowerCase().includes(q) || lesson.summary.toLowerCase().includes(q));
  $("#lessonList").innerHTML = visible.length ? visible.map(({lesson,index}) => `
    <button class="lesson-item ${index === state.lessonIndex ? "active" : ""} ${isDone(course.id,index) ? "done" : ""}" data-index="${index}">
      <span class="lesson-num">${isDone(course.id,index) ? "✓" : state.practice[lessonKey(course.id,index)] ? "•" : index + 1}</span>
      <span>${lesson.title}</span>
    </button>`).join("") : `<div class="empty-state">No matching lessons.</div>`;
  $$(".lesson-item").forEach(btn => btn.addEventListener("click", () => {
    state.lessonIndex = Number(btn.dataset.index);
    persist();
    renderCourseWorkspace();
  }));
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
}
function normalizePracticeCode(code) {
  return String(code)
    .split("\n")
    .map(line => line.replace(/#.*$/, "").trim())
    .filter(Boolean)
    .join("\n");
}

function shuffled(items) {
  return [...items].sort(() => Math.random() - 0.5);
}
function lessonSnippet(lesson) {
  return lesson.code.split("\n").filter(Boolean).slice(0, 3).join("\n");
}
function buildMasteryQuestions(course, lesson, index) {
  const allLessons = COURSES.flatMap(c => c.lessons);
  const otherLessons = allLessons.filter(item => item.title !== lesson.title);
  const distractorSummaries = shuffled(otherLessons).slice(0, 2).map(item => item.summary);
  const distractorSkills = shuffled(otherLessons.flatMap(item => item.learn)).filter(skill => !lesson.learn.includes(skill)).slice(0, 2);
  const distractorCode = shuffled(otherLessons).slice(0, 2).map(lessonSnippet);

  return [
    {
      prompt: "Which description best matches this lesson?",
      correct: lesson.summary,
      options: shuffled([lesson.summary, ...distractorSummaries])
    },
    {
      prompt: "Which skill belongs directly to this lesson?",
      correct: lesson.learn[Math.min(1, lesson.learn.length - 1)],
      options: shuffled([lesson.learn[Math.min(1, lesson.learn.length - 1)], ...distractorSkills])
    },
    {
      prompt: "Which code sample is most related to what you just learned?",
      correct: lessonSnippet(lesson),
      options: shuffled([lessonSnippet(lesson), ...distractorCode])
    }
  ];
}
function recallLooksMeaningful(text, lesson) {
  const words = String(text).trim().toLowerCase().match(/[a-z0-9_]+/g) || [];
  if (words.length < 8) return false;
  const stop = new Set(["about","after","again","because","before","being","could","from","have","into","just","lesson","learn","more","that","their","there","these","they","this","using","what","when","where","which","with","would","your"]);
  const lessonWords = (lesson.title + " " + lesson.summary + " " + lesson.learn.join(" "))
    .toLowerCase().match(/[a-z0-9_]+/g) || [];
  const keywords = new Set(lessonWords.filter(word => word.length >= 4 && !stop.has(word)));
  return words.some(word => keywords.has(word));
}
function reviewStatus(key) {
  const review = state.reviews[key];
  if (!review?.next) return null;
  const ms = review.next - Date.now();
  if (ms <= 0) return { due: true, label: "Review due now" };
  const hours = Math.ceil(ms / 3600000);
  if (hours < 24) return { due: false, label: `Review in ${hours}h` };
  return { due: false, label: `Review in ${Math.ceil(hours / 24)}d` };
}
function scheduleNextReview(key, passed) {
  const intervals = [1, 3, 7, 14, 30];
  const current = state.reviews[key] || { stage: 0, next: Date.now() };
  const nextStage = passed ? Math.min(current.stage + 1, intervals.length) : current.stage;
  const days = intervals[Math.min(nextStage, intervals.length - 1)];
  state.reviews[key] = { stage: nextStage, next: Date.now() + days * 86400000 };
  persist();
}
function gradeQuiz(form, questions) {
  let correct = 0;
  questions.forEach((question, i) => {
    const selected = form.querySelector(`input[name="q${i}"]:checked`);
    if (selected && selected.value === question.correct) correct++;
  });
  return correct;
}
function renderLesson() {
  const course = courseById(state.courseId);
  const lesson = course.lessons[state.lessonIndex];
  const key = lessonKey(course.id, state.lessonIndex);
  const done = isDone(course.id, state.lessonIndex);
  const practiced = Boolean(state.practice[key]);
  const review = reviewStatus(key);
  const questions = buildMasteryQuestions(course, lesson, state.lessonIndex);

  const quizHtml = questions.map((question, i) => `
    <fieldset class="mastery-question">
      <legend>${i + 1}. ${escapeHtml(question.prompt)}</legend>
      ${question.options.map((option, optionIndex) => `
        <label class="quiz-option">
          <input type="radio" name="q${i}" value="${escapeHtml(option)}">
          <span><b>${String.fromCharCode(65 + optionIndex)}.</b> <code>${escapeHtml(option)}</code></span>
        </label>`).join("")}
    </fieldset>`).join("");

  $("#lessonViewer").innerHTML = `
    <div class="lesson-kicker">${course.icon} ${course.title} • Lesson ${state.lessonIndex + 1} of ${course.lessons.length}</div>
    <h1>${lesson.title}</h1>
    <p class="lesson-summary">${lesson.summary}</p>

    <div class="learning-loop">
      <span>1. Learn</span><b>→</b><span>2. Recall</span><b>→</b><span>3. Code</span><b>→</b><span>4. Check</span><b>→</b><span>5. Master</span>
    </div>

    <section class="lesson-block">
      <h3>What you'll learn</h3>
      <ul>${lesson.learn.map(item => `<li>${item}</li>`).join("")}</ul>
    </section>

    <section class="lesson-block">
      <h3>Practice ladder</h3>
      <div class="practice-ladder">
        <div><b>1. Trace</b><span>Read the example and predict what it will do before running it.</span></div>
        <div><b>2. Modify</b><span>Change one value, condition, call, or data item and predict the new behavior.</span></div>
        <div><b>3. Build</b><span>Solve the challenge with less guidance, then explain why your solution works.</span></div>
      </div>
      <h3>Study the example</h3>
      <p>Don't only read it. Predict what each important line does before you run it.</p>
      <pre class="code-block">${escapeHtml(lesson.code)}</pre>
      <button class="small-btn" id="copyLessonCode">Copy example</button>
    </section>

    <section class="lesson-block recall-box">
      <div class="mastery-heading"><div><span class="step-chip">ACTIVE RECALL</span><h3>Explain it without looking back</h3></div><span class="requirement-pill">Required</span></div>
      <p>In your own words, explain one important idea from this lesson and when you would use it. This forces your brain to retrieve the idea instead of just rereading it.</p>
      <textarea id="recallAnswer" class="recall-input" placeholder="Example: A variable lets me store a value under a name so I can reuse or change it later..."></textarea>
      <small id="recallHint">Use at least 8 meaningful words and include a concept from this lesson.</small>
    </section>

    <section class="lesson-block challenge-box">
      <div class="mastery-heading"><div><span class="step-chip">CODE PRACTICE</span><h3>🎯 Your challenge</h3></div><span class="requirement-pill ${practiced ? "passed" : ""}">${practiced ? "✓ Practice run" : "Required"}</span></div>
      <p>${lesson.challenge}</p>
      <button class="btn ghost" id="openInPlayground">${practiced ? "Practice again in Playground" : "Open challenge in Playground →"}</button>
      <button class="small-btn" id="askTutorLesson">Ask AI for a hint →</button>
      <p class="microcopy">A successful Python run from this lesson marks the practice step. Running code is part of learning, not optional.</p>
    </section>

    <form id="masteryForm" class="lesson-block mastery-box">
      <div class="mastery-heading">
        <div><span class="step-chip">MASTERY CHECK</span><h3>${done && review?.due ? "Memory review" : "Prove you understand it"}</h3></div>
        <span class="requirement-pill ${done ? "passed" : ""}">${done ? "✓ Mastered" : "+100 XP"}</span>
      </div>
      <p>${done ? (review?.due ? "This lesson is due for spaced review. Pass again to strengthen memory and earn +20 review XP." : `You mastered this lesson. ${review?.label || ""}`) : "XP is locked until you complete active recall, run the lesson practice, and answer every check correctly."}</p>
      ${(!done || review?.due) ? quizHtml : `<div class="mastered-banner">🧠 Mastery saved • ${review?.label || "Review scheduled"}</div>`}
      <div id="masteryFeedback" class="mastery-feedback"></div>
      ${(!done || review?.due) ? `<button type="submit" class="btn primary">${done ? "Pass memory review +20 XP" : "Check mastery +100 XP"}</button>` : ""}
    </form>

    <div class="lesson-actions">
      <button class="btn ghost" id="prevLesson" ${state.lessonIndex === 0 ? "disabled" : ""}>← Previous</button>
      <div class="lesson-status">${done ? "✓ Lesson mastered" : "🔒 Complete mastery check to earn XP"}</div>
      <button class="btn ghost" id="nextLesson" ${state.lessonIndex === course.lessons.length - 1 ? "disabled" : ""}>Next →</button>
    </div>`;

  $("#copyLessonCode").addEventListener("click", async () => {
    await navigator.clipboard.writeText(lesson.code);
    $("#copyLessonCode").textContent = "Copied ✓";
    setTimeout(() => $("#copyLessonCode").textContent = "Copy example", 1200);
  });

  $("#openInPlayground").addEventListener("click", () => {
    state.activePracticeKey = key;
    $("#codeEditor").value = lesson.code + "\\n\\n# Now change this code to solve the challenge:\\n# " + lesson.challenge;
    setView("playground");
  });

  $("#askTutorLesson").addEventListener("click", () => {
    $("#chatInput").value = `I'm on ${course.title}, lesson "${lesson.title}". Teach me using questions and hints. Do not give me the full solution immediately. Challenge: ${lesson.challenge}`;
    setView("ai");
    $("#chatInput").focus();
  });

  const masteryForm = $("#masteryForm");
  if (masteryForm) {
    masteryForm.addEventListener("submit", async event => {
      event.preventDefault();
      const feedback = $("#masteryFeedback");
      const score = gradeQuiz(masteryForm, questions);

      if (done && review?.due) {
        if (score >= 3) {
          if (state.user) {
            try {
              await awardCloudReview(course.id, state.lessonIndex);
              feedback.className = "mastery-feedback success";
              feedback.textContent = "Memory review passed! +20 XP. Your next cloud review was scheduled.";
            } catch (error) {
              feedback.className = "mastery-feedback error";
              feedback.textContent = "Cloud review could not be saved. Please try again.";
              return;
            }
          } else {
            scheduleNextReview(key, true);
            feedback.className = "mastery-feedback success";
            feedback.textContent = "Memory review passed locally. Sign in to save official cloud XP.";
          }
          setTimeout(renderLesson, 700);
        } else {
          scheduleNextReview(key, false);
          feedback.className = "mastery-feedback error";
          feedback.textContent = `You got ${score}/3. Review the lesson and try again—no XP for guessing.`;
        }
        return;
      }

      const recall = $("#recallAnswer")?.value || "";
      const recallOk = recallLooksMeaningful(recall, lesson);

      if (!recallOk) {
        feedback.className = "mastery-feedback error";
        feedback.textContent = "Active recall is not complete yet. Explain the concept in your own words using at least 8 meaningful words.";
        return;
      }
      if (!state.practice[key]) {
        feedback.className = "mastery-feedback error";
        feedback.textContent = "Code practice is still required. Open this lesson in the Playground and run Python successfully.";
        return;
      }
      if (score < 3) {
        feedback.className = "mastery-feedback error";
        feedback.textContent = `You got ${score}/3. Re-study the lesson and try again. XP is awarded only after full mastery.`;
        return;
      }

      if (state.user) {
        try {
          await recordCloudRecall(course.id, state.lessonIndex, recall);
          await awardCloudMastery(course.id, state.lessonIndex);
          feedback.className = "mastery-feedback success";
          feedback.textContent = "Mastery passed! +100 cloud XP. A memory review is scheduled for tomorrow.";
        } catch (error) {
          feedback.className = "mastery-feedback error";
          feedback.textContent = "Mastery passed in the browser, but cloud XP could not be saved. Please retry.";
          return;
        }
      } else {
        state.completed[key] = true;
        state.reviews[key] = { stage: 0, next: Date.now() + 86400000 };
        persist();
        feedback.className = "mastery-feedback success";
        feedback.textContent = "Mastery passed locally. Sign in to save official cloud XP and sync across devices.";
      }
      setTimeout(() => renderCourseWorkspace(), 700);
    });
  }

  $("#prevLesson").addEventListener("click", () => changeLesson(-1));
  $("#nextLesson").addEventListener("click", () => changeLesson(1));
}

function changeLesson(delta) {
  const course = courseById(state.courseId);
  const next = state.lessonIndex + delta;
  if (next < 0 || next >= course.lessons.length) return;
  state.lessonIndex = next;
  persist();
  renderCourseWorkspace();
  window.scrollTo({top: 0, behavior:"smooth"});
}

async function ensurePyodide() {
  if (state.pyodide) return state.pyodide;
  if (state.loadingPyodide) {
    while (state.loadingPyodide) await new Promise(r => setTimeout(r,100));
    return state.pyodide;
  }
  state.loadingPyodide = true;
  $("#runtimeStatus").textContent = " Loading Python runtime...";
  try {
    state.pyodide = await loadPyodide({ fullStdLib: true });
    state.pyodide.setStdin({
      stdin: () => {
        const value = window.prompt("Python program input:");
        return value === null ? undefined : value;
      }
    });
    $("#runtimeStatus").classList.add("ready");
    $("#runtimeStatus").innerHTML = "<i></i> CPython runtime ready • input() enabled";
    return state.pyodide;
  } finally {
    state.loadingPyodide = false;
  }
}
async function runPython() {
  const output = $("#consoleOutput");
  const button = $("#runCodeBtn");
  button.disabled = true;
  button.textContent = "Loading...";
  output.textContent = "Starting Python...";
  try {
    const py = await ensurePyodide();
    const userCode = $("#codeEditor").value;
    if (userCode.length > 500000) {
      throw new Error("This program is over 500 KB. Split it into smaller files or modules.");
    }
    button.textContent = "Loading imports...";
    await py.loadPackagesFromImports(userCode);
    button.textContent = "Running...";
    py.runPython(`
import sys, io
_stdout = io.StringIO()
_stderr = io.StringIO()
sys.stdout = _stdout
sys.stderr = _stderr
`);
    let result;
    try {
      result = await py.runPythonAsync(userCode);
    } catch (error) {
      py.runPython(`print(repr(${JSON.stringify("execution error")}))`);
      throw error;
    }
    const stdout = py.runPython("_stdout.getvalue()");
    const stderr = py.runPython("_stderr.getvalue()");
    output.textContent = (stdout || "") + (stderr || "") + (result !== undefined && result !== null ? `\n=> ${String(result)}` : "");
    if (!output.textContent.trim()) output.textContent = "Program finished with no output.";
    if (state.activePracticeKey) {
      const changed = normalizePracticeCode(userCode) !== normalizePracticeCode(state.practiceStarterCode || "");
      if (!changed) {
        output.textContent += "\n\n⚠ Practice not recorded yet. Change the starter code to solve or explore the challenge, then run it again.";
      } else {
        const practiceKey = state.activePracticeKey;
        state.practice[practiceKey] = true;
        if (state.user) {
          try {
            await recordCloudPractice(practiceKey);
          } catch (error) {
            output.textContent += "\n\n⚠ Code ran, but cloud practice could not be saved. Try again.";
            return;
          }
        }
        state.activePracticeKey = null;
        state.practiceStarterCode = null;
        persist();
        output.textContent += state.user
          ? "\n\n✓ Changed code ran successfully. Cloud practice recorded. Return to the lesson and pass mastery."
          : "\n\n✓ Changed code ran successfully. Practice recorded locally. Sign in to sync it.";
      }
    }
  } catch (error) {
    const message = String(error?.message || error);
    if (message.includes("ModuleNotFoundError")) {
      output.textContent = "Python package error:\n" + message + "\n\nThis package may not be available in browser Python. Standard-library modules and many Pyodide packages work; OS-specific/native packages may need a server runtime.";
    } else if (message.includes("EOFError") || message.includes("stdin")) {
      output.textContent = "Input error:\n" + message + "\n\nTry Run again and answer the browser input prompt when your code calls input().";
    } else {
      output.textContent = "Python error:\n" + message;
    }
  } finally {
    button.disabled = false;
    button.textContent = "▶ Run Python";
  }
}

function addMessage(role, text) {
  const wrap = document.createElement("div");
  wrap.className = `message ${role}`;
  const safe = escapeHtml(text);
  const rendered = safe.replace(/```(?:python)?\n([\s\S]*?)```/g, (_, code) => `<pre>${code}</pre>`);
  wrap.innerHTML = `
    <div class="avatar">${role === "assistant" ? "Q" : "U"}</div>
    <div class="bubble"><strong>${role === "assistant" ? "Qwen Tutor" : "You"}</strong><p>${rendered}</p></div>`;
  $("#chatMessages").appendChild(wrap);
  $("#chatMessages").scrollTop = $("#chatMessages").scrollHeight;
  return wrap;
}
async function sendTutorMessage(text) {
  const clean = text.trim();
  if (!clean) return;
  addMessage("user", clean);
  state.chat.push({role:"user",content:clean});
  const loading = addMessage("assistant", "Thinking through it with you...");
  try {
    const response = await fetch("/.netlify/functions/qwen", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        messages: state.chat.slice(-12),
        course: state.courseId,
        lesson: courseById(state.courseId).lessons[state.lessonIndex]?.title || "",
        mode: state.tutorMode || "coach"
      })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || `AI request failed (${response.status})`);
    const answer = data.message || "I couldn't generate a response.";
    loading.remove();
    addMessage("assistant", answer);
    state.chat.push({role:"assistant",content:answer});
  } catch (error) {
    loading.remove();
    addMessage("assistant", "Qwen Tutor is temporarily unavailable. Your account does not need any API key or Hugging Face token. You can keep using the lessons and Playground while the site owner reconnects the AI service.");
  }
}

$$(".nav-link").forEach(btn => btn.addEventListener("click", () => setView(btn.dataset.view)));
$$("[data-jump]").forEach(btn => btn.addEventListener("click", () => setView(btn.dataset.jump)));
$("#startLearningBtn").addEventListener("click", () => setView("courses"));
$("#lessonSearch").addEventListener("input", renderLessonList);
$("#runCodeBtn").addEventListener("click", runPython);
$("#clearConsoleBtn").addEventListener("click", () => $("#consoleOutput").textContent = "");
$("#resetCodeBtn").addEventListener("click", () => $("#codeEditor").value = `name = "Coder"
skills = ["Python", "Problem Solving"]

for skill in skills:
    print(f"{name} is learning {skill}! 🚀")`);
$("#codeEditor").addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") runPython();
});
$("#chatForm").addEventListener("submit", event => {
  event.preventDefault();
  const input = $("#chatInput");
  const text = input.value;
  input.value = "";
  sendTutorMessage(text);
});
$("#aiSuggestions").addEventListener("click", event => {
  if (event.target.tagName !== "BUTTON") return;
  sendTutorMessage(event.target.textContent);
});
$("#chatInput").addEventListener("input", event => {
  event.target.style.height = "auto";
  event.target.style.height = Math.min(event.target.scrollHeight,160) + "px";
});

$("#accountBtn").addEventListener("click", openAuthModal);
$("#authClose").addEventListener("click", closeAuthModal);
$("#authModal").addEventListener("click", event => {
  if (event.target === $("#authModal")) closeAuthModal();
});
$(".auth-tab").forEach(tab => tab.addEventListener("click", () => setAuthMode(tab.dataset.authMode)));
$("#authForm").addEventListener("submit", async event => {
  event.preventDefault();
  if (!supabaseClient) return setAuthMessage("Cloud service failed to load.", "error");
  const email = $("#authEmail").value.trim();
  const password = $("#authPassword").value;
  const displayName = $("#authDisplayName").value.trim();
  $("#authSubmit").disabled = true;
  setAuthMessage(state.authMode === "signup" ? "Creating account..." : "Signing in...");
  try {
    if (state.authMode === "signup") {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: { data: { display_name: displayName || email.split("@")[0] } }
      });
      if (error) throw error;
      if (!data.session) {
        setAuthMessage("Account created. Check your email to confirm it, then sign in.", "success");
      } else {
        setAuthMessage("Account created and signed in.", "success");
      }
    } else {
      const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setAuthMessage("Signed in. Loading cloud progress...", "success");
    }
  } catch (error) {
    setAuthMessage(error.message || "Authentication failed.", "error");
  } finally {
    $("#authSubmit").disabled = false;
  }
});
$("#signOutBtn").addEventListener("click", async () => {
  if (supabaseClient) await supabaseClient.auth.signOut();
  closeAuthModal();
});

updateStats();
renderHomeCourses();
renderCourseWorkspace();
initCloud();