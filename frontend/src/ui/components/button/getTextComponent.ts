import { ButtonProps } from '.';
import Text from '../Text';

export const getTextComponent = ({
  fontSize,
  variant,
}: Pick<ButtonProps, 'fontSize' | 'variant'>) => {
  if (variant === 'link') {
    if (fontSize === 'small') {
      return Text.SmallUnderline;
    } else {
      return Text.SmallUnderline;
    }
  } else {
    if (fontSize === 'small') {
      return Text.Small;
    } else {
      return Text.Regular;
    }
  }
};
