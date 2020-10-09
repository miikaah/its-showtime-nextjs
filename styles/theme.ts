import { createGlobalStyle } from "styled-components";

export const theme = {
    breakpoints: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1300px",
    },
    colors: {
        white: "#fbfbfb",
        black: "#000",
        base: "#002525",
        baseLight: "#006666",
        baseDark: "#002020",
        highlight: "#ff0303",
        primary: "#ffab03",
    },
};

export const GlobalStyle = createGlobalStyle`
  :root {
    --color-white: ${theme.colors.white};
    --color-black: ${theme.colors.black};
    --color-base: ${theme.colors.base};
    --color-base-light: ${theme.colors.baseLight};
    --color-base-dark: ${theme.colors.baseDark};
    --color-highlight: ${theme.colors.highlight};
    --color-primary: ${theme.colors.primary};

    --font-family-primary: 'Arial Black', sans-serif;
    --font-family-secondary: 'Verdana', sans-serif;
  }

  html, body {
    padding: 0;
    margin: 0;
  }

  html {
    background-image: linear-gradient(${theme.colors.baseDark}, ${theme.colors.baseLight});
    color: var(--color-white);
    height: 100vh;
    font-family: var(--font-family-primary);
    font-weight: 900;
  }

  * {
    box-sizing: border-box;
  }

  button {
    cursor: pointer;
    border: 0;
    background: transparent;
    color: var(--color-white);
  }

  input, button {
    font-family: var(--font-family-secondary);
    font-size: 16px;
    padding: 12px;
    border-radius: 3px;
    border: 0;
  }
`;
