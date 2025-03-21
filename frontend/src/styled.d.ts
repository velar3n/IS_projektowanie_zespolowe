import 'styled-components';
import { Theme } from './ui/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
