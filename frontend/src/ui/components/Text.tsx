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

const RegularUnderline = styled.p`
  ${commonCss}
  font-size: ${({ theme }) => theme.fontSize.regular};
  text-decoration: underline;
`;

const Small = styled.p`
  ${commonCss};
  font-size: ${({ theme }) => theme.fontSize.small}px;
`;

const SmallUnderline = styled.p`
  ${commonCss};
  font-size: ${({ theme }) => theme.fontSize.small}px;
`;

const Text = {
  H1,
  Regular,
  Small,
  RegularUnderline,
  SmallUnderline,
};

export default Text;
