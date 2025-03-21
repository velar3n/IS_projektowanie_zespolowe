import styled from 'styled-components';
import { FieldProps } from '../types';
import { Controller, FieldValues } from 'react-hook-form';

type InputProps<T extends FieldValues> = {
  leftText?: string;
  rightText?: string;
} & FieldProps<T>;

type RowTextType = 'regular' | 'error';

const Input = <T extends FieldValues>({
  name,
  rules,
  label,
  placeholder,
  leftText,
  rightText,
}: InputProps<T>) => {
  return (
    <Controller
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        const shouldShowBottomRow = leftText || rightText || error;
        return (
          <InputWrapper>
            {label && (
              <Row>
                <LabelText>{label}</LabelText>
              </Row>
            )}
            <StyledInput placeholder={placeholder} {...field} />
            {shouldShowBottomRow && (
              <Row>
                <RowText type={error ? 'error' : 'regular'}>
                  {error ? error.message : leftText}
                </RowText>
                <RowText>{rightText}</RowText>
              </Row>
            )}
          </InputWrapper>
        );
      }}
    />
  );
};

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RowText = styled.p<{ type?: RowTextType }>`
  font-size: ${({ theme }) => theme.fontSize.small}px;
  font-weight: 500;
  color: ${({ theme, type }) =>
    type === 'error' ? theme.palette.red : theme.palette.grey700};
`;

const LabelText = styled.p`
  color: ${({ theme }) => theme.palette.grey900};
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const StyledInput = styled.input`
  padding: 10px;
  border-radius: 8px;
  box-shadow: none;
  border: 1px solid;
  border-color: ${({ theme }) => theme.palette.grey300};

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export default Input;
