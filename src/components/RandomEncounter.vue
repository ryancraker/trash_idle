<script setup>
import { AppState } from "@/AppState";
import { computed, ref } from "vue";
//import toggleEncounter from "@/pages/KiraPage.vue";

const is_encounter_visible = computed(() => AppState.is_encounter_visible);
const trubbish = ref({
  name: "Trubbish",
  lvl: 1,
  gender: true,
  hp: 50,
  attack: 50,
  defense: 62,
  sp_atk: 40,
  sp_def: 62,
  speed: 65,
  xp_yield: 66,
  img: "../assets/img/trubbish.png",
});

function fight() {
  alert("fight");
}
function run() {
  AppState.is_encounter_visible = !AppState.is_encounter_visible;
}
</script>

<template>
  <!-- RANDOM ENCOUNTER WINDOW -->
  <article
    class="card shadow"
    :class="{ active: is_encounter_visible }"
    id="encounter-window"
  >
    <div class="card-body">
      <h2>A wild pokemon has appeared!</h2>
      <section class="container">
        <div class="row">
          <div class="col-6">
            <div id="enemy-info" class="col-12">
              {{ trubbish.name }}
              <span
                v-if="trubbish.gender"
                id="enemy-gender"
                class="mdi mdi-gender-male"
              ></span>
              <span
                v-else
                id="enemy-gender"
                class="mdi mdi-gender-female"
              ></span>
              <span id="enemy-lvl">Lv. {{ trubbish.lvl }}</span>
            </div>
            <progress
              class="health-bar col-12"
              id="enemy-health-bar"
              value="100"
              max="100"
            >
              100%
            </progress>
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
          <div class="col-6">
            My Pokemon's Stats
            <progress class="health-bar" value="100" max="100">100%</progress>
          </div>
        </div>
        <div class="row">
          <div class="col-6 pa-0">
            <button class="btn btn-vue w-100 mdi" @click="fight()">
              Fight
            </button>
            <button class="btn btn-vue w-100 mdi">Bag</button>
          </div>
          <div class="col-6 pa-0">
            <button class="btn btn-vue w-100 mdi">Pokemon</button>
            <button class="btn btn-vue w-100 mdi" @click="run()">Run</button>
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
</style>
