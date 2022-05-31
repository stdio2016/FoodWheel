function initRoulette(list, sectors) {
  var n = list.length;
  var angle=360/n;
  var c_x = 160, c_y = 160;
  var r_mid = 60;
  var r_big = 140;
  var disabled = [];
  while (sectors.children.length) {
    sectors.lastChild.remove();
  }
  for (var i = 0; i < n; i++) {
    var elt = document.createElementNS('http://www.w3.org/2000/svg', 'path');
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
    if (n == 1) {
      // special case when wheel consists of only one item
      elt.setAttribute('d',
        'M'+bx+' '+by+
        'A'+r_big+' '+r_big+' 180 0 1 '+(c_x + r_big)+' '+cy+
        'A'+r_big+' '+r_big+' 180 0 1 '+cx+' '+cy+
        'L'+dx+' '+dy+
        'A'+r_mid+' '+r_mid+' 180 0 0 '+(c_x + r_mid)+' '+cy+
        'A'+r_mid+' '+r_mid+' 180 0 0 '+ax+' '+ay+'Z');
    }
    else {
      elt.setAttribute('d',
        'M'+bx+' '+by+
        'A'+r_big+' '+r_big+' '+angle+' 0 1 '+cx+' '+cy+
        'L'+dx+' '+dy+
        'A'+r_mid+' '+r_mid+' '+angle+' 0 0 '+ax+' '+ay+'Z');
    }
    elt.setAttribute('fill', 'hsl('+Math.floor(i*360/n)+',80%,70%)');
    var txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    txt.setAttribute('x', (r_big+r_mid)/2 + c_x);
    txt.setAttribute('y', 0 + c_y + 5);
    txt.textContent = list[i].name;
    var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.style.transform = 'rotate('+((i+0.5)*360/n-90)+'deg)';
    g.style.transformOrigin = c_x+'px '+c_y+'px';
    g.enabled = true;
    g.index = i;
    g.onclick = function () {
      var g = this;
      g.enabled = !g.enabled;
      if (g.enabled) {
        g.children[0].setAttribute('fill', 'hsl('+Math.floor(g.index*360/n)+',80%,70%)');
      }
      else {
        g.children[0].setAttribute('fill', 'gray');
      }
    };
    g.itemName = list[i].name;
    g.itemId = list[i].id;
    g.appendChild(elt);
    g.appendChild(txt);
    sectors.appendChild(g);
    disabled.push(false);
  }
  sectors.style.transform = '';
  sectors.lastAngle = 0;
  sectors.rolling = false;
}

function roll() {
  var n = sectors.children.length;
  if (sectors.rolling) return;
  for (var i = 0; i < n; i++) {
    if (sectors.children[i].enabled) {
      break;
    }
  }
  if (i == n) {
    alert('請至少選擇一項');
    return ;
  }
  sectors.rolling = true;
  var r = 0;
  var ans = 0;
  var newAngle = 0;
  // don't choose disabled one
  do {
    r = Math.random();
    newAngle = (r*720 + 1440 + sectors.lastAngle);
    ans = Math.floor(n-newAngle%360/360*n) % n;
  } while (!sectors.children[ans].enabled) ;

  sectors.animate([ { transform: 'rotate('+sectors.lastAngle+'deg)', easing: 'cubic-bezier(.08,0,.7,1)' },
                    { transform: 'rotate('+newAngle+'deg)' }],
                  2000 + r*500);
  sectors.lastAngle = newAngle % 360;
  sectors.style.transform = 'rotate('+sectors.lastAngle+'deg)';
  setTimeout(function () {
    sectors.rolling = false;
    var ans = Math.floor(n-sectors.lastAngle/360*n) % n;
    rollTo(sectors.children[ans].itemName);
    var xhr = new XMLHttpRequest();
    var cnt = 0;
    var disables = [];
    var enables = [];
    for (var i = 0; i < n; i++) {
      if (!sectors.children[i].enabled) {
        disables.push(sectors.children[i].itemId);
      }
      else {
        enables.push(sectors.children[i].itemId);
      }
    }
    xhr.open('POST', 'api/wheelresult');
    xhr.send(JSON.stringify({
      result: sectors.children[ans].itemId,
      disable: disables,
      enable: enables
    }));
  }, 2000 + r*500);
};
