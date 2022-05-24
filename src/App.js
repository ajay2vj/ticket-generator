import './App.css';
import ButtonBox from './Components/buttonBox';
import { CloseSquareFilled, DeleteOutlined, PlusSquareOutlined } from "@ant-design/icons"
import Button from './Components/Button';
import { useEffect, useState } from 'react';
import Screen from './Components/screen';
import { Col, Row } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wheel from './assets/img/wheel.png';

function App() {
  const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");
  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  })
  const handleNum = (e) => {
    e.preventDefault();
    if(calcValue.length < 5){
      const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
    }else{
      toast.error("Ticket Limit Reached");
    }
  }
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };
  const [calcValue, setCalvalue] = useState([])
  const [error, setError] = useState(false)
  const addTicket = ()=>{
    const newElement = Array.from(calc.num)
    setCalvalue(oldArray =>[...oldArray, newElement])
    
  }
  const removeItem = (id) => {
    const data = calcValue.map((item, idx)=>({
      id: idx,
      item: item
    }))
    const newPeople = data.filter((person) => person.id !== id);
    setCalvalue(newPeople?.map(item=> item.item));
  }
  const textLength = calc.num?.toString()?.length > 6;
  useEffect(()=>{
    if(textLength){
      setError(true)
    }else{
      setError(false)
    }
  })
  function getRndInteger(min, max) {
    const random = Math.floor(Math.random() * (max - min)) + min;
    const newElement = Array.from(random.toString())
    setCalvalue(oldArray =>[...oldArray, newElement])
  }
  return (
    <Row>
      <ToastContainer />
      <Col span={14} offset = {5}>
      <div className="wrapper">
        <div className='grid-class'>
        <div style={{width: '300px'}}>
          <Screen 
            value={calc.num ? calc.num : calc.res}
            error={error}
            disabled={calcValue?.length}
          />
          <ButtonBox>
            <Button
              value="7"
              onClick={(e) => {
                handleNum(e)
              }}
            />
            <Button
              value={`8`}
              onClick={(e) => {
                handleNum(e)
              }}
            />
            <Button
              value={`9`}
              onClick={(e) => {
                handleNum(e)
              }}
            />
            <Button
              value={`4`}
              onClick={(e) => {
                handleNum(e)
              }}
            />
            <Button
              value={`5`}
              onClick={(e) => {
                handleNum(e)
              }}
            />
            <Button
              value={`6`}
              onClick={(e) => {
                handleNum(e)
              }}
            />
            <Button
              value={`1`}
              onClick={(e) => {
                handleNum(e)
              }}
            />
            <Button
              value={`2`}
              onClick={(e) => {
                handleNum(e)
              }}
            />
            <Button
              value={`3`}
              onClick={(e) => {
                handleNum(e)
              }}
            />
            <Button
              value={<CloseSquareFilled />}
              onClick={() => {
                resetClickHandler()
              }}
            />
            <Button
              value={`0`}
              onClick={(e) => {
                handleNum(e)
              }}
            />
            <Button
              value={<DeleteOutlined style={{color: '#f00'}}/>}
              onClick={() => {}}
            />
            <button className="item-button" onClick={addTicket} disabled={textLength || calcValue.length > 4 ? true : false}>
              <PlusSquareOutlined style={{fontSize: '13px'}}/>&nbsp;ADD TICKET
            </button>
          </ButtonBox>
          </div>
          <div className='wheel-box'>
            <p>Click the wheel to generate randome tickets</p>
            <img src={Wheel} alt='wheel img'/>
            <div className='button-text'>
            <button 
              onClick={()=>getRndInteger(100000,999999)}
              disabled={calcValue.length > 4 ? true : false}
            >
              Ticket number range: 100000-999999
            </button>
            </div>
          </div>
          </div>
          <h3 className='h3tag'>Your Selected Tickets :</h3>
          <div className='selected-ticket'>
              {calcValue?.map((item, idx)=>(
                <div key={idx} className='content'>
                  <p style={{marginBottom: '0px'}}>{`Ticket #${idx}`}</p>
                  <span className='span'>{item}</span>
                  <DeleteOutlined 
                    style={{color: '#f00'}} 
                    className='delete-icon'
                    onClick={()=>removeItem(idx)}
                  />
                </div>
              ))}
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default App;
