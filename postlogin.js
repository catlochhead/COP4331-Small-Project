document.addEventListener("DOMContentLoaded", function () {
    console.log("Contact Manager Loaded");
    
    const addContactBtn = document.getElementById("add-contact-btn");
    const contactForm = document.getElementById("contact-form");
    
    addContactBtn.addEventListener("click", function () {
        contactForm.style.display = contactForm.style.display === "none" || contactForm.style.display === "" ? "block" : "none";
    });
});
