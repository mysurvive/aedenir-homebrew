const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class ManageShiftShapeMenu extends HandlebarsApplicationMixin(
  ApplicationV2,
) {
  shiftShapeList = new Array();

  constructor(actor) {
    super();
    this.actor = actor;
  }

  static DEFAULT_OPTIONS = {
    id: "manage-shift-shape-menu",
    tag: "form",
    form: {
      submitOnChange: false,
      closeOnSubmit: true,
      handler: ManageShiftShapeMenu.#onSubmit,
    },
    position: { width: 650 },
    window: { title: "Manage Shift Shape" },
    actions: { addRow: this.#addRow, removeRow: this.#removeRow },
  };

  static PARTS = {
    form: {
      template:
        "modules/aedenir-homebrew/templates/shiftShape/manageShiftShapeMenu/manageShiftShapeMenu.hbs",
      templates: [
        "modules/aedenir-homebrew/templates/shiftShape/manageShiftShapeMenu/partials/shape-item.hbs",
      ],
      classes: ["aedenir-homebrew", "flex", "column"],
    },
    footer: {
      template: "modules/aedenir-homebrew/templates/generic/form-footer.hbs",
      id: "footer",
      classes: ["aedenir-homebrew"],
    },
  };

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    this.shiftShapeList = (await this.actor.getFlag(
      "aedenir-homebrew",
      "vexbalg.shiftShape.list",
    )) ?? [
      {
        img: "systems/pf2e/icons/default-icons/character.svg",
        name: undefined,
      },
    ];

    const mergedContext = foundry.utils.mergeObject(context, {
      shapes: this.shiftShapeList,
      footerButtons: [
        { type: "submit", icon: "fa-solid fa-save", label: "Submit" },
      ],
    });

    return mergedContext;
  }

  static async #addRow() {
    this.shiftShapeList.push({
      img: "systems/pf2e/icons/default-icons/character.svg",
      name: undefined,
    });

    this.render({ force: true });
  }

  static #removeRow(_event, target) {
    const shapeItemIndex = target.getAttribute("index");
    this.shiftShapeList.splice(shapeItemIndex, 1);

    this.render({ force: true });
  }

  static async #onSubmit(_event, _form, formData) {
    const mappedData = Object.keys(formData.object).reduce((acc, key) => {
      const [index, prop] = key.split("-");
      acc[index] = { ...acc[index], [prop]: formData.object[key] };
      return acc;
    }, []);

    for (const key in mappedData) {
      mappedData[key].id = foundry.utils.randomID();
    }

    await this.actor.setFlag(
      "aedenir-homebrew",
      "vexbalg.shiftShape.list",
      mappedData,
    );
  }
}
