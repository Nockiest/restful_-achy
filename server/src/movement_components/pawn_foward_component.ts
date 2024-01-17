import { MovesComponentArgs } from "../types/types";
import straightMovesComponent from "./straightMoveComp";
const pawnStraightMoveComponent = ({
    startPosition,
    pieceColor,
    grid,
    range,
    directions,
    moved
  }: MovesComponentArgs & {moved:boolean}): number[] => {
    const real_move_range = moved ? 1 : 2
    let possibleMoves = straightMovesComponent({
        startPosition,
        pieceColor,
        grid,
        range:real_move_range,
        directions: pieceColor == 'white' ? [ "up"]:[ "down" ] ,
        moved
      } )
  
    console.log('possible straight moves',startPosition, possibleMoves);
    return possibleMoves;
  };

 
  
  export default pawnStraightMoveComponent
   
  