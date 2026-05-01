import { ManageShiftShapeMenu } from "../actions/vexbalg/manageShiftShapeMenu";

Hooks.on("renderCharacterSheetPF2e", async (_sheet, html, character) => {
  const vex = _sheet.actor;
  if (
    character.owner &&
    _sheet.actor.ancestry.sourceId ===
      "Compendium.aedenir-homebrew.aed-ancestries.Item.eX4um0tcofPPfgqY"
  ) {
    if (!_sheet.actor.getFlag("aedenir-homebrew", "vexbalg.shiftShape")) {
      _sheet.actor.setFlag("aedenir-homebrew", "vexbalg.shiftShape", {});
    }
    const shiftShapeEffect = vex.itemTypes.effect.find(
      (e) => e.slug === "effect-shift-shape"
    );

    const opts = {
      changed: shiftShapeEffect ? true : false,
      currentShape: vex.getFlag(
        "aedenir-homebrew",
        "vexbalg.shiftShape.currentShape"
      ),

      /**
       * Structure of the vexbalg.shiftShape.list flag
       *
       * @typedef {Object} ShiftShapeList
       * @property {string} name
       * @property {string} img - Path to token image
       * @property {boolean} selected - Whether this shape is selected
       */

      /**
       * @type {ShiftShapeList[]}
       */

      shape: vex.getFlag("aedenir-homebrew", "vexbalg.shiftShape.list"),
    };

    const actionsPanel = html.find(".actions-panel");
    actionsPanel.prepend(
      await foundry.applications.handlebars.renderTemplate(
        "modules/aedenir-homebrew/templates/shiftShape/shiftShapeSheet.hbs",
        opts
      )
    );

    const shiftShapeBtn = actionsPanel.find("button#shift-shape");
    const manageShiftShapeBtn = actionsPanel.find("button#manage-shift-shape");

    shiftShapeBtn.on("click", () => {
      const shiftShapeSelection = _sheet.form.querySelector(
        "#shift-shape-selection"
      ).value;
      shiftShape(_sheet.actor, shiftShapeSelection);
    });

    manageShiftShapeBtn.on("click", () => {
      manageShiftShape(_sheet.actor);
    });
  }
});

async function shiftShape(actor, shiftShapeSelection) {
  const shiftShapeEffectActive = actor.itemTypes.effect.find(
    (e) =>
      e.sourceId ===
      "Compendium.aedenir-homebrew.aed-effects.Item.FjyoF50HOjkNPnXs"
  );
  if (shiftShapeEffectActive) {
    shiftShapeEffectActive.delete();
    await actor.unsetFlag(
      "aedenir-homebrew",
      "vexbalg.shiftShape.currentShape"
    );
  } else {
    if (shiftShapeSelection) {
      const shape = (
        await actor.getFlag("aedenir-homebrew", "vexbalg.shiftShape.list")
      ).find((s) => s.id === shiftShapeSelection);

      const shiftShapeEffect = (
        await fromUuid(
          "Compendium.aedenir-homebrew.aed-effects.Item.FjyoF50HOjkNPnXs"
        )
      ).toObject();

      shiftShapeEffect.system.rules = [
        {
          key: "TokenImage",
          value: shape.img,
        },
        {
          key: "TokenName",
          value: shape.name,
        },
        { key: "RollOption", option: "shift-shape" },
      ];

      await actor.createEmbeddedDocuments("Item", [shiftShapeEffect]),
        await actor.setFlag(
          "aedenir-homebrew",
          "vexbalg.shiftShape.currentShape",
          shape.id
        );
    }
  }
}

function manageShiftShape(actor) {
  new ManageShiftShapeMenu(actor).render({ force: true });
}
