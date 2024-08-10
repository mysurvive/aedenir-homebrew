const creatureTraits = [
  { id: "vexbalg", value: "Vexbalg" },
  { id: "drakkgebor", value: "Drakkgebor" },
  { id: "oropin", value: "Oropin" },
];

const featTraits = [
  { id: "vexbalg", value: "Vexbalg" },
  { id: "drakkgebor", value: "Drakkgebor" },
  { id: "dragon", value: "Dragon" },
  { id: "oropin", value: "Oropin" },
];

function getDeadLanguages() {
  const allLanguagesList = Object.keys(
    game.pf2e.settings.campaign.languages
  ).flatMap((language) => {
    if (typeof game.pf2e.settings.campaign.languages[language] === "string")
      return game.pf2e.settings.campaign.languages[language];
    return Array.from(game.pf2e.settings.campaign.languages[language]);
  });

  const aedenirLanguagesList = languages.map((language) => {
    return language.id;
  });

  const unavailableLanguages = allLanguagesList.filter((language) => {
    return !aedenirLanguagesList.includes(language);
  });

  return unavailableLanguages;
}

function languageToRarity() {
  return {
    common: languages
      .map((language) => {
        if (language.rarity === "common") return language.id;
      })
      .filter((t) => t !== undefined),
    uncommon: languages
      .map((language) => {
        if (language.rarity === "uncommon") return language.id;
      })
      .filter((t) => t !== undefined),
    rare: languages
      .map((language) => {
        if (language.rarity === "rare") return language.id;
      })
      .filter((t) => t !== undefined),
    secret: languages
      .map((language) => {
        if (language.rarity === "secret") return language.id;
      })
      .filter((t) => t !== undefined),
    unavailable: getDeadLanguages(),
    commonLanguage: "ereben",
  };
}

const damageTypes = [{ label: "Ley", category: "energy", icon: "fa-drone" }];

const languages = [
  { id: "ereben", value: "Ereben", rarity: "common" },
  { id: "skin-cant", value: "Skin Cant", rarity: "secret" },
  { id: "ekkdu", value: "Ekkdu", rarity: "common" },
  { id: "isserian", value: "Isserian", rarity: "rare" },
  { id: "hetzlati", value: "Hetz'lati", rarity: "uncommon" },
  { id: "ekkaril", value: "Ekkaril", rarity: "uncommon" },
  { id: "liluathan", value: "Liluathan", rarity: "common" },
  { id: "skree", value: "Skree", rarity: "common" },
  { id: "oropini", value: "Oropini", rarity: "common" },
  { id: "sultic", value: "Sultic", rarity: "common" },
  { id: "bastaandi", value: "Bastaandi", rarity: "common" },
  { id: "dockspeak", value: "Dockspeak", rarity: "uncommon" },
  { id: "patchwerk", value: "Patchwerk", rarity: "rare" },
  { id: "tripup", value: "Tripup", rarity: "rare" },
];

const weaponGroups = [{ id: "oropin", value: "Oropin" }];

const baseWeapons = [
  { id: "rock", value: "Rock" },
  { id: "oropin-greathammer", value: "Oropin Greathammer" },
  { id: "oropin-greatsword", value: "Oropin Greatsword" },
  { id: "oropin-composite-longbow", value: "Oropin Composite Longbow" },
  { id: "oropin-composite-shortbow", value: "Oropin Composite Shortbow" },
];

const weaponTraits = [{ id: "oropin", value: "Oropin" }];

export {
  creatureTraits,
  damageTypes,
  featTraits,
  languages,
  weaponGroups,
  baseWeapons,
  weaponTraits,
  languageToRarity,
};
