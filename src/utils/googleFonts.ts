import WebFont from "webfontloader";

export const GOOGLE_FONTS = [
    "Roboto",
    "Open Sans",
    "Inter",
    "Montserrat",
    "Poppins",
    "Lato",
    "Nunito",
    "Fira Code",
    "JetBrains Mono",
    "Source Code Pro",
    "Noto Sans",
    "Noto Serif",
    "Playfair Display",
    "Raleway",
    "Merriweather"
];

export function loadGoogleFont(font: string) {
    if (!font || font === "monospace") return;

    WebFont.load({
        google: { families: [font] }
    });
}