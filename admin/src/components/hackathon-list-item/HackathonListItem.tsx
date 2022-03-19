import React from 'react';
import Status from "../status/Status";
import { Rectangle } from "../layout/Rectangle";
import { Tag, Tags } from "../tags/Tags";
import {
  DescriptionRow,
  FirstRow,
  HackathonListItemWrapper,
  HackImage,
  HackInfo,
  HackTitle,
  StyledArrowIcon
} from "./HackathonListItemStyles";
import IHackathon from "../../core/hackathons/IHackathon";

export interface IHackathonListItemProps {
  className?: string;
  hack: IHackathon;
}

export const HackathonListItem: React.FC<IHackathonListItemProps> = (props) => {
  return <HackathonListItemWrapper className={props.className}>
    <FirstRow>
      <HackImage src={props.hack.avatarUrl} />
      <HackInfo>
        <HackTitle>{props.hack.name}</HackTitle>
        <Rectangle height={8} />
        <Status text={'Online'} />
        <Rectangle height={10} />
        <Tags>
          {/*{props.hack.tags.map((tag) => (*/}
          {/*  <Tag>{tag}</Tag>*/}
          {/*))}*/}
        </Tags>
      </HackInfo>
      <StyledArrowIcon />
    </FirstRow>
    <DescriptionRow>
      {props.hack.description}
    </DescriptionRow>
  </HackathonListItemWrapper>;
};

export default HackathonListItem;
