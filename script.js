//config
var clockSize = 30;
var clockColor = "#DDDDDD";
var armColor = "black";

var canvas = document.getElementById("cnv");
canvas.width = innerWidth;
canvas.height = innerHeight;
var c = canvas.getContext('2d');
if(clockSize*28>innerHeight)
{
  clockSize = parseInt(innerHeight/29);
}
c.fillStyle = "white";

var d;
var digits = ["0","0","0","0"];

function Clock(id,x,y,nr)
{
  this.id = id;
  this.x = x;
  this.y = y;
  this.arm1 = 0;
  this.arm2 = 0;
  this.number = nr;

  this.update = function()
  {
    if(this.arm1 != numbers[digits[this.number]][this.id][0])
    {
      this.arm1++;
      if(this.arm1 > 359){this.arm1 = 0;}
    }
    if(this.arm2 != numbers[digits[this.number]][this.id][1])
    {
      this.arm2--;
      if(this.arm2 < 0){this.arm2 = 359;}
    }
  }

  this.draw = function()
  {
    c.lineWidth = 3;
    c.strokeStyle = "#999999";
    c.beginPath();
    c.arc(this.x+2,this.y+2,clockSize,0,Math.PI*2);
    c.stroke();
    c.lineWidth = 3;
    c.strokeStyle = armColor;
    c.beginPath();
    c.lineWidth = 4;
    c.moveTo(this.x,this.y);
    c.lineTo(this.x+Math.cos(this.arm1/180*Math.PI)*clockSize,this.y+Math.sin(this.arm1/180*Math.PI)*clockSize);
    c.stroke();
    c.beginPath();
    c.moveTo(this.x,this.y);
    c.lineTo(this.x+Math.cos(this.arm2/180*Math.PI)*clockSize,this.y+Math.sin(this.arm2/180*Math.PI)*clockSize);
    c.stroke();
    c.strokeStyle = clockColor;
    c.beginPath();
    c.arc(this.x,this.y,clockSize,0,Math.PI*2);
    c.stroke();
  }
}

var clocks = [];


function init()
{
  var xPush = innerWidth/2-(clockSize*2+6)*4;
  var yPush = 40;
  for(let i=0;i<6;i++)
  {
    for(let j=0;j<4;j++)
    {
      let x = j*(clockSize+2)*2+clockSize+xPush;
      let y = i*(clockSize+2)*2+clockSize+yPush;
      let id = i+""+j;
      clocks.push(new Clock(id,x,y,0));
    }
  }
  for(let i=0;i<6;i++)
  {
    for(let j=0;j<4;j++)
    {
      let x = j*(clockSize+2)*2+clockSize+(clockSize+2)*8+xPush;
      let y = i*(clockSize+2)*2+clockSize+yPush;
      let id = i+""+j;
      clocks.push(new Clock(id,x,y,1));
    }
  }
  for(let i=0;i<6;i++)
  {
    for(let j=0;j<4;j++)
    {
      let x = j*(clockSize+2)*2+clockSize+xPush;
      let y = i*(clockSize+2)*2+clockSize+(clockSize+2)*12+yPush;
      let id = i+""+j;
      clocks.push(new Clock(id,x,y,2));
    }
  }
  for(let i=0;i<6;i++)
  {
    for(let j=0;j<4;j++)
    {
      let x = j*(clockSize+2)*2+clockSize+(clockSize+2)*8+xPush;
      let y = i*(clockSize+2)*2+clockSize+(clockSize+2)*12+yPush;
      let id = i+""+j;
      clocks.push(new Clock(id,x,y,3));
    }
  }
}
init();

function animate()
{
  c.fillStyle = "#666666";
  c.clearRect(0,0,canvas.width,canvas.height);
  d = new Date();
  let th = d.getHours()
  let tm = d.getMinutes();
  if(th < 10){th = "0"+th;}
  if(tm < 10){tm = "0"+tm;}
  let t = th+""+tm;
  digits[0] = t[0];
  digits[1] = t[1];
  digits[2] = t[2];
  digits[3] = t[3];
  for(let i=0;i<clocks.length;i++)
  {
    clocks[i].update();
    clocks[i].draw();
  }
  window.requestAnimationFrame(animate);
}
animate();
