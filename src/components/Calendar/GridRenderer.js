import React  from 'react';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ru';


const cellWidth=32;
const cellHeight=32;
const monthToShow=2;
const holidays=[
  6,
  0
];
const isHoliday=weekDay=>holidays.includes(weekDay);
const getId=(elem, id)=>id;
const getIdPlus=(elem, id)=>++id;
const bubblesTop=value=>value === 0 ? 1 : 0;
const grid=Object.freeze({
  cols: new Array(7).fill(0).map(getId).sort(bubblesTop),
  rows: new Array(6).fill(0).map(getId),
});

const Wrapper=styled.div`
  margin-top: 16px;
  width: 100%;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Row=styled.div`
   width: ${grid.cols.length * cellWidth}px;
   display: flex;
   align-items: start;
`;

const Cell=styled.div`
  width: ${cellWidth}px;
  height: ${cellHeight}px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
  cursor: pointer;
  transition: all 150ms ease-out;
  &.in-range{
    background-color: #f5f5dc;
  }
  &.is-holiday{
    background-color: #deffe4;
  }
  &.selected{
    border-radius: 4px;
    background-color: #f2e3f5;
    color: #3c3b3e;
    font-weight: 700;
  }
  &:hover{
    background-color: #d6e3de;
    color: #ce63d1;
    border-radius: 4px;
  }
`;

export const GridRenderer=props=>{
  const { calendarMoment, range }=props;
  const daysInMonth=moment(calendarMoment).daysInMonth();
  const startWeekDay=moment(calendarMoment).date(1).day();
  const prevDays=new Array((startWeekDay || grid.cols.length) - 1).fill(null);
  const days=[
    ...prevDays,
    ...new Array(daysInMonth).fill(0).map(getIdPlus)
  ].reverse();

  const onClick=day=>{
    const { onDatePick }=props;
    const date=moment(calendarMoment).date(day).valueOf();
    onDatePick && onDatePick(date);
  };

  const getClassName=day=>{
    const holidays=[0,6];
    const date=moment(calendarMoment).date(day).valueOf();
    const weekDay=moment(calendarMoment).date(day).day();
    const selected=date === range[0] || (range.length === 2 && date === range[1]);
    const inRange=range.length === 2 && (date >= range[0] && date <= range[1]);
    const isHoliday=holidays.includes(weekDay);
    const classList=[];
    selected && classList.push(`selected`);
    inRange && classList.push(`in-range`);
    return [
      ...selected && [`selected`],
      ...inRange && [`in-range`],
      ...isHoliday && [`is-holiday`]
    ].reduce((acc, cur, id)=>acc.concat(id===1?` `:``).concat(cur),``);
  };

  return (
    <Wrapper>
      {
        grid.rows.map(row=>(
          <Row key={row}>
            {
              grid.cols.map(col=>{
                const day=days.pop();
                return (
                  <Cell
                    key={col}
                    className={day && getClassName(day)}
                    onClick={()=>day && onClick(day)}
                  >
                    {day}
                  </Cell>
                );
              })
            }
          </Row>
        ))
      }
    </Wrapper>
  );
};