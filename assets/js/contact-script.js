/* jshint esversion: 8 */

const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const errorMessage = document.getElementById("error-message");

const nameRegex = /^[A-Za-z\s]{2,50}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const messageRegex = /^.{10,500}$/;

form.addEventListener("submit", function (event) {
    event.preventDefault();

    errorMessage.textContent = "";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!nameRegex.test(name)) 
    {
        errorMessage.textContent = "Name must contain only letters and spaces (2-50 characters).";
        return;
    }

    if (!emailRegex.test(email)) 
    {
        errorMessage.textContent = "Please enter a valid email address.";
        return;
    }

    if (!messageRegex.test(message)) 
    {
        errorMessage.textContent = "Message must be between 10 and 500 characters.";
        return;
    }

    alert("Form submitted successfully!");

    form.submit();
});