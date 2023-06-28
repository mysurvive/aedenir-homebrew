import {
  baseWeapons,
  creatureTraits,
  featTraits,
  languages,
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
});

Hooks.on("ready", async () => {
  //#region Pathfinder 2e
  if (game.system.id === "pf2e") {
    loadCompendiumPacks();
    loadHomebrew();
    loadSettings();
  }
  //#endregion Pathfinder 2e
});

async function loadCompendiumPacks() {
  if (!game.settings.get(moduleId, "addedToCompendium")) {
    // Grab the settings
    const settings = await game.settings.get("pf2e", "compendiumBrowserPacks");

    // Add the pack to the settings
    settings.action[`${moduleId}.abilities`].load = true;
    settings.equipment[`${moduleId}.equipment`].load = true;
    settings.feat[`${moduleId}.featsfeatures`].load = true;

    // Set the settings, both in the client settings and the current session respectively
    await game.settings.set("pf2e", "compendiumBrowserPacks", settings);
    game.pf2e.compendiumBrowser.settings = settings;

    // Set the setting to not re-add the pack if the user disables it in the future and notify about the change in the console
    await game.settings.set(moduleId, "addedToCompendium", true);
    console.log(
      "%cAedenir Homebrew Compendiums have been added to the compendium browser",
      "color: green; font-weight: bold"
    );
  }
}

async function loadHomebrew() {
  if (!game.settings.get(moduleId, "loadedHomebrew")) {
    await game.settings.set("pf2e", "homebrew.creatureTraits", creatureTraits);
    await game.settings.set("pf2e", "homebrew.featTraits", featTraits);
    await game.settings.set("pf2e", "homebrew.languages", languages);
    await game.settings.set("pf2e", "homebrew.weaponGroups", weaponGroups);
    await game.settings.set("pf2e", "homebrew.baseWeapons", baseWeapons);
    await game.settings.set("pf2e", "homebrew.weaponTraits", weaponTraits);

    await game.settings.set(moduleId, "loadedHomebrew", true);
    console.log(
      "%cAedenir Homebrew Traits have been successfully loaded",
      "color: green; font-weight: bold"
    );
  }
}

async function loadSettings() {
  if (!game.settings.get(moduleId, "loadedSettings")) {
    //automation settings
    await game.settings.set("pf2e", "automation.iwr", true);
    await game.settings.set("pf2e", "automation.removeExpiredEffects", true);

    //variant rules
    await game.settings.set("pf2e", "freeArchetypeVariant", true);

    await game.settings.set(moduleId, "loadedSettings", true);
    console.log(
      "%cAedenir Specific System Settings have been successfully loaded",
      "color: green; font-weight: bold"
    );
  }
}
