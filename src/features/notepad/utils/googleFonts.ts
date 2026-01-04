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

export const loadGoogleFont = async (font: string) => {
    if (!font || font === "monospace") return;
    const WebFont = (await import("webfontloader")).default;
    WebFont.load({
        google: { families: [font] }
    });
}