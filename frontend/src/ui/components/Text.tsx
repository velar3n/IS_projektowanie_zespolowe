import styled, { css } from 'styled-components';

const commonCss = css`
  font-family: Roboto;
  color: black;
`;

const H1 = styled.h1`
  ${commonCss}
`;

const Regular = styled.p`
  ${commonCss}
  font-size: ${({ theme }) => theme.fontSize.regular};
`;

const Small = styled.p`
  ${commonCss};
  font-size: ${({ theme }) => theme.fontSize.small};
`;

const Text = {
  H1,
  Regular,
  Small,
};

export default Text;
