import React, { useState } from 'react';

export interface IMyComponentProps {

}

export const MyComponent: React.FC<IMyComponentProps> = () => {
  const [counter, setCounter] = useState(0); 

  return (
    <div role="button" onClick={() => setCounter((value) => (value + 1))}>
      MyComponent
      {counter}
    </div>
  );
};

export default MyComponent;
