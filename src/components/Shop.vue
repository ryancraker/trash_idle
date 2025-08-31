<script setup>
  import { AppState } from "@/AppState";
  import { computed, ref } from "vue";

  // defineProps({shopItem})

  // const store = ref({
  //   pokeball: {
  //     name: "Poké Ball",
  //     price: 5,
  //     inv: 0,
  //     id: 1,
  //   },
  //   potion: {
  //     name: "Potion",
  //     price: 10,
  //     inv: 0,
  //     id: 2,
  //   },
  // revive: {
  //   name: "Revive",
  //   price: 100,
  //   inv: 0,
  //   id: 3,
  // },
  // });

  const store = [
    {
      price: 5,
      inv: 0,
      name: "Poké Ball"
    },
    {
      name: "Potion",
      price: 10,
      inv: 0,
    },
    {
      name: "Revive",
      price: 100,
      inv: 0,
    },
  ]
  const money = computed(() => AppState.money);
  const is_visible = computed(() => AppState.is_shop_visible);


</script>

<template>
  <!-- STORE WINDOW -->
  <article class="card shadow" :class="{ active: is_visible }" id="shop-window">
    <div class="card-body">
      <h2>Store</h2>
      <section class="container">
        <div class="row">
          <img src="../assets/img/nurse-joy.png" class="nurse-img" alt="Nurse" />
        </div>
        <div class="row">${{ money }}</div>
        <div class="row">
          <div class="col-4" v-for="value in store" :key="value.id">
            <button class="btn btn-vue w-100 mdi">
              {{ value.name }}
              ${{ value.price }}
            </button>
          </div>
        </div>
      </section>
    </div>
  </article>
</template>

<style lang="scss" scoped>
  #shop-window {
    visibility: hidden;
  }

  #shop-window.active {
    visibility: visible;
  }
</style>
