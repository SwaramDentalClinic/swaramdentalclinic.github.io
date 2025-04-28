document.addEventListener("DOMContentLoaded", function () {
    const images = [


'./assets/images/gallery/best dentist near me in hinjewadi dr swati shivane swaram dental clinic.jpeg',
'./assets/images/gallery/bestdentistinhinjewadimaanswaramdentalclinic.jpg',
'./assets/images/gallery/best dentist in hinjewadi phase 1 pune swaram dental clinic.jpg',
'./assets/images/gallery/Best Dentist Near Me In hinjewadi Pune Swaram Dental Clinic.jpg',
'./assets/images/gallery/Bad Breath Causes by best dentist in Maan Hinjewadi Mahalunge.jpeg',
'./assets/images/gallery/How_to_brush_your_teeth_by_Best_Dental_Clinic_in_hinjewadi_Swaram_dental_Clinic.jpg',
'./assets/images/gallery/best dental clinic in hinjewadi pune swaram dental clinic.jpeg',      
'./assets/images/gallery/best dental clinic near godrej 24 Hinjewadi- Swaram Dental Clinic.jpg',
'./assets/images/gallery/best dental clinic near godrej element Hinjewadi- Swaram Dental Clinic.jpg',
'./assets/images/gallery/best dental clinic near me in Hinjewadi Swaram Dental Clinic.jpg',
'./assets/images/gallery/best dentist in hinjewadi pune dr swati shivane.jpeg', 
'./assets/images/gallery/best dentist in hinjewadi pune swaram dental clinic.jpg',
'./assets/images/gallery/Best dentist near maan hinjewadi swaram dental clinic.jpg',
'./assets/images/gallery/best dentist near me in hinjewadi for root canal treatment.jpeg',
'./assets/images/gallery/root canal specialist in hinjewadi pune dr swati shivane.jpeg',
'./assets/images/gallery/Best Teeth Cleaning and Polishing By Swaram Dental Clinic Hinjewadi Pune.jpg',

'./assets/images/gallery/Ceramic Bridge By Swaram Dental Clinic Maan Rd Hinjewadi Pune.jpg',
'./assets/images/gallery/Children Dental Health at Swaram Dental Clinic Best Dental Clinic in Hinjewadi.jpg',
'./assets/images/gallery/Decayed Tooth Restoration by doing root canal treatment from Swaram Dental Clinic best dentist in Hinjewadi Maan Pune.jpg',
'./assets/images/gallery/Dental Care  by Swaram Dental Clinic best dental clinic in hinjewadi.jpg',
'./assets/images/gallery/Dental Care by best dentist in Hinjewadi Maan Swaram Dental Clinic.jpg',
'./assets/images/gallery/dental clinic near me in HInjewadi Swaram Dental Clinic.jpg',
'./assets/images/gallery/Dental emergency treatment a dental clinic near me in hinjewadi swaram dental clinic.jpg',
'./assets/images/gallery/Dental implant by best dentist near me in hinjewadi pune.jpg',
'./assets/images/gallery/Dental implant by dentist near me in hinjewadi.jpg',

'./assets/images/gallery/Invisible aligners from Swaram Dental Clinic best orthodontic clinic in Hinjewadi.jpg',
'./assets/images/gallery/oral_hygine.jpg',
'./assets/images/gallery/Swaram Dental Clinic - Best Dental Clinic in Hinjewadi.jpeg',
'./assets/images/gallery/Swaram Dental Clinic Best dental clinic for root canal in hinjewadi pune.jpg',
'./assets/images/gallery/Swaram Dental Clinic Best dentist for root canal in hinjewadi pune.jpg',
'./assets/images/gallery/teeth straightening by swaram dental clinic- dental clinic in hinjewadi.jpg',
'./assets/images/gallery/Teeth_whitening_before_after.jpg'
]; // Replace with actual image paths

            let currentIndex = 0;
            const loadMoreBtn = document.getElementById("loadMoreBtn");
            const galleryGrid = document.getElementById("gallery-grid");
            const lightbox = document.getElementById("lightbox");
            const lightboxImg = document.getElementById("lightbox-img");
            const prevBtn = document.getElementById("prevBtn");
            const nextBtn = document.getElementById("nextBtn");
            const closeBtn = document.getElementById("closeBtn");
        
            let currentLightboxIndex = 0;
        
            function loadImages() {
                for (let i = 0; i < 15; i++) {
                    if (currentIndex >= images.length) {
                        loadMoreBtn.style.display = "none"; // Hide button when all images are loaded
                        break;
                    }
                    let img = document.createElement("img");
                    img.src = images[currentIndex];
                    img.classList.add("gallery-img");
                    img.setAttribute("data-index", currentIndex);
                    img.addEventListener("click", openLightbox);
                    galleryGrid.appendChild(img);
                    currentIndex++;
                }
            }
        
            loadMoreBtn.addEventListener("click", loadImages);
            loadImages(); // Load first 15 images
        
            // Function to Open Lightbox
            function openLightbox(event) {
                currentLightboxIndex = parseInt(event.target.getAttribute("data-index"));
                lightboxImg.src = images[currentLightboxIndex];
                lightbox.style.display = "flex"; // ✅ Lightbox is only shown when an image is clicked
            }
        
            // Function to Close Lightbox
            function closeLightbox() {
                lightbox.style.display = "none";
            }
        
            function showPrev() {
                if (currentLightboxIndex > 0) {
                    currentLightboxIndex--;
                    lightboxImg.src = images[currentLightboxIndex];
                }
            }
        
            function showNext() {
                if (currentLightboxIndex < images.length - 1) {
                    currentLightboxIndex++;
                    lightboxImg.src = images[currentLightboxIndex];
                }
            }
        
            closeBtn.addEventListener("click", closeLightbox);
            prevBtn.addEventListener("click", showPrev);
            nextBtn.addEventListener("click", showNext);
        
            document.addEventListener("keydown", function (e) {
                if (lightbox.style.display === "flex") {
                    if (e.key === "ArrowLeft") showPrev();
                    if (e.key === "ArrowRight") showNext();
                    if (e.key === "Escape") closeLightbox();
                }
            });
        
            // Extra Fix: Ensure lightbox is hidden on page load
            lightbox.style.display = "none";
        });
