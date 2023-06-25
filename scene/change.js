var nextScene = 0;
var changeChack = 0;
var changeDelta = 0;
var openPanel = 0;

var sceneChangeBlock = Array(10);
for (let i = 0; i < sceneChangeBlock.length; i++)
{
  sceneChangeBlock[i] = [ false, false, false, false, false, false, false, false, false, false ];
}

function sceneChangeTrriger(next) {
  nextScene = next;
  changeChack = 1;
  changeDelta = 0;
  for (let i = 0; i < sceneChangeBlock.length; i++)
  {
    for (let j = 0; j < sceneChangeBlock[i].length; j++)
    {
      sceneChangeBlock[i][j] = false;
    }
  }
}

function setBlock()
{
  let ci = Math.floor(Math.random() * 10);
  let cj = Math.floor(Math.random() * 10);
  if (sceneChangeBlock[ci][cj])
  {
    return setBlock();
  }
  else
  {
    sceneChangeBlock[ci][cj] = true;
  }
}

function rmBlock()
{
  let ci = Math.floor(Math.random() * 10);
  let cj = Math.floor(Math.random() * 10);
  if (!sceneChangeBlock[ci][cj])
  {
    return rmBlock();
  }
  else
  {
    sceneChangeBlock[ci][cj] = false;
  }
}

function sceneChange() {
  if (changeDelta > 49 && changeChack == 1)
  {
    changeChack = 2;
    scene = nextScene;
    if (scene == 1)
      gamesetup();
  }
  else if (changeDelta > 98 && changeChack == 2)
  {
    changeChack = 0;
  }
  changeDelta++;

  if (changeChack == 1)
  {
    setBlock();
    setBlock();
  }
  else if (changeChack == 2)
  {
    rmBlock();
    rmBlock();
  }

  for (let i = 0; i < 10; i++)
  {
    for (let j = 0; j < 10; j++)
    {
      if (sceneChangeBlock[i][j])
      {
        drawRect(i*60, j*60, 60 ,60);
        fillColor("#000000");
        drawRect(i*60 + 5, j*60 + 5, 50 ,50);
        fillColor("#000000");
      }
    }
  }
}