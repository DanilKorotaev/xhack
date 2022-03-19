import styled from "styled-components";
import {Link} from "react-router-dom";

export const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export const UserListItemWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: stretch;

  width: 500px;
  height: 125px;
`;

export const UserWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-content: flex-start;
  
  width: 100%;
  height: 100%;
  
  color: white;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 300;

  padding-left: 15px;
`;

export const UserName = styled.h2`
  font-size: 24px;
  line-height: 28px;
`;

export const UserSpecialization = styled.div`
  font-size: 13px;
  line-height: 15px;

  margin-bottom: 10px;
`;

export const UserLink = styled(Link)`
    text-decoration: none;
    color: white;
    :hover {
      text-decoration: underline;
    }
`;