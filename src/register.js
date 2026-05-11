import "./style.css";

import "./style.css";

//Hämta från DOM
const registerForm = document.querySelector("#registerForm");
const messageElement = document.querySelector("#regMessage");

//Händelselyssnare
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.querySelector("#regUsername").value;
  const password = document.querySelector("#regPassword").value;

  try {
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      messageElement.style.color = "green";
      messageElement.innerText = "Konto skapat! Skickar dig till inloggning...";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    } else {
      messageElement.style.color = "red";
      messageElement.innerText =
        "Fel: " + (data.error || "Kunde inte skapa konto");
    }
  } catch (error) {
    messageElement.innerText = "Kunde inte nå servern.";
  }
});
