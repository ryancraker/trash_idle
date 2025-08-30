<script setup>
import { AppState } from "@/AppState";
import RandomEncounter from "@/components/RandomEncounter.vue";
import Shop from "@/components/Shop.vue";
import { ref } from "vue";

const trash = ref(0);
const health = ref(100);
const level = ref({
  now: 1,
  max: 100,
});
const xp = ref({
  now: 0,
  max: 5,
});
const forage_skill = ref(1);

// @click="showMobileMenu = !showMobileMenu"

function toggleStore() {
  AppState.is_shop_visible = !AppState.is_shop_visible;
}

function toggleEncounter() {
  AppState.is_encounter_visible = !AppState.is_encounter_visible;
}

function forage() {
  trash.value += forage_skill.value;

  /** XP & Leveling up */
  xp.value.now++;
  if (xp.value.now == xp.value.max) {
    xp.value.now = 0;
    xp.value.max *= 3;
    level.value.now++;
    forage_skill.value += 5;
  }

  /** Random encounter */
  if (Math.ceil(Math.random() * 6) == 3) {
    toggleEncounter();
  }
}
</script>

<template>
  <div class="home-container">
    <article class="card shadow">
      <h2>Team Rocket's Hideout</h2>
      <img
        src="../assets/img/rocket-grunt.webp"
        class="grunt-img"
        alt="Rocket grunt"
      />
    </article>
    <!-- MAIN WINDOW -->
    <article class="card shadow">
      <div class="card-body">
        <div class="card-title">
          <h1>Trash Idle</h1>
        </div>
        <section class="container">
          <div class="row main-pkmn">
            Lv. {{ level.now }}
            <progress class="health-bar" :value="health" max="100">
              {{ health }}%
            </progress>
            <img src="../assets/img/rattata.png" class="rat-img" alt="rat" />

            <progress id="xp-bar" :value="xp.now" :max="xp.max">
              {{ xp.now }}%
            </progress>
            <span id="xp-ratio">{{ xp.now }} / {{ xp.max }}</span>
          </div>
          <div class="row">
            <span class="mdi mdi-trash-can-outline fs-5">{{ trash }}</span>
          </div>
          <div class="row">
            <button class="btn btn-dark-cyan w-100" @click="forage()">
              Forage
            </button>
          </div>
          <div class="row">
            <div class="col-4">
              <button class="btn btn-vue w-100">Pokémon Center</button>
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
              <button class="btn btn-vue w-100" @click="toggleEncounter()">
                Encounter
              </button>
            </div>
          </div>
        </section>
      </div>
    </article>
    <Shop />
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
</style>
