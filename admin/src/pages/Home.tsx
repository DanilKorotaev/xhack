import React from 'react';
import AppLayout from "../nail-components/AppLayout/AppLayout";

export interface IHomeProps {

}

export const Home: React.FC<IHomeProps> = () => {
  return (
    <AppLayout
      titleSlot={null}
      contentSlot={'home'}
    />
  );
};

export default Home;
