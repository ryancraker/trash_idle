<script setup>
import { AppState } from "@/AppState";
// import { Pop } from "@/utils/Pop";
import { computed, ref } from "vue";

// defineProps({shopItem})

const store = [
  {
    price: 5,
    inv: 0,
    name: "Poké Ball",
    id: 1,
  },
  {
    name: "Potion",
    price: 10,
    inv: 0,
    id: 2,
  },
  {
    name: "Revive",
    price: 100,
    inv: 0,
    id: 3,
  },
  {
    name: "Exp. Share",
    price: 100000,
    inv: 0,
    id: 4,
  },
];

const money = ref(AppState.money);
const is_visible = computed(() => AppState.is_shop_visible);

function buy(item_price, item_id) {
  // Pop.confirm("Would you like to buy " + item_name + "?");
  // Pop.confirm("How many " + item_name + " would you like to buy?");
  console.log("buy");
  if (money.value >= item_price) {
    money.value -= item_price;
    AppState.inventory.push(item_id);
  }
}
</script>

<template>
  <!-- STORE WINDOW -->
  <div :class="{ active: is_visible }" id="shop-window">
    <div class="card-body card shadow">
      <h2>Store</h2>
      <section class="container">
        <div class="row">
          <img
            src="../assets/img/nurse-joy.png"
            class="nurse-img img-sprite"
            alt="Nurse"
          />
        </div>
        <div class="row">${{ money }}</div>
        <div class="row">
          <div class="col-4" v-for="value in store" :key="value.id">
            <button
              class="btn btn-vue btn-store w-100 mdi"
              :disabled="money < value.price"
              @click="buy(value.price, value.id)"
            >
              <img :src="'/src/assets/img/items/' + value.id + '.png'" /><br />
              {{ value.name }}
              ${{ value.price }}
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#shop-window {
  visibility: hidden;
}

#shop-window.active {
  visibility: visible;
}
.card-body .row {
  padding: 5px 0px;
}
.nurse-img {
  width: 100px;
  margin: auto;
}
.card-body .col-4 {
  padding: 0px 3px;
}
.btn-store {
  margin-bottom: 5px;
}
</style>
