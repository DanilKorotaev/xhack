import React from 'react';
import AppLayout from "../nail-components/AppLayout/AppLayout";
import {useParams} from "react-router";
import {PAGES, PAGES_PARAMS} from "../routes";
import useLoader from "../hooks/useLoader";
import {getHackathonByIdAdminRequest} from "../http/hackathons/get-by-id-admin.request";
import styled from "styled-components";
import {Rectangle} from "../components/layout/Rectangle";
import {LinkButton} from "../components/buttons/LinkButton";
import {Link} from "react-router-dom";
import {HackDetailsColumn} from "../components/hack-details-column/HackDetailsColumn";
import TagsList from "../components/tags-list/TagsList";

const HackDetailsWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-content: stretch;
`;

const HackImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const HackInfo = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-content: flex-start;
`;

const HackTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 41px;
  line-height: 48px;
`;

const HackDates = styled.div`
`;

const ParticipantSearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const SecondaryRowTitle = styled.div`
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
`;

const HackDescription = styled.div`
  font-size: 18px;
  line-height: 150%;

  overflow-wrap: break-word;
  word-wrap: break-word;
`;

const MembersSearchBox = styled.div`
  width: 300px;
  height: 134px;

  background: #1A1A1A;

  box-shadow: -6px -11px 15px -5px rgba(255, 255, 255, 0.03), 5px 10px 15px rgba(0, 0, 0, 0.15);
  border-radius: 30px;
`;

export interface IHackathonDetailPageProps {

}

export const HackathonDetailPage: React.FC<IHackathonDetailPageProps> = () => {
    const params = useParams<any>();
    const hackId = Number(params[PAGES_PARAMS.hackId]);

    const {
        data: hack,
        isLoading,
        isLoadingError,
    } = useLoader({
        api: () => getHackathonByIdAdminRequest(hackId),
        deps: []
    });

    return (
        <AppLayout
            titleSlot={<></>}
            contentSlot={
                <>
                    <HackDetailsWrapper>
                        <HackDetailsColumn
                            firstRowSlot={
                                <>
                                    <HackImage src={hack?.avatarUrl} alt={hack?.name}/>
                                    <Rectangle width={20}/>
                                    <HackInfo>
                                        <HackTitle>{hack?.name}</HackTitle>
                                        <Rectangle height={8}/>
                                        <div>what goes here?</div>
                                        <Rectangle height={8}/>
                                        <TagsList tags={hack == null ? null : hack.tags}/>
                                    </HackInfo>
                                    <Link to={PAGES.teams}>
                                        <LinkButton>Show teams</LinkButton>
                                    </Link>
                                    {!(isLoading || isLoadingError) ?
                                        (<Link to={PAGES.hackUpdate.build(hack!.id)}>
                                            <LinkButton>Edit</LinkButton>
                                        </Link>) : null}
                                </>
                            }
                            secondRowSlot={
                                <div>
                                    <SecondaryRowTitle>Register</SecondaryRowTitle>
                                    <Rectangle height={8}/>
                                    <div>
                                        <Link to={"./"}>
                                            <LinkButton>{hack?.siteUrl}</LinkButton>
                                        </Link>
                                    </div>
                                    <Rectangle height={20}/>
                                    <ParticipantSearchWrapper>
                                        <MembersSearchBox>Members looking for teams</MembersSearchBox>
                                        <MembersSearchBox>Teams looking for members</MembersSearchBox>
                                    </ParticipantSearchWrapper>
                                </div>
                            }
                            thirdRowSlot={
                                <>
                                    <SecondaryRowTitle>Description</SecondaryRowTitle>
                                    <Rectangle height={8}/>
                                    <HackDescription>{hack?.description}</HackDescription></>
                            }>
                        </HackDetailsColumn>
                        <HackDetailsColumn
                            firstRowSlot={null}
                            secondRowSlot={
                                <HackDates>
                                    <div>Here will be beautiful dates calendar</div>
                                    <Rectangle height={20}/>
                                    <div>Start date: {hack?.startDate}</div>
                                    <div>End date: {hack?.endDate}</div>
                                </HackDates>
                            }
                            thirdRowSlot={null}/>
                    </HackDetailsWrapper>
                    {console.log(hack?.startDate)}
                </>
            }
        />
    );
};

export default HackathonDetailPage;
