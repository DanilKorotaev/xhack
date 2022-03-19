import React from "react";
import InputWithIcon from "./InputWithIcon";
import {withGlobalStyles} from "../../storybook.helpers";
import {FaBeer, FaLock} from 'react-icons/fa';
import {StyledInputWithIconInputCentered} from "./InputWithIconStyles";

export default {
  title: 'Components/InputWithIcon',
  component: InputWithIcon,
}

export const InputWithIconMain: React.FC = withGlobalStyles(() => {
  const [value, setValue] = React.useState('');

  return (
    <InputWithIcon
      iconSlot={<FaBeer />}
      inputProps={{
        value: value,
        onChange: React.useCallback((e) => {
          setValue(e.target.value);
        }, [setValue]),
      }}
    />
  );
});

export const InputWithIconPasswordCentered: React.FC = withGlobalStyles(() => {
  const [value, setValue] = React.useState('');

  return (
    <InputWithIcon
      CustomInputComponent={StyledInputWithIconInputCentered}
      iconSlot={<FaLock />}
      inputProps={{
        type: 'password',
        value: value,
        onChange: React.useCallback((e) => {
          setValue(e.target.value);
        }, [setValue]),
      }}
    />
  );
});
