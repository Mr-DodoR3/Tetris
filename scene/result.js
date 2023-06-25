function result()
{
  backgroundImage();

  align("center");
  writeText("Your Score:" + score, 300, 200, 48, "#FFFFFF");
  
  drawRect(175, 280 + 60, 250, 45);
  fillColor("#FFFF66");
  writeText("戻る" , 300, 310 + 60, 24, "black");
  strokeColor("red");
  drawStrokeRect(180, 285 + 60, 240, 35);
}