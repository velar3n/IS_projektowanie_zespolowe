import { css } from 'styled-components';

export type FontSize = 'small' | 'regular';

const fontSize: Record<FontSize, number> = {
  small: 13,
  regular: 18,
};

const theme = {
  palette: {
    grey100: '#f8f9fa',
    grey200: '#e9ecef',
    grey300: '#dee2e6',
    grey400: '#ced4da',
    grey500: '#adb5bd',
    grey600: '#6c757d',
    grey700: '#495057',
    grey800: '#343a40',
    grey900: '#212529',
    brand: '#4CC9FE',
    teal: '#00879E',
    red: '#d62828',
    ghostWhite: '#F8F8FF',
    white: '#ffffff',
    black: '#000000',
  },
  fontSize,
  boxShadow: {
    small: css`
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    `,
    medium: css`
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    `,
  },
};

export type Theme = typeof theme;
export default theme;
