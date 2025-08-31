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
    gender: true,
    hp_now: 30,
    hp_max: 100,
    attack: 56,
    defense: 35,
    sp_atk: 25,
    sp_def: 35,
    speed: 72,
    xp_now: 0,
    xp_max: 100,
    lvl: 1,
  },
  enemy_pokemon: {
    name: "Trubbish",
    lvl: 1,
    gender: true,
    max_hp: 100,
    hp: 100,
    attack: 50,
    defense: 62,
    sp_atk: 40,
    sp_def: 62,
    speed: 65,
    xp_yield: 66,
    img: "../assets/img/trubbish.png",
  },
  //encountered_pokemon:{}
});
