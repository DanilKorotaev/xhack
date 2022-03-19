import {Rectangle} from "../components/layout/Rectangle";
import styled from "styled-components";
import React, {useEffect} from "react";
import EditPageLayout from "../components/layout/EditPageLayout";
import {useHistory, useParams} from "react-router";
import {UserField} from "../components/user-field/UserField";
import {FormButton} from "../components/buttons/FormButton";
import {PAGES, PAGES_PARAMS} from "../routes";
import {UserFieldCheckbox} from "../components/user-field-checkbox/UserFieldCheckbox";
import {getUserByIdRequest} from "../http/users/get-user-by-id.request";
import useLoader from "../hooks/useLoader";
import {uploadSingle} from "../http/file-upload/single.request";
import {updateProfileById} from "../http/users/update-profile-by-id.request";

const UserTitle = styled.span`
  display: inline;
  font-weight: 500;
`;

const UserEditWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const UserImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
`;

const UserForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
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

export interface IUserEditPageProps {

}

export const UserEditPage: React.FC<IUserEditPageProps> = () => {
    const params = useParams<any>();
    const userId = Number(params[PAGES_PARAMS.userId]);

    const history = useHistory();

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [specialization, setSpecialization] = React.useState("");
    const [isSearchable, setIsSearchable] = React.useState(true);
    const [avatarUrl, setAvatarUrl] = React.useState("");

    const [saveFailed, setSaveFailed] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const [selectedFile, setSelectedFile] = React.useState<File>();

    const {
        isLoading: isUsersLoading,
        isLoadingError: isUsersLoadingError,
        data: user,
    } = useLoader({
        api: () => getUserByIdRequest(userId),
        deps: [],
    });

    useEffect(() => {
        if (user !== null) {
            setName(user.name);
            setEmail(user.description);
            setDescription(user.description);
            setSpecialization(user.specialization);
            setIsSearchable(user.isAvailableForSearching);
            setAvatarUrl(user.avatarUrl ?? "");
        }
    }, [user])

    function onChangeHandler<T>(newValue: T, setter: React.Dispatch<React.SetStateAction<T>>) {
        setSaveFailed(false);
        setter(newValue);
    }

    function cancelHandler() {
        history.push(PAGES.users)
    }

    function confirmHandler() {
        if (user) {
            updateProfileById(user.id, {
                name: name,
                avatarUrl: avatarUrl,
                networks: [],
                isAvailableForSearching: isSearchable,
                specialization: specialization,
                email: email,
                description: description
            }).then(() => {
                history.push(PAGES.users)
            }).catch((reject) => {
                setSaveFailed(true);
                setErrorMessage(reject.message);
            });
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

    function selectHandler(e: any) {
        setSelectedFile(e.target.files[0]);
    }

    return (
        <EditPageLayout
            titleSlot={<header>Editing user: <UserTitle>{name}</UserTitle></header>}
            contentSlot={
                <UserEditWrapper>
                    <UserImage src={avatarUrl} alt="user image"/>
                    <Rectangle height={30}/>
                    <UserForm>
                        <input type={"file"} onChange={selectHandler}/>
                        <button onClick={uploadHandler}>Upload</button>
                        <UserField type="text"
                                   name="name"
                                   value={name}
                                   placeholder="Name"
                                   onChangeCallback={(newValue) => onChangeHandler(newValue, setName)}/>
                        <UserField type="text"
                                   name="email"
                                   value={email}
                                   placeholder="E-mail"
                                   onChangeCallback={(newValue) => onChangeHandler(newValue, setEmail)}/>
                        <UserField type="text"
                                   name="description"
                                   value={description}
                                   placeholder="Description"
                                   onChangeCallback={(newValue) => onChangeHandler(newValue, setDescription)}/>
                        <UserField type="text"
                                   name="specialization"
                                   value={specialization}
                                   placeholder="Specialization"
                                   onChangeCallback={(newValue) => onChangeHandler(newValue, setSpecialization)}/>
                        <UserFieldCheckbox className="left"
                                           type="checkbox"
                                           name="isSearchable"
                                           text="Show user in search results"
                                           onChangeCallback={(newValue) => onChangeHandler(newValue, setIsSearchable)}/>
                        <Rectangle height={30}/>
                        <ButtonsWrapper>
                            <FormButton className="cancel" children="Cancel" onClick={cancelHandler}/>
                            <FormButton className="confirm" children="Save" onClick={confirmHandler}/>
                        </ButtonsWrapper>
                    </UserForm>
                    {saveFailed ? (<ErrorMessage>{errorMessage}</ErrorMessage>) : null}
                </UserEditWrapper>
            }/>
    );
}