'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}



// modal variables
const modalTriggers = document.querySelectorAll("[data-modal]");
const modals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".close");

// add event to all modal triggers
for (let i = 0; i < modalTriggers.length; i++) {
  modalTriggers[i].addEventListener("click", function () {
    const modalId = this.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    modal.style.display = "block";
  });
}

// add event to all close buttons
for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", function () {
    this.closest(".modal").style.display = "none";
  });
}

// close modal when clicking outside of modal content
window.addEventListener("click", function (event) {
  for (let i = 0; i < modals.length; i++) {
    if (event.target === modals[i]) {
      modals[i].style.display = "none";
    }
  }
});

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// Gallery functionality for location and image buttons
const locationButtonsGroup = document.querySelectorAll(".location-btn");

// Location button click handlers
locationButtonsGroup.forEach(btn => {
  btn.addEventListener("click", function() {
    const location = this.getAttribute("data-location");
    document.querySelector(".location-buttons-group").style.display = "none";
    document.getElementById(location + "-gallery").style.display = "block";
  });
});

// Image button click handlers with event delegation
document.addEventListener("click", function(event) {
  const imageBtn = event.target.closest(".image-btn");
  if (imageBtn) {
    const imageSet = imageBtn.getAttribute("data-image-set");
    const setEl = document.getElementById(imageSet);
    // hide location buttons and galleries
    const locGroup = document.querySelector('.location-buttons-group');
    if (locGroup) locGroup.style.display = 'none';
    document.querySelectorAll('.gallery-container').forEach(g => g.style.display = 'none');
    // hide other image sets
    document.querySelectorAll('.image-set').forEach(s => s.style.display = 'none');
    // show selected set
    if (setEl) setEl.style.display = 'block';
  }
});

// Functions for gallery navigation
function resetGallery() {
  // Clear inline display so CSS controls the layout
  const locGroup = document.querySelector(".location-buttons-group");
  if (locGroup) locGroup.style.display = '';
  document.getElementById("cebu-gallery").style.display = "none";
  document.getElementById("bohol-gallery").style.display = "none";
}

// wire up modal back buttons (close modal and return to location buttons)
document.querySelectorAll('.modal-back-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    // hide all modals
    document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
    // show location buttons and hide galleries
    const locGroup = document.querySelector('.location-buttons-group');
    if (locGroup) locGroup.style.display = '';
    document.querySelectorAll('.gallery-container').forEach(g => g.style.display = 'none');
  });
});

// wire gallery back buttons to reset gallery
document.querySelectorAll('.gallery-back-btn').forEach(btn => {
  btn.addEventListener('click', resetGallery);
});

// wire image-set back buttons to return to the gallery view
document.querySelectorAll('.image-set-back-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    // hide all image sets
    document.querySelectorAll('.image-set').forEach(s => s.style.display = 'none');
    // show location buttons
    const locGroup = document.querySelector('.location-buttons-group');
    if (locGroup) locGroup.style.display = '';
    // hide any galleries
    document.querySelectorAll('.gallery-container').forEach(g => g.style.display = 'none');
  });
});

// clicking images inside the image set currently does nothing (no popup)


/* ===============================
   SINGLE IMAGE CLICK POPUP
   =============================== */

/* ===============================
   SINGLE IMAGE CLICK POPUP (FIXED)
   =============================== */

document.addEventListener("DOMContentLoaded", function () {

  const singleImageModal = document.getElementById("singleImageModal");
  const singleImageModalImg = document.getElementById("singleImageModalImg");
  const singleImageClose = document.querySelector(".single-image-close");

  if (!singleImageModal || !singleImageModalImg || !singleImageClose) return;

  // Open popup when clicking an image inside image sets
  document.addEventListener("click", function (e) {
    const img = e.target.closest(".modal-images-grid img");
    if (!img) return;

    singleImageModalImg.src = img.src;
    singleImageModal.classList.add("active");
  });

  // Close button
  singleImageClose.addEventListener("click", function () {
    singleImageModal.classList.remove("active");
  });

  // Click outside image closes modal
  singleImageModal.addEventListener("click", function (e) {
    if (e.target === singleImageModal) {
      singleImageModal.classList.remove("active");
    }
  });

});

