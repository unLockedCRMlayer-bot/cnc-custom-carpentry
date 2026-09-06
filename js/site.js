(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const hd = document.getElementById("hd");
  if (hd) {
    const onScroll = () => hd.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (!reduce) {
    const els = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
      );
      els.forEach((el) => io.observe(el));
    } else {
      els.forEach((el) => el.classList.add("in"));
    }
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
  }

  const lb = document.getElementById("lb");
  if (!lb) return;
  const img = lb.querySelector("img");
  const closeBtn = lb.querySelector("button");

  const open = (href, alt) => {
    img.src = href;
    img.alt = alt || "";
    lb.classList.add("open");
    document.documentElement.style.overflow = "hidden";
    closeBtn.focus();
  };
  const close = () => {
    lb.classList.remove("open");
    img.removeAttribute("src");
    document.documentElement.style.overflow = "";
  };

  document.querySelectorAll("[data-lb]").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const thumb = a.querySelector("img");
      open(a.getAttribute("href"), (thumb && thumb.alt) || "");
    });
  });

  lb.addEventListener("click", (e) => {
    if (e.target === lb) close();
  });
  closeBtn.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lb.classList.contains("open")) close();
  });
})();
