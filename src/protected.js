import "./style.css";

const contentElement = document.querySelector("#protectedContent");
const logoutBtn = document.querySelector("#logoutBtn");

//Hämta token från webbläsarens minne
const token = localStorage.getItem("token");

//Om token saknas skicka tillbaka till startsidan
if (!token) {
  window.location.href = "index.html";
}

async function getProtectedData() {
  try {
    const response = await fetch("http://localhost:3000/api/protected", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      contentElement.innerHTML = `
        <p>Status: ${data.message}</p>
        <p>Inloggad som: ${data.user.username}</p>
      `;
    } else {
      contentElement.innerText = "Åtkomst nekad.";
    }
  } catch (error) {
    console.error("Fel vid hämtning:", error);
    contentElement.innerText = "Kunde inte ansluta till servern.";
  }
}
getProtectedData();

//Vid kliikc på logoutBtn knappen
logoutBtn.addEventListener("click", () => {
  //Ta bort token från webbläsarens minne
  localStorage.removeItem("token");

  //Skicka tillbaka användaren till startsidan
  window.location.href = "index.html";
});
