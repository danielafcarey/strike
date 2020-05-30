(function() {
  console.log('we out here')
  var canvas =  document.querySelector('canvas');
  var c = canvas.getContext('2d');

  // defaults
  var default_width = 30;

  function Strike() {
    this.x = Math.floor(Math.random() * Math.floor(canvas.width));
    this.y = 0;
    this.width = default_width;
    this.height = default_width;
    this.velocity = 2;
    this.color = 'white';

    this.draw = function() {
      c.fillStyle = this.color;
      c.fillRect(this.x, this.y, this.width, this.height);
    }

    this.move = function() {
      // if overlaps same x+height/y with obstacle, move left/right this.width
      // left if on the right side of the board
      // right if on the left side of the board

      this.y += this.velocity;
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

  var strike = new Strike();
  // init random 10px wide lines at various y-values in the canvas
  var obstacles = get_random_obstacles(5);

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
