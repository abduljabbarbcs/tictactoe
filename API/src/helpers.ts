import { splitEvery } from "ramda";

export const replaceChar = (origString:string, replaceChar:string, index:number) => {
    let firstPart = origString.substr(0, index);
    let lastPart = origString.substr(index + 1);

    let newString = firstPart + replaceChar + lastPart;
    return newString;
}

export const serverMove =  (board:string) => {
     const emptySpots = [];
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "=") {
          emptySpots.push(i);
        }
      }
      const index = emptySpots[Math.floor(Math.random() * Math.floor(emptySpots.length))];
      return {x: Math.floor(index/3),y:index%3,value:"O", actual:index};
};

export const findNewSubmission= (newBoard:String, board:string) => {
  let i = 0;
  for( ; i < newBoard.length ; i++){
    if(newBoard[i] !== board[i]){
      break;
    }
  }
  return {x:Math.floor(i/3),y:i%3,value:"X"};
};

const covertStringToMatrix = (list:string) => {
  const matrix:any = splitEvery(3,list);
  matrix[0] =   matrix[0].split("");
  matrix[1] =   matrix[1].split("");
  matrix[2] =   matrix[2].split("");
  return matrix;
};

const winner = (value:string) => value.toLowerCase() === 'x' ? "X_WON" : "O_WON";
const checkOccurances = (list:string,str:string) => list.split(str).length - 2;
export const move = (list:string, update:any) => {
        const board =  covertStringToMatrix(list);
        const n =3;
        const {x,y,value} = update;
        board[x][y] = value;
        //check column
        for(let i = 0; i < n; i++){
            if(board[x][i].toLowerCase() != value.toLowerCase())
                break;
            if(i == n-1){
                return winner(value);
            }
        }

        //check row
        for(let i = 0; i < n; i++){
            if(board[i][y].toLowerCase()  != value.toLowerCase())
                break;
            if(i == n-1){
                return winner(value);
            }
        }

        //check diag
        if(x == y){
            //we're on a diagonal
            for(let i = 0; i < n; i++){
                if(board[i][i].toLowerCase()  != value.toLowerCase() )
                    break;
                if(i == n-1){
                    return winner(value);
                }
            }
        }

        //check anti diag
        if(x + y == n - 1){
            for(let i = 0; i < n; i++){
                if(board[i][(n-1)-i].toLowerCase()  != value.toLowerCase() )
                    break;
                if(i == n-1){
                    return winner(value);
                }
            }
        }
        if(checkOccurances(list,"=") === 0){
          return "DRAW";
        }
        return "RUNNING"
};