import { registerTemplates } from "../scripts/loadTemplates.js";
import { CookingMenu } from "./cooking/cookingMenu.js";
import { globals } from "./globals.js";
import {
  baseWeapons,
  creatureTraits,
  damageTypes,
  equipmentTraits,
  featTraits,
  languages,
  languageToRarity,
  weaponGroups,
  weaponTraits,
} from "./worldSettings.js";

const moduleId = "aedenir-homebrew";

Hooks.on("init", async () => {
  game.settings.register(moduleId, "addedToCompendium", {
    scope: "user",
    config: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(moduleId, "loadedHomebrew", {
    scope: "world",
    config: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(moduleId, "loadedSettings", {
    scope: "world",
    config: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(moduleId, "homebrewVersion", {
    scope: "world",
    config: false,
    type: String,
    default: "0.0.0",
  });

  CookingMenu.registerSettings();

  registerTemplates();

  game.aedenir = globals;
});

Hooks.on("ready", async () => {
  //#region Pathfinder 2e
  if (game.system.id === "pf2e") {
    await checkVersion();
  }
  //#endregion Pathfinder 2e
});

async function checkVersion() {
  console.log(
    "%cChecking homebrew version.",
    "color: green; font-weight: bold"
  );
  const loadedVersion = await game.settings.get(moduleId, "homebrewVersion");
  const latestVersion = await game.modules.get(moduleId).version;
  console.log(
    `%cLoaded version: ${loadedVersion}`,
    "color: green; font-weight: bold"
  );
  console.log(
    `%cLatest version: ${latestVersion}`,
    "color: green; font-weight: bold"
  );
  if (loadedVersion != latestVersion) {
    console.log(
      "%cVersion mismatch, updating.",
      "color: red; font-weight: bold"
    );
    game.settings.set(moduleId, "addedToCompendium", false);
    game.settings.set(moduleId, "loadedHomebrew", false);
    game.settings.set(moduleId, "loadedSettings", false);

    Promise.all([
      await loadCompendiumPacks(),
      await loadHomebrew(),
      await loadSettings(),
    ]).then(
      async () =>
        await game.settings.set(moduleId, "homebrewVersion", latestVersion),
      (reject) => {
        console.error(reject);
      }
    );
  }
  return Promise.resolve();
}

async function loadCompendiumPacks() {
  if (!game.settings.get(moduleId, "addedToCompendium")) {
    // Grab the settings
    const settings = await game.settings.get("pf2e", "compendiumBrowserPacks");

    // Add the pack to the settings
    try {
      settings.action[`${moduleId}.aed-abilities`].load = true;
      settings.equipment[`${moduleId}.aed-equipment`].load = true;
      settings.feat[`${moduleId}.aed-featsfeatures`].load = true;
      settings.bestiary[`${moduleId}.aed-bestiary-i`].load = true;
      settings.spell[`${moduleId}.aed-spells`].load = true;
    } catch (error) {
      console.error(error);
      return Promise.reject("Error loading packs");
    }

    // Set the settings, both in the client settings and the current session respectively
    await game.settings.set("pf2e", "compendiumBrowserPacks", settings);
    game.pf2e.compendiumBrowser.settings = settings;

    // Set the setting to not re-add the pack if the user disables it in the future and notify about the change in the console
    await game.settings.set(moduleId, "addedToCompendium", true);
    console.log(
      "%cAedenir Homebrew Compendiums have been added to the compendium browser",
      "color: green; font-weight: bold"
    );
    return Promise.resolve();
  }
}

async function loadHomebrew() {
  if (!game.settings.get(moduleId, "loadedHomebrew")) {
    try {
      await game.settings.set(
        "pf2e",
        "homebrew.creatureTraits",
        creatureTraits
      );
      await game.settings.set("pf2e", "homebrew.featTraits", featTraits);
      await game.settings.set("pf2e", "homebrew.languages", languages);
      await game.settings.set("pf2e", "homebrew.weaponGroups", weaponGroups);
      await game.settings.set("pf2e", "homebrew.baseWeapons", baseWeapons);
      await game.settings.set("pf2e", "homebrew.weaponTraits", weaponTraits);
      await game.settings.set(
        "pf2e",
        "homebrew.languageRarities",
        languageToRarity()
      );
      await game.settings.set(
        "pf2e",
        "homebrew.equipmentTraits",
        equipmentTraits
      );
      await game.settings.set("pf2e", "homebrew.damageTypes", damageTypes);
    } catch {
      console.error("Error loading homebrew.");
      return Promise.reject("Error in loadHomebrew");
    }

    await game.settings.set(moduleId, "loadedHomebrew", true);
    console.log(
      "%cAedenir Homebrew Traits have been successfully loaded",
      "color: green; font-weight: bold"
    );
    console.log(
      "%cAedenir Homebrew settings have been set",
      "color: green; font-weight: bold"
    );
    return Promise.resolve();
  }
}

async function loadSettings() {
  if (!game.settings.get(moduleId, "loadedSettings")) {
    try {
      //automation settings
      await game.settings.set("pf2e", "automation.iwr", true);
      await game.settings.set("pf2e", "automation.removeExpiredEffects", true);
      await game.settings.set("pf2e", "automation.encumbrance", true);

      //variant rules
      await game.settings.set("pf2e", "freeArchetypeVariant", true);
    } catch {
      console.error("Error loading system settings.");
      return Promise.reject("Error in loadSettings");
    }

    await game.settings.set(moduleId, "loadedSettings", true);
    console.log(
      "%cAedenir Specific System Settings have been successfully loaded",
      "color: green; font-weight: bold"
    );
    console.log(
      "%cPF2e settings for Aedenir Homebrew have been set",
      "color: green; font-weight: bold"
    );
    return Promise.resolve();
  }
}
