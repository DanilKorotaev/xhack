import React from 'react';
import {PageTitle} from '../components/typography/PageTitle';
import AppLayout from '../nail-components/AppLayout/AppLayout';
import styled from "styled-components";
import {Rectangle} from '../components/layout/Rectangle';
import {FlexRowNowrapFlexStartCenter} from "../components/layout/helpers";
import {LinkButton} from '../components/buttons/LinkButton';
import {PAGES, PAGES_PARAMS} from "../routes";
import {LinkWithNoStyles} from '../components/buttons/LinkWithNoStyles';
import {getUserByIdRequest} from "../http/users/get-user-by-id.request";
import useLoader from "../hooks/useLoader";
import {useParams} from "react-router";

const UserDetailWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: stretch;
`;

const UserDetailImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

const UserWrapper = styled.div`
  padding-left: 20px;
`;

const UserDetailName = styled.div`
  color: white;

  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 64px;
  line-height: 75px;
`;

const UserDetailBio = styled.div`
  color: #F1F1F1;

  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
`;

const UserTitle = styled.span`
  display: inline;
  font-weight: 500;
`;

export interface IUserDetailPageProps {

}

export const UserDetailPage: React.FC<IUserDetailPageProps> = () => {
    const params = useParams<any>();
    const userId = Number(params[PAGES_PARAMS.userId]);

    const {
        isLoading: isUsersLoading,
        isLoadingError: isUsersLoadingError,
        data: user,
    } = useLoader({
        api: () => getUserByIdRequest(userId),
        deps: [],
    });

    if (user === null) {
        return <>Something went wrong while loading user</>;
    }

    return (
        <AppLayout
            titleSlot={
                <>
                    <PageTitle>{"User: "}<UserTitle>{user.name}</UserTitle></PageTitle>
                    <Rectangle height={30}/>
                </>
            }
            contentSlot={
                <UserDetailWrapper>
                    <UserDetailImage src={user.avatarUrl}/>
                    <UserWrapper>
                        <FlexRowNowrapFlexStartCenter>
                            <UserDetailName>{user.name}</UserDetailName>
                            <Rectangle width={30}/>
                            <LinkWithNoStyles to={PAGES.userEdit.build(user.id)}>
                                <LinkButton>edit</LinkButton>
                            </LinkWithNoStyles>
                        </FlexRowNowrapFlexStartCenter>
                        <UserDetailBio>{user.specialization}</UserDetailBio>
                        <Rectangle height={20}/>
                        {/*<Tags>*/}
                        {/*    {user.tags.map(s => <Tag>{s}</Tag>)}*/}
                        {/*</Tags>*/}
                    </UserWrapper>
                </UserDetailWrapper>

            }>

        </AppLayout>
    );
};

export default UserDetailPage;
