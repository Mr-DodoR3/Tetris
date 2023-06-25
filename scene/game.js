const effect = class {
  constructor(x, y, c, type=0)
  {
    this.x = 150 + x * 30;
    this.y = 30 + y * 30;
    this.c = c;
    this.a = 100;
    this.type = type;
    if (type == 1)
    {
      this.vecX = Math.floor(Math.random() * 5) - 2;
      this.vecY = Math.floor(Math.random() * 5) - 2;
    }
    else
    {
      this.vecX = 0;
      this.vecY = 0;
    }
    this.colorNum();
  }

  colorNum()
  {
    switch(this.c)
    {
      case 1:
        this.c = "rgba(255,255,204,"
        break;
      case 2:
        this.c = "rgba(153,255,255,"
        break;
      case 3:
        this.c = "rgba(255,102,102,"
        break;
      case 4:
        this.c = "rgba(153,255,153,"
        break;
      case 5:
        this.c = "rgba(255,204,102,"
        break;
      case 6:
        this.c = "rgba(102,102,255,"
        break;
      case 7:
        this.c = "rgba(255,153,255,"
        break;
      case 8:
        this.c = "rgba(153,255,204,"
        break;
      case 9:
        this.c = "rgba(238,238,238,"
        break;
    }
  }

  effectDraw()
  {
    this.s = Math.abs(this.a - 100) / 4;
    drawRect(this.x + 1 - (this.s / 2), this.y + 1 - (this.s / 2), 28 + this.s, 28 + this.s);
    fillColor(this.c + (this.a / 100) +")");
    drawRect(this.x + 5 - (this.s / 2), this.y + 5 - (this.s / 2), 20 ,20);
    fillColor(this.c + (this.a / 100) +")");
    this.x += this.vecX;
    this.y += this.vecY;
    this.a -= this.type == 1 ? 3 : 4;
    if (this.a > 0)
      return true;
    else
      return false;
    //fillColor(blockColor(this.c, false) + this.alpha);
  }
}

var effects = [];

var time = 60.0;
var score = 0;
gamedebug_stop = false;

var point = [ 100, 300, 450,  600 ]
var point_magnification = 1.0;

var blockData = Array(18);
for (let i = 0; i < blockData.length; i++)
{
  blockData[i] = new Array(10);
}

var control;

var x, y;
var shape
[
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];
var nowblockType;
var nextBlock = Array(3);
var stockBlock = -1;
var stock = false;

var flame;
var interval;

var evacuationTime;
var evacuationAllTime;

function gamebackground()
{
  //background("#333333");

  for (let i = 0; i <= 10; i++)
  {
    strokeColor(i == 0 || i == 10 ? "#33FFFF" : "#999999");
    ctx.lineWidth = (i == 0 || i == 10 ? 5 : 1);
    let p = 150 + i * 30;
    drawLine(p, 30, p, 570);
    drawStroke();
  }
  for (let i = 0; i <= 18; i++)
  {
    strokeColor(i == 0 || i == 18 ? "#33FFFF" : "#999999");
    ctx.lineWidth = (i == 0 || i == 18 ? 5 : 1);
    let p = 30 + i * 30;
    drawLine(150, p, 450, p);
    drawStroke();
  }

  drawRect(0, 0, 600, 30);
  fillColor("#333333");
  drawRect(0, 570, 600, 30);
  fillColor("#333333");
  drawRect(0, 0, 150, 600);
  fillColor("#333333");
  drawRect(450, 0, 150, 600);
  fillColor("#333333");

  // console.log(effects.length);
  for (let i = 0; i < effects.length; i++)
  {
    let rm = effects[i].effectDraw();
    if (!rm)
      effects.splice(i, i);
  }

  nextBlockUI();
}

function nextBlockUI()
{
  strokeColor("#33FFFF");
  ctx.lineWidth = 2;

  drawLine(450, 31, 540, 31), drawStroke();
  drawLine(540, 31, 540, 120), drawStroke();
  drawLine(450, 120, 540, 120), drawStroke();
  
  drawLine(510, 120, 510, 180), drawStroke();
  drawLine(450, 180, 510, 180), drawStroke();
  
  drawLine(510, 180, 510, 240), drawStroke();
  drawLine(450, 240, 510, 240), drawStroke();
  
  align("left");
  writeText("N e x t", 455, 46, 15, "#FFFFFF");
  
  blockDrawUI(0, 16, "next");
  blockDrawUI(1, 12, "next");
  blockDrawUI(2, 12, "next");

  drawLine(60, 31, 150, 31), drawStroke();
  drawLine(60, 31, 60, 120), drawStroke();
  drawLine(60, 120, 150, 120), drawStroke();
  writeText("S T O C K", 65, 46, 14, "#FFFFFF");
  blockDrawUI(0, 16, false, "stock");
}

function blockDrawUI(t, s, uitype)
{
  let tx, ty;
  if (uitype == "next")
  {
    tx = (t == 0 ? 460 : 456);
    ty = (t == 0 ? 50 : (t == 1 ? 125 : 185));
  }
  else
  {
    tx = 70;
    ty = 50;
  }
  for (let i = 0; i < 4; i++)
  {
    for (let j = 0; j < 4; j++)
    {
      let nextshape = (uitype == "next" ? getForm(nextBlock[t]) : getForm(stockBlock));
      if (nextshape[i][j] != 0 && (uitype == "next" || stockBlock > -1))
      {
        drawRect(tx + j * s, ty + i * s, s ,s);
        fillColor(uitype == "next" ? blockColor(nextBlock[t] + 1, true) : blockColor(stockBlock + 1, true));
        drawRect(tx + (s - s * 0.7) / 2 + j * s, ty + (s - s * 0.7) / 2 + i * s, s * 0.7, s * 0.7);
        fillColor(uitype == "next" ? blockColor(nextBlock[t] + 1, false) : blockColor(stockBlock + 1, false));
      }
    }
  }
}

function blockdraw(x, y, c)
{
  //drawRect((150 + j * 30) + 1, (30 + i * 30) + 1, 28 ,28);
  //(blockColor(blockData[i][j]));
  drawRect(x + 1, y + 1, 28 ,28);
  fillColor(blockColor(c, true));
  drawRect(x + 5, y + 5, 20 ,20);
  fillColor(blockColor(c, false));
}

function time_UI()
{
  if (timeDecimalCount() == true) time -= 0.1;
  align("left");
  writeText("Time:" + (time > 0.0 ? time.toFixed(1) : (0).toFixed(1)), 460, 300, 24, "#FFFFFF");
}

function score_UI()
{
  align("left");
  writeText("Score:" + score, 460, 340, 24, "#FFFFFF");
}

function flamelate()
{
  flame++;
  if (flame > (FPS / 10) * interval)
  {
    gravity();
    flame = 0;
  }
  
  display();
}

function getForm(n)
{
  switch (n)
  {
    case 0:
      return shape_O;
      break;
    case 1:
      return shape_I;
      break;
    case 2:
      return shape_S;
      break;
    case 3:
      return shape_Z;
      break;
    case 4:
      return shape_L;
      break;
    case 5:
      return shape_J;
      break;
    case 6:
      return shape_T;
      break;
    case 7:
      return shape_C;
      break;
    case 8:
    default:
      return shape_1;
      break;
  }
}

function display()
{
  for (let i = 0; i < 18; i++)
  {
    for (let j = 0; j < 10; j++)
    {
      if (blockData[i][j] != 0)
      {
        blockdraw((150 + j * 30), (30 + i * 30), blockData[i][j]);
        //drawRect((150 + j * 30) + 1, (30 + i * 30) + 1, 28 ,28);
        //fillColor(blockColor(blockData[i][j]));
      }
      else
      {
        displayNowblock(i, j)
      }
    }
  }
}

function displayNowblock(i, j)
{
  for (let k = 0; k < 4; k++)
  {
    for (let l = 0; l < 4; l++)
    {
      if (i == y + k && j == x + l && shape[k][l] != 0)
      {
        blockdraw((150 + j * 30), (30 + i * 30), nowblockType);
        //drawRect((150 + j * 30) + 1, (30 + i * 30) + 1, 28 ,28);
        //fillColor(blockColor(nowblockType));
      }
    }
  }
}

function gravity()
{
  if (collision(x, y + 1, shape) == 0)
  {
    control = true;
    if (gamedebug_stop == false) y++;
  }
  else control = false;
}

function confirm()
{
  for (let i = 0; i < 4; i++)
  {
    for (let j = 0; j < 4; j++)
    {
      if (shape[i][j] != 0)
      {
        if (y >= -1 && y + i < 18)
        {
          try
          {
            effects.push(new effect(x + j, y + i, shape[i][j], 0));
            blockData[y + i][x + j] = shape[i][j];
            blockData[y + i][x + j] = shape[i][j];
          }
          catch
          {
            console.log("GAME OVER");
            time = 0.0;
          }
        }
        else
        {
          console.log("GAME OVER");
          time = 0.0;
        }
      }
    }
  }
  lienEraseCheck();
}

function lienEraseCheck()
{
  let erasePoint = [];
  let eraseLine = 0;
  for (let i = 0; i < 18; i++)
  {
    let check = 0;
    while (check < 10)
    {
      if (blockData[i][check] == 0)
      {
        break;
      }
      check++;
    }
    if (check == 10)
    {
      eraseLine++;
      for (let j = i; j > 0; j--)
      {
        for (let k = 0; k < 10; k++)
        {
          if (j == i)
            effects.push(new effect(k, i, blockData[j][k], 1));
            blockData[j][k] = blockData[j - 1][k];
        }
      }
    }
  }
  if (eraseLine == 0)
  {
    point_magnification = 1.0;
  }
  else
  {
    if (time > 0)
      score += Math.floor(point[eraseLine-1] * point_magnification);
    if (point_magnification < 2.0)
      point_magnification += 0.1;
  }
}

var collision_rotate_val = false;
function collision(tx, ty, tshape)
{
  let condition = 0;//-1 == Error, 0 == Clear
  for (let i = 0; i < 4; i++)
  {
    for (let j = 0; j < 4; j++)
    {
      if (ty + i >= 0 && tshape[i][j] != 0)
      {
        if (tx + j < 0 || tx + j > 9 || ty + i > 17) condition = -1;
        else if (blockData[ty + i][tx + j] != 0) condition = -1;

        if (shape != tshape && condition == -1 && collision_rotate_val == false)
        {
          condition = collision_rotate(tx, ty, tshape);
        }
      }
    }
  }
  
  return condition;
}

function collision_rotate(tx, ty, tshape)
{
  collision_rotate_val = true;
  let val = -1;
  
  if (collision(tx - 1, ty, tshape) == 0) x -= 1, val = 0;
  else if (collision(tx + 1, ty, tshape) == 0) x += 1, val = 0;
  else if (collision(tx, ty - 1, tshape) == 0) y -= 1, val = 0;
  else if (collision(tx - 2, ty, tshape) == 0) x -= 2, val = 0;
  else if (collision(tx + 2, ty, tshape) == 0) x += 2, val = 0;
  else if (collision(tx, ty - 2, tshape) == 0) y -= 2, val = 0;
  else if (collision(tx - 3, ty, tshape) == 0) x -= 3, val = 0;
  else if (collision(tx + 3, ty, tshape) == 0) x += 3, val = 0;
  else if (collision(tx, ty - 3, tshape) == 0) y -= 3, val = 0;

  return val;
}

function move(key)
{
  if (control == false && evacuationAllTime < 100) evacuationTime = 0;
  switch (key)
  {
    case "left":
      if (collision(x - 1, y, shape) == 0) x--;
      break;
    
    case "right":
      if (collision(x + 1, y, shape) == 0) x++;
      break;
  }
}

function speedfall(b)
{
  interval = (b == true ? 0.2 : 4);
}

function skip()
{
  while (control)
  {
    gravity();
  }
}

function rotate(direction)
{
  if (shape != shape_O)
  {
    let shape_temp = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

    for (let i = 0; i < 4; i++)
    {
      for (let j = 0; j < 4; j++)
      {
        if (direction == "left") shape_temp[i][j] = shape[j][3 - i];
        else shape_temp[i][j] = shape[3 - j][i];
      }
    }
    collision_rotate_val = false;
    if (collision(x, y, shape_temp) == 0) shape = shape_temp;
  }
}

function reserve(first = false)
{
  if (first == true)
  {
    for (let i = 0; i < 3; i++)
    {
      let n = Math.floor(Math.random() * 10);
      nextBlock[i] = n;
    }
  }
  let form = nextBlock[0];
  nowblockType = form + 1;
  shape = getForm(form);

  nextBlock[0] = nextBlock[1];
  nextBlock[1] = nextBlock[2];
  nextBlock[2] = Math.floor(Math.random() * 10);
  stock = false;
}

function stockTrigger()
{
  //console.log("blockTypeTrigger:" + nowblockType);
  stock = true;
  let temp = stockBlock;
  stockBlock = nowblockType - 1;
  if (temp > -1) generation(false, temp);
  else generation();
}

function gamesetup()
{
  timeReset();
  flame = 0, interval =  4;
  time = 60.0;
  score = 0;
  generation(true);
  for (let i = 0; i < blockData.length; i++)
  {
    for (let j = 0; j < blockData[0].length; j++)
    {
      blockData[i][j] = 0;
    }
  }
  if (DEBUG == true) console.log(blockData);
}

function generation(first = false, usestock = -1)
{
  x = 3, y = -4;
  if (usestock == -1) reserve(first);
  else 
  {
    nowblockType = usestock + 1;
    shape = getForm(usestock);
  }
  control = true;
  evacuationTime = 0;
  evacuationAllTime = 0;
  //console.log("blockType:" + nowblockType);
  //console.log(shape);
}

function game()
{
  background("#333333");
  if (control == false) 
  {
    evacuationTime++;
    evacuationAllTime++;
    if (evacuationTime > 20)
    {
      confirm();
      generation();
    }
  }
  gamebackground();
  time_UI();
  score_UI();
  if (time > 0)
  {
    flamelate();
  }
  else
  {
    if (changeChack == 0)
    {
      sceneChangeTrriger(2);
    }
  }
}
