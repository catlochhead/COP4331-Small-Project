document.addEventListener("DOMContentLoaded", function () {
    const addContactBtn = document.getElementById("add-contact-btn");
    const contactForm = document.getElementById("contact-form");
    const contactCards = document.querySelectorAll(".contact-card");
    const contactDetails = document.getElementById("contact-details");
    
    addContactBtn.addEventListener("click", function () {
        contactForm.style.display = "block";
        contactDetails.style.display = "none";
    });
    
    contactCards.forEach(card => {
        card.addEventListener("click", function () {
            document.getElementById("contact-name").innerText = this.dataset.contact;
            document.getElementById("contact-info").innerText = "Additional details here...";
            contactDetails.style.display = "block";
            contactForm.style.display = "none";
        });
    });
    
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".contact-card, .contact-form-container, .contact-details, #add-contact-btn")) {
            contactDetails.style.display = "none";
            contactForm.style.display = "none";
        }
    });
});

