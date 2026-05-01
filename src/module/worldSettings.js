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
  { id: "sionese", value: "Sionese", rarity: "secret" },
  { id: "baltian", value: "Baltian", rarity: "secret" },
  { id: "nobeleisse", value: "Nobeleisse", rarity: "uncommon" },
  { id: "bastaandi", value: "Bastaandi", rarity: "common" },
  { id: "dockspeak", value: "Dockspeak", rarity: "uncommon" },
  { id: "patchwerk", value: "Patchwerk", rarity: "rare" },
  { id: "tripup", value: "Tripup", rarity: "rare" },
  { id: "ephysio", value: "Ephysio", rarity: "secret" },
];

export { languages, languageToRarity };
