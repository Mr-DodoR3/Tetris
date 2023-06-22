var DEBUG = false;
var DEBUG_BASIC = false;

var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

const width = 600, height = 600;

var scene = 0;

var mode = 0;

var backgorundData = Array(10);

function title()
{
  for (let i = 0; i < 60; i++)
  {
    for (let j = 0; j < 60; j++)
    {
      drawRect(i*60, j*60, 60 ,60);
      fillColor(blockColor(backgorundData[i][j], true));
      drawRect(i*60 + 5, j*60 + 5, 50 ,50);
      fillColor(blockColor(backgorundData[i][j], false));
    }
  }

  align("center");
  for (let i = 0; i < 15; i++)
  {
    writeText("TETRIS" , 300, 180, 48 + i*5, i % 2 == 0 ? "black" : "white");
  }

  let buttontext = ["スタート", "やり方"];
  for (let i = 0; i < 2; i++)
  {
    drawRect(175, 280 + (i * 60), 250, 45);
    fillColor("#FFFF66");
    writeText(buttontext[i] , 300, 310 + (i * 60), 24, "black");
  }

  strokeColor("red");
  drawStrokeRect(180, 285 + (mode * 60), 240, 35);
  drawStrokeRect(175, 280 + (mode * 60), 250, 45);
}

function keyDown(e)
{
  if (DEBUG == true) console.log(e.keyCode);

  //keycodeについて
  //37 -> 左キー
  //38 -> 上キー
  //39 -> 右キー
  //40 -> 下キー
  //32 -> スペースキー
  //88 -> Xキー
  //90 -> Zキー

  switch (scene)
  {
    case 0:
      if (e.keyCode == 38) mode = (mode > 0 ? mode - 1 : 1);
      if (e.keyCode == 40) mode = (mode < 1 ? mode + 1 : 0);
      if (e.keyCode == 32) scene = (mode + 1), gamesetup();
      break;
    case 1:
      if (e.keyCode == 32 && stock == false) stockTrigger();
      if (e.keyCode == 37) move("left");
      if (e.keyCode == 38) skip();
      if (e.keyCode == 39) move("right");
      if (e.keyCode == 40) speedfall(true);
      if (e.keyCode == 88) rotate("right");
      if (e.keyCode == 90) rotate("left");
      if (e.keyCode == 81) gamedebug_stop = true;
      break;
  }
}

function keyUp(e)
{
  switch (scene)
  {
    case 1:
      if (e.keyCode == 40) speedfall(false);
      break;
  }
}

function setup()
{
  for (let i = 0; i < 60; i++)
  {
    backgorundData[i] = Array(10);
    for (let j = 0; j < 60; j++)
    {
      backgorundData[i][j] = Math.floor(Math.random() * 10);
    }
  }
}

function main()
{
  ctx.clearRect(0, 0, width, height);

  document.addEventListener("keydown", keyDown, false);
  document.addEventListener("keyup", keyUp, false);
  switch(scene)
  {
    case 0:
      title();
      break;
    case 1:
      game();
      break;
    case 2:
      break;
  }

  requestAnimationFrame(main);
}

setup();
addEventListener('load', main(), false);


function test()
{
  let temp_array = 
  [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]

  for (let i = 0; i < 4; i++)
  {
    for (let j = 0; j < 4; j++)
    {
      console.log("i:" + i + ", j:" + j + ", array:" + temp_array[i][j]);
    }
  }
}