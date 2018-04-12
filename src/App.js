import React        from 'react';
import styled       from 'styled-components';
import { Calendar } from './components';


const Wrapper=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: fixed;
`;

export class App extends React.Component{
  render(){
    return (
      <Wrapper>
        <Calendar

        />
      </Wrapper>
    );
  }
}