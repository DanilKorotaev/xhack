import React, {useEffect} from 'react';
import {Rectangle} from "../components/layout/Rectangle";
import styled from "styled-components";
import {useHistory, useParams} from "react-router";
import {HackathonTextInput} from '../components/hackathon-field/HackathonTextInput';
import {PAGES, PAGES_PARAMS} from '../routes';
import EditPageLayout from "../components/layout/EditPageLayout";
import {FormButton} from "../components/buttons/FormButton";
import useLoader from "../hooks/useLoader";
import {IValidator} from "../core/IValidator";
import {uploadSingle} from "../http/file-upload/single.request";
import {updateHackathonById} from "../http/hackathons/update-hackathon.request";
import {getHackathonByIdAdminRequest} from "../http/hackathons/get-by-id-admin.request";
import TagsList from "../components/tags-list/TagsList";
import ITag from '../core/tags/ITag';
import {addTagForHackathon} from "../http/tags/addTagForHackathon.request";
import {TagsSelector} from "../components/tags-selector/TagsSelector";
import Modal from "../components/modal/Modal";

export interface IHackathonEditPageProps {

}

const HackathonEditWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
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

const InputFile = styled.input`
  outline-color: red;
  outline-style: solid;
  outline-width: 2px;
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

const HackImageWrapper = styled.div`
  min-height: 300px;
  min-width: 300px;

  border-radius: 50%;
  background-image: radial-gradient(circle, grey, black);
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

const StyledHackathonImage: React.FC<any> = (props) => {
    return (
        <HackImageWrapper>
            {<HackathonImage {...props}/> ?? props.src}
        </HackImageWrapper>
    );
}

export const HackathonEditPage: React.FC<IHackathonEditPageProps> = (props) => {
    const params = useParams<any>();
    const hackId = Number(params[PAGES_PARAMS.hackId]);

    const history = useHistory();

    const [cancelButtonText, confirmButtonText, titleText] = ["Cancel", "Save", "Edit"];

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [siteUrl, setSiteUrl] = React.useState("");
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    const [avatarUrl, setAvatarUrl] = React.useState("");

    const [hackTags, setHackTags] = React.useState<ITag[]>([]);
    const [initialHackTags, setInitialHackTags] = React.useState<ITag[]>([]);

    const [showModal, setShowModal] = React.useState(false);

    const [saveFailed, setSaveFailed] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const [selectedFile, setSelectedFile] = React.useState<File>();

    const {
        data: hack,
        isLoading
    } = useLoader({
        api: () => getHackathonByIdAdminRequest(hackId),
        deps: []
    });

    useEffect(() => {
        if (hack !== null) {
            setName(hack.name);
            setDescription(hack.description);
            setLocation(hack.location);
            setSiteUrl(hack.siteUrl);
            setStartDate(hack.startDate?.toString());
            setEndDate(hack.endDate?.toString());
            setAvatarUrl(hack.avatarUrl ?? "");
            setHackTags(hack.tags);
            setInitialHackTags(hack.tags);
        }
    }, [hack])

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
        if (hack) {
            updateHackathonById(hack!.id, {
                name,
                description,
                location,
                siteUrl,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                avatarUrl
            })
                .then(() => {
                    let initialIds = initialHackTags.map(tag => tag.id);
                    let tagsToAdd = hackTags.filter(tag => !initialIds.includes(tag.id));
                    tagsToAdd.forEach(tag => addTagForHackathon({
                        tagId: tag.id,
                        hackathonId: hack.id,
                    }))
                })
                .then(() => history.push(PAGES.hackDetails.build(hack.id)))
        }
    }

    function uploadHandler(e: any) {
        e.preventDefault();
        if (selectedFile !== undefined) {
            const formData = new FormData();
            formData.append("image", selectedFile, selectedFile.name);

            uploadSingle(formData).then(result => setAvatarUrl(result.image_url)).catch();
        }
    }

    function selectFileHandler(e: any) {
        setSelectedFile(e.target.files[0]);
    }

    return (
        <EditPageLayout
            titleSlot={titleText + " Hackathon"}
            contentSlot={
                <HackathonEditWrapper>
                    <Rectangle height={30}/>
                    <StyledHackathonImage src={avatarUrl} alt="image placeholder"/>
                    <Rectangle height={20}/>
                    <HackathonForm>
                        <InputFile type={"file"} onChange={selectFileHandler}/>
                        <button onClick={uploadHandler}>Upload</button>
                        <HackathonTextInput value={name}
                                            name="name"
                                            placeholder="Name"
                                            onChange={(value) => onChangeHandler<string>(value, setName, async () => true)}/>
                        <HackathonTextInput value={description}
                                            name="description"
                                            placeholder="Description"
                                            onChange={(value) => onChangeHandler<string>(value, setDescription, async () => true)}/>
                        <HackathonTextInput value={location}
                                            name="location"
                                            placeholder="Location"
                                            onChange={(value) => onChangeHandler<string>(value, setLocation, async () => true)}/>
                        <HackathonTextInput value={siteUrl}
                                            name="siteUrl"
                                            placeholder="Site URL"
                                            onChange={(value) => onChangeHandler<string>(value, setSiteUrl, async () => true)}/>
                        <HackathonTextInput value={startDate}
                                            name="startDate"
                                            placeholder="Start date"
                                            onChange={(value) => onChangeHandler<string>(value, setStartDate, async () => true)}/>
                        <HackathonTextInput value={endDate}
                                            name="endDate"
                                            placeholder="End date"
                                            onChange={(value) => onChangeHandler<string>(value, setEndDate, async () => true)}/>
                        <Rectangle height={15}/>
                        <div onClick={() => setShowModal(true)}>
                            {hackTags.length === 0 ? <SkillsSelectLabel>Select skills</SkillsSelectLabel>
                                : <TagsList tags={hackTags}/>}
                        </div>
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
                    {<ErrorMessage>{errorMessage}</ErrorMessage> ?? saveFailed}
                </HackathonEditWrapper>
            }/>
    );
}

export default HackathonEditPage;
