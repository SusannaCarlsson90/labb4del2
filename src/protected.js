const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://labb4del1.onrender.com";
import "./style.css";

//Hämtar HTML element för att kunna ändra dem senare
const contentElement = document.querySelector("#protectedContent");
const logoutBtn = document.querySelector("#logoutBtn");

//Hämta token från webbläsarens minne
const token = localStorage.getItem("token");

//Om token saknas skicka tillbaka till startsidan
if (!token) {
  window.location.href = "/";
}

//Funktion för att hämta hemlig data från Backend
async function getProtectedData() {
  try {
    //Gör ett GET anrop till den skyddade routen i Backend
    const response = await fetch(`${API_URL}/api/protected`, {
      method: "GET",
      headers: {
        //Skickar med token så att servern kan verifiera vem användaren är
        Authorization: `Bearer ${token}`,
      },
    });
    //Omvandlar svaren från JSON till ett läsbart JavaScript objekt
    const data = await response.json();
    //Om servern godkänner token skriv ut status och inloggad som
    if (response.ok) {
      contentElement.innerHTML = `
        <p>Status: ${data.message}</p>
        <p>Inloggad som: ${data.user.username}</p>
      `;
      //Om token gått ut/är ogiltigt :
    } else {
      contentElement.innerText = "Åtkomst nekad.";
    }
    //Fångar upp eventuella nätverksfel
  } catch (error) {
    console.error("Fel vid hämtning:", error);
    contentElement.innerText = "Kunde inte ansluta till servern.";
  }
}
//Anropar funktionen
getProtectedData();

//Vid kliikc på logoutBtn knappen
logoutBtn.addEventListener("click", () => {
  //Ta bort token från webbläsarens minne
  localStorage.removeItem("token");

  //Skicka tillbaka användaren till startsidan
  window.location.href = "/";
});
