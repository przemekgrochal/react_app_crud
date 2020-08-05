import { paths } from "./app-paths";

export const navigation = [
  {
    text: "Home",
    path: "/home",
    icon: "home",
  },
  {
    text: "Examples",
    icon: "folder",
    items: [
      {
        text: "Ceny",

        items: [
          {
            text: "Definicje",
            items: [
              {
                text: "Cenniki",
                path: paths.CennikiPage,
              },
              {
                text: "Promocje",
                path: paths.PromocjePage,
              },
              {
                text: "Waluty",
                path: paths.WalutyPage,
              },
            ],
          },
        ],
      },
      {
        text: "Instancje",
        items: [
          {
            text: "Sklepy",
            path: paths.SklepyPage,
          },
        ],
      },
      {
        text: "Uzytkownicy",
        items: [
          {
            text: "UzytkownicyBackOffice",
            path: paths.UzytkownicyPage,
          },
        ],
      },
    ],
  },
];
