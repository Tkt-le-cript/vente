document.getElementById("generateBtn").addEventListener("click", async () => {
  const nom = document.getElementById("nom").value;
  const couleur = document.getElementById("couleur").value;
  const sections = document.getElementById("sections").value;

  const prompt = `
Crée un site HTML avec CSS simple.
Nom : ${nom}
Couleur principale : ${couleur}
Sections : ${sections}
Retourne uniquement le code HTML complet.
`;

  const res = await fetch("/.netlify/functions/generate", {
    method: "POST",
    body: JSON.stringify({ prompt })
  });
  const data = await res.json();
  document.getElementById("result").textContent = data.result;
});
