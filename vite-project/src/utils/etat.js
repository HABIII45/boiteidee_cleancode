export let idees = []
export let currentIdeaId = null

export function changerIdees(nouvelleIdee) {
   idees.push(nouvelleIdee)
}
export function UneIdee(data){
     idees = data              //remplace le tableau idees par les données venant de Supabase.
}

export function changerID(id){
     currentIdeaId = id               //recuperation de l id
}

export function RecevoirID(){
   return currentIdeaId       //retourne l id recu a travers changerID
}

