import { combineReducers } from 'redux';
const ADD_Menu = 'ADD_Menu';
const INCREMENT_Menu = 'INCREMENT_Menu';
const Update_Menu = 'Update_Menu';
const Empty_Menu = 'Empty_Menu';

const defaultMenus = [
  {
      moduleName: "Dashboard",
      moduleId: "0",
      displayOrder: 0,
      isChecked: true,
      to: "/",
      text: "Dashboard",
      icon: "Icons.Dashboard",
      isOpen: false,
      adminOnly: false,
      listPageMaster: []
  }
];
export function addMenu(Menu) {
  return {
    type: ADD_Menu,
    Menu,
  }
}
export function EmptyMenu() {
  return {
    type: Empty_Menu,defaultMenus
  }
}

export function incrementMenu(Menu) {
  return {
    type: INCREMENT_Menu,
    Menu
  }
}
export function updateMenu(Menu) {
  return {
    type: Update_Menu,
    Menu
  }
}



function Menus(state=defaultMenus, action) {
    const Menu = state.find(b => action.Menu === b.name);
      const Menus = state.filter(b => action.Menu !== b.name);
  switch (action.type) {
    case ADD_Menu:
      return [
        ...state,
        {
            moduleName:action.Menu.moduleName,
            moduleId:action.Menu.moduleId,
            displayOrder:action.Menu.displayOrder,
            isChecked:action.Menu.isChecked,
            to:action.Menu.to,
            text:action.Menu.text,
            icon:action.Menu.icon,
            isOpen:action.Menu.isOpen,
            adminOnly:action.Menu.adminOnly,
            listPageMaster:action.Menu.listPageMaster
        }
      ];
      case Update_Menu:
      return [
        ...Menus,
        {
          ...Menu,
          isOpen: !Menu.isOpen
        }
      ];
    case INCREMENT_Menu:
      return [
        ...Menus,
        {
          ...Menu,
          views: Menu.views + 1
        }
      ];
      case Empty_Menu:
      return state=defaultMenus;
    default:
      return state;
  }
}

const MenuApp = combineReducers({
  Menus
});

export default MenuApp;