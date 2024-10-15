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




