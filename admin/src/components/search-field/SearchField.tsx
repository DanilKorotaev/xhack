import React from 'react';
import {StyledSearchField, StyledSearchFieldWrapper, StyledSearchIcon} from "./SearchFieldStyles";

export interface ISearchFieldProps {
    className?: string;
    value?: string;
    onChangeCallback?(e: any): void;
}

export const SearchField: React.FC<ISearchFieldProps> = (props) => {
    function onChangeHandler(e: any) {
        if (props.onChangeCallback !== undefined)
            props.onChangeCallback(e.target.value);
    }

    return (
        <StyledSearchFieldWrapper className={props.className}>
            <StyledSearchIcon/>
            <StyledSearchField value={props.value} onChange={onChangeHandler}/>
        </StyledSearchFieldWrapper>
    );
};

export default SearchField;
