import React from 'react';
import {Rectangle} from "../layout/Rectangle";
import {HackDetailsColumnsWrapper, HackFirstRow, HackSecondRow, HackThirdRow} from "./HackDetailsColumnStyles";

export interface IHackDetailsColumnProps {
    firstRowSlot: React.ReactNode;
    secondRowSlot: React.ReactNode;
    thirdRowSlot: React.ReactNode;
}

export const HackDetailsColumn: React.FC<IHackDetailsColumnProps> = (props) => {
    return (
        <HackDetailsColumnsWrapper>
            <HackFirstRow>{props.firstRowSlot}</HackFirstRow>
            <Rectangle height={30}/>
            <HackSecondRow>{props.secondRowSlot}</HackSecondRow>
            <Rectangle height={30}/>
            <HackThirdRow>{props.thirdRowSlot}</HackThirdRow>
        </HackDetailsColumnsWrapper>
    );
}