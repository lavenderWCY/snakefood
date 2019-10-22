;(function () {
  var that;

  function Game(map) {
    this.food = new Food();
    this.snack = new Snack();
    this.map = map
    that = this;
  }
  Game.prototype.start = function () {
    //蛇和食物渲染到地图
    this.food.render(this.map);
    this.snack.render(this.map)

    runSnack();
    bindKey();
  }


  function runSnack() {
    var timeId = setInterval(function () {
      this.snack.move(this.food, this.map);
      this.snack.render(this.map)

      var maxX = this.map.offsetWidth / this.snack.width;
      var maxY = this.map.offsetHeight / this.snack.height;
      var headX = this.snack.body[0].x;
      var headY = this.snack.body[0].y;
      if (headX < 0 || headX >= maxX) {
        alert('Game Over');
        clearInterval(timeId);
      }

      if (headY < 0 || headY >= maxY) {
        alert('Game Over');
        clearInterval(timeId);
      }
    }.bind(that),150)

    //新增规则




  }

  function bindKey() {
    document.addEventListener('keydown', function(e){
      switch (e.keyCode) {
        case 37:
          this.snack.direction = 'left';
          break;
        case 38:
          this.snack.direction = 'top';
          break;
        case 39:
          this.snack.direction = 'right';
          break;
        case 40:
          this.snack.direction = 'bottom';
          break;
      }
    }.bind(that),false)
  }

  window.Game = Game;
})()