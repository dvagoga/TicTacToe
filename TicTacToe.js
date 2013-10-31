// logic core level
// class with one instance
function tGame(gField, width, numberOfPlayers){
   this.gField = gField;
   widthField = width;
   nPl = numberOfPlayers - 1;
   curPl = 0;
//##--
   this.nextPlayer = function(){
      if (curPl == nPl){
         curPl = 0;
      }
      else{
         curPl++;
      }
      return curPl;
   }
//##--
   this.checkWinner = function(){
      var debugArr = [];
      var res = false;
      var curStr = 1;
      // check first line
      for(var i = 1; i < widthField-1; i++){
         if (gField[i-1] == gField[i] && gField[i] == gField[i+1] && gField[i] != "n"){
            res = true;
         };
      };
      while(!res && curStr < (widthField-1)){
         // check first column
         if (gField[widthField*curStr-widthField] == gField[widthField*curStr]
            && gField[widthField*curStr] == gField[widthField*curStr+widthField]
            && gField[widthField*curStr] != "n"){
            res = true;
         };
         for(var i = widthField*curStr+1; i < widthField*(widthField-1); i++){
            // check middle lines
            if (gField[i-1] == gField[i] && gField[i] == gField[i+1] && gField[i] != "n"){
               res = true;
            }
            // check middle column
            if (gField[i-widthField] == gField[i] && gField[i] == gField[i+widthField] && gField[i] != "n"){
               res = true;
            }
            // check fist diagonal
            if (gField[i-widthField-1] == gField[i] && gField[i] == gField[i+widthField+1] && gField[i] != "n"){
               res = true;
            }
            // check last diagonal
            if (gField[i-widthField+1] == gField[i] && gField[i] == gField[i+widthField-1] && gField[i] != "n"){
               res = true;
            }
         }
         // check last column
         if (gField[widthField*curStr-1] == gField[widthField*curStr+widthField-1]
            && gField[widthField*curStr+widthField-1] == gField[widthField*curStr+widthField*2-1]
            && gField[widthField*curStr+widthField-1] != "n"){
            res = true;
         };
         // next line
         curStr++;
      };
      // check last line
      for(var i = widthField*(widthField-1)+1; i < widthField*widthField; i++){
         if (gField[i-1] == gField[i] && gField[i] == gField[i+1] && gField[i] != "n"){
            res = true;
         };
      };
      return res;
   }
//##--
   this.setCell = function(index){
      var res = false;
      if (gField[index] == "n"){
         gField[index] = gField[index] + curPl;
         res = true;
      };
      return res;
   }
};

function initField(n, l){
   var f = [];
   for (var i=0; i<l*l; i++){
      f.push("n");
   }
   var res = new tGame(f, l, n);
   return res;
};



var numOfPlayers = 2;
var numOfCells = 3;
var player = false;

var curGame = initField(numOfPlayers, numOfCells);
// grafic user interface level
// init
var gField = document.getElementById('gameField');         
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
// flow
function getMove(){
   
   if (curGame.setCell(this.getAttribute('celNum'))){
//alert(curGame.gField[this.getAttribute('celNum')]);
      this.className = "cel" + curGame.nextPlayer();
      if (curGame.checkWinner()){
         alert("you win");
      };
   };
   //alert(curGame.widthField);
};

