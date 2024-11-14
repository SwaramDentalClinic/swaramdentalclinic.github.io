'use strict';

/**
 * Add event on element
 */
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

/**
 * Navbar toggle
 */
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navbarToggler = document.querySelector("[data-nav-toggler]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  navbarToggler.classList.toggle("active");
}

addEventOnElem(navbarToggler, "click", toggleNav);

const closeNav = function () {
  navbar.classList.remove("active");
  navbarToggler.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNav);

/**
 * Header active and image resizing on scroll
 */
const header = document.querySelector('.header-bottom');
const headerImage = document.querySelector('.header-image'); // Ensure the class name matches your image's class

function handleScroll() {
  if (window.scrollY > 100) { // Adjust the number as needed
    header.classList.add('active');
    headerImage.style.width = '120px';
    // headerImage.style.height = '100%'; // Further decrease the image size
  } else {
    header.classList.remove('active');
    headerImage.style.width = '200px';
    // headerImage.style.height = '100'; // Reset to original size
  }
}

window.addEventListener('scroll', handleScroll);


// =========================================================================================================================



document.addEventListener("DOMContentLoaded", function () {
  const reviews = document.querySelectorAll('.review-card');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentIndex = 0;

  // Shuffle reviews randomly
  function shuffleReviews() {
      const reviewsArray = Array.from(reviews);
      for (let i = reviewsArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [reviewsArray[i], reviewsArray[j]] = [reviewsArray[j], reviewsArray[i]];
      }
      // Reattach shuffled reviews to the DOM
      const carousel = document.querySelector('.review-carousel');
      carousel.innerHTML = ''; // Clear current reviews
      reviewsArray.forEach(review => carousel.appendChild(review)); // Append shuffled reviews
  }

  // Show only the current review and hide others
  function showReview(index) {
      reviews.forEach((review, i) => {
          review.style.display = i === index ? 'block' : 'none';
      });
  }

  // Transition to the next review
  function nextReview() {
      currentIndex = (currentIndex + 1) % reviews.length;
      showReview(currentIndex);
  }

  // Transition to the previous review
  function prevReview() {
      currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
      showReview(currentIndex);
  }

  // Initial shuffle and show the first review
  shuffleReviews();
  showReview(currentIndex);

  // Set up auto-transition every 10 seconds
  setInterval(nextReview, 10000);

  // Set up navigation buttons
  prevBtn.addEventListener('click', prevReview);
  nextBtn.addEventListener('click', nextReview);
});



// =========================================================================================================================

