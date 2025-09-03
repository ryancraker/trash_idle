<script setup>
import { AppState } from "@/AppState";
import { Player } from "@/models/Player";
import { Pop } from "@/utils/Pop";
import { loadState, saveState } from "@/utils/Store";

function saveGame() {
  try {
    saveState("player", AppState.player);
    Pop.success("Game Saved!");
  } catch (error) {
    Pop.error(error);
  }
}
function loadGame() {
  try {
    loadState("player", Player);
    Pop.success("Game Loaded!");
  } catch (error) {
    Pop.error(error);
  }
}
</script>

<template>
  <div>
    <button
      class="btn btn-vue w-100 mdi mdi mdi-floppy"
      type="button"
      @click="saveGame()"
    >
      Save
    </button>
    <button
      class="btn btn-vue w-100 mdi mdi mdi-disc"
      type="button"
      @click="loadGame()"
    >
      Load
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
