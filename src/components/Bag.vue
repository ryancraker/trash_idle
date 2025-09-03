<script setup>
import { AppState } from "@/AppState";
import { Pop } from "@/utils/Pop";
import { computed } from "vue";
// import { RandomEncounter }

const is_visible = computed(() => AppState.is_bag_visible);
const inv = computed(() => AppState.player.inventory);

function toggleBag() {
  AppState.is_bag_visible = !AppState.is_bag_visible;
}

function useItem(item) {
  if (AppState.is_encounter_visible) {
    // find item in inventory
    const index = AppState.player.inventory.indexOf(item);
    // only delete item if found
    if (index > -1) {
      AppState.player.inventory.splice(index, 1);
    }

    toggleBag();

    // if Pokeball
    if (item == 1) {
      // if caught
      if (Math.ceil(Math.random() * 2) == 2) {
        AppState.player.pokemon_pc.push(AppState.enemy_pokemon);
        Pop.success("You caught " + AppState.enemy_pokemon.name + "!");
      } else {
        Pop.fail(AppState.enemy_pokemon.name + " broke out.");
        // TODO: make enemy attack;
      }
    }

    /* if Potion */
    // TODO
    if (item == 2) {
      AppState.player.current_pokemon.hp_now += 20;
      // TODO: make enemy attack;
    }

    /* if Revive */
    // TODO
    // if (item == 3) {
    // }
  }
}
</script>

<template>
  <article :class="{ active: is_visible }" class="card shadow" id="bag-window">
    <div class="row">
      <button class="btn btn-close" @click="toggleBag()"></button>
      <div class="col-12">
        <h2>Bag</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-2" v-for="item in inv" :key="item.id">
        <!-- #{{ item }} -->
        <button class="btn-vue btn btn-item" @click="useItem(item)">
          <img :src="'/src/assets/img/items/' + item + '.png'" />
        </button>
      </div>
      <div class="col-12"></div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
#bag-window {
  position: absolute;
  top: 0;
  visibility: hidden;
  z-index: 100;
  padding: 10px 40px 20px 40px;
}

#bag-window.active {
  visibility: visible;
}
.col-2 {
  padding: 0;
}
.btn-item {
  display: flex;
  width: 90%;
  height: 100%;
  min-height: 50px;
  align-items: stretch;
  text-align: center;
}
.btn img {
  width: auto;
  margin: auto;
}
</style>
