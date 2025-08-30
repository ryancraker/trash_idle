<script setup>
import { ref } from "vue";

const trash = ref(0);
const money = ref(0);
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

const store = ref({
  pokeball: {
    name: "Poké Ball",
    price: 5,
    inv: 0,
  },
  potion: {
    name: "Potion",
    price: 10,
    inv: 0,
  },
  revive: {
    name: "Revive",
    price: 100,
    inv: 0,
  },
});

function forage() {
  trash.value += forage_skill.value;
  xp.value.now++;
  /** Leveling up */
  if (xp.value.now == xp.value.max) {
    xp.value.now = 0;
    xp.value.max *= 3;
    level.value.now++;
    forage_skill.value += 5;
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
            <progress id="health-bar" :value="health" max="100">
              {{ health }}%
            </progress>
            <img src="../assets/img/rattata.png" class="rat-img" alt="rat" />
            Lv. {{ level.now }}
            <progress id="xp-bar" :value="xp.now" :max="xp.max">
              {{ xp }}%
            </progress>
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
              <button class="btn btn-vue w-100 mdi mdi-store">Store</button>
            </div>
            <div class="col-4">
              <button class="btn btn-vue w-100">click me!</button>
            </div>
            <div class="col-4">
              <button class="btn btn-vue w-100">click me!</button>
            </div>
          </div>
        </section>
      </div>
    </article>
    <!-- STORE WINDOW -->
    <article class="card shadow">
      <div class="card-body">
        <h2>Store</h2>
        <section class="container">
          <div class="row">
            <img
              src="../assets/img/nurse-joy.png"
              class="nurse-img"
              alt="Nurse"
            />
          </div>
          <div class="row">${{ money }}</div>
          <div class="row">
            <div class="col-4" v-for="value in store" :key="value">
              <button class="btn btn-vue w-100 mdi">
                {{ value.name }}
                ${{ value.price }}
              </button>
            </div>
          </div>
        </section>
      </div>
    </article>
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
  width: 350px;
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
#health-bar {
  accent-color: hotpink;
}
#xp-bar {
  accent-color: var(--bs-dark-cyan);
}
</style>
