import React, { useEffect } from "react";

export function Roulette({list, disabled, onToggle}) {
  var sectors = list.map((item, i) => 
    <RouletteItem
      key={item.id}
      n={list.length}
      i={i}
      text={item.name}
      onClick={()=>{onToggle(item.id)}}
      disabled={disabled[item.id]}
    />
  );
  return (
    <svg viewBox='0 0 320 300'>
      <g id='sectors'>{sectors}
      </g>
      <g onClick={()=>{}}>
        <circle cx='160' cy='160' r='40' fill='silver'/>
        <text x='160' y='165'>給我轉！</text>
      </g>
      <path d='M160 20l-8-15h16Z' />
    </svg>
  );
}

function RouletteItem({n, i, text, onClick, disabled}) {
  var angle=360/n;
  var c_x = 160, c_y = 160;
  var r_mid = 60;
  var r_big = 140;
  var text_width = r_big - r_mid;
  var theta = Math.PI * 2 / n * -0.5;
  var ax = Math.cos(theta) * r_mid + c_x;
  var ay = Math.sin(theta) * r_mid + c_y;
  var bx = Math.cos(theta) * r_big + c_x;
  var by = Math.sin(theta) * r_big + c_y;
  theta = Math.PI * 2 / n * 0.5;
  var cx = Math.cos(theta) * r_big + c_x;
  var cy = Math.sin(theta) * r_big + c_y;
  var dx = Math.cos(theta) * r_mid + c_x;
  var dy = Math.sin(theta) * r_mid + c_y;
  var d = '';
  if (n === 1) {
    // special case when wheel consists of only one item
    d =
      'M'+bx+' '+by+
      'A'+r_big+' '+r_big+' 180 0 1 '+(c_x + r_big)+' '+cy+
      'A'+r_big+' '+r_big+' 180 0 1 '+cx+' '+cy+
      'L'+dx+' '+dy+
      'A'+r_mid+' '+r_mid+' 180 0 0 '+(c_x + r_mid)+' '+cy+
      'A'+r_mid+' '+r_mid+' 180 0 0 '+ax+' '+ay+'Z';
  }
  else {
    d =
      'M'+bx+' '+by+
      'A'+r_big+' '+r_big+' '+angle+' 0 1 '+cx+' '+cy+
      'L'+dx+' '+dy+
      'A'+r_mid+' '+r_mid+' '+angle+' 0 0 '+ax+' '+ay+'Z';
  }
  var transform = `rotate(${(i+0.5)*360/n-90}deg)`;
  var transformOrigin = `${c_x}px ${c_y}px`;
  var textRef = React.createRef();
  useEffect(() => {
    var textElt = textRef.current;
    textElt.style.fontSize = '16.0px';
    var w = textElt.getBBox().width;
    if (w > text_width) {
      textElt.style.fontSize = `${16*text_width/w}px`;
    }
  });
  return (
    <g style={{transform, transformOrigin}} onClick={onClick}>
      <path
        d={d}
        fill={disabled ? 'gray' : `hsl(${Math.floor(i*360/n)},80%,70%)`}
      />
      <text
        x={(r_big+r_mid)/2 + c_x}
        y={c_y + 5}
        ref={textRef}
        style={{fontSize:'16px'}}>{text}</text>
    </g>
  );
}
