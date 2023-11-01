import Cell from "./cell.js"

export default class Grid {
  constructor(height, width, gameState) {
    this.height = height;
    this.width = width;
    this.cells = this.createCells(gameState);
  }

  createCells(gameState) {
    const cells = [];
    for (let i = 0; i < this.height * this.width; i++) {
      var newCell = new Cell(i, gameState[i]);
      cells.push(newCell);
    }
    return cells;
  }

  setCellValue(valuearr) {
    if (valuearr.length !== this.height * this.width) {
      throw new Error('Setting new cell value with an array of wrong length', valuearr.length);
    }

    // Loop through the cells and set their values based on the array
    this.cells.forEach((cell, index) => {
      cell.setValue(valuearr[index]);
    });
  }

  getCellAtIndex(index) {
    if (index < 0 || index >= this.cells.length) {
      throw new Error('Index out of bounds');
    }
    return this.cells[index];
  }

  makeMove(from, to) {
    // Ensure that from and to are valid indices
    if (from < 0 || from >= this.cells.length || to < 0 || to >= this.cells.length) {
      throw new Error('Invalid move indices');
    }

    // Get the values at from and to indices
    const valueFrom = this.cells[from].value//.getValue();
    const valueTo = this.cells[to].value//.getValue();

    // Rewrite the value at the "to" index and clear the value at "from" index
    this.cells[to].value = valueFrom 
    this.cells[from].value = `` 

    // Log the updated grid
    console.log('Grid after move:', this.cells);
    // this.logGrid();

    // Return any additional information or status if needed
    // return {
    //   message: 'Move successful',
    //   from: { index: from, value: valueFrom },
    //   to: { index: to, value: valueTo },
    // };
  }

  logGrid() {
    // Log the grid for debugging purposes
    console.log(this.cells.map(cell => cell.getValue()));
  }
}