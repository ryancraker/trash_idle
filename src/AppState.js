import { reactive } from "vue";

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  is_shop_visible: false,
  is_encounter_visible: false,
  is_bag_visible: false,
  is_pokemon_visible: false,

  enemy_pokemon: {
    name: "Trubbish",
    lvl: 1,
    gender: true,
    max_hp: 100,
    hp: 100,
    attack: 20, // 50,
    defense: 62,
    sp_atk: 40,
    sp_def: 62,
    speed: 65,
    xp_yield: 66,
    img: "../assets/img/trubbish.png",
  },
  player: {
    inventory: [],
    pokemon_pc: [],
    money: 1000,
    /**@type {import("./models/Pokemon.js").Pokemon} */
    current_pokemon: {
      name: "Rattata",
      custom_name: null,
      id: 1,
      gender: true,
      hp_now: 100,
      hp_max: 100,
      attack: 40, // 56,
      defense: 35,
      sp_atk: 25,
      sp_def: 35,
      speed: 72,
      xp_now: 0,
      xp_max: 100,
      lvl: 1,
    },
  },
});
