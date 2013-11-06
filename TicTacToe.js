// logic core level
//
// class with one instance
function tGame(width, numberOfPlayers){
   var widthField = width;
   var nPl = numberOfPlayers - 1;
   var gField = [];
   var curPl = 0;
   var initChar = "n";
//init field
   this.initField = function(){
      for (var i=0; i<widthField*widthField; i++){
         gField[i] = initChar;
      }
   }
//switch player
   this.nextPlayer = function(){
      if (curPl == nPl){
         curPl = 0;
      }
      else{
         curPl++;
      }
      return curPl;
   }
//check win
   this.checkWinner = function(){
      var res = false;
      var curStr = 1;
      var checkCell = function(ind1, ind2, ind3){
         return gField[ind1] == gField[ind2] && gField[ind2] == gField[ind3] && gField[ind2] != initChar
      };
      // check first line
      for(var i = 1; i < widthField-1; i++){
            res = checkCell(i-1, i, i+1);
      };
      while(!res && curStr < (widthField-1)){
         // check first column
         if (checkCell(widthField*curStr-widthField, widthField*curStr, widthField*curStr+widthField)){
         res = true;
         };
         for(var i = widthField*curStr+1; i < widthField*(widthField-1); i++){
            // check middle lines
            if (checkCell(i-1, i, i+1)) {res = true};
            // check middle column
            if (checkCell(i-widthField, i, i+widthField)){res = true};
            // check fist diagonal
            if (checkCell(i-widthField-1, i, i+widthField+1)){res = true};
            // check last diagonal
            if (checkCell(i-widthField+1, i, i+widthField-1)){res = true};
         };
         // check last column
         if (checkCell(widthField*curStr-1, widthField*curStr+widthField-1, widthField*curStr+widthField*2-1)){res = true};
         // next line
         curStr++;
      };
      // check last line
      for(var i = widthField*(widthField-1)+1; i < widthField*widthField; i++){
         if (checkCell(i-1, i, i+1)){res = true};
      };
      return res;
   }
//set current cell
   this.setCell = function(index){
      var res = false;
      if (gField[index] == initChar){
         gField[index] = gField[index] + curPl;
         res = true;
      };
      return res;
   }
};
// grafic user interface level
// init
function initGameField(numOfCells){
   var pole = document.getElementById('gameField');         
   var gField = document.createElement('div');
   pole.appendChild(gField);
   for (var i=0; i<numOfCells; i++){
      for(var j=0; j<numOfCells; j++){
         var cell = document.createElement('div');
         cell.className = 'celNul';
         cell.setAttribute("celNum", i*numOfCells+j);
         cell.addEventListener("click", getMove, false);
         gField.appendChild(cell);
      };
      var wall = document.createElement('div');
      wall.className = 'wall';
      gField.appendChild(wall);
   };
};
function resetGameField(){
   var pole = document.getElementById('gameField');  
   pole.removeChild(pole.getElementsByTagName('*')[0]);
};
// flow
function getMove(){   
   if (curGame.setCell(this.getAttribute('celNum'))){
      this.className = "cel" + curGame.nextPlayer();
      if (curGame.checkWinner()){
         var plr = "nobody";
         if (this.className == "cel0"){plr = "X";};
         if (this.className == "cel1"){plr = "O";};
         if (this.className == "cel2"){plr = "Z";};
         alert(plr + ", you win");
         curGame.initField();
         resetGameField();
         initGameField(numOfCells);
      };
   };
};
function makeGame(){
   var q = document.getElementsByTagName('input');
   alert(q[0].name);
};
// create obj
var numOfPlayers = 3;
var numOfCells = 10;

var curGame = new tGame(numOfCells, numOfPlayers);
curGame.initField();
initGameField(numOfCells);
