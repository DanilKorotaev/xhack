import React from "react";
import IUser from "../../core/users/IUser";
import {Tags, Tag} from "../tags/Tags";
import {Link} from "react-router-dom";
import {UserListItemWrapper, UserImage, UserWrapper, UserLink, UserName, UserSpecialization} from "./UserListItemStyles";

export interface IUserListItem {

    className?: string;
    user: IUser;
}

export const UserListItem: React.FC<IUserListItem> = (props) => {
    return (
        <UserListItemWrapper>
            <>
                <Link to={`/users/${props.user.id}`}>
                    <UserImage src={props.user.avatarUrl} alt=""/>
                </Link>
                <UserWrapper>
                    <UserLink to={`/users/${props.user.id}`}>
                        <UserName>{props.user.name}</UserName>
                    </UserLink>
                    <UserSpecialization>{props.user.specialization}</UserSpecialization>
                    {/*<Tags>*/}
                    {/*    {props.user.tags.map((s) => React.createElement(Tag, null, s))}*/}
                    {/*</Tags>*/}
                </UserWrapper>
            </>
        </UserListItemWrapper>
    )
}