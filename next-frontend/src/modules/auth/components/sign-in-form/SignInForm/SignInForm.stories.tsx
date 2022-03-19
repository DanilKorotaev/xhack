import React from "react";
import SignInForm from "./SignInForm";
import {withGlobalStyles} from "../../../../../components/storybook.helpers";
import { Form, Field } from 'react-final-form'
import SignInFormLayout from "../SignInFormLayout/SignInFormLayout";
import {
  ForgotPasswordButton, FormErrorField,
  StyledButtonsSlotWrapper,
  StyledButtonsWrapper,
  StyledSignInFormLogo,
  StyledSignInFormTitle
} from "./SignInFormStyles";
import logo from "../../../../../../assets/logo.svg";
import InputWithIcon from "../../../../../components/input/InputWithIcon/InputWithIcon";
import {StyledInputWithIconInputCentered} from "../../../../../components/input/InputWithIcon/InputWithIconStyles";
import {FaLock, FaUser} from "react-icons/fa";
import {Rectangle} from "../../../../../components/layout/Rectangle";
import {Button, PrimaryButton} from "../../../../../components/buttons/Button";

export default {
  title: 'Components/SignInForm',
  component: SignInForm,
}

export const SignInFormMain = withGlobalStyles(() => {

  return <SignInForm />
});

export const Supreme = withGlobalStyles(() => {
  return (
    <Form
      onSubmit={(e) => {
        return
      }}
      validate={(formValues) => {
        const errors: any = {};
        if (!formValues.email) {
          errors.email = 'Email is required';
        }
        if (!formValues.password) {
          errors.password = 'Password is required';
        }
        return errors;
      }}
      render={({ handleSubmit, pristine, submitting }) => (
        <SignInFormLayout
          onSubmit={handleSubmit}
          logoSlot={(
            <>
              <StyledSignInFormLogo src={logo} />
              <StyledSignInFormTitle>xhack.dev</StyledSignInFormTitle>
            </>
          )}
          fieldsSlot={(
            <>
              <Field name="email" >
                {({ input, meta }) => (
                  <div>
                    <InputWithIcon
                      CustomInputComponent={StyledInputWithIconInputCentered}
                      iconSlot={<FaUser />}
                      inputProps={{
                        ...input,
                        type: 'text',
                        placeholder: 'Email',
                      }}
                    />
                    {meta.error && meta.touched && (
                      <>
                        <Rectangle height={5} />
                        <FormErrorField>{meta.error}</FormErrorField>
                      </>
                    )}
                  </div>
                )}
              </Field>
              <Field name="password" >
                {({ input, meta }) => (
                  <div>
                    <InputWithIcon
                      CustomInputComponent={StyledInputWithIconInputCentered}
                      iconSlot={<FaLock />}
                      inputProps={{
                        ...input,
                        type: 'password',
                        placeholder: 'Password',
                      }}
                    />
                    {meta.error && meta.touched && (
                      <>
                        <Rectangle height={5} />
                        <FormErrorField>{meta.error}</FormErrorField>
                      </>
                    )}
                  </div>
                )}
              </Field>
            </>
          )}
          buttonsSlot={(
            <>
              <Rectangle height={20} />
              <StyledButtonsSlotWrapper>
                <StyledButtonsWrapper>
                  <PrimaryButton type="submit">Sign In</PrimaryButton>
                  <Button>Sign Up</Button>
                </StyledButtonsWrapper>
                <ForgotPasswordButton>Forgot your password?</ForgotPasswordButton>
              </StyledButtonsSlotWrapper>
            </>
          )}
        />
      )}
    />
  );
});
