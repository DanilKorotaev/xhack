import React from 'react';
import {
  StyledSignInFormButtonsSlotWrapper,
  StyledSignInFormFieldsSlotWrapper,
  StyledSignInFormLayout,
  StyledSignInFormLogoSlotWrapper
} from "./SignInFormLayoutStyles";

export interface ISignInFormLayoutProps {
  logoSlot?: React.ReactNode;
  fieldsSlot?: React.ReactNode;
  buttonsSlot?: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const SignInFormLayout: React.FC<ISignInFormLayoutProps> = (props) => {
  return (
    <StyledSignInFormLayout onSubmit={props.onSubmit}>
      {props.logoSlot && (
        <StyledSignInFormLogoSlotWrapper>
          {props.logoSlot}
        </StyledSignInFormLogoSlotWrapper>
      )}
      {props.fieldsSlot && (
        <StyledSignInFormFieldsSlotWrapper>
          {props.fieldsSlot}
        </StyledSignInFormFieldsSlotWrapper>
      )}
      {props.buttonsSlot && (
        <StyledSignInFormButtonsSlotWrapper>
          {props.buttonsSlot}
        </StyledSignInFormButtonsSlotWrapper>
      )}
    </StyledSignInFormLayout>
  );
};

export default SignInFormLayout;
