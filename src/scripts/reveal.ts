// 捲動到畫面內時替 [data-reveal] 元素加上 .is-revealed，觸發 global.css 裡的進場動畫
function initReveal() {
  const elements = document.querySelectorAll<HTMLElement>(
    "[data-reveal]:not(.is-revealed)"
  );

  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

// ClientRouter 換頁後也會觸發 astro:page-load
document.addEventListener("astro:page-load", initReveal);
