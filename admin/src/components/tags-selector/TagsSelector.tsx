import React, {useEffect} from 'react';
import useTagsList from "../../hooks/useTagsList";
import ITag from "../../core/tags/ITag";
import TagsList from "../tags-list/TagsList";
import {PageTitle} from "../typography/PageTitle";
import {Rectangle} from "../layout/Rectangle";
import styled from "styled-components";
import {FormButton} from "../buttons/FormButton";

const TagsSelectorWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-content: center;

  font-family: Roboto, sans-serif;
  color: white;
`;

const TagsSelectorRows = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-content: flex-start;

  min-height: 600px;
`;

const TagsSelectorLeftColumn = styled.div`
  max-width: 600px;
  min-width: 600px;
`;

const TagsSelectorRightColumn = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-content: center;

  font-size: 24px;
  line-height: 28px;

  max-width: 300px;
  min-width: 300px;

`;

const ButtonsRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-content: center;
  gap: 15px;
`;

const SelectedTagsCount = styled.span`
  color: rgb(26, 191, 153);
`

export interface ITagsSelector {
    selectedTags: ITag[] | null,

    onCancelCallback(): void;

    onConfirmCallback(selectedTags: ITag[]): void;
}

export const TagsSelector: React.FC<ITagsSelector> = (props) => {
    const {tagsList, isTagsListLoading, isTagsListLoadingError} = useTagsList();
    const [selectedTags, setSelectedTags] = React.useState<ITag[]>([]);
    const [availableTags, setAvailableTags] = React.useState<ITag[]>([]);

    const [tagsInputValue, setTagsInputValue] = React.useState("");

    useEffect(() => {
        if (props.selectedTags) {
            setSelectedTags(props.selectedTags);
        }
    }, [props.selectedTags])

    useEffect(() => {

    }, [tagsList])

    useEffect(() => {
        if (!isTagsListLoading && !isTagsListLoadingError) {
            if (tagsList) {
                let selectedIds = selectedTags.map(tag => tag.id);
                setAvailableTags(tagsList.filter(tag => !selectedIds.includes(tag.id)));
            }
        }


    }, [selectedTags, isTagsListLoading, isTagsListLoadingError])

    function onChangeHandler(e: any) {
        setTagsInputValue(e.target.value);
        if (e.target.value) {
            let tag = tagsList?.find(item => item.name === e.target.value);
            if (tag) {
                setSelectedTags(tags => [...tags, tag!]);
                setTagsInputValue("");
            }
        }
    }

    function cancelHandler(e: any) {
        e.preventDefault();
        setAvailableTags(tagsList ?? []);
        setSelectedTags(props.selectedTags ?? []);
        props.onCancelCallback();
    }

    function confirmHandler(e: any) {
        e.preventDefault();
        props.onConfirmCallback(selectedTags);
    }

    return (
        <TagsSelectorWrapper>
            <PageTitle>Tags selector</PageTitle>
            <Rectangle height={30}/>
            <TagsSelectorRows>
                <TagsSelectorLeftColumn>
                    <input list="tags"
                           style={{width: "600px"}}
                           value={tagsInputValue}
                           onChange={onChangeHandler}/>
                    <datalist id="tags">
                        {availableTags.map(tag =>
                            <option key={tag.id} value={tag.name}>{tag.name}</option>)}
                    </datalist>
                </TagsSelectorLeftColumn>
                <Rectangle width={100}/>
                <TagsSelectorRightColumn>
                    <div>
                        Selected tags <SelectedTagsCount>({selectedTags.length})</SelectedTagsCount>
                    </div>
                    <TagsList tags={selectedTags}/>
                </TagsSelectorRightColumn>
            </TagsSelectorRows>
            <ButtonsRow>
                <FormButton className="cancel" onClick={cancelHandler}>Cancel</FormButton>
                <FormButton className="confirm" onClick={confirmHandler}>Done</FormButton>
            </ButtonsRow>
        </TagsSelectorWrapper>
    );
}