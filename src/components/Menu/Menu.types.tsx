import { i18n } from "i18n";
import { FunctionComponent, SVGAttributes } from "react";

export type MenuItemType = {
  text?: string;
  tx?: i18n.Scope;
  icon?: React.ReactNode;
  onPress: () => void;
};

type MenuListType = {
  type: "menu";
  items: MenuItemType[];
};

type ActionMenuType = {
  type: "action";
  action: () => void;
};

type ElementType = {
  type: "element";
  element: React.ReactNode;
};

type NoneMenuType = {
  type: "none";
};

export type MenuType = (ElementType | ActionMenuType | MenuListType | NoneMenuType) & {
  icon?: FunctionComponent<SVGAttributes<SVGElement>>;
};

export const NONEMENU: MenuType = { type: "none" };
