import { render, screen, fireEvent } from "@testing-library/react";
import { EvolvePawnPanel } from "../components/EvolvePawnHandler";
import React from 'react';
import { shallow } from 'enzyme';
 

describe("EvolvePawnPanel", () => {
  test("should update game representation and moved pieces on piece selection", () => {
    const pawnToEvolveIndex = 2;
    const setMovedPieces = jest.fn();
    const setPawnToEvolveIndex = jest.fn();
    const setGameRepresentation = jest.fn();
    const setCurPlayer = jest.fn();

    render(
      <EvolvePawnPanel
        pawnToEvolveIndex={pawnToEvolveIndex}
        setMovedPieces={setMovedPieces}
        setPawnToEvolveIndex={setPawnToEvolveIndex}
        gameRepresentation={[ 
        ["", "", "P2", "", "K1", "", "", ""],
        ["", "", "", "P3", "", "", "", "p1"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "B1", "", ""],
        ["", "", "", "", "", "", "", ""], 
        ["", "", "", "", "", "", "P1", ""],
        ["", "", "", "", "k1", "", "", ""],]} // Provide your game representation data here
        setGameRepresentation={setGameRepresentation}
        curPlayer="white"
        setCurPlayer={setCurPlayer}
        movedPieces={{
        K1:true
        }}
      />
    );

    // Click on a piece selection
    fireEvent.click(screen.getByText("N"));

    // Assertions
    expect(setGameRepresentation).toHaveBeenCalledTimes(1);
    expect(setCurPlayer).toHaveBeenCalledTimes(1);
    expect(setPawnToEvolveIndex).toHaveBeenCalledWith(false);
    expect(setMovedPieces).toHaveBeenCalledTimes(1);
    expect(setMovedPieces).toHaveBeenCalledWith({
      N1: true, // Adjust based on the selected piece and count
    });
  });
});

test("handlePieceSelection should be called when a letter is clicked", () => {
  const handlePieceSelectionMock = jest.fn();
  
  // Render the component and pass the mock function as the handlePieceSelection prop
  const wrapper = shallow(
    <EvolvePawnPanel
      pawnToEvolveIndex={3}
      setMovedPieces={jest.fn()}
      setPawnToEvolveIndex={jest.fn()}
      gameRepresentation={[]}
      setGameRepresentation={jest.fn()}
      curPlayer="black"
      movedPieces={{}}
      gameHistory={[]}
      sendTurn={jest.fn()}
      handlePieceSelection={handlePieceSelectionMock} // Pass the mock function
    />
  );

  // Simulate a click on a letter
  wrapper.find(".n").first().simulate("click");

  // Verify that handlePieceSelection was called with the correct arguments
  expect(handlePieceSelectionMock).toHaveBeenCalledWith("n");
});
// import Board from "../components/Board";

// describe("Board", () => {
//   test("should move and evolve pawn to knight", () => {
//     render(<Board height={8} width={8} curPlayer="white" setCurPlayer={jest.fn()} />);

//     // Initial state
//     expect(screen.queryByText("N")).toBeNull();

//     // Click on P2 (pawn) to select
//     fireEvent.click(screen.getByText("P2"));
//     // expect(screen.getByText("P2")).toHaveClass("selected");

//     // Click on an empty backrank cell (e.g., K1 position)
//     fireEvent.click(screen.getByTestId("cell-2"));
//     expect(screen.getByText("P2")).toBeInTheDocument();

//     // Click on N1 (evolved piece)
//     fireEvent.click(screen.getByText("N1"));
//     expect(screen.getByText("N1")).notToHaveClass("selected");

//     // Assertions for state after evolution
//     expect(screen.queryByText("P2")).toBeNull();
//     expect(screen.getByText("N1")).toBeInTheDocument();
//   });
// });
