
  document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll(".lazy-img");
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy-img");
          obs.unobserve(img);
        }
      });
    }, {
      rootMargin: "0px 0px 200px 0px",
      threshold: 0.1
    });
    lazyImages.forEach(img => observer.observe(img));
  });

  // Modal image viewer
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");
  const images = Array.from(document.querySelectorAll(".gallery-item img"));
  let currentIndex = 0;

  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.src;
      modalCaption.textContent = img.alt;
      currentIndex = index;
    });
  });

  document.querySelector(".close").onclick = () => modal.style.display = "none";
  document.querySelector(".prev-btn").onclick = () => showImage(currentIndex - 1);
  document.querySelector(".next-btn").onclick = () => showImage(currentIndex + 1);

  function showImage(index) {
    if (index >= 0 && index < images.length) {
      currentIndex = index;
      modalImg.src = images[currentIndex].src;
      modalCaption.textContent = images[currentIndex].alt;
    }
  }

  window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });

