// Insère ta clé ici
const OPENAI_API_KEY = "ta_clé_api_openai";

document.getElementById("generateBtn").addEventListener("click", async () => {
  const nom = document.getElementById("nom").value;
  const type = document.getElementById("type").value;
  const couleur = document.getElementById("couleur").value;
  const sections = document.getElementById("sections").value;

  const prompt = `
Crée un site ${type} en HTML/CSS (et JS si nécessaire) avec :
- Titre : ${nom}
- Couleur principale : ${couleur}
- Sections : ${sections}
Fournis le code complet dans une balise <html> sans explication.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  const code = data.choices[0].message.content;

  document.getElementById("result").textContent = code;
  document.getElementById("downloadBtn").style.display = "block";

  // Save the code for later
  window.generatedCode = code;
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  if (!window.generatedCode) return;

  const zip = new JSZip();
  zip.file("index.html", window.generatedCode);
  zip.generateAsync({ type: "blob" }).then(content => {
    saveAs(content, "mon-site.zip");
  });
});
