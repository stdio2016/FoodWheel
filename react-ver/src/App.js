//import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  var [page, setPage] = useState(1);
  return (
    <>
      <HomePage show={page===1} start={()=>setPage(2)}></HomePage>
      <SelectPage show={page===2} helpselect={()=>setPage(3)}></SelectPage>
      <h1 style={{textAlign:'center'}} hidden={page!==3}>TODO</h1>
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
  return (
    <div id='spaSelect' class='spaPage' hidden={!show}>
      <p>你想去哪吃？</p>
      <div id='eatAtWhere'>
        <button>公館</button>
        <button>118巷</button>
      </div>
      <p>你想吃什麼？</p>
      <div id='eatWhat'>
        <button>不知道</button>
        <button>雞</button>
        <button>豬</button>
        <button>牛</button>
        <button>飯</button>
        <button>麵</button>
        <button>水餃</button>
        <button>中式</button>
        <button>西式</button>
        <button>日式</button>
      </div>
      <p>有什麼需求嗎？</p>
      <div id='eatRequire'>
        <button>要吃土了</button>
        <button>不吃雞</button>
        <button>不吃豬</button>
        <button>不吃牛</button>
        <button>我怕辣</button>
      </div>
      <p>
        <button class='blue-button' onClick={helpselect}>繼續</button>
      </p>
    </div>
  );
}

export default App;
