<script setup>
import { AppState } from "@/AppState";
import { Pop } from "@/utils/Pop";
import { computed, ref } from "vue";
//import toggleEncounter from "@/pages/KiraPage.vue";

const is_encounter_visible = computed(() => AppState.is_encounter_visible);
const current_pokemon = computed(() => AppState.current_pokemon);
const fightDisabled = ref(false);
const pokemonDisabled = ref(false);
const bagDisabled = ref(false);
const runDisabled = ref(false);

function disableAllButtons() {
  fightDisabled.value = true;
  pokemonDisabled.value = true;
  bagDisabled.value = true;
  runDisabled.value = true;
}

function enableAllButtons() {
  fightDisabled.value = false;
  pokemonDisabled.value = false;
  bagDisabled.value = false;
  runDisabled.value = false;
}

function fight() {
  /** Attack */
  AppState.enemy_pokemon.hp -= AppState.current_pokemon.attack;

  /** If enemy faints */
  if (AppState.enemy_pokemon.hp <= 0) {
    Pop.battleEnd(
      "Foe fainted! You gained " + AppState.enemy_pokemon.xp_yield + " xp."
    );

    /** XP & Leveling up */
    AppState.current_pokemon.xp_now += AppState.enemy_pokemon.xp_yield;
    if (AppState.current_pokemon.xp_now >= AppState.current_pokemon.xp_max) {
      AppState.current_pokemon.xp_now -= AppState.current_pokemon.xp_max;
      AppState.current_pokemon.xp_max *= 3;
      AppState.current_pokemon.lvl++;
      //forage_skill.value += 5;
    }

    /** Close encounter */
    AppState.is_encounter_visible = !AppState.is_encounter_visible;
  } else {
    disableAllButtons();
    setTimeout(() => {
      console.log("wait 2 secs");
      enemy_fight();
      enableAllButtons();
    }, 800);
  }
}

function enemy_fight() {
  /** Attack */
  AppState.current_pokemon.hp_now -= AppState.enemy_pokemon.attack;
  /** If current pokemon faints */
  if (AppState.current_pokemon.hp_now <= 0) {
    /** If no more pokemon to use */
    Pop.battleEnd(
      "You fainted...",
      "You carry your Pokemon to the nearest center and lose " + 10 + " money."
    );
    AppState.is_encounter_visible = !AppState.is_encounter_visible;
  }
}

function toggleBag() {
  AppState.is_bag_visible = !AppState.is_bag_visible;
}
function togglePokemon() {
  AppState.is_pokemon_visible = !AppState.is_pokemon_visible;
}
function run() {
  /** Random encounter */
  if (Math.ceil(Math.random() * 4) == 3) {
    AppState.is_encounter_visible = !AppState.is_encounter_visible;
    Pop.success("You ran away successfully.", "");
  } else {
    Pop.fail("Failed to run away!", "");
    enemy_fight();
  }
}
</script>

<template>
  <!-- RANDOM ENCOUNTER WINDOW -->
  <article
    class="card shadow col-6"
    :class="{ active: is_encounter_visible }"
    id="encounter-window"
  >
    <div class="card-body">
      <h2>A wild pokemon has appeared!</h2>
      <section class="container bg-box">
        <div class="row">
          <div class="col-6">
            <div id="enemy-info" class="col-12 info-box">
              {{ AppState.enemy_pokemon.name }}
              <span
                v-if="AppState.enemy_pokemon.gender"
                id="enemy-gender"
                class="mdi mdi-gender-male"
              ></span>
              <span
                v-else
                id="enemy-gender"
                class="mdi mdi-gender-female"
              ></span>
              <span id="enemy-lvl">Lv. {{ AppState.enemy_pokemon.lvl }}</span>
              <progress
                class="health-bar col-12"
                id="enemy-health-bar"
                :value="AppState.enemy_pokemon.hp"
                max="100"
              >
                {{ AppState.enemy_pokemon.hp }}%
              </progress>
            </div>
          </div>
          <div class="col-6">
            <img
              src="../assets/img/trubbish.png"
              class="trubbish-img"
              alt="Trubbish"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-6 back-img-container">
            <img
              src="../assets/img/rattata-back.png"
              class="back-img"
              alt="rat"
            />
          </div>
          <div class="col-6 info-box" id="current-pokemon-info">
            {{ current_pokemon.custom_name || current_pokemon.name }}
            <span
              v-if="AppState.enemy_pokemon.gender"
              id="enemy-gender"
              class="mdi mdi-gender-male"
            ></span>
            <span v-else id="enemy-gender" class="mdi mdi-gender-female"></span
            >Lv.
            {{ current_pokemon.lvl }}
            <progress
              class="health-bar"
              :value="current_pokemon.hp_now"
              :max="current_pokemon.hp_max"
            >
              {{ current_pokemon.hp_now / current_pokemon.hp_max }}
            </progress>
          </div>
        </div>
        <div class="row row-btns">
          <div class="col-6 pa-0">
            <button
              class="btn btn-danger w-100 mdi"
              @click="fight()"
              :disabled="AppState.enemy_pokemon.hp <= 0 || fightDisabled"
            >
              Fight
            </button>
            <button
              class="btn btn-warning w-100 mdi"
              :disabled="AppState.enemy_pokemon.hp <= 0 || bagDisabled"
              @click="toggleBag()"
            >
              Bag
            </button>
          </div>
          <div class="col-6 pa-0">
            <button
              class="btn btn-primary w-100 mdi"
              @click="togglePokemon()"
              :disabled="AppState.enemy_pokemon.hp <= 0 || pokemonDisabled"
            >
              Pokemon
            </button>
            <button
              class="btn btn-vue w-100 mdi"
              @click="run()"
              :disabled="AppState.enemy_pokemon.hp <= 0 || runDisabled"
            >
              Run
            </button>
          </div>
        </div>
      </section>
    </div>
  </article>
</template>

<style lang="scss" scoped>
#encounter-window {
  position: fixed;
  z-index: 99;
  visibility: hidden;
}
#encounter-window.active {
  visibility: visible;
}
.card-body .col-6 {
  padding: 0px 4px;
}
.card-body .col-6 button {
  margin-bottom: 8px;
}
.trubbish-img {
  width: auto;
  display: inline-block;
  float: right;
}
.back-img-container {
  display: flex;
  justify-content: center;
}
.bg-box {
  background-image: url("src/assets/img/bg/1.png");
}
.row-btns {
  background: var(--bs-light);
}
.info-box {
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  padding: 2px 5px;
  color: black;
}
</style>
