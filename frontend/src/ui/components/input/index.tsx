import styled from 'styled-components';
import { FieldProps } from '../types';
import { Controller, FieldValues } from 'react-hook-form';
import Text from '../Text';
import { HTMLInputTypeAttribute } from 'react';

type InputProps<T extends FieldValues> = {
  leftText?: string;
  rightText?: string;
  type?: HTMLInputTypeAttribute;
} & FieldProps<T>;

type RowTextType = 'regular' | 'error';

const Input = <T extends FieldValues>({
  name,
  rules,
  type,
  label,
  placeholder,
  leftText,
  rightText,
  control,
}: InputProps<T>) => {
  return (
    <Controller
      control={control}
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

            <StyledInput placeholder={placeholder} {...field} type={type} />

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

const RowText = styled(Text.Regular)<{ type?: RowTextType }>`
  color: ${({ theme, type }) =>
    type === 'error' ? theme.palette.red : theme.palette.grey700};
`;

const LabelText = styled(Text.Regular)`
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
