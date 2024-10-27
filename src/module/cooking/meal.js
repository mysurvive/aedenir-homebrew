class Meal {
  name;
  ingredients;
  level;
  quality;
  effectUuid;
  creationTime;
  expireTime;
  constructor(options) {
    this.name = options.name;
    this.ingredients = options.ingredients;
    this.effectUuid = options.effectUuid;
  }

  get slug() {
    return game.pf2e.system.sluggify(this.name);
  }

  get label() {
    return `${this.quality} Quality ${this.name}`;
  }

  set quality(quality) {
    this.quality = quality;
  }

  set level(level) {
    this.level = level;
  }

  get ingredientCount() {
    return this.ingredients.length;
  }

  create() {}
}
