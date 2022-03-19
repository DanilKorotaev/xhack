import React from 'react';
import AppLayout from "../nail-components/AppLayout/AppLayout";
import SearchField from "../components/search-field/SearchField";
import {PageTitle} from "../components/typography/PageTitle";
import {Rectangle} from "../components/layout/Rectangle";
import HackathonListItem from "../components/hackathon-list-item/HackathonListItem";
import styled from "styled-components";
import {fadeinAnimation, loadEventAnimation} from "../components/animations";
// import { hackathonsMocks } from "../mocks/mocks";
import IHackathon from "../core/hackathons/IHackathon";
import {FlexRowNowrapFlexStartCenter} from "../components/layout/helpers";
import {LinkButton} from "../components/buttons/LinkButton";
import {LinkWithNoStyles} from "../components/buttons/LinkWithNoStyles";
import useLoader from "../hooks/useLoader";
import {getHackathonsListRequest} from "../http/hackathons/get-list.request";
import {PAGES} from '../routes';
import {Link} from 'react-router-dom';

export interface IHackathonsPageProps {

}

const StyledSearchField = styled(SearchField)`
  animation: 0.4s ${fadeinAnimation} ease-in-out;
`;

const StyledHackathonListItem = styled(HackathonListItem)`
  animation: 0.4s ${loadEventAnimation} ease-in-out;
  transition: 0.1s ease-in-out;

  :hover {
    box-shadow: -6px -11px 15px -5px rgba(255, 255, 255, 0.06), 5px 10px 15px rgba(0, 0, 0, 0.3);
  }
`;

export const HackathonsPage: React.FC<IHackathonsPageProps> = () => {
    const [filter, setFilter] = React.useState("");

    const {
        isLoading: isHackathonsLoading,
        isLoadingError: isHackathonsLoadingError,
        data: hackathons,
        setData: setHackathons,
        reload: reloadHackathons
    } = useLoader({
        api: () => getHackathonsListRequest({
            filter: filter,
            page: 0,
            take: 200 // todo scroll paging
        }),
        deps: [],
    });

    function searchFieldChangeHandler(e: any) {
        reloadHackathons();
        setFilter(e);
    }

    return (
        <AppLayout
            titleSlot={
                <FlexRowNowrapFlexStartCenter>
                    <PageTitle>Hackathons</PageTitle>
                    <Rectangle width={40}/>
                    <Link to={PAGES.hackCreate}>
                        <LinkButton>add</LinkButton>
                    </Link>
                </FlexRowNowrapFlexStartCenter>
            }
            contentSlot={<>
                <Rectangle height={30}/>
                <StyledSearchField onChangeCallback={searchFieldChangeHandler}/>
                <Rectangle height={20}/>
                {(hackathons)?.map((hack, index) => (
                    <React.Fragment key={hack.id}>
                        <LinkWithNoStyles to={`/hackathons/${hack.id}`}>
                            <StyledHackathonListItem hack={hack}/>
                        </LinkWithNoStyles>
                        {(index !== ((hackathons)?.length - 1)) && <Rectangle height={20}/>}
                    </React.Fragment>
                ))}
            </>}
        />
    );
};

export default HackathonsPage;
