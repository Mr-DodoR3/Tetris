var time = 60.0;

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
}

function time_UI()
{
  if (timeDecimalCount() == true) time -= 0.1;
  align("left");
  writeText("Time:" + time.toFixed(1), 460, 50, 24, "#FFFFFF");
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

function display()
{
  for (let i = 0; i < 18; i++)
  {
    for (let j = 0; j < 10; j++)
    {
      if (blockData[i][j] != 0)
      {
        drawRect((150 + j * 30) + 1, (30 + i * 30) + 1, 28 ,28);
        fillColor(blockColor(blockData[i][j]));
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
        drawRect((150 + j * 30) + 1, (30 + i * 30) + 1, 28 ,28);
        fillColor(blockColor(nowblockType));
      }
    }
  }
}

function gravity()
{
  if (collision(x, y + 1, shape) == 0)
  {
    control = true;
    y++;
  }
  else control = false;
}

function confirm()
{
  for (let i = 0; i < 4; i++)
  {
    for (let j = 0; j < 4; j++)
    {
      if (shape[i][j] != 0 && y >= 0 && y + i < 18)
      {
        blockData[y + i][x + j] = shape[i][j];
        blockData[y + i][x + j] = shape[i][j];
      }
    }
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

function gamesetup()
{
  timeReset();
  flame = 0, interval =  4;
  generation();
  for (let i = 0; i < blockData.length; i++)
  {
    for (let j = 0; j < blockData[0].length; j++)
    {
      blockData[i][j] = 0;
    }
  }
  if (DEBUG == true) console.log(blockData);
}

function generation()
{
  x = 3, y = -4;
  var form = Math.floor(Math.random() * 7);
  control = true;
  evacuationTime = 0;
  evacuationAllTime = 0;
  
  nowblockType = form + 1;
  switch (form)
  {
    case 0:
      shape = shape_O;
      break;
    case 1:
      shape = shape_I;
      break;
    case 2:
      shape = shape_S;
      break;
    case 3:
      shape = shape_Z;
      break;
    case 4:
      shape = shape_L;
      break;
    case 5:
      shape = shape_J;
      break;
    case 6:
    default:
      shape = shape_T;
      break;
  }
  //console.log(shape);
}

function game()
{
  background("#333333");
  time_UI();
  flamelate();
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
}
