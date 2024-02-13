var tetris_array = create_2d_array();
var snake_list = [{ snake_x: 5, snake_y: 14 }];

var x = 0,
  y = 1;
let direction = "";
let before_direction = "";

// --------------------------------------------------

let btn_start = document.querySelector("#start");
btn_start.addEventListener("click", function () {
  btn_start.innerHTML = "";
  play_game();
});

function create_2d_array() {
  let array = [];
  for (let i = 0; i < 20; i++) {
    array[i] = [];
    for (let j = 0; j < 10; j++) {
      array[i][j] = 0;
    }
  }
  return array;
}

function play_game() {
  draw_snake();
  draw_friut();

  document.addEventListener("keydown", function (event) {
    define_arrow(event.keyCode);
    console.log("Direction: " + direction);
    isEat();
    if (move) draw_snake();
    document.getElementById("span-id").innerHTML = snake_list.length;
  });
}

function isEat() {
  if (tetris_array[a][b] == 1) {
    snake_list.push({ snake_x: 0, snake_y: 0 });

    draw_friut();
  } else if (tetris_array[a][b] == 2) {
  }
}

function draw_friut() {
  a = Math.floor(Math.random(10) * 19);
  b = Math.floor(Math.random(10) * 9);
  console.log("random: " + a + " " + b);
  tetris_array[a][b] = 2;
}

function draw_snake() {
  erase_array_value_1();
  let tool = 0;

  let before_list = snake_list.map(({ snake_x, snake_y }) => ({
    snake_x,
    snake_y,
  }));

  for (i = 0; i < snake_list.length; i++) {
    if (tool == 0) {
      tetris_array[(snake_list[i].snake_y += y)][
        (snake_list[i].snake_x += x)
      ] = 1;
    } else {
      tetris_array[(snake_list[i].snake_y = before_list[i - 1].snake_y)][
        (snake_list[i].snake_x = before_list[i - 1].snake_x)
      ] = 1;

      if (
        snake_list[0].snake_x == snake_list[i].snake_x &&
        snake_list[0].snake_y == snake_list[i].snake_y
      ) {
        console.log("Body Crash");
        alert("Game Over, crash body");
      }
    }
    tool++;
  }

  draw_table(tetris_array);
}

function erase_array_value_1() {
  for (i = 0; i < snake_list.length; i++) {
    tetris_array[snake_list[i].snake_y][snake_list[i].snake_x] = 0;
  }
}

function check_wall(check_direction) {
  if (check_back(check_direction)) return true;
  switch (check_direction) {
    case "L":
      if (snake_list[0].snake_x === 0) alert("Game Over, crash wall");
      break;
    case "R":
      if (snake_list[0].snake_x === 9) alert("Game Over, crash wall");
      break;
    case "D":
      if (snake_list[0].snake_y === 19) alert("Game Over, crash wall");
      break;
    case "U":
      if (snake_list[0].snake_y === 0) alert("Game Over, crash wall");
      break;
    default:
      break;
  }
  return false;
}
function check_back(check_direction) {
  if (!before_direction) {
    console.log("Empty");
    before_direction = check_direction;
  } else if (before_direction == "R" && check_direction == "L") {
    move = false;
    return true;
  } else if (before_direction == "L" && check_direction == "R") {
    move = false;
    return true;
  } else if (before_direction == "D" && check_direction == "U") {
    move = false;
    return true;
  } else if (before_direction == "U" && check_direction == "D") {
    move = false;
    return true;
  }
  before_direction = check_direction;
  direction = check_direction;
  move = true;
  return false;
}

function define_arrow(c) {
  switch (c) {
    case 37: // left
      if (!check_wall("L")) x = -1;
      else x = 0;
      y = 0;
      break;
    case 38: // up
      if (!check_wall("U")) y = -1;
      else y = 0;
      x = 0;
      break;
    case 39: // right
      if (!check_wall("R")) x = 1;
      else x = 0;
      y = 0;
      break;
    case 40: // down
      if (!check_wall("D")) y = 1;
      else y = 0;
      x = 0;
      break;
    case 32: //space
      console.log("Space");
      break;
    case 192: //esc: pause
      console.log("Esc");
      break;
    default:
      console.log("Default");
      x = 0;
      y = 0;
      break;
  }
}

function draw_table(array) {
  d = document.getElementById("tetris_table").getElementsByTagName("td");
  cell = 0;
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 10; j++) {
      if (array[i][j] == 1) {
        d[cell].style.backgroundColor = "yellow";
      } else if (array[i][j] == 2) {
        d[cell].style.backgroundColor = "red";
      } else {
        d[cell].style.backgroundColor = "gray";
      }
      cell++;
    }
  }
}
