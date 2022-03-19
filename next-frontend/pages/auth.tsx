import React from 'react';
import AuthDefaultLayout from "../src/modules/auth/components/layouts/AuthDefaultLayout";
import SignInForm from "../src/modules/auth/components/sign-in-form/SignInForm/SignInForm";
import {Field, Form} from "react-final-form";
import SignInFormLayout from "../src/modules/auth/components/sign-in-form/SignInFormLayout/SignInFormLayout";
import {
  ForgotPasswordButton,
  FormErrorField, StyledButtonsSlotWrapper, StyledButtonsWrapper,
  StyledSignInFormLogo,
  StyledSignInFormTitle
} from "../src/modules/auth/components/sign-in-form/SignInForm/SignInFormStyles";
import logo from "../assets/logo.svg";
import InputWithIcon from "../src/components/input/InputWithIcon/InputWithIcon";
import {StyledInputWithIconInputCentered} from "../src/components/input/InputWithIcon/InputWithIconStyles";
import {FaLock, FaUser} from "react-icons/fa";
import {Rectangle} from "../src/components/layout/Rectangle";
import {Button, PrimaryButton} from "../src/components/buttons/Button";
import {useAuthService} from "../src/modules/auth/services/AuthService";
import {FORM_ERROR} from "final-form";

export default function AuthPage() {
  const authService = useAuthService();

  return (
    <AuthDefaultLayout>
      <Form
        onSubmit={async (formValues, form, callback) => {
          const response = await authService.login({
            email: formValues.email,
            password: formValues.password,
          });
          if (response.error) {
            return {
              [FORM_ERROR]: response.error,
            };
          }
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
        render={({ handleSubmit, pristine, submitting, submitError }) => (
          <>
            <div style={{ marginTop: -200 }} />
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
                  {submitError && (
                    <>
                      <FormErrorField>{submitError}</FormErrorField>
                    </>
                  )}
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
          </>
        )}
      />
    </AuthDefaultLayout>
  );
}
