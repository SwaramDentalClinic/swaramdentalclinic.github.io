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

// JavaScript to manage accordion behavior
document.addEventListener('DOMContentLoaded', function() {
  const accordions = document.querySelectorAll('.accordion-header');
  
  accordions.forEach(accordion => {
      accordion.addEventListener('click', function() {
          const content = this.nextElementSibling;
          const arrow = this.querySelector('.arrow');
          const isOpen = content.style.display === 'block';
          
          // Close all other open accordion items
          document.querySelectorAll('.accordion-content').forEach(item => {
              item.style.display = 'none';
          });
          document.querySelectorAll('.accordion-item').forEach(item => {
              item.classList.remove('active');
          });

          // Toggle current clicked item
          if (!isOpen) {
              content.style.display = 'block';
              this.parentElement.classList.add('active');
              arrow.style.transform = 'rotate(180deg)';
          } else {
              content.style.display = 'none';
              this.parentElement.classList.remove('active');
              arrow.style.transform = 'rotate(0deg)';
          }
      });
  });
});

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



document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("feedback-form");
  const nameInput = document.getElementById("feedback-name");
  const emailInput = document.getElementById("feedback-email");
  const messageInput = document.getElementById("feedback-message");
  const thankYouMessage = document.getElementById("thank-you-message");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    // Validate name
    if (nameInput.value.trim() === "") {
      nameError.style.display = "block";
      valid = false;
    } else {
      nameError.style.display = "none";
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
      emailError.style.display = "block";
      valid = false;
    } else {
      emailError.style.display = "none";
    }

    // Validate message
    if (messageInput.value.trim() === "") {
      messageError.style.display = "block";
      valid = false;
    } else {
      messageError.style.display = "none";
    }

    // If all fields are valid
    if (valid) {
      thankYouMessage.style.display = "block";
      form.reset(); // Clear the form fields
    }
  });
});



