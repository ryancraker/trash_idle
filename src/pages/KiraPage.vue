<script setup>
import { AppState } from "@/AppState";
import RandomEncounter from "@/components/RandomEncounter.vue";
import Shop from "@/components/Shop.vue";
import Bag from "@/components/Bag.vue";
import Pokemon from "@/components/Pokemon.vue";
import { computed, ref } from "vue";
import Save from "@/components/Save.vue";
import { Pop } from "@/utils/Pop";

const trash = ref(0);
const trash_exchange_rate = ref(1);
const money = computed(() => AppState.player.money);
const player = computed(() => AppState.player);
const current_pokemon = computed(() => AppState.player.current_pokemon);

const xp = ref({
  now: 0,
  max: 5,
});
const forage_skill = ref(1);

function healPokemon() {
  current_pokemon.value.hp_now = current_pokemon.value.hp_max;
}

function toggleStore() {
  AppState.is_shop_visible = !AppState.is_shop_visible;
}

function toggleEncounter() {
  AppState.is_encounter_visible = !AppState.is_encounter_visible;
  AppState.enemy_pokemon.hp = 100;
}

function toggleBag() {
  AppState.is_bag_visible = !AppState.is_bag_visible;
}

function togglePokemon() {
  AppState.is_pokemon_visible = !AppState.is_pokemon_visible;
}

function forage() {
  trash.value += forage_skill.value;

  /** Random encounter */
  if (Math.ceil(Math.random() * 6) == 3) {
    toggleEncounter();
  }
}
function trashForDollars() {
  if (trash.value >= trash_exchange_rate.value) {
    /** Adds one dollar */
    player.value.money++;
    /** Subtracts trash per current exchange rate */
    trash.value -= trash_exchange_rate.value;
    /** Increases current exchange rate by a factor of 3 */
    trash_exchange_rate.value = Math.ceil((trash_exchange_rate.value *= 1.1));
  } else {
    Pop.fail("Not enough trash to trade!");
  }
}
</script>

<template>
  <div class="home-container row">
    <!-- <article class="card shadow col-4">
      <h2>Team Rocket's Hideout</h2>
      <img
        src="../assets/img/rocket-grunt.webp"
        class="grunt-img"
        alt="Rocket grunt"
      />
    </article> -->
    <!-- MAIN WINDOW -->
    <article class="card shadow col-4" id="main-window">
      <div class="card-body">
        <div class="card-title">
          <h1>Trash Idle</h1>
        </div>
        <section class="container">
          <div class="row main-pkmn">
            Lv. {{ current_pokemon.lvl }}
            <progress
              class="health-bar"
              :value="current_pokemon.hp_now"
              :max="current_pokemon.hp_max"
            >
              {{ current_pokemon.hp_now }}%
            </progress>
            <img src="../assets/img/rattata.png" class="rat-img" alt="rat" />

            <progress
              id="xp-bar"
              :value="current_pokemon.xp_now"
              :max="current_pokemon.xp_max"
            >
              {{ xp.now }}%
            </progress>
            <span id="xp-ratio"
              >{{ current_pokemon.xp_now }} / {{ current_pokemon.xp_max }}</span
            >
          </div>
          <div class="row">
            <span class="mdi mdi-trash-can-outline fs-5">{{ trash }}</span>
            <span
              >${{ money }}
              <button
                class="btn btn-dark-cyan text-white"
                @click="trashForDollars()"
              >
                Exchange {{ trash_exchange_rate }} Trash for $1
              </button></span
            >
          </div>
          <div class="row">
            <button
              class="btn btn-dark-cyan w-100"
              @click="forage()"
              :disabled="player.current_pokemon.hp_now <= 0"
            >
              Forage
            </button>
          </div>
          <div class="row">
            <div class="col-4">
              <button
                class="btn btn-vue w-100 mdi mdi-hospital-building"
                @click="healPokemon()"
              >
                Pokémon Center
              </button>
            </div>
            <div class="col-4">
              <button
                class="btn btn-vue w-100 mdi mdi-store"
                @click="toggleStore()"
              >
                Store
              </button>
            </div>
            <div class="col-4">
              <button
                class="btn btn-vue w-100 mdi mdi-grass"
                @click="toggleEncounter()"
                :disabled="player.current_pokemon.hp_now <= 0"
              >
                Encounter
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <button
                class="btn btn-vue w-100 mdi mdi-bag-personal"
                @click="toggleBag()"
              >
                Bag
              </button>
            </div>
            <div class="col-4">
              <button
                class="btn btn-vue w-100 mdi mdi mdi-circle"
                @click="togglePokemon()"
              >
                Pokémon
              </button>
            </div>
            <div class="col-4">
              <Save />
            </div>
          </div>
        </section>
      </div>
    </article>
    <div
      class="position-relative col-9 col-md-4 p-0"
      id="other-window-container"
    >
      <Shop />
      <Bag />
      <Pokemon />
    </div>

    <RandomEncounter />
  </div>
</template>

<style scoped lang="scss">
.home-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

#main-pkmn-container {
  background-image: url("src/assets/img/bg/dumpster.jpg");
  background-position: bottom;
  flex-grow: width;
  min-height: 150px;
}
.current-pokemon-img {
  margin: auto;
}
// Card
article {
  min-width: 400px;
}

img {
  width: auto;
  margin: auto;
}

img.grunt-img {
  width: 100px;
}

h1,
h2 {
  text-align: center;
}

.card-body .row {
  padding: 5px 0px;
}

.card-body .col-4 {
  padding: 0px 3px;
  align-items: stretch;
  display: flex;
}
.card-body .col-4 button {
  line-height: 1.1em;
}

.health-bar {
  accent-color: hotpink;
}

#xp-bar {
  accent-color: var(--bs-dark-cyan);
}

#xp-ratio {
  text-align: right;
  font-size: 11px;
  padding: 0;
}
#main-window,
#other-window-container {
  margin-bottom: 20px;
}
</style>
