import { css } from 'styled-components';

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
    red: '#d62828',
  },
  fontSize: {
    small: 13,
    regular: 18,
  },
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
