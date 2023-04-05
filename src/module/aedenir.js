const moduleId = "aedenir-homebrew";

Hooks.once("init", () => {
  game.settings.register(moduleId, "addedToCompendium", {
    scope: "user",
    config: false,
    type: Boolean,
    default: false,
  });
});

Hooks.on("ready", async () => {
  //#region Pathfinder 2e
  if (game.system.id === "pf2e") {
    if (!game.settings.get(moduleId, "addedToCompendium")) {
      // Grab the settings
      const settings = await game.settings.get(
        "pf2e",
        "compendiumBrowserPacks"
      );

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
  //#endregion Pathfinder 2e
});
