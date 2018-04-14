import React  from 'react';
import styled from 'styled-components';


const cellSize=16;

const Wrapper=styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  cursor: pointer;
  user-select: none;
`;

const Content=styled.div`
  margin-left: 8px;
`;

const Check=styled.div`
  position: relative;
  cursor: pointer;
  width: ${cellSize}px;
  height: ${cellSize}px;
  border-radius: 4px;
  border: 1px solid #777;
  background-color: beige;
  box-shadow: inset 0 0 4px rgba(119,119,119,0.44);
  &:after{
    content: '';
    border-radius: 2px;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    position: absolute;
    top: 2px;
    left: 2px;
    transform: scale(${({ selected })=>selected ? 1 : 0});
    opacity: ${({ selected })=>selected ? 1 : 0};
    background-color: #ce63d1;
    transition: all 150ms ease-out;
  }
`;

export class CheckBox extends React.Component{
  constructor(props){
    super();
    this.state={
      selected: props.selected || false,
    };
  }

  onClick=()=>{
    const { onSelect }=this.props;
    this.setState(prevState=>{
      const selected=!prevState.selected;
      (selected && onSelect) && onSelect();
      return {
        selected
      };
    });
  };

  onReceiveSelectState=selected=>{
    (selected !== this.props.selected && selected !== this.state.selected) &&
    this.setState({
      selected
    });
  };

  componentWillReceiveProps=(nextProps)=>{
    const { selected }=nextProps;
    this.onReceiveSelectState(selected);
  };

  render(){
    const { className, children }=this.props;
    return (
      <Wrapper className={className} onClick={this.onClick}>
        <Check {...this.state}/>
        <Content>{children}</Content>
      </Wrapper>
    );
  }
}
