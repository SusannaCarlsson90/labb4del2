import "./style.css";

import "./style.css";

//Hämta från DOM
const registerForm = document.querySelector("#registerForm");
const messageElement = document.querySelector("#regMessage");

//Händelselyssnare
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  //Hämtar de värden som användaren skrivit in i fälten
  const username = document.querySelector("#regUsername").value;
  const password = document.querySelector("#regPassword").value;

  try {
    //Skickar post förfrågan för att skapa en ny användare
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, //Berättar för servern att vi skickar JSON-data
      body: JSON.stringify({ username, password }), //Omvandlar JS-objektet till JSON-sträng
    });
    //Väntar svar från servern och omvandlar det itll ett objekt
    const data = await response.json();

    //Kontrollerar om registrering lyckades
    if (response.ok) {
      messageElement.style.color = "green";
      messageElement.innerText = "Konto skapat! Skickar dig till inloggning...";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
      //Om nej:
    } else {
      messageElement.style.color = "red";
      messageElement.innerText =
        "Fel: " + (data.error || "Kunde inte skapa konto");
    }
    //Fånga upp nätverksfel:
  } catch (error) {
    messageElement.innerText = "Kunde inte nå servern.";
  }
});
