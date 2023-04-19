import styled, { css } from "styled-components";

export const Container = styled.div`
  margin: 0px auto;
 
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 10rem;
`;

export const BarChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background-color:#F0F0F0;
  position:relative;
`;

export const Chart = css`
  margin-top: 10px;
  width: 9px;

  border-radius:50px 50px 0px 0px;
  &:hover {
    opacity: 0.8;
  }

`;

export const Number = styled.span`
  font-size: 0.6rem;
  font-weight:500;
  position:absolute;
  bottom:-1rem;

  text-align: center;
  color:#185C66 ;
`;

export const MakeBar = styled.div`
  height: ${(props) => props.height}%;
  background-image: linear-gradient(
    to bottom,
    ${(props) => props.colors[0]},
    ${(props) => props.colors[1]}
  );
  ${Chart};
`;

export const BlackLine = styled.div`

`;
