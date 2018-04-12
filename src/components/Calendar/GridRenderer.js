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
  &:hover{
    background-color: #d6e3de;
  }
`;

export const GridRenderer=props=>{
  const { calendarMoment, range }=props;
  const daysInMonth=moment(calendarMoment).daysInMonth();
  const startWeekDay=moment(calendarMoment).date(1).day();
  const prevDays=new Array((grid.cols.length - 1) - startWeekDay).fill(null);
  const days=[
    ...prevDays,
    ...new Array(daysInMonth).fill(0).map(getIdPlus)
  ].reverse();
  const onClick=day=>{
    const { onDatePick }=props;
    const date=moment(calendarMoment).date(day).valueOf();
    onDatePick && onDatePick(date);
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