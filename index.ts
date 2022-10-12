import type { named_colour } from "./namedColour";

namespace colour {
  type HexDigit =
    | "0"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "A"
    | "B"
    | "C"
    | "D"
    | "E"
    | "F";
  type HexDigit2 = `${HexDigit}${HexDigit}`;
  type HexDigit3 = `${HexDigit2}${HexDigit}`;
  type HexColour<T extends string> =
    `${T}` extends `#${HexDigit3}${infer Rest1}`
      ? Rest1 extends ``
        ? `${T}`
        : Rest1 extends `${HexDigit3}${infer Rest2}`
        ? Rest2 extends ``
          ? `${T}`
          : Rest2 extends `${HexDigit2}`
          ? `${T}`
          : never
        : never
      : never;
  type RGB = `rgb(${number}${"%" | ""},${number}${"%" | ""},${number}${
    | "%"
    | ""})`;
  type RGBA = `rgba(${number}${"%" | ""},${number}${"%" | ""},${number}${
    | "%"
    | ""},${number})`;
  type HSL = `hsl(${number},${number}%,${number}%)`;
  type HSLA = `hsla(${number},${number}%,${number}%,${number})`;
  type HWB = `hwb(${number},${number}%,${number}%)`;
  export type ColourType<
    T extends string =
      | "rgb"
      | "rgba"
      | "hsl"
      | "hsla"
      | "hwb"
      | "named"
      | `#${string}`
  > = T extends `#${infer Rest}`
    ? HexColour<Rest>
    : `${T}` extends "rgb"
    ? RGB
    : `${T}` extends "rgba"
    ? RGBA
    : `${T}` extends "hsl"
    ? HSL
    : `${T}` extends "hsla"
    ? HSLA
    : `${T}` extends "hwb"
    ? HWB
    : `${T}` extends "named"
    ? named_colour.NamedColour
    : never;
  export function NewColour<
    T extends "rgb" | "rgba" | "hsl" | "hsla" | "hwb" | "named" | `#${string}`
  >(value: ColourType<T>) {
    return value;
  }
}
