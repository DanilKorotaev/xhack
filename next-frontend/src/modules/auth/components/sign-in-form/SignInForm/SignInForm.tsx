import React from 'react';
import {FaLock, FaUser} from "react-icons/fa";
import {
  ForgotPasswordButton,
  StyledButtonsSlotWrapper,
  StyledButtonsWrapper,
  StyledSignInFormLogo,
  StyledSignInFormTitle
} from "./SignInFormStyles";
import SignInFormLayout from "../SignInFormLayout/SignInFormLayout";
import InputWithIcon from "../../../../../components/input/InputWithIcon/InputWithIcon";
import {StyledInputWithIconInputCentered} from "../../../../../components/input/InputWithIcon/InputWithIconStyles";
import {Button, LinkButton, PrimaryButton} from "../../../../../components/buttons/Button";
import logo from '../../../../../../assets/logo.svg';
import {Rectangle} from "../../../../../components/layout/Rectangle";

export interface ISignInFormProps {
  email?: string;
  onEmailChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  password?: string;
  onPasswordChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  onSignInClick?: () => void;
  onSignUpClick?: () => void;
  onForgotPasswordClick?: () => void;
}

export const SignInForm: React.FC<ISignInFormProps> = (props) => {
  return (
    <SignInFormLayout
      logoSlot={(
        <>
          <StyledSignInFormLogo src={logo} />
          <StyledSignInFormTitle>xhack.dev</StyledSignInFormTitle>
        </>
      )}
      fieldsSlot={(
        <>
          <InputWithIcon
            CustomInputComponent={StyledInputWithIconInputCentered}
            iconSlot={<FaUser />}
            inputProps={{
              type: 'text',
              placeholder: 'Email',
              value: props.email,
              onChange: props.onEmailChange,
            }}
          />
          <InputWithIcon
            CustomInputComponent={StyledInputWithIconInputCentered}
            iconSlot={<FaLock />}
            inputProps={{
              type: 'password',
              placeholder: 'Password',
              value: props.password,
              onChange: props.onPasswordChange,
            }}
          />
        </>
      )}
      buttonsSlot={(
        <>
          <Rectangle height={20} />
          <StyledButtonsSlotWrapper>
            <StyledButtonsWrapper>
              <PrimaryButton onClick={props.onSignInClick}>Sign In</PrimaryButton>
              <Button onClick={props.onSignUpClick}>Sign Up</Button>
            </StyledButtonsWrapper>
            <ForgotPasswordButton onClick={props.onForgotPasswordClick}>Forgot your password?</ForgotPasswordButton>
          </StyledButtonsSlotWrapper>
        </>
      )}
    />
  );
};

export default SignInForm;
