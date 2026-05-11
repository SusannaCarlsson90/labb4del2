# Labb 4 - Frontend (Del 2)

Detta är Frontend-delen byggd med Vite. Den kommunicerar med backenden för att hantera användarkonton och inloggning.

## Funktioner

- **Startsida (`index.html`):** Inloggningsformulär som sparar JWT i `localStorage`.
- **Registrering (`register.html`):** Sida för att skapa nya konton.
- **Skyddad sida (`protected.html`):** En sida som bara kan ses om man är inloggad. Den hämtar data från serverns skyddade route.
- **Utloggning:** Rensar sparad token och skickar tillbaka användaren till startsidan.

## Hur man kör projektet

1. Kör `npm install`.
2. Starta utvecklingsservern med `npm run dev`.
3. Öppna länken i webbläsaren.

## Säkerhetslogik

Sidan använder en kontroll i JavaScript som kollar efter en token i webbläsarens minne. Saknas den, nekas åtkomst till den skyddade sidan.
