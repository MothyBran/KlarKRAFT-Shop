
// Bestehender JS-Code bleibt erhalten
// ...

// 🔹 Bestellung automatisch an Google Sheets senden
function sendeBestellung(kunde, artikel, menge) {
  fetch("https://script.google.com/macros/s/AKfycbwFdRZoH_TJKtoZrrSHLZxaJQp1BWg8YdiE8rpGN4XNYRYpZ-Nkebkn34ZKA7MGxycunQ/exec", {
    method: "POST",
    body: JSON.stringify({
      kunde: kunde,
      artikel: artikel,
      menge: menge
    })
  })
  .then(res => res.text())
  .then(data => {
    console.log("✅ Bestellung gesendet:", data);
    // Optional: Bestätigung anzeigen
  })
  .catch(error => {
    console.error("❌ Fehler beim Senden der Bestellung:", error);
  });
}

// 🔹 Bestellungen aus Google Sheets laden und in Tabelle anzeigen
function ladeBestellungenUndZeigeAn() {
  fetch("https://script.google.com/macros/s/AKfycbwFdRZoH_TJKtoZrrSHLZxaJQp1BWg8YdiE8rpGN4XNYRYpZ-Nkebkn34ZKA7MGxycunQ/exec")
    .then(response => response.json())
    .then(data => {
      const tabelle = document.getElementById("bestellungenTabelle");
      if (!tabelle) return;
      tabelle.innerHTML = `
        <tr>
          <th>Datum</th>
          <th>Kunde</th>
          <th>Artikel</th>
          <th>Menge</th>
          <th>Status</th>
        </tr>
      `;
      data.forEach(eintrag => {
        tabelle.innerHTML += `
          <tr>
            <td>${eintrag["Zeitstempel"] || ""}</td>
            <td>${eintrag["Kunde"]}</td>
            <td>${eintrag["Artikel"]}</td>
            <td>${eintrag["Menge"]}</td>
            <td>${eintrag["Status"] || "offen"}</td>
          </tr>
        `;
      });
    })
    .catch(console.error);
}
