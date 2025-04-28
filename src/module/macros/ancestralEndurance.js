export async function ancestralEndurance() {
  const actor = game.user.character ?? canvas.tokens.controlled[0].actor;
  if (!actor)
    return ui.notifications.warn("Select a token before running the macro.");
  const conMod = actor.abilities.con.mod;
  const level = actor.level;
  const roll = new Roll(`${Math.floor((level - 1) / 4)}d6+${conMod}`);
  await roll.evaluate();
  roll.toMessage();

  let eff = await fromUuid(
    "Compendium.aedenir-homebrew.aed-effects.Item.bO9ny317NbXrpzut"
  );
  eff = eff.toObject();

  eff.system.rules[0].value = roll.total;

  await actor.createEmbeddedDocuments("Item", [eff]);
}
