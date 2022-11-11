import { enable, disable, auto } from 'darkreader';
import { darkmode } from "@params";

const {
  defaultColorScheme,
  theme,
  fixes,
} = darkmode.darkreader;

export function setSchemeDark() {
  enable(theme, fixes);
}

export function setSchemeLight() {
  disable();
}

export function setSchemeSystem() {
  auto(theme, fixes);
}

export { defaultColorScheme };
