// Interactive in-browser terminal for the portfolio.
(function () {
  "use strict";

  var overlay = document.getElementById("terminal");
  if (!overlay) return;

  var out = overlay.querySelector(".terminal-output");
  var form = overlay.querySelector(".terminal-form");
  var input = overlay.querySelector(".terminal-input");
  var menu = overlay.querySelector(".terminal-menu");
  var closeBtn = overlay.querySelector(".terminal-close");

  var EMAIL = "ayusha.karki16@gmail.com";

  var DATA = {
    about: [
      "Software Engineer with experience building backend systems,",
      "working with databases, APIs, and data-driven applications.",
      "I enjoy designing reliable, scalable systems and working with data",
      "from processing and transformation to production-ready solutions.",
      "",
      "Based in Kathmandu, Nepal. Open to software engineering & data roles.",
    ],
    experience: [
      {
        date: "June 2025 — Present",
        title: "Software Engineer, Contract — Peepal Soft",
        points: [
          "Built a Tax Management System for a banking client (React + Spring Boot + MySQL).",
          "Designed RESTful APIs with database integration, CRUD operations and validation.",
          "Worked with the frontend team and stakeholders to gather requirements and test end-to-end.",
        ],
      },
      {
        date: "November 2024 — May 2025",
        title: "Software Engineer",
        points: [
          "Built and enhanced web applications with React, Java, and Spring Boot.",
          "Designed REST APIs: CRUD, request validation, business logic, integrations.",
          "Data preprocessing, EDA, feature engineering and ML; applied SLMs and RAG to improve NLP responses.",
        ],
      },
      {
        date: "July 2024 — October 2024",
        title: "Software Engineer Intern",
        points: [
          "Built Java projects including a Banking System and a Quiz Game (SWT GUI).",
          "Supported IT and accounting teams with Excel-based tools and reporting.",
        ],
      },
    ],
    projects: [
      {
        name: "Arcade E-commerce",
        tag: "fullstack · microservices · featured",
        desc: "Spring Boot microservices, JDBC, MySQL, JWT auth, Gmail verification and notifications, Three.js 3D/AR product viewer. Deployed on Vercel.",
        links: [["Live demo", "https://arcade-ecommerce.vercel.app/"]],
      },
      {
        name: "Weather App",
        tag: "web · data",
        desc: "Real-time weather with 7-day historical data. HTML, CSS, JS, PHP, MySQL.",
        links: [
          ["Live", "https://weatheredd.vercel.app/"],
          ["Code", "https://github.com/Ayusha-Karkii/Weather_App"],
        ],
      },
      {
        name: "Text-to-SQL AI",
        tag: "ai · nlp",
        desc: "Streamlit app using Google Gemini to turn plain-English questions into SQL for SQLite, with optional Nepali translations.",
        links: [["Code", "https://github.com/Ayusha-Karkii/Text-To-SQL-AI"]],
      },
      {
        name: "AI Dataset Projects",
        tag: "data engineering",
        desc: "Data collection, cleaning, preprocessing and feature engineering for machine learning.",
        links: [
          [
            "Code",
            "https://github.com/Ayusha-Karkii/5CSO37-Concept-and-tech-of-Ai",
          ],
        ],
      },
      {
        name: "Banking System",
        tag: "java · oop",
        desc: "Swing GUI banking app: accounts, deposits, withdrawals, transfers, CSV-based data.",
        links: [["Code", "https://github.com/Ayusha-Karkii/Banking-System"]],
      },
      {
        name: "Caesar Cipher",
        tag: "python · security",
        desc: "Encrypt and decrypt messages with the Caesar Cipher from console or text-file input.",
        links: [["Code", "https://github.com/Ayusha-Karkii/Caesar-Cipher"]],
      },
    ],
    skills: [
      ["languages", "Java, Python, JavaScript"],
      ["frontend", "React, HTML / CSS, Three.js"],
      [
        "backend & data",
        "Spring Boot, REST APIs, Microservices, JWT Security, JDBC, MySQL, Pandas / NumPy, Data Visualization",
      ],
      ["tools", "Git / GitHub, Project Management, Time Management"],
    ],
    links: [
      ["email", "mailto:" + EMAIL, EMAIL],
      [
        "linkedin",
        "https://www.linkedin.com/in/ayushakarki",
        "linkedin.com/in/ayushakarki",
      ],
      [
        "github",
        "https://github.com/Ayusha-Karkii",
        "github.com/Ayusha-Karkii",
      ],
      [
        "blog",
        "https://medium.com/@ayusha.karki16",
        "medium.com/@ayusha.karki16",
      ],
    ],
  };

  // ---------- output helpers ----------
  function line(text, cls) {
    var d = document.createElement("div");
    d.className = "term-line" + (cls ? " " + cls : "");
    d.textContent = text;
    out.appendChild(d);
    return d;
  }

  function linkLine(prefix, label, url) {
    var d = document.createElement("div");
    d.className = "term-line";
    if (prefix) d.appendChild(document.createTextNode(prefix));
    var a = document.createElement("a");
    a.href = url;
    a.textContent = label;
    if (url.indexOf("http") === 0) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    d.appendChild(a);
    out.appendChild(d);
    return d;
  }

  function toBottom() {
    out.scrollTop = out.scrollHeight;
  }

  function pad(s, n) {
    while (s.length < n) s += " ";
    return s;
  }

  // ---------- commands ----------
  var MENU = [
    ["about", "about"],
    ["experience", "experience"],
    ["projects", "projects"],
    ["skills", "skills"],
    ["contact", "contact"],
    ["links", "links"],
  ];

  var commands = {
    help: function () {
      line("Pick an option by clicking it above, typing its name or number:", "head");
      MENU.forEach(function (m, i) {
        line("  " + (i + 1) + "  " + pad(m[0], 12), "");
      });
      line("Other commands:", "head");
      line("  open <n>     open project number n (see 'projects')");
      line("  resume       jump to the experience section on the page");
      line("  theme        toggle light / dark");
      line("  clear        clear the screen");
      line("  exit         close the terminal (or press Esc)");
    },
    about: function () {
      line("# about", "head");
      DATA.about.forEach(function (l) {
        line(l);
      });
    },
    experience: function () {
      line("# experience", "head");
      DATA.experience.forEach(function (e) {
        line("");
        line(e.date, "dim");
        line(e.title, "accent");
        e.points.forEach(function (p) {
          line("  - " + p);
        });
      });
    },
    projects: function () {
      line("# projects", "head");
      DATA.projects.forEach(function (p, i) {
        line("");
        line("[" + (i + 1) + "] " + p.name + "  (" + p.tag + ")", "accent");
        line("    " + p.desc);
        p.links.forEach(function (l) {
          linkLine("    " + pad(l[0], 10), l[1], l[1]);
        });
      });
      line("");
      line("Tip: type 'open 1' to open a project in a new tab.", "dim");
    },
    skills: function () {
      line("# skills", "head");
      DATA.skills.forEach(function (s) {
        line(pad(s[0], 16) + s[1]);
      });
    },
    contact: function () {
      line("# contact", "head");
      line("Have a role or a project in mind? I'd love to hear about it.");
      line("");
      linkLine(pad("email", 10), EMAIL, "mailto:" + EMAIL);
      line("");
      line("Type 'links' for LinkedIn, GitHub and blog.", "dim");
    },
    links: function () {
      line("# links", "head");
      DATA.links.forEach(function (l) {
        linkLine(pad(l[0], 10), l[2], l[1]);
      });
    },
    open: function (args) {
      var n = parseInt(args[0], 10);
      var p = DATA.projects[n - 1];
      if (!p) {
        line("usage: open <1-" + DATA.projects.length + ">", "err");
        return;
      }
      var url = p.links[0][1];
      line("opening " + p.name + " -> " + url, "dim");
      window.open(url, "_blank", "noopener");
    },
    resume: function () {
      line("jumping to experience section...", "dim");
      close();
      var el = document.getElementById("experience");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    },
    theme: function () {
      var btn = document.querySelector(".theme-toggle");
      if (btn) btn.click();
      line(
        "theme: " + document.documentElement.getAttribute("data-theme"),
        "dim",
      );
    },
    clear: function () {
      out.textContent = "";
    },
    exit: function () {
      close();
    },
  };

  var aliases = {
    ls: "help",
    "?": "help",
    menu: "help",
    projs: "projects",
    work: "experience",
    exp: "experience",
    whoami: "about",
    email: "contact",
    close: "exit",
    quit: "exit",
    cls: "clear",
  };

  function run(raw) {
    var text = raw.trim();
    if (!text) return;
    line("$ " + text, "cmd");

    var parts = text.split(/\s+/);
    var name = parts[0].toLowerCase();
    var args = parts.slice(1);

    // numeric menu choice
    if (/^[1-9]$/.test(name) && MENU[parseInt(name, 10) - 1]) {
      name = MENU[parseInt(name, 10) - 1][1];
    }
    if (aliases[name]) name = aliases[name];

    if (Object.prototype.hasOwnProperty.call(commands, name)) {
      commands[name](args);
    } else {
      line("command not found: " + parts[0], "err");
      line("Type 'help' to see what's available.", "dim");
    }
    toBottom();
  }

  // ---------- menu buttons ----------
  MENU.forEach(function (m, i) {
    var b = document.createElement("button");
    b.type = "button";
    var n = document.createElement("span");
    n.textContent = String(i + 1);
    b.appendChild(n);
    b.appendChild(document.createTextNode(m[0]));
    b.addEventListener("click", function () {
      run(m[1]);
      input.focus();
    });
    menu.appendChild(b);
  });

  // ---------- history + autocomplete ----------
  var history = [];
  var hIndex = 0;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = input.value;
    if (v.trim()) {
      history.push(v);
      hIndex = history.length;
    }
    input.value = "";
    run(v);
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp") {
      if (history.length) {
        e.preventDefault();
        hIndex = Math.max(0, hIndex - 1);
        input.value = history[hIndex] || "";
      }
    } else if (e.key === "ArrowDown") {
      if (history.length) {
        e.preventDefault();
        hIndex = Math.min(history.length, hIndex + 1);
        input.value = history[hIndex] || "";
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      var v = input.value.trim().toLowerCase();
      if (!v) return;
      var names = Object.keys(commands);
      var matches = names.filter(function (n) {
        return n.indexOf(v) === 0;
      });
      if (matches.length === 1) input.value = matches[0];
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      commands.clear();
    }
  });

  // ---------- open / close ----------
  var lastFocus = null;
  var booted = false;

  function open() {
    lastFocus = document.activeElement;
    overlay.hidden = false;
    document.body.classList.add("term-open");
    if (!booted) {
      booted = true;
      line("Ayusha Karki — portfolio shell", "accent");
      line("Software Engineer · Kathmandu, NP", "dim");
      line("");
      commands.help();
    }
    toBottom();
    input.focus();
  }

  function close() {
    overlay.hidden = true;
    document.body.classList.remove("term-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.querySelectorAll(".terminal-open").forEach(function (b) {
    b.addEventListener("click", open);
  });
  closeBtn.addEventListener("click", close);

  overlay.addEventListener("mousedown", function (e) {
    if (e.target === overlay) close();
  });

  // Clicking inside the output refocuses input (unless selecting text / clicking a link)
  out.addEventListener("click", function (e) {
    if (e.target.tagName === "A") return;
    if (window.getSelection && String(window.getSelection())) return;
    input.focus();
  });

  document.addEventListener("keydown", function (e) {
    if (overlay.hidden) return;
    if (e.key === "Escape") {
      close();
      return;
    }
    // simple focus trap
    if (e.key === "Tab" && e.target !== input) {
      var focusables = overlay.querySelectorAll("button, a[href], input");
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Allow deep link: yoursite.com/#terminal
  if (location.hash === "#terminal") open();
})();