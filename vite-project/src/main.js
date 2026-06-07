// import { supabaseClient } from "./bd/superbase.js";
// console.log("communication lancée",supabaseClient)
// import { chargerIdees } from "./scripts.js"
//  document.addEventListener("DOMContentLoaded", async () => {
//   await chargerIdees();
// });
// console.log("reussi")

import { EventsForm,BouttonSoumetre,IdeesSuppresion,BouttonEditer,SauvegarderModification,ArchivageIdee,VoirArchives,VoirIdees } from "./utils/validation";
//import { afficherIdees } from "./utils/validation";
import { obtenirCategorieIA } from "./ia/ia";
import { chargerIdees } from './ideesservices/servicesidees.js'

chargerIdees() // ← charge les idées dès l'ouverture de la page
EventsForm()
BouttonSoumetre()
IdeesSuppresion()
BouttonEditer()
SauvegarderModification()
ArchivageIdee()
VoirArchives()
VoirIdees()
obtenirCategorieIA()
//afficherIdees()