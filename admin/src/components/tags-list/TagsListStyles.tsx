import styled from "styled-components";

export const TagsListItem = styled.div`
  //background-color: #FF0099;
  background: linear-gradient(to right, #FF0099, #FF003D);
  border-radius: 38px;
  height: 20px;
  padding: 5px;
  min-width: 40px;
  text-align: center;
  
  color: rgba(255, 255, 255, 0.89);
  font-family: Roboto, sans-serif;
  font-size: 12px;
  line-height: 14px;
`

export const TagsListContainer = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: flex-start;
  //padding: 15px;
  padding: 10px 0;
  gap: 15px;

  width: 100%;
`;