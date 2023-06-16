//import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import { ToggleButtonList } from './ToggleButton';

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
  var [whereToEat, setWhereToEat] = useState();
  var [whatToEat, setWhatToEat] = useState();
  var [requirements, setRequirements] = useState();
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
        list={['雞','豬','牛','飯','麵','水餃','中式','西式','日式']}
        onChange={setWhatToEat}
      />
      <p>有什麼需求嗎？</p>
      <ToggleButtonList
        select={requirements}
        list={['要吃土了','不吃雞','不吃豬','不吃牛','我怕辣']}
        onChange={setRequirements}
      />
      <p>
        <button className='blue-button' onClick={helpselect}>繼續</button>
      </p>
    </div>
  );
}

export default App;
