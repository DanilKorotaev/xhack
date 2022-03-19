import ITag from "../../core/tags/ITag";
import React from "react";
import {TagsListContainer, TagsListItem} from "./TagsListStyles";

interface ITagsListProps {
    tags: ITag[] | null,
}

export const TagsList: React.FC<ITagsListProps> = (props) => {
    return (
        <TagsListContainer>
            {props.tags?.map(tag => <TagsListItem key={tag.id}>{tag.name}</TagsListItem>)}
        </TagsListContainer>
    );
}

export default TagsList;