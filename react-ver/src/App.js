//import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <HomePage></HomePage>
  );
}

function HomePage() {
  return (
    <div id='spaHomePage' className='spaPage'>
      <h1>
        <span className='text-enter1'>FoodWheel</span>
      </h1>
      <p>
        <span className='text-enter2'>用轉盤解決你選擇下一餐的障礙</span>
      </p>
      <div>
        <button className='text-enter3 button blue-button'>請按我</button>
      </div>
    </div>
  );
}

export default App;
