import React, { useState } from 'react';

export interface IDefaultInputProps {

}

export const DefaultInput: React.FC<IDefaultInputProps> = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div role="button" onClick={() => setCounter((value) => (value + 1))}>
      DefaultInput
      {counter}
    </div>
  );
};

export default DefaultInput;
