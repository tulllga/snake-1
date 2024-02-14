var tetris_array = create_2d_array();
let keyDown = [];
var snake_list = [{ snake_x: 5, snake_y: 14 }];

var x = 0,
  y = 1;

let set_second = 0;
let direction = "U";
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
  draw_friut();
  second();
  setMove();

  document.addEventListener("keydown", function (event) {
    keyDown.push(event.keyCode);
  });
}

function second() {
  const tetris_time = setTimeout(second, 1000);
  document.getElementById("time-id").innerHTML = set_second += 1;
  document.getElementById("score-id").innerHTML = snake_list.length - 1;
}

function setMove() {
  const tetris_speed = setTimeout(setMove, 400);
  define_arrow(keyDown[keyDown.length - 1]);
  keyDown = [];

  switch (direction) {
    case "L":
      define_arrow(37);
      break;
    case "U":
      define_arrow(38);
      break;
    case "R":
      define_arrow(39);
      break;
    case "D":
      define_arrow(40);
      break;
  }
  isEat();
  // if (move)
  draw_snake();
}

function isEat() {
  if (tetris_array[a][b] == 3) {
    snake_list.push({ snake_x: 0, snake_y: 0 });
    draw_friut();
  }
}

function draw_friut() {
  a = Math.floor(Math.random(10) * 19);
  b = Math.floor(Math.random(10) * 9);
  console.log("random: " + b + " " + a);
  if (tetris_array[a][b] == 0) tetris_array[a][b] = 2;
  else draw_friut();
  document.getElementById("orange_id").innerHTML = b + " x " + a;
}

function gameOver(reason) {
  console.log("Tetris array: " + tetris_array);
  alert(
    "Game Over,\nYour score: " +
      snake_list.length +
      ",\nTime: " +
      set_second +
      "sec,\nCrash: " +
      reason
  );

  window.location.reload();
}

function draw_snake() {
  erase_tetris_array();

  let before_list = snake_list.map(({ snake_x, snake_y }) => ({
    snake_x,
    snake_y,
  }));

  for (i = 0; i < snake_list.length; i++) {
    if (i == 0) {
      tetris_array[(snake_list[i].snake_y += y)][
        (snake_list[i].snake_x += x)
      ] = 3;
    } else {
      tetris_array[(snake_list[i].snake_y = before_list[i - 1].snake_y)][
        (snake_list[i].snake_x = before_list[i - 1].snake_x)
      ] = 1;

      if (
        snake_list[0].snake_x == snake_list[i].snake_x &&
        snake_list[0].snake_y == snake_list[i].snake_y
      ) {
        gameOver("body");
      }
    }
  }
  draw_table(tetris_array);
}

function erase_tetris_array() {
  for (i = 0; i < snake_list.length; i++) {
    tetris_array[snake_list[i].snake_y][snake_list[i].snake_x] = 0;
  }
}

function check_wall(check_direction) {
  if (check_back(check_direction)) return true;
  switch (check_direction) {
    case "L":
      if (snake_list[0].snake_x === 0) {
        // console.log(
        //   "head: " + snake_list[0].snake_x + " " + snake_list[0].snake_y
        // );

        // tetris_array[snake_list[0].snake_y][snake_list[0].snake_x] = 4;
        // draw_table(tetris_array);

        // console.log("tetris area: " + tetris_array);

        gameOver("wall");
      }
      break;
    case "R":
      if (snake_list[0].snake_x === 9) {
        gameOver("wall");
      }
      break;
    case "D":
      if (snake_list[0].snake_y === 19) {
        gameOver("wall");
      }
      break;
    case "U":
      if (snake_list[0].snake_y === 0) {
        gameOver("wall");
      }
      break;
    default:
      break;
  }
  return false;
}
function check_back(check_direction) {
  if (!before_direction) {
    before_direction = check_direction;
  } else if (before_direction == "R" && check_direction == "L") {
    // move = false;
    return true;
  } else if (before_direction == "L" && check_direction == "R") {
    // move = false;
    return true;
  } else if (before_direction == "D" && check_direction == "U") {
    // move = false;
    return true;
  } else if (before_direction == "U" && check_direction == "D") {
    // move = false;
    return true;
  }
  before_direction = check_direction;
  direction = check_direction;
  // move = true;
  return false;
}

function define_arrow(c) {
  switch (c) {
    case 37: // left
      if (!check_wall("L")) {
        x = -1;
        // console.log("Left");
      } else x = 0;
      y = 0;
      break;
    case 38: // up
      if (!check_wall("U")) {
        y = -1;
        // console.log("Up");
      } else y = 0;
      x = 0;
      break;
    case 39: // right
      if (!check_wall("R")) {
        x = 1;
        // console.log("Right");
      } else x = 0;
      y = 0;
      break;
    case 40: // down
      if (!check_wall("D")) {
        y = 1;
        // console.log("Down");
      } else y = 0;
      x = 0;
      break;
    case 32: //space
      break;
    case 192: //esc: pause
      // console.log("Esc");
      break;
    default:
      // console.log("Noting pressed.");
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
        d[cell].style.backgroundColor = "#444";
      } else if (array[i][j] == 2) {
        d[cell].style.backgroundColor = "orange";
      } else if (array[i][j] == 3) {
        d[cell].style.backgroundColor = "#222";
      } else if (array[i][j] == 4) {
        d[cell].style.backgroundColor = "red";
      } else {
        d[cell].style.backgroundColor = "gray";
      }
      cell++;
    }
  }
}
