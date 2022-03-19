import React from 'react';
import {
  StyledInputWithIconIconWrapper,
  StyledInputWithIconInput,
  StyledInputWithIconLabel
} from "./InputWithIconStyles";

export interface IInputWithIconProps {
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;

  iconSlot?: React.ReactNode;

  CustomLabelComponent?:  React.FC<React.LabelHTMLAttributes<HTMLLabelElement>>;
  CustomInputComponent?:  React.FC<React.InputHTMLAttributes<HTMLInputElement>>;
  CustomIconWrapperComponent?:  React.FC<React.HTMLAttributes<HTMLDivElement>>;
}

const defaultInputProps: React.InputHTMLAttributes<HTMLInputElement> = {
  type: "text",
}

const defaultLabelProps: React.LabelHTMLAttributes<HTMLLabelElement> = {

}

export const InputWithIcon: React.FC<IInputWithIconProps> = (props) => {
  const inputPropsToUse = {
    ...defaultInputProps,
    ...(props.inputProps ?? {}),
  };

  const labelPropsToUse = {
    ...defaultLabelProps,
    ...(props.labelProps ?? {}),
  };

  const LabelComponentToUse = props.CustomLabelComponent ?? StyledInputWithIconLabel;
  const InputComponentToUse = props.CustomInputComponent ?? StyledInputWithIconInput;
  const IconWrapperComponentToUse = props.CustomIconWrapperComponent ?? StyledInputWithIconIconWrapper;

  return (
    <LabelComponentToUse {...labelPropsToUse}>
      {props.iconSlot && (
        <IconWrapperComponentToUse>
          {props.iconSlot}
        </IconWrapperComponentToUse>
      )}
      <InputComponentToUse {...inputPropsToUse} />
    </LabelComponentToUse>
  );
};

export default InputWithIcon;
