import React from 'react';
import AppLayout from "../nail-components/AppLayout/AppLayout";
import {PageTitle} from "../components/typography/PageTitle";
import {Rectangle} from "../components/layout/Rectangle";
import SearchField from "../components/search-field/SearchField";
import {UserListItem} from '../components/user-list-item/UserListItem';
import useLoader from "../hooks/useLoader";
import {usersGetListRequest} from "../http/users/get-list.request";

export interface IUsersProps {

}

export const UsersPage: React.FC<IUsersProps> = () => {
    const [filter, setFilter] = React.useState("");

    const {
        isLoading: isUsersLoading,
        isLoadingError: isUsersLoadingError,
        data: users,
        setData: setUsers,
        reload: reloadUsers
    } = useLoader({
        api: () => usersGetListRequest({
            filter: filter,
            page: 0,
            take: 200 // todo scroll paging
        }),
        deps: [],
    });

    //const users = usersMocks;

    return (
        <AppLayout
            titleSlot={
                <PageTitle>Users</PageTitle>
            }
            contentSlot={
                <>
                    <Rectangle height={30}/>
                    <SearchField className={""}/>
                    <Rectangle height={20}/>
                    {users?.map((user, index) => (
                        <>
                            <UserListItem user={user}/>
                            {index !== (users.length - 1) && (<Rectangle height={20}/>)}
                        </>
                    ))}
                </>
            }>
        </AppLayout>
    );
};
