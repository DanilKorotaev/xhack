import React from 'react';
import {Rectangle} from "../components/layout/Rectangle";
import styled from "styled-components";
import {createHackathonRequest} from "../http/hackathons/create-hackathon.request";
import {useHistory} from "react-router";
import {HackathonTextInput} from '../components/hackathon-field/HackathonTextInput';
import {PAGES} from '../routes';
import EditPageLayout from "../components/layout/EditPageLayout";
import {FormButton} from "../components/buttons/FormButton";
import {IValidator} from "../core/IValidator";
import {uploadSingle} from "../http/file-upload/single.request";
import TagsList from "../components/tags-list/TagsList";
import ITag from "../core/tags/ITag";
import {addTagForHackathon} from "../http/tags/addTagForHackathon.request";
import {TagsSelector} from "../components/tags-selector/TagsSelector";
import Modal from "../components/modal/Modal";

export interface IHackathonCreatePageProps {

}

const HackathonEditWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const HackathonImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
`;

const HackathonForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: stretch;
`;

const HackathonButtonsWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 100%;

  & > .confirm {
    background: #0148FF;

    :hover {
      background: #0138df
    }
  }

  & > .cancel {
    :hover {
      background: #303030;
    }
  }
`;

const ErrorMessage = styled.div`
  padding-top: 20px;

  color: red;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
`;

const SkillsSelectLabel = styled.div`
  color: white;
  font-family: Roboto, sans-serif;
  font-size: 18px;
  line-height: 22px;

  text-align: center;

  :hover {
    color: #0148FF;
    font-size: 22px;
    line-height: 22px;
  }
`;

export const HackathonCreatePage: React.FC<IHackathonCreatePageProps> = (props) => {
    const history = useHistory();

    const [cancelButtonText, confirmButtonText, titleText] = ["Cancel", "Save", "Add"];

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [siteUrl, setSiteUrl] = React.useState("");
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    const [avatarUrl, setAvatarUrl] = React.useState("");

    const [hackTags, setHackTags] = React.useState<ITag[]>([]);

    const [showModal, setShowModal] = React.useState(false);

    const [saveFailed, setSaveFailed] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const [selectedFile, setSelectedFile] = React.useState<File>();

    function onChangeHandler<T>(value: T, setter: React.Dispatch<React.SetStateAction<T>>, validator: IValidator<T>) {
        validator([value]).then((result) => {
            if (result) {
                setSaveFailed(false);
                setter(value);
            } else {

            }
        })
    }

    function cancelHandler() {
        history.push(PAGES.hackathons);
    }

    function confirmHandler() {
        createHackathonRequest({
            name: name,//"Year 2022",
            description: description,//"Generic description",
            location: location,//"moscow",
            startDate: new Date(startDate),
            endDate: new Date(endDate),//new Date(new Date().setFullYear(2022)),
            siteUrl: siteUrl,//"127.0.0.1",
            avatarUrl: avatarUrl,
        }).then((result) => {
            hackTags.forEach(tag => addTagForHackathon({
                tagId: tag.id,
                hackathonId: result.id,
            }))
        }).then(() => {
            history.push(PAGES.hackathons)
        }).catch(rej => {
            setSaveFailed(true);
            setErrorMessage(rej.message);
        });
    }

    function uploadHandler(e: any) {
        e.preventDefault();
        if (selectedFile !== undefined) {
            const formData = new FormData();
            formData.append("image", selectedFile, selectedFile.name);

            uploadSingle(formData).then(result => setAvatarUrl(result.image_url)).catch();
        }
    }

    function selectHandler(e: any) {
        setSelectedFile(e.target.files[0]);
    }

    return (
        <EditPageLayout
            titleSlot={titleText + " Hackathon"}
            contentSlot={
                <HackathonEditWrapper>
                    <Rectangle height={30}/>
                    <HackathonImage src={avatarUrl} alt="image placeholder"/>
                    <Rectangle height={20}/>
                    <HackathonForm>
                        <input type={"file"} onChange={selectHandler}/>
                        <button onClick={uploadHandler}>Upload</button>
                        <HackathonTextInput value={name} name="name" placeholder="Name"
                                            onChange={(value) => onChangeHandler<string>(value, setName, async () => true)}/>
                        <HackathonTextInput value={description} name="description" placeholder="Description"
                                            onChange={(value) => onChangeHandler<string>(value, setDescription, async () => true)}/>
                        <HackathonTextInput value={location} name="location" placeholder="Location"
                                            onChange={(value) => onChangeHandler<string>(value, setLocation, async () => true)}/>
                        <HackathonTextInput value={siteUrl} name="siteUrl" placeholder="Site URL"
                                            onChange={(value) => onChangeHandler<string>(value, setSiteUrl, async () => true)}/>
                        <HackathonTextInput value={startDate} name="startDate" placeholder="Start date"
                                            onChange={(value) => onChangeHandler<string>(value, setStartDate, async () => true)}/>
                        <HackathonTextInput value={endDate} name="endDate" placeholder="End date"
                                            onChange={(value) => onChangeHandler<string>(value, setEndDate, async () => true)}/>
                        <Rectangle height={15}/>
                        <div onClick={() => setShowModal(true)}>
                            {hackTags.length === 0 ? <SkillsSelectLabel>Select skills</SkillsSelectLabel>
                                : <TagsList tags={hackTags}/>}
                        </div>
                        <Rectangle height={30}/>
                        <Rectangle height={30}/>
                        <Modal showModal={showModal} onHide={() => setShowModal(false)}>
                            <TagsSelector selectedTags={hackTags}
                                          onCancelCallback={() => setShowModal(false)}
                                          onConfirmCallback={(tags) => {
                                              setHackTags(tags);
                                              setShowModal(false);
                                          }}
                            />
                            {/*callback={(tag: ITag) => setHackTags(tags => [...tags, tag])}*/}
                        </Modal>
                        <HackathonButtonsWrapper>
                            <FormButton className="cancel" onClick={cancelHandler}
                                        children={cancelButtonText}/>
                            <FormButton className="confirm" onClick={confirmHandler}
                                        children={confirmButtonText}/>
                        </HackathonButtonsWrapper>
                    </HackathonForm>
                    {saveFailed ? (<ErrorMessage>{errorMessage}</ErrorMessage>) : null}
                </HackathonEditWrapper>
            }/>
    );
};

export default HackathonCreatePage;
