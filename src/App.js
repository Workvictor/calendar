import React  from 'react';
import styled from 'styled-components';
import {
  Calendar,
  calendarTypes,
  CheckBox
}             from './components';


const Flex=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChecksWrapper=styled(Flex)`
  margin-bottom: 16px;
`;

const StyledCheckBox=styled(CheckBox)`
  margin: 0 8px;
`;
const Wrapper=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: fixed;
`;

export class App extends React.Component{
  constructor(){
    super();
    this.state={
      selected: calendarTypes.datePicker
    };
  }

  onDatePickerSelected=()=>{
    this.setState({ selected: calendarTypes.datePicker });
  };
  onRangePickerSelected=()=>{
    this.setState({ selected: calendarTypes.rangePicker });
  };
  onTimePickerSelected=()=>{
    this.setState({ selected: calendarTypes.timePicker });
  };

  render(){
    const { className }=this.props;
    const { selected }=this.state;
    return (
      <Wrapper className={className}>
        <ChecksWrapper>
          <StyledCheckBox selected={selected === calendarTypes.datePicker} onSelect={this.onDatePickerSelected}>
            date picker
          </StyledCheckBox>
          <StyledCheckBox selected={selected === calendarTypes.rangePicker} onSelect={this.onRangePickerSelected}>
            range picker
          </StyledCheckBox>
          <StyledCheckBox selected={selected === calendarTypes.timePicker} onSelect={this.onTimePickerSelected}>
            time picker
          </StyledCheckBox>
        </ChecksWrapper>
        <Calendar
          calendarType={selected}
        />
      </Wrapper>
    );
  }
}