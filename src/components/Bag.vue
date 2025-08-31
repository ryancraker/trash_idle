<script setup>
import { AppState } from "@/AppState";
import { computed } from "vue";

const is_visible = computed(() => AppState.is_bag_visible);
const inv = computed(() => AppState.inventory);

function useItem(item) {
  if (AppState.is_encounter_visible) {
    /* Pokeball */
    if (item == 1) {
      alert("ye");
    }
  }
}
</script>

<template>
  <article :class="{ active: is_visible }" class="card shadow" id="bag-window">
    <div class="row">
      <div class="col-12">
        <h2>Bag</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-1" v-for="item in inv" :key="item.id">
        <!-- #{{ item }} -->
        <button class="" @click="useItem(item)">
          <img :src="'/src/assets/img/items/' + item + '.png'" />
        </button>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
#bag-window {
  position: absolute;
  top: 0;
  visibility: hidden;
  z-index: 100;
  padding: 10px 20px 20px 20px;
}

#bag-window.active {
  visibility: visible;
}
</style>
