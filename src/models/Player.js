import Pokemon from "@/components/Pokemon.vue";

export class Player {
  constructor(data) {
    this.inventory = data.inventory;
    this.pokemon_pc = data.pokemon_pc;
    this.money = data.money;
    this.current_pokemon = new Pokemon(data.current_pokemon);
  }
}
