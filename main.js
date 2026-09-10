document.addEventListener("DOMContentLoaded", () => {
  // 1. Terminal Typing Effect
  const lines = [
    {
      html: '<span class="term-key">const</span> developer <span class="term-punct">=</span> {',
    },
    {
      html: '&nbsp;&nbsp;name<span class="term-punct">:</span> <span class="term-str">"Shabban Mostafa"</span>,',
    },
    {
      html: '&nbsp;&nbsp;role<span class="term-punct">:</span> <span class="term-str">"Frontend Developer"</span>,',
    },
    {
      html: '&nbsp;&nbsp;studying<span class="term-punct">:</span> <span class="term-str">"Intelligent Systems &amp; Computer Eng."</span>,',
    },
    {
      html: '&nbsp;&nbsp;stack<span class="term-punct">:</span> [<span class="term-str">"HTML"</span>, <span class="term-str">"CSS"</span>, <span class="term-str">"JS"</span>, <span class="term-str">"Java"</span>, <span class="term-str">"Python"</span>],',
    },
    {
      html: '&nbsp;&nbsp;location<span class="term-punct">:</span> <span class="term-str">"Gaza, Palestine"</span>',
    },
    { html: '}<span class="term-punct">;</span>' },
  ];

  const body = document.getElementById("termBody");
  let li = 0;

  function typeLine() {
    if (li >= lines.length) {
      const cur = document.createElement("span");
      cur.className = "cursor";
      body.appendChild(cur);
      return;
    }
    const p = document.createElement("p");
    p.className = "line";
    body.appendChild(p);
    const html = lines[li].html;
    let i = 0;

    function step() {
      if (i <= html.length) {
        p.innerHTML = html.slice(0, i);
        i += 3;
        setTimeout(step, 10);
      } else {
        p.innerHTML = html;
        li++;
        setTimeout(typeLine, 80);
      }
    }
    step();
  }

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReduced) {
    body.innerHTML = lines.map((l) => `<p class="line">${l.html}</p>`).join("");
  } else {
    typeLine();
  }

  // 2. Theme Toggle (Dark / Light)
  const themeBtn = document.getElementById("themeToggle");
  const themeIcon = themeBtn.querySelector(".theme-icon");
  const currentTheme = localStorage.getItem("theme") || "dark";

  document.documentElement.setAttribute("data-theme", currentTheme);
  themeIcon.textContent = currentTheme === "dark" ? "🌙" : "☀️";

  themeBtn.addEventListener("click", () => {
    const activeTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = activeTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    themeIcon.textContent = newTheme === "dark" ? "🌙" : "☀️";
  });

  // 3. Mobile Navigation Menu
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

  // 4. Scroll Progress & Back To Top
  const scrollProgress = document.getElementById("scrollProgress");
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = `${progress}%`;

    if (window.scrollY > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 5. Projects Category Filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".proj");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projects.forEach((proj) => {
        if (filter === "all" || proj.getAttribute("data-category") === filter) {
          proj.style.display = "grid";
        } else {
          proj.style.display = "none";
        }
      });
    });
  });
});
