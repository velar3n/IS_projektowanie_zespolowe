import styled, { css, useTheme } from 'styled-components';
import { FontSize } from '../../theme';
import { getTextComponent } from './getTextComponent';
import { BeatLoader } from 'react-spinners';

export type ButtonVariant = 'full' | 'link';

export type ButtonProps = {
  title: string;
  isLoading?: boolean;
  onClick?: () => void;
  variant?: ButtonVariant;
  color?: string;
  fontColor?: string;
  fontSize?: FontSize;
};

const Button = ({
  variant = 'full',
  title,
  isLoading,
  onClick,
  color,
  fontColor,
  fontSize,
}: ButtonProps) => {
  const TextComponent = getTextComponent({ fontSize, variant });
  const theme = useTheme();

  return (
    <StyledButton variant={variant} onClick={onClick} color={color}>
      {isLoading ? (
        <BeatLoader />
      ) : (
        <TextComponent style={{ color: fontColor ?? theme.palette.black }}>
          {title}
        </TextComponent>
      )}
    </StyledButton>
  );
};

const fullCss = css`
  padding: 16px 32px;
  border-radius: 8px;
  width: 100%;
  font-size: 16px;
`;

const StyledButton = styled.button<{
  variant: ButtonVariant;
  color?: string;
}>`
  background-color: transparent;
  ${({ color, variant, theme }) =>
    color &&
    variant === 'full' &&
    css`
      background-color: ${color ?? theme.palette.brand};
    `}
  ${({ variant }) => variant === 'full' && fullCss}
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

export default Button;
