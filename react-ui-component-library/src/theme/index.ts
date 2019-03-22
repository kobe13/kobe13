import * as styledComponents from 'styled-components';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<ThemeInterface>;

export enum BackgroundColorValues {
  primaryColor = 'black',
  alternativeColor = 'grey',
}

export enum ColorValues {
  primaryColor = 'black',
  alternativeColor = 'white',
}

export enum Radius {
  m = 15,
}

export enum Spacing {
  xs = 3,
  s = 5,
  m = 10,
  l = 15,
  xl = 20,
}

export type ThemeInterface = {
  backgroundColor: {
    primaryColor: string;
    alternativeColor: string;
  };

  color: {
    primaryColor: string;
    alternativeColor: string;
  };

  radius: {
    m: number;
  };

  spacing: {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
  };
};

export const sdkTheme = {
  backgroundColor: BackgroundColorValues,
  color: ColorValues,
  radius: Radius,
  spacing: Spacing,
};

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;
