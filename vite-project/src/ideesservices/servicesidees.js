//superclient est defini das superbase.js comment le recuperer ici / fonctions de chargement des idées depuis la bd 

//import { SupabaseClient } from "./bd/superbase.js";

import { supabaseClient } from "../bd/superbase";

import { afficherIdees } from "../utils/validation";
import { UneIdee,idees,RecevoirID } from "../utils/etat";
import { form,titleInput,erreurtitre,description,descriptionerreur,ideasContainer } from "../utils/dom.js";

export async function chargerIdees() {

  const { data, error } = await supabaseClient

    .from("ideas")

    .select("*")

    .order("id", { ascending: false });



  if (!error) {

    //idees = data;
    UneIdee(data)

    afficherIdees();

  } else {

    console.log(error);

  }

}

export async function InsererIdees(nouvelleIdee){
    const { error } = await supabaseClient
  .from('ideas')
  .insert([nouvelleIdee])
  if (!error) {
    await  chargerIdees(); // recharge depuis la base
}
//return data;
}

export async function SupprimerIdees(id){
  const { error } = await supabaseClient
.from('ideas')
.delete()
.eq('id',id)
if (!error) {
 await afficherIdees(); // recharge depuis la base
}
}

export async function ModificationSauvegarder(titre, description) {
  const { error } = await supabaseClient
      .from('ideas').update({ titre,description }).eq('id', RecevoirID())
      if (!error) {
       await afficherIdees();
  
}
}

export async function Archivage(){
  const { error } = await supabaseClient
      .from('ideas')
      .update({archivee: true})
      .eq('id',RecevoirID())
      if (!error) {
   await afficherIdees();
}
}