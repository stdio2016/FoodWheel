//import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import { ToggleButtonList } from './ToggleButton';
import { Roulette } from './Roulette';

function App() {
  var [page, setPage] = useState({page:1});
  function helpselect(form) {
    setPage({page: 3, form: form});
  }
  function handleGetRestaurant(result) {
    setPage({page: 4, result: result, disabled: {}});
  }
  function backToSelect() {
    setPage({page:2});
  }
  function changeResult(result, disabled) {
    setPage({page: 4, result: result, disabled: disabled});
  }
  return (
    <>
      <HomePage show={page.page===1} start={()=>setPage({page:2})} />
      <SelectPage show={page.page===2} helpselect={helpselect} />
      <RecommendingPage show={page.page===3} form={page.form} handleGetRestaurant={handleGetRestaurant}/>
      <WheelPage show={page.page===4} result={page.result} disabled={page.disabled} changeResult={changeResult} backToSelect={backToSelect}/>
    </>
  );
}

function HomePage({show, start}) {
  return (
    <div id='spaHomePage' className='spaPage' hidden={!show}>
      <h1>
        <span className='text-enter1'>FoodWheel</span>
      </h1>
      <p>
        <span className='text-enter2'>用轉盤解決你選擇下一餐的障礙</span>
      </p>
      <div>
        <button
          className='text-enter3 button blue-button'
          onClick={start}>請按我</button>
      </div>
    </div>
  );
}

function SelectPage({show, helpselect}) {
  var [whereToEat, setWhereToEat] = useState([]);
  var [whatToEat, setWhatToEat] = useState([]);
  var [requirements, setRequirements] = useState([]);
  function sendFormHelper() {
    if (whereToEat.length === 0) {
      alert('請選擇至少一個地點');
      return ;
    }
    helpselect({
      whereToEat: whereToEat,
      whatToEat: whatToEat,
      requirements: requirements
    });
  }
  return (
    <div id='spaSelect' className='spaPage' hidden={!show}>
      <p>你想去哪吃？</p>
      <ToggleButtonList
        select={whereToEat}
        list={['公館','118巷']}
        onChange={setWhereToEat}
      />
      <p>你想吃什麼？</p>
      <ToggleButtonList
        select={whatToEat}
        list={['不知道', '雞','豬','牛','飯','麵','水餃','中式','西式','日式']}
        onChange={setWhatToEat}
      />
      <p>有什麼需求嗎？</p>
      <ToggleButtonList
        select={requirements}
        list={['要吃土了','不吃雞','不吃豬','不吃牛','我怕辣']}
        onChange={setRequirements}
      />
      <p>
        <button className='blue-button' onClick={sendFormHelper}>繼續</button>
      </p>
    </div>
  );
}

function RecommendingPage({show, form, handleGetRestaurant}) {
  useEffect(() => {
    if (!show) return;
    console.log('submit form', form);
    fakeRecommender(form, handleGetRestaurant);
  });
  return (
    <div id='spaRecommending' className='spaPage' hidden={!show} style={{marginTop: '100px', textAlign:'center'}}>
      <p>請稍候，系統正在尋找適合的餐廳...</p>
      <div>
        <svg height={50} width={50}>
          <path fill='green' className='rotating' style={{transformOrigin:'25px 25px'}} d='M25 0A25 25 180 0 1 25 50L25 45A20 20 180 0 0 25 5Z'/>
        </svg>
      </div>
    </div>
  );
}

function fakeRecommender(form, callback) {
  var result = [
    {id: '1', name: '餐廳1'},
    {id: '2', name: '餐廳2'},
    {id: '3', name: '這家餐廳的名稱非常的長'},
  ];
  setTimeout(() => callback(result), 1000);
}

function WheelPage({show, result, disabled, backToSelect, changeResult}) {
  return (
    <div id='spaWheel' className='spaPage' hidden={!show} style={{textAlign:'center'}}>
      <p>已為你找到以下幾間餐廳，按下「給我轉」，系統就會隨機選擇。如果有你不喜歡的餐廳，可以按下轉盤上的餐廳名稱，將其停用</p>
      <Roulette
        list={show ? result : []}
        disabled={disabled}
        onToggle={id => {
          changeResult(result, {...disabled, [id]:!disabled[id]})
        }}
      />
      <p id='outcome'>測試中：{JSON.stringify(result)}</p>
      <div id='backButton'>
        <button type="button" className='red-button' onClick={backToSelect}>返回重填</button>
      </div>
    </div>
  );
}

export default App;
