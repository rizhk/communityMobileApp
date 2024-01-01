import { i18n } from "i18n";
import { FunctionComponent, SVGAttributes } from "react";

export type MenuItemType = (ActionMenuType | RouteMenuType) & {
  text?: string;
  tx?: i18n.Scope;
  icon?: React.ReactNode;
};

type MenuListType = {
  type: "menu";
  items: MenuItemType[];
  // open: boolean,
  // setOpen:
};

type ActionMenuType = {
  type: "action";
  action: () => void;
};

type RouteMenuType = {
  type: "route";
  route: string;
  params: any;
};

type NoneMenuType = {
  type: "none";
};

export type MenuType = (ActionMenuType | RouteMenuType | MenuListType | NoneMenuType) & {
  icon?: FunctionComponent<SVGAttributes<SVGElement>>;
};

export const NONEMENU: MenuType = { type: "none" };
