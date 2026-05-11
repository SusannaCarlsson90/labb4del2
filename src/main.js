const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://labb4del1.onrender.com";
import "./style.css";

//Hämtar från DOM
const loginForm = document.querySelector("#loginForm");
const messageElement = document.querySelector("#message");

//Händelselyssnare på submit knapp
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault(); //Förhindrar att sidan laddar om

  //Hämtar inloggningsuppgifterna som användaren skriver in
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  //Skicka inloggningsuppgifterna till backenden via ett POST-anrop
  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Spara token i localStorage

      const token = data.response ? data.response.token : data.token;
      localStorage.setItem("token", token);

      messageElement.style.color = "green";
      messageElement.innerText = "Inloggad! Token har sparats.";

      // Vänta en kort sekund så användaren hinner se meddelandet, sen byt sida
      setTimeout(() => {
        window.location.href = "protected.html";
      }, 1000);
    } else {
      messageElement.style.color = "red";
      messageElement.innerText =
        "Fel: " + (data.error || "Inloggning misslyckades");
    }
  } catch (error) {
    messageElement.style.color = "red";
    messageElement.innerText = "Kunde inte nå servern. Körs backenden?";
  }
});
