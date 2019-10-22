;(function () {
  //创建一个数组 存放食物，以便以后可以删除
  var elements = []
  function Food(options) {
   options = options || {};
   this.x = options.x || 0;
   this.y = options.y || 0;
   this.width = options.width || 20;
   this.height = options.height || 20;
   this.color = options.color || 'red';
  }
  Food.prototype.render = function (map) {
    //在每次创建食物之前 先删除之前的食物
    remove();
    //创建一个食物
    var div = document.createElement('div');
    map.appendChild(div);
    elements.push(div);//将食物存放在数组中


    //设置大小
    div.style.left = this.x + 'px';
    div.style.top = this.y + 'px';
    div.style.width = this.width + 'px';
    div.style.height = this.height + 'px';
    div.style.backgroundColor = this.color;
    div.style.position = 'absolute';

    //随机生成食物
    //调用颜色

    this.x = tools.getRandom(0, map.offsetWidth / this.width - 1)*this.width;
    this.y = tools.getRandom(0, map.offsetHeight / this.height - 1)*this.height
    div.style.left = this.x + 'px';
    div.style.top = this.y + 'px';
    this.color = getRandomColor();
    div.style.backgroundColor = this.color

    console.log(this.color, div)
  }
  function remove () {
    //遍历数组中的食物 并删除节点和数组
    for (var i = elements.length-1; i>=0; i--) {
      elements[i].parentNode.removeChild(elements[i]);
      elements.splice(i, 1);
    }
  }
  //随机生成颜色
function getRandomColor() {
  var r = tools.getRandom(0, 255);
  var g = tools.getRandom(0, 255);
  var b = tools.getRandom(0, 255);
  var bgc = 'rgb('+ r +','+ g +','+ b +')'
  return bgc
}



  //暴露food
  window.Food = Food;
})()