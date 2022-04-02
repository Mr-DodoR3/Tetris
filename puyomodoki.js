var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

const width = 600,height = 600;

var scene = "title";

var titleMove_X = 0,titleMove_Y = -1;

var nowSelectButton = 0;

var flameColor = 0;
var flameTimes = 1;

var timer = 0,delta = 0;
var score = 0;

var x = 4,y = 0;
const colordata = new Array("#FF0000","#00FF00","#0000FF");
var nowcolor = 0;

var blockarray = new Array();//10*18

function test()
{
  ctx.beginPath();
  ctx.clearRect(0,0,width,height);
  ctx.rect(x, 20, 20, 20);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
  x++;
}

function setup()
{
  for (let i = 0;i < 18;i++)
  {
    let temp = new Array(10).fill(-1);
    blockarray.push(temp);
  }
  console.log(blockarray);
}

function main()
{
  //ctx.beginPath();
  ctx.clearRect(0,0,width,height);
  switch(scene)
  {
    case "title":
      title();
      break;
    case "game":
      game();
      break;
    default:
      break;
  }
  //ctx.closePath();
}


function title()
{
  titleDesign();
}

function titleDesign()
{
  for (let i = 0;i < 13;i++)
  {
    for (let j = -1;j < 12;j++)
    {
      ctx.beginPath();
      ctx.rect(j * 50 + titleMove_X,i * 50 + titleMove_Y,50,50);
      if (((i + j) % 2) == 0)
      {
        ctx.fillStyle = "#DD9999";
      }
      else
      {
        ctx.fillStyle = "#DDDD99";
      }
      ctx.fill();
      ctx.closePath();
    }
  }
  if (((titleMove_X + titleMove_Y) % 2) == -1)
  {
    titleMove_X += 1;
  }
  else
  {
    titleMove_Y -= 1;
  }
  if (titleMove_X >= 50)
  {
    titleMove_X = 0,titleMove_Y = 0;
  }

  ctx.fillStyle = "#EEEE33";
  ctx.strokeStyle = "#EE3333";
  ctx.lineWidth = 4;
  ctx.font = "64px arial black";
  ctx.textAlign = "center";
  ctx.fillText("niahC elcrC",width / 2,height / 2 - 128);
  ctx.strokeText("Crcle Chain",width / 2,height / 2 - 128);

  ctx.font = "32px arial black";
  buttonLineWidth(0,64);
  ctx.strokeText("Game Start",width / 2,height / 2 + 64);

  buttonLineWidth(1,128);
  ctx.lineWidth = 2;
  ctx.strokeText("Option",width / 2,height / 2 + 128);
}

function buttonLineWidth(button,y)
{
  if (nowSelectButton == button)
  {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#EE3333";
    ctx.strokeRect(width / 2 - 140,height / 2 + (y-32),280,40);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#EEEE33";
    ctx.strokeRect(width / 2 - 140,height / 2 + (y-32),280,40);
  }
  else
  {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#EE3333";
    ctx.strokeRect(width / 2 - 140,height / 2 + (y-32),280,40);
  }
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#EE3333";
}

function temp(text)
{
  let textAnser = "";
  for (let i = text.length -1;i > -1;i--)
  {
    console.log(i,"  /  ",text[i]);
    textAnser += text[i];
  }
  return textAnser;
}


function game()
{
  gamewindow();
  clock();
  nowBlock();
  drawBlock();
}

function gamewindow()
{
  for (let i = 0;i < flameColor;i++)
  {
    ctx.beginPath();
    ctx.rect(0,(20 + (flameColor - 1) * 10) - i * 10,width,10);
    let R = i * 8;
    if ((R + flameColor) > 255)
    {
      ctx.fillStyle = `rgb(${Math.abs(R - flameColor)},${255},0)`;
    }
    else
    {
      ctx.fillStyle = `rgb(${R + flameColor},${255},0)`;
    }
    ctx.fill();
    ctx.closePath();
  }
  for (let i = 0;i < (56 - flameColor);i++)
  {
    ctx.beginPath();
    ctx.rect(0,(20 + 10 * flameColor) + i * 10,width,10);
    let R = i * 8;
    if ((R + flameColor) > 255)
    {
      ctx.fillStyle = `rgb(${Math.abs(R - flameColor)},${255},0)`;
    }
    else
    {
      ctx.fillStyle = `rgb(${R + flameColor},${255},0)`;
    }
    ctx.fill();
    ctx.closePath();
  }
  if ((flameColor < 57 && flameTimes > 0) || (flameColor > 0 && flameTimes < 0))
  {
    flameColor += flameTimes;
  }
  else
  {
    flameTimes *= -1;
  }

  ctx.beginPath();
  let flameWidth = 5;
  ctx.rect(0,0,150 - flameWidth,height);
  ctx.rect(450 + flameWidth,0,150 - flameWidth,height);
  ctx.rect(0,0,600,30 - flameWidth);
  ctx.rect(0,570 + flameWidth,600,30 - flameWidth);
  ctx.fillStyle = "#DD9999";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(150,30,300,540);
  ctx.fillStyle = "#000033";
  ctx.fill();
  ctx.closePath();

  statusWindow();
}

function statusWindow()
{
  ctx.fillStyle = "#EEEE33";
  ctx.strokeStyle = "#FF0000";
  ctx.lineWidth = 1;
  ctx.font = "20px arial black";
  ctx.textAlign = "left";
  statusText("Score",50);
  statusText("Time",120);
  //console.log(timer);
  let timeText = Math.floor(timer * 100) / 100;
  statusText(timeText,145);
}

function statusText(textData,yPos)
{
  ctx.fillText(textData,465,yPos);
  ctx.strokeText(textData,465,yPos);
}

function nowBlock()
{
  ctx.beginPath();
  ctx.arc(165 + 30 * x,45 + 30 * y,15,0 * Math.PI / 180,360 * Math.PI / 180,false);
  ctx.fillStyle = colordata[0];
  ctx.fill();
  ctx.closePath();
}

function drawBlock()
{
  for (let i = 0;i < 18;i++)
  {
    for (let j = 0;j < 10;j++)
    {
      if (blockarray[i][j] != -1)
      {
        ctx.beginPath();
        ctx.arc(165 + 30 * j,45 + 30 * i,15,0 * Math.PI / 180,360 * Math.PI / 180,false);
        ctx.fillStyle = colordata[blockarray[i][j]];
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function clock()
{
  timer += 1/100;
  delta += 1/100;
  if (delta > 0.5)
  {
    delta = 0;
    if (y < 17 && blockarray[y+1][x] == -1)
    {
      y++;
    }
    else
    {
      blockarray[y][x] = nowcolor;
      console.log(blockarray);
      x = 4;
      y = 0;
    }
  }
}

function keyDownHandler(e)
{
  console.log(e.keyCode);
  switch(scene)
  {
    case "title":
      if (e.keyCode == 38 && nowSelectButton == 1)
      {
        nowSelectButton = 0;
      }
      if (e.keyCode == 40 && nowSelectButton == 0)
      {
        nowSelectButton = 1;
      }
      if (e.keyCode == 32)
      {
        switch(nowSelectButton)
        {
          case 0:
            scene = "game";
            break;
          case 1:
            break;
          default:
            break;
        }
      }
      break;
    case "game":
      if (e.keyCode == 39 && x < 9 && blockarray[y][x+1] == -1)//右カーソルキー
      {
        x++;
      }
      if (e.keyCode == 37 && x > 0 && blockarray[y][x-1] == -1)//左カーソルキー
      {
        x--;
      }
      break;
  }
}

setup();

setInterval(main,10);
document.addEventListener("keydown", keyDownHandler, false);