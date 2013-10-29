function initField(n){
   var gField = document.getElementById('gameField');         
   for (var i = 0; i < n; i++){
      var cell = document.createElement('div');
      cell.className = 'celNul';
      cell.setAttribute("celNum", i);
      cell.addEventListener("click", getMove, false);
      gField.appendChild(cell);
   };
};


function getMove(){
   if (player) {
      this.className = 'celX';
      }
   else {
      this.className = 'celY';
      }
   player = !player;
   return this.getAttribute("celNum");
};

var numOfPlayers = 3;
var player = false;

initField(numOfPlayers + 1);

