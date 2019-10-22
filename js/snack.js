;(function () {
  var elements  = [];
  var score = 0;
  //存放地图
  var mapelements = ['04.jpg', '05.jpeg']
  function Snack(options) {
    options = options || {};
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.direction = options.direction || 'right';
    this.body = [
            {x: 3, y:2, color: 'red'},
            {x: 2, y:2, color: 'blue'},
            {x: 1, y:2, color: 'blue'}
        ];
  }
  Snack.prototype.render = function (map) {
    //删除之前的小蛇
    remove();

    //初始化小蛇 每个蛇节渲染到页面
    for (var i = 0 ,len = this.body.length; i <len; i++){
      var div = document.createElement('div');
      map.appendChild(div)
      elements.push(div)

      div.style.left = this.body[i].x *this.width + 'px';
      div.style.top = this.body[i].y * this.height + 'px';
      div.style.width = this.width + 'px';
      div.style.height = this.height + 'px'
      div.style.position = 'absolute';
      div.style.backgroundColor = this.body[i].color;
      div.style.borderRadius = '30% 40%'
    }
  }
  function remove() {
    for (var i = elements.length-1; i >= 0; i-- ) {
      elements[i].parentNode.removeChild(elements[i]);
      elements.splice(i, 1);
    }
  }

  Snack.prototype.move = function(food, map) {
    //控制身体
    for (var i = this.body.length-1; i > 0; i--) {
      this.body[i].x = this.body[i-1].x;
      this.body[i].y = this.body[i-1].y;
    }
    //判断蛇头
    var  head = this.body[0];
    switch (this.direction) {
      case 'right': head.x += 1; break;
      case 'left':head.x -= 1;break;
      case 'top': head.y -= 1;break;
      case 'bottom': head.y += 1;break;
    }
    var headX = head.x * this.width;
    var headY = head.y * this.height;
    //蛇迟到食物
    if (headX === food.x && headY === food.y) {
      var last = this.body[this.body.length-1];
      this.body.push({
        x: last.x,
        y: last.y,
        color: food.color
      })
      console.log(food.color)

        //增加积分
        score = score + 1;
        var scoreT = document.getElementById('score');
        scoreT.innerText = score;
        //判断分数
        var tex = document.createElement('H2');
        map.appendChild(tex)
        tex.style.position = 'absolute'
        tex.style.left = 300 + 'px'
        tex.style.top = '0';
        tex.style.fontFamily = '仿宋'

        if (score === 5) {
          tex.innerText  = '再接再励！！！50分有惊喜哦'
          setTimeout(function () {
            tex.innerText  = ''
          },2000)
        }

        if (score === 50) {
          map.style.background = 'url(./image/'+ mapelements[0]+')';
          map.style.backgroundSize = '100%'
          tex.innerText  = '奖励一只新地图哦！！！'
          setTimeout(function () {
            tex.innerText  = ''
          },2000)
        }
      if (score === 100) {
        map.style.background = 'url(./image/'+ mapelements[1]+')';
        map.style.backgroundSize = '100%'
        tex.innerText  = '恭喜达到100分，很棒棒！！！'
        setTimeout(function () {
          tex.innerText  = ''
        },2000)
      }
      //吧食物渲染到地图
      food.render(map);
      }

  }


  window.Snack = Snack;
})()