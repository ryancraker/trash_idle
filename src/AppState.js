import { reactive } from "vue";

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  money: 0,
  is_shop_visible: false,
  is_encounter_visible: false,
  current_pokemon: {
    name: "Rattata",
    custom_name: null,
    id: 1,
    hp: 30,
    attack: 56,
    defense: 35,
    sp_atk: 25,
    sp_def: 35,
    speed: 72,
  },
  //encountered_pokemon:{}
});
