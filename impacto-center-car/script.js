(function () {
  var d = document.getElementById("wa");
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-wa]")) {
      d.showModal();
      return;
    }
    if (e.target === d || e.target.closest("#wa .x")) {
      d.classList.add("out");
      setTimeout(function () {
        d.close();
        d.classList.remove("out");
      }, 220);
    }
  });
})();
(function () {
  var t = document.getElementById("tel"),
    n = "(61) 3487-1170";
  var left = false;
  ["visibilitychange", "pagehide", "blur"].forEach(function (ev) {
    (ev === "visibilitychange" ? document : window).addEventListener(
      ev,
      function () {
        left = true;
      },
    );
  });
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="tel:"]');
    if (a && !a.closest("#tel")) {
      left = false;
      setTimeout(function () {
        if (!left && !t.open) {
          t.querySelector(".cp").textContent = "Copiar número";
          t.showModal();
        }
      }, 900);
      return;
    }
    if (e.target === t || e.target.closest("#tel .x")) {
      t.classList.add("out");
      setTimeout(function () {
        t.close();
        t.classList.remove("out");
      }, 220);
      return;
    }
    var c = e.target.closest("#tel .cp");
    if (c) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(n).then(
          function () {
            c.textContent = "Número copiado!";
          },
          function () {
            c.textContent = n;
          },
        );
      } else {
        c.textContent = n;
      }
    }
  });
})();
(function () {
  var b = document.querySelector(".mb"),
    m = document.getElementById("menu"),
    o = document.querySelector(".mo");
  function set(v) {
    b.setAttribute("aria-expanded", v);
    b.setAttribute("aria-label", v ? "Fechar menu" : "Abrir menu");
    m.classList.toggle("open", v);
    o.classList.toggle("open", v);
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest(".mb")) {
      set(b.getAttribute("aria-expanded") !== "true");
      return;
    }
    if (
      m.classList.contains("open") &&
      (e.target.closest("#menu a") ||
        e.target.closest("#menu .b") ||
        e.target === o)
    )
      set(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") set(false);
  });
})();
(function () {
  function brt() {
    var o = {};
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Sao_Paulo",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(new Date())
      .forEach(function (x) {
        o[x.type] = x.value;
      });
    return {
      d: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday),
      m: +o.hour * 60 + +o.minute,
    };
  }
  function upd() {
    try {
      var t = brt(),
        wk = t.d >= 1 && t.d <= 5,
        open = wk && t.m >= 480 && t.m < 1080,
        msg;
      if (open) msg = "Aberto agora, fecha às 18h";
      else if (wk && t.m < 480) msg = "Fechado agora, abre hoje às 8h";
      else if (t.d >= 1 && t.d <= 4) msg = "Fechado agora, abre amanhã às 8h";
      else msg = "Fechado agora, abre segunda às 8h";
      document.querySelectorAll("[data-hs]").forEach(function (e) {
        e.classList.toggle("on", open);
        e.classList.toggle("off", !open);
        e.querySelector("b").textContent = msg;
      });
    } catch (x) {}
  }
  upd();
  setInterval(upd, 60000);
})();
document.querySelectorAll(".ben div").forEach(function (c) {
  c.addEventListener("pointermove", function (e) {
    var r = c.getBoundingClientRect();
    c.style.setProperty("--mx", e.clientX - r.left + "px");
    c.style.setProperty("--my", e.clientY - r.top + "px");
  });
});
document.querySelectorAll("details").forEach(function (d) {
  var s = d.querySelector("summary"),
    c = s.nextElementSibling;
  s.addEventListener("click", function (e) {
    e.preventDefault();
    if (d.dataset.b) return;
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) {
      d.open = !d.open;
      return;
    }
    d.dataset.b = 1;
    var end = function () {
      delete d.dataset.b;
      delete d.dataset.c;
    };
    if (!d.open) {
      d.open = true;
      var h = c.offsetHeight;
      c.animate(
        [
          {
            height: "0px",
            opacity: 0,
            marginTop: "0px",
            transform: "translateY(-10px)",
            filter: "blur(6px)",
          },
          {
            height: h + "px",
            opacity: 1,
            marginTop: "10px",
            transform: "none",
            filter: "blur(0px)",
          },
        ],
        { duration: 560, easing: "cubic-bezier(.32,.72,0,1)" },
      ).onfinish = end;
    } else {
      d.dataset.c = 1;
      var h2 = c.offsetHeight;
      c.animate(
        [
          {
            height: h2 + "px",
            opacity: 1,
            marginTop: "10px",
            transform: "none",
            filter: "blur(0px)",
          },
          {
            height: "0px",
            opacity: 0,
            marginTop: "0px",
            transform: "translateY(-8px)",
            filter: "blur(4px)",
          },
        ],
        { duration: 400, easing: "cubic-bezier(.32,.72,0,1)" },
      ).onfinish = function () {
        d.open = false;
        end();
      };
    }
  });
});
