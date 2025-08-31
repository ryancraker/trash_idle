<script setup>
import { AppState } from "@/AppState";
import { computed } from "vue";

const is_visible = computed(() => AppState.is_pokemon_visible);
const pc = computed(() => AppState.pokemon_pc);
</script>

<template>
  <article
    :class="{ active: is_visible }"
    class="card shadow"
    id="pokemon-window"
  >
    <h2>Pokemon</h2>
    <div class="row">
      <div class="col-1" v-for="pokemon in pc" :key="pokemon.id">
        <!-- #{{ item }} -->
        <img :src="'/src/assets/img/' + pokemon + '.png'" />
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
#pokemon-window {
  position: absolute;
  top: 0;
  visibility: hidden;
}

#pokemon-window.active {
  visibility: visible;
}
</style>
