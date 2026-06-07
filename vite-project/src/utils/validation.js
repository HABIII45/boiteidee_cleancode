import { chargerIdees } from "../ideesservices/servicesidees.js";
import { idees,changerIdees, currentIdeaId, RecevoirID } from "./etat.js"
import { InsererIdees } from "../ideesservices/servicesidees.js"
import {SupprimerIdees} from "../ideesservices/servicesidees.js"
import {ModificationSauvegarder} from "../ideesservices/servicesidees.js"
import { Archivage } from "../ideesservices/servicesidees.js";
import { form,titleInput,erreurtitre,description,descriptionerreur,ideasContainer } from "./dom.js";
import { obtenirCategorieIA } from "../ia/ia.js";
import { changerID } from "./etat.js";

//fonctions succes et erreur pour les champs de saisi

export function erreur(champ) {
  champ.classList.add("error");
  champ.classList.remove("success");
 }
 export function success(champ) {
  champ.classList.remove("error");
  champ.classList.add("success");
 }
//validation du titre avec regex

export function ValiderTitre(titre) {
  const re = /^[a-zA-ZÀ-ÿ]+([ '-][a-zA-ZÀ-ÿ]+)*$/;
   return re.test(titre)
  
}

//validation du titre 

 export function TitreValide() {
  
  if(titleInput.value.trim() === ""){
    erreur(titleInput)
    erreurtitre.textContent = "Le titre ne peut etre vide"
    return false;
   }
  else if (!(ValiderTitre(titleInput.value.trim()))) {
     erreur(titleInput)
     erreurtitre.textContent = "Ce format n est pas pris en compte"
     return false;
  }
  else if (titleInput.value.length < 5){
    erreur(titleInput)
    erreurtitre.textContent = "Le titre doit au moins avoir 5caracteres"
    return false;
  }
 else {
  success(titleInput)
  erreurtitre.textContent = ""
  return true;
 }
}

// validation de la description

export function  DescValide() {
 
  if(description.value.trim() === ""){
    erreur(description)
    descriptionerreur.textContent = "Veuillez rediger une description"
    return false;
  }
  else if (description.value.length < 25 || description.value > 255){
    erreur(description)
    descriptionerreur.textContent = "La description doit au mois avoir 25 caracteres"
  }
  else {
    success(description)
    descriptionerreur.textContent = ""
    return true;
  }
}




// ici on verifie si le titre est valide
 export function verifierFormulaire() {
  
  const titreOk = TitreValide(); 
  
}

// ici on verifie si la description est valide si oui on active leboutton de soumission
export function verifierFormulairedesc() {
  
   // true ou false
  const descOk = DescValide();
 
  submitBtn.disabled = !descOk;
  
}
 const submitBtn = document.getElementById("submit-btn");
let touchedTitre = false;
let touchedDesc = false;
//fonction de mis de a jour du form a son etat initial apres soumission
export function rechargerFormulaire() {

  titleInput.value = "";
  description.value = "";

  titleInput.classList.remove("success", "error");
  description.classList.remove("success", "error");

  erreurtitre.textContent = "";
  descriptionerreur.textContent = "";

  touchedTitre = false;
  touchedDesc = false;

  submitBtn.disabled = true;
}

//events du formulaire

export function EventsForm(){
 titleInput.addEventListener("input", () => {
  touchedDesc= true;
  verifierFormulaire();
});

titleInput.addEventListener("blur", () => {
  touchedTitre = true;
  verifierFormulaire();
});

description.addEventListener("input", () => {
  touchedDesc = true;
  verifierFormulairedesc();
});

description.addEventListener("blur", () => {
  touchedDesc = true;
  verifierFormulairedesc();
});
}

//soumission
export function BouttonSoumetre() {
    

form.addEventListener("submit", async (e) => {
  
  e.preventDefault()
  // showLoading()
  if (!TitreValide()) return;
  if (!DescValide()) return;

 let categorieIA =
    await obtenirCategorieIA(
    titleInput.value,
    description.value
)
categorieIA = categorieIA
  .trim()
  .toLowerCase()
  .replace(/[^a-z]/g, "");


 
  const nouvelleIdee = {
    
    // id: Date.now(),

     titre: titleInput.value,

     categorie: categorieIA,

     description: description.value,
    

    archivee: false

  }
  
  
  //archiveechargerIdees(nouvelleIdee)


  InsererIdees(nouvelleIdee)

  

 rechargerFormulaire()
 chargerIdees()
})
afficherIdees()
}
// fonction permettant d afficher les idees
export function afficherIdees() {
    const couleursCartes = {
    pedagogie: "note-pedagogie",
    evenement: "note-evenement",
    campus: "note-campus",
    technique: "note-technique"
    }

  const couleurs = {
    pedagogie: "text-bg-warning",
    evenement: "text-bg-info",
    campus: "text-bg-secondary",
    technique: "text-bg-success"
  }

  const labels = {
    pedagogie: "Pédagogie",
    evenement: "Événement",
    campus: "Vie de campus",
    technique: "Technique"
  }
 const archiveBtn =
document.getElementById("show-archives")

const archives =
idees.filter(
  idee => idee.archivee
)

archiveBtn.style.display =
archives.length > 0
? "inline-block"
: "none"

  ideasContainer.innerHTML = ""
  if (idees.length === 0) {

    ideasContainer.innerHTML = `
      <div class="text-center py-5">

        

        <h4>Aucune idée pour le moment</h4>

        <p class="text-muted">
          Soyez la première personne à proposer une idée !
        </p>

      </div>
    `

    return
  }
  else if (idees.length > 0) {

  ideasContainer.innerHTML = `
    <h3 class="mb-4">
       Voici les idées proposées
    </h3>
  `
}


  idees
   .filter(idee => !idee.archivee)
  .forEach((idee) => {

    const badgeColor =
    couleurs[idee.categorie]

    const cardWrapper =
    document.createElement("div")

    cardWrapper.classList.add(
      "col-12",
      "col-md-6",
      "col-lg-4"

    )

    const card =
    document.createElement("div")

   card.classList.add(
  "card",
  "border-0",
  "shadow-sm",
  "rounded-4",
  couleursCartes[idee.categorie]
)

       card.innerHTML = `

      <div class="card-body">

        <div class="d-flex justify-content-between align-items-center">

          <span class="badge rounded-pill ${badgeColor}">
            ${labels[idee.categorie]}
          </span>

          <div class="dropdown">

            <button
               type="button"
               class="btn btn-light btn-sm rounded-circle"
              data-bs-toggle="dropdown">

              ⋮

            </button>

            <ul class="dropdown-menu">

              <li>
                <a
                  href="#"
                  class="dropdown-item edit-btn"
                  data-id="${idee.id}">
                  Modifier
                </a>
              </li>

              <li>
                <a
                  href="#"
                  class="dropdown-item text-danger delete-btn"
                  data-id="${idee.id}">
                  Supprimer
                </a>
              </li>
              <li>
                 <a
                 href="#"
                 class="dropdown-item archive-btn"
                 data-id="${idee.id}">
                 Archiver
               </a>
             </li>

            </ul>

          </div>

        </div>

        <h5 class="fw-bold mt-3">
          ${idee.titre}
        </h5>

        <p class="text-muted">
          ${idee.description}
        </p>

      </div>

    `

    cardWrapper.appendChild(card)

    ideasContainer.appendChild(cardWrapper)

  })
 //chargerIdees()
}

// suppresion
export function IdeesSuppresion() {
    


document.addEventListener("click", async (e) => {

  if (
    e.target.classList.contains("delete-btn")
  ) {

    e.preventDefault()

    const id =
    Number(e.target.dataset.id)

    //idees = idees.filter(
     // idee => Number(idee.id) !== changerID(id)

      
    //)
    //await chargerIdees();
    await SupprimerIdees(id)
    chargerIdees()
  }

})

}

//edition d une idée btn editer

export  async function BouttonEditer(){
    document.addEventListener("click", async (e) => {
    
     
     if (e.target.classList.contains("edit-btn")) {
    
      e.preventDefault()
      
    
      const id =
      Number(e.target.dataset.id)
    
      const idee =
      idees.find(
        idee => Number(idee.id) === id
      )
    
      //currentIdeaId = id
      changerID(id)
      document.getElementById(
        "edit-title"
      ).value = idee.titre
    
      document.getElementById(
        "edit-description"
      ).value = idee.description
    
      const modal =
      new bootstrap.Modal(
        document.getElementById("editModal")
      )
    
      modal.show()
     
    }
    
    })
    //chargerIdees()
}
 
// sauvegarder la modification

export function SauvegarderModification(){
    document
    .getElementById("save-edit")
    .addEventListener("click", async () => {
    
      const idee =
      idees.find(
        idee => Number(idee.id) === RecevoirID()
      )
    
      idee.titre =
      document.getElementById(
        "edit-title"
      ).value
    
      idee.description =
      document.getElementById(
        "edit-description"
      ).value
    
      
         //ModificationSauvegarder()
         await ModificationSauvegarder(idee.titre, idee.description)
         //.eq('id',RecevoirID());
    
      bootstrap.Modal
        .getInstance(
          document.getElementById("editModal")
        )
        .hide()
        chargerIdees()
    
    })
    //chargerIdees()
}

export function ArchivageIdee(){
    document.addEventListener("click", async(e) => {
    
      if (e.target.classList.contains("archive-btn")) {
    
        e.preventDefault()
       
    
        const id =
        Number(e.target.dataset.id)
    
        const idee =
        idees.find(
          idee => Number(idee.id) === id
        )
    
        idee.archivee = true
        //currentIdeaId = id
        changerID(id)
           //.eq('id', RecevoirID());
          await Archivage()
       }
      
    
    })
    //chargerIdees()
}

export  function VoirArchives() {
    document
.getElementById("show-archives")
.addEventListener("click", () => {
    document.getElementById("show-archives").style.display = "none"

    document.getElementById("show-ideas").style.display = "inline-block"

  ideasContainer.innerHTML = `
    <h3 class="mb-4">
      Idées archivées
    </h3>
  `

  const couleursCartes = {
    pedagogie: "note-pedagogie",
    evenement: "note-evenement",
    campus: "note-campus",
    technique: "note-technique"
  }

  const couleurs = {
    pedagogie: "text-bg-warning",
    evenement: "text-bg-info",
    campus: "text-bg-secondary",
    technique: "text-bg-success"
  }

  const labels = {
    pedagogie: "Pédagogie",
    evenement: "Événement",
    campus: "Vie de campus",
    technique: "Technique"
  }

  idees
    .filter(idee => idee.archivee)
    .forEach((idee) => {

      const cardWrapper =
      document.createElement("div")

      cardWrapper.classList.add(
        "col-12",
        "col-md-6",
        "col-lg-4"
      )

      const card =
      document.createElement("div")

      card.classList.add(
        "card",
        "border-0",
        "shadow-sm",
        "rounded-4",
        couleursCartes[idee.categorie]
      )

      card.innerHTML = `
        <div class="card-body">

          <span class="badge rounded-pill ${couleurs[idee.categorie]}">
            ${labels[idee.categorie]}
          </span>

          <h5 class="fw-bold mt-3">
            ${idee.titre}
          </h5>

          <p class="text-muted">
            ${idee.description}
          </p>

        </div>
      `

      cardWrapper.appendChild(card)
      ideasContainer.appendChild(cardWrapper)

    })

})
}

export function VoirIdees(){
    document
.getElementById("show-ideas")
.addEventListener("click", () => {

  afficherIdees()

  document.getElementById("show-ideas").style.display = "none"

  document.getElementById("show-archives").style.display = "inline-block"

})
}

