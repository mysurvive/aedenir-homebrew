import * as R from "remeda";
import { RecipeManager } from "./recipes";

export class CookingMenu extends FormApplication {
  recipeManager = new RecipeManager();

  constructor(data) {
    super();
    const { user, character } = data;
    this.character = character;
    this.user = user;
  }

  static get defaultOptions() {
    const options = super.defaultOptions;
    options.classes.push("cooking-menu", "sheet");

    return {
      ...options,
      title: "Cooking Menu",
      id: "aedenir-cooking-menu",
      template: "modules/aedenir-homebrew/templates/cooking/menu.hbs",
      width: 800,
      height: 700,
      tabs: [
        { navSelector: ".cooking-tabs", contentSelector: "section.content" },
      ],
      closeOnSubmit: false,
      submitOnChange: false,
    };
  }

  static get SETTINGS() {
    return Object.keys(this.settings);
  }

  get knownRecipes() {
    return this.recipeManager.getKnownRecipes(this.character);
  }

  get characterCookingSkills() {
    const character = game.actors.get(this.character);
    const skills = Object.keys(character.skills)
      .map((s) => {
        return character.skills[s].label;
      })
      .filter((s) => s.toLowerCase().includes("cooking"));
    return skills;
  }

  get ingredients() {
    const character = game.actors.get(this.character);
    return character.itemTypes.consumable.filter((i) =>
      i.system.traits.value.includes("ingredient")
    );
  }

  static get settings() {
    return {
      knownRecipes: {
        prefix: "cooking.",
        tab: "recipes",
        name: "Known Recipes",
        default: {
          all: [
            {
              name: "Basic Meal",
              img: "systems/pf2e/icons/default-icons/consumable.svg",
              level: 0,
              uuid: "Compendium.aedenir-homebrew.aed-meals.Item.ptvdTulTAHFvg341",
            },
          ],
        },
        type: Object,
        onChange: () => {},
      },
    };
  }

  static registerSettings() {
    const settings = this.settings;
    for (const key of this.SETTINGS) {
      const setting = settings[key];
      game.settings.register(
        "aedenir-homebrew",
        `${setting.prefix ?? ""}${key}`,
        { ...R.omit(setting, ["prefix"]), scope: "world", config: false }
      );
    }
  }

  async getData() {
    const settings = this.settings;
    const user = this.user;
    const character = this.character;
    const knownRecipes = await this.knownRecipes;
    const cookingSkills = ["Survival", ...this.characterCookingSkills];
    const ingredients = this.ingredients;
    const recipes = await this.recipeManager.allRecipes;
    return foundry.utils.mergeObject(await super.getData(), {
      settings,
      user,
      character,
      knownRecipes,
      cookingSkills,
      ingredients,
      recipes,
    });
  }
}
