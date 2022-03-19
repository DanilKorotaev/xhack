import React from 'react';
import AppLayout from "../../nail-components/AppLayout/AppLayout";
import { PageTitle } from "../../components/typography/PageTitle";

export interface INotFoundPageProps {

}

export const NotFoundPage: React.FC<INotFoundPageProps> = () => {
  return (
    <AppLayout titleSlot={<PageTitle>Page not found</PageTitle>} contentSlot={null} />
  );
};

export default NotFoundPage;
