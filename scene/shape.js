//基準[0][0]
var shape_O = 
[
  [0, 0, 0, 0],
  [0, 1, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0]
]

var shape_I = 
[
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [2, 2, 2, 2],
  [0, 0, 0, 0]
]

var shape_S = 
[
  [0, 0, 0, 0],
  [0, 3, 3, 0],
  [3, 3, 0, 0],
  [0, 0, 0, 0]
]

var shape_Z = 
[
  [0, 0, 0, 0],
  [4, 4, 0, 0],
  [0, 4, 4, 0],
  [0, 0, 0, 0]
]

var shape_L = 
[
  [0, 0, 0, 0],
  [0, 5, 0, 0],
  [0, 5, 5, 5],
  [0, 0, 0, 0]
]

var shape_J = 
[
  [0, 0, 0, 0],
  [0, 0, 6, 0],
  [6, 6, 6, 0],
  [0, 0, 0, 0]
]

var shape_T = 
[
  [0, 0, 0, 0],
  [0, 7, 0, 0],
  [7, 7, 7, 0],
  [0, 0, 0, 0]
]

function blockColor(n)
{
  switch (n)
  {
    case 1:
      return "#FFFF33"
      break;
    case 2:
      return "#33FFFF"
      break;
    case 3:
      return "#FF3333"
      break;
    case 4:
      return "#33FF33"
      break;
    case 5:
      return "#FF9933"
      break;
    case 6:
      return "#3333FF"
      break;
    case 7:
    default:
      return "#FF33FF"
      break;
  }
}