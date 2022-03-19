import React from 'react';
import AppLayout from "../nail-components/AppLayout/AppLayout";
import {PageTitle} from "../components/typography/PageTitle";
import styled from "styled-components";
import {Rectangle} from "../components/layout/Rectangle";
import {getTagsList} from "../http/tags/getTagsList.request";
import {createTags} from "../http/tags/createTags.request";
import {FormButton} from '../components/buttons/FormButton';
import TagsList from '../components/tags-list/TagsList';
import useTagsList from "../hooks/useTagsList";

const TagsWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-content: center;
`;


const ButtonsWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-content: center;
`;

export const TagsPage: React.FC = () => {
    const [tagNames, setTagNames] = React.useState("")
    const {tagsList, reloadTagsList} = useTagsList();

    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    function onClearHandler(e: any) {
        e.preventDefault();
        if (textareaRef.current) {
            textareaRef.current.value = '';
        }
    }

    function onConfirmHandler(e: any) {
        e.preventDefault();
        createTags({names: tagNames.split(",").map(name => name.trim())})
            .then(() => getTagsList().then(() => reloadTagsList()));
    }

    return (
        <AppLayout
            titleSlot={<PageTitle>Tags</PageTitle>}
            contentSlot={
                <TagsWrapper>
                    <Rectangle height={20}/>
                    <textarea value={tagNames}
                              placeholder="Enter comma separated tag names"
                              onChange={(e) => setTagNames(e.target.value)}
                              rows={10}
                              cols={80}
                              ref={textareaRef}
                    />
                    <Rectangle height={20}/>
                    <ButtonsWrapper>
                        <FormButton className="cancel" onClick={onClearHandler}>Clear</FormButton>
                        <FormButton className="confirm" onClick={onConfirmHandler}>Add tags</FormButton>
                    </ButtonsWrapper>
                    <Rectangle height={20}/>
                    <TagsList tags={tagsList}/>
                </TagsWrapper>
            }
        />);
}