import Users from './users/CRUD_serverCommunication'
const Features= {
    data: {
      features: {
        featuresTable: {
          data: [
            {
              title: "Users",
              description:"User",
              modules:Users
            },
            // {
            //   title: "Roles",
            //   description:'Role',
            //   modules: Roles
            // },
            // {
            //   title: "admin",
            //   description:
            //     "Admins have full access to the Treasury module to manage all financial aspects.",
            //   modules: null
            // },
          ],
        },
      },
    },
    config: {
      features: {
        featuresTable: true,
      },
    },
    appearance: {
      features: {
        featuresTable: {
          tableAppearance: [
            {
              type: "subTitleHeadingColor",
              color: "green",
            },
            {
              type: "titleColor",
              color: "black",
            },
            {
              type: "titleDescriptionColor",
              color: "grey",
            },
            {
              type: "tabDescriptionColor",
              color: "red",
            },
            {
              type: "subTitleDescriptionColor",
              color: "red",
            },
            {
              type: "onSelectionColor",
              color: "red",
            },
            {
              type: "unSelectionColor",
              color: "pink",
            },
            {
              type: "tabBottomBarColor",
              color: "red",
            },
            {
              type: "selectedsDoneIcon",
              selectedsDoneIcon: 0,
            },
            {
              type: "selectedsNotDoneIcon",
              selectedsNotDoneIcon: 0,
            },
            {
              type: "cardBackgroundColor",
              color: "lightblue",
            },
          ],
        },
      },
    },
  };
  export default Features;
