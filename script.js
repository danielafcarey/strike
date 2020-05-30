(function() {
  console.log('we out here')
  var canvas =  document.querySelector('canvas');
  var c = canvas.getContext('2d');

  function Strike() {
    this.x = Math.floor(Math.random() * Math.floor(canvas.width));
    this.y = 0;
    this.width = 10;
    this.height = 10;
    this.velocity = 1;
    this.color = 'white';

    this.draw = function() {
      c.fillStyle = this.color;
      c.fillRect(this.x, this.y, this.width, this.height);
    }

    this.move = function() {
      this.y += this.velocity;
    }
  }

  var strike = new Strike();

  function lightningStrike() {
    if (strike.y == canvas.height) {
      return;
    }

    c.clearRect(0, 0, canvas.width, canvas.height);
    strike.draw();
    strike.move();
    requestAnimationFrame(lightningStrike);
  }

  lightningStrike();

})();
