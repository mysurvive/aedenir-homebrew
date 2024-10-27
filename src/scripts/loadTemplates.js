export function registerTemplates() {
  const templatePaths = [
    // Cooking
    "modules/aedenir-homebrew/templates/cooking/menu.hbs",
    "modules/aedenir-homebrew/templates/cooking/partials/recipeItem.hbs",
    "modules/aedenir-homebrew/templates/cooking/knownRecipes.hbs",
    "modules/aedenir-homebrew/templates/cooking/allRecipes.hbs",
    "modules/aedenir-homebrew/templates/cooking/learnRecipe.hbs",
    "modules/aedenir-homebrew/templates/cooking/preserveIngredients.hbs",
  ];

  loadTemplates(templatePaths);
}
