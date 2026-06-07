export async function obtenirCategorieIA(titre, description) {
  const apiKey = import.meta.env.VITE_OPENROUTER_KEY;

  const prompt = `
Tu es un classificateur d'idées.

Catégories autorisées :

- pedagogie : idées liées à l'apprentissage, aux cours, aux ateliers, à la formation ou à l'amélioration des compétences.

- evenement : idées liées à l'organisation d'activités, de concours, de hackathons, de conférences ou de rencontres.

- campus : idées liées à la vie quotidienne, aux espaces, au confort ou aux services du campus.

- technique : idées liées aux outils numériques, logiciels, équipements informatiques ou infrastructures techniques.

Règles importantes :

- N'ajoute aucune explication.
- Choisis uniquement parmi :
  pedagogie
  evenement
  campus
  technique



Titre : ${titre}
Description : ${description}

Réponse :


`


//  const response = await fetch("/.netlify/functions/openrouter", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ prompt })
//   });

//   const data = await response.json();

//   console.log("IA response:", data);

//   const content = data?.choices?.[0]?.message?.content;

//   if (!content) {
//      console.log("IA response complète:", data);
//      throw new Error("Réponse IA invalide");
//   }

//   return content.trim();
const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "google/gemma-4-31b-it",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();

  console.log("OPENROUTER RAW:", data);

//   return {
//     statusCode: 200,
//     body: JSON.stringify(data)
//   };
// ✅ tu retournes juste le texte
const content = data?.choices?.[0]?.message?.content
if (!content) throw new Error("Réponse IA invalide")
return content.trim()
 }
 