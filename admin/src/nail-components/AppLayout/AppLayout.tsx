import React from 'react';
import DefaultPageLayout from "../../components/layout/DefaultPageLayout";
import Navbar from "../../components/navbar/Navbar";
import { routes } from "../../routes";

export interface IAppLayoutProps {
  titleSlot: React.ReactNode;
  contentSlot: React.ReactNode;
}

export const AppLayout: React.FC<IAppLayoutProps> = (props) => {
  return <DefaultPageLayout
    navSlot={<Navbar items={routes} />}
    titleSlot={props.titleSlot}
    contentSlot={props.contentSlot}
  />;
};

export default AppLayout;
