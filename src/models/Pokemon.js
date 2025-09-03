export class Pokemon {
  constructor(data) {
    this.name = data.name;
    this.custom_name = data.custom_name;
    this.id = data.id;
    this.gender = data.gender;
    this.hp_now = data.hp_now;
    this.hp_max = data.hp_max;
    this.attack = data.attack;
    this.defense = data.defense;
    this.sp_atk = data.sp_atk;
    this.sp_def = data.sp_def;
    this.speed = data.speed;
    this.xp_now = data.xp_now;
    this.xp_max = data.xp_max;
    this.lvl = data.lvl;
  }
}
