import React            from 'react';
import styled           from 'styled-components';
import moment           from 'moment';
import 'moment/locale/ru';
import { GridRenderer } from './GridRenderer';


const Wrapper=styled.div`
   width: 264px;
   font-size: 12px;
   padding: 16px;
   background-color: #fff;
   border-radius: 4px;
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
   user-select: none;
`;

const CalendarDate=styled.div`
  font-size: 14px;
  margin: 8px 2px;
  &:first-letter{
    text-transform: uppercase;
  }
  &.year-selector{
    width: 32px;
  }
`;

const Flex=styled.div`
  display: flex;
  justify-content: ${({ center })=>center ? `center` : `space-between`};
  align-items: center;
`;

const Icon=styled.div`
  width: 16px;
  height: 16px;
  cursor: pointer;
  position: relative;
  &:after{
    border: 2px solid #777;
    border-bottom-color: transparent;
    border-left-color: transparent;
    width: 50%;
    height: 50%;
    content: '';
    top: 2px;
    left: 2px;
    position: absolute;
    display: block;
    transform: rotate(${({ left })=>left ? -135 : 45}deg);
    pointer-events: none;
  }
`;
const getMoment=(date)=>moment(date).valueOf();
const getMonth=date=>moment(date).month();
const getYear=date=>moment(date).year();
const setMonthOffset=(date, offset)=>moment(date).month(getMonth(date) + offset);
const setYearOffset=(date, offset)=>moment(date).year(getYear(date) + offset);
const getTitleFormat=date=>moment(date).format(`MMMM YYYY`);
const getTitleYear=date=>moment(date).format(`YYYY`);

export class Calendar extends React.Component{
  constructor(){
    super();
    const calendarMoment=getMoment();
    this.state={
      calendarMoment,
      range: [],
    };
  }

  changeMonth=offset=>this.setState(({ calendarMoment })=>{
    return {
      calendarMoment: setMonthOffset(calendarMoment, offset).valueOf(),
      nextMoment: setMonthOffset(calendarMoment, offset + 1).valueOf()
    };
  });

  changeYear=offset=>this.setState(({ calendarMoment })=>{
    return {
      calendarMoment: setYearOffset(calendarMoment, offset).valueOf()
    };
  });

  onYearIncrease=()=>this.changeYear(1);

  onYearDecrease=()=>this.changeYear(-1);

  onMonthIncrease=()=>this.changeMonth(1);

  onMonthDecrease=()=>this.changeMonth(-1);

  getSortedRange=()=>{
    const minToTop=(a, b)=>a > b ? 1 : 0;
    return [...this.state.range].sort(minToTop);
  };

  onDatePick=(date)=>{
    const updater=prevState=>({
      range: [
        date,
        ...prevState.range,
      ].slice(0, 1)
    });
    this.setState(updater);
  };

  render(){
    const { range, calendarMoment }=this.state;
    console.log(moment(this.getSortedRange()[0]).date(), moment(this.getSortedRange()[1]).date());
    console.log(moment(range[0]).date(), moment(range[1]).date(), range);
    return (
      <Wrapper>
        <Flex center>
          <Icon onClick={this.onYearDecrease} left/>
          <CalendarDate className={`year-selector`}>{getTitleYear(calendarMoment)}</CalendarDate>
          <Icon onClick={this.onYearIncrease}/>
        </Flex>
        <Flex>
          <Icon onClick={this.onMonthDecrease} left/>
          <CalendarDate>{getTitleFormat(calendarMoment)}</CalendarDate>
          <Icon onClick={this.onMonthIncrease}/>
        </Flex>
        <div>{getTitleFormat(calendarMoment)}</div>
        <div>{getTitleFormat(setMonthOffset(calendarMoment, 1))}</div>
        <GridRenderer
          calendarMoment={calendarMoment}
          range={range}
          onDatePick={this.onDatePick}
        />
      </Wrapper>
    );
  }
}