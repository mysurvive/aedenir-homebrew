export class RecipeManager {
  cache;
  constructor(character) {
    this.character = character;
    this.allRecipes = this.getAllRecipes();
  }
  updateSettings() {}
  async getKnownRecipes(character) {
    const recipes = game.settings.get(
      "aedenir-homebrew",
      "cooking.knownRecipes"
    );
    const knownByAll = await this.recipesToEntries(recipes["all"]);
    const knownByCharacter = await this.recipesToEntries(
      recipes[character] ?? []
    );
    return [...knownByAll, ...knownByCharacter];
  }

  async getAllRecipes() {
    const packContents = game.packs.get("aedenir-homebrew.aed-meals").index
      .contents;
    return await this.recipesToEntries(packContents);
  }

  async recipesToEntries(recipes) {
    const parsedRecipes = [];
    for (const recipe of recipes) {
      const recipeItem = await fromUuid(recipe.uuid);
      parsedRecipes.push({
        img: recipeItem.img,
        name: recipeItem.name,
        level: recipeItem.system.level.value,
        uuid: recipeItem.uuid,
      });
    }
    return parsedRecipes;
  }
}
