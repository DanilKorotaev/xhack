import React from 'react';
import {Button, LinkButton, PrimaryButton} from "./Button";
import {withGlobalStyles} from "../storybook.helpers";

export default {
  title: 'Components/Button',
  component: Button,
}

export const ButtonDefault: React.FC = withGlobalStyles(() => {
  return <Button>Click me!</Button>
});

export const ButtonPrimary: React.FC = withGlobalStyles(() => {
  return <PrimaryButton>Click me!</PrimaryButton>
});

export const ButtonLink: React.FC = withGlobalStyles(() => {
  return <LinkButton>Forgot your password?</LinkButton>
});
