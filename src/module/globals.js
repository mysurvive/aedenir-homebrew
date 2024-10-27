import { CookingMenu } from "./cooking/cookingMenu";

const globals = {
  functions: {
    openCookingMenu: (data) => {
      new CookingMenu(data).render(true);
    },
  },
  classes: {
    cooking: { menu: CookingMenu },
  },
};

export { globals };
