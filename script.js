(function() {
  console.log('we out here')
  var canvas =  document.querySelector('canvas');
  var c = canvas.getContext('2d');

  // defaults
  var default_width = 30;
  var num_obstacles = 30;

  // init objects
  var strike = new Strike();
  var obstacles = get_random_obstacles(num_obstacles);

  function Strike() {
    this.x = Math.floor(Math.random() * Math.floor(canvas.width));
    this.y = -default_width; // ensures bottom of strike starts at 0
    this.width = default_width;
    this.height = default_width;
    this.velocity = 1;
    this.color = 'white';

    this.draw = function() {
      c.fillStyle = this.color;
      c.fillRect(this.x, this.y, this.width, this.height);
    }

    this.move = function() {
      var on_left = this.x <= canvas.width / 2;
      var strike_bottom = this.y + this.height;
      var sR = this.x + this.width;
      var sL = this.x;

      // check if hit horizontal obstacle
      var hit_hor_obstacle = obstacles.find(function(obstacle) {
        var oR = obstacle.x + obstacle.width;
        var oL = obstacle.x
        return (
          (obstacle.y === strike_bottom) &&
          ((sR >= oL && sR <= oR) || (sL >= oL && sL <= oR))
        )
      })

      if (hit_hor_obstacle) {
        if (on_left) {
          // move right if on the left side of the board
          this.x += this.velocity;
        } else {
          // move left if on the right side of the board
          this.x -= this.velocity;
        }
      // ADD HERE: elif hit_vert_obstacle
      } else {
        // move down
        this.y += this.velocity;
      }
    }
  }

  function Obstacle(x, y) {
    this.x = x;
    this.y = y;
    this.width = default_width;
    this.height = 1;
    this.color = 'turquoise';

    this.draw = function() {
      c.fillStyle = this.color;
      c.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  function get_random_obstacles(num) {
    var obstacles_array = [];

    for (let i = 0; i < num; i++) {
      var x = Math.floor(Math.random() * Math.floor(canvas.width));
      var y = Math.floor(Math.random() * Math.floor(canvas.height));
      var obstacle = new Obstacle(x, y);
      obstacles_array.push(obstacle);
    }

    return obstacles_array;
  }

  function lightningStrike() {
    if (strike.y == canvas.height) {
      return;
    }

    // refresh board
    c.clearRect(0, 0, canvas.width, canvas.height);

    // draw objects
    strike.draw();
    obstacles.forEach(function(obstacle) {
      obstacle.draw();
    })

    // start strike
    strike.move();
    requestAnimationFrame(lightningStrike);
  }

  lightningStrike();

})();
