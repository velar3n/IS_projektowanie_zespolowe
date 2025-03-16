import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";

export type FieldProps<T extends FieldValues> = {
  placeholder?: string;
  label?: string;
  control: Control<T>;
  name: Path<T>;
  rules?: Pick<
    RegisterOptions<T>,
    "maxLength" | "minLength" | "pattern" | "validate" | "required"
  >;
};
