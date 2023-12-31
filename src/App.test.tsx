import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';
import PiecesProvider from './store/context/Pieces.provider';
import userEvent from '@testing-library/user-event';

describe('Given a web page,', () => {
  test('when there is a title, then it should appear on the screen', () => {
    render(<App />);

    const title = screen.getByRole('heading', { name: 'Chess' });

    expect(title).toBeInTheDocument();
  });

  test('when there is a user feedback message, then it should appear on the screen', () => {
    render(<App />);

    const userFeedback = screen.getByRole('heading', {
      name: '🚧 ...Under construction... 🚧',
    });

    expect(userFeedback).toBeInTheDocument();
  });
});

describe('Given a chess game,', () => {
  describe('when a pawn within the board is selected,', () => {
    beforeEach(() => {
      render(
        <PiecesProvider>
          <App />
        </PiecesProvider>,
      );
    });

    test('then the square in which it is in should be highlighted', async () => {
      const allWhitePawns = await screen.findAllByRole('img', {
        name: 'white pawn chess piece',
      });

      await userEvent.click(allWhitePawns[0]);

      const clickedSquare = await screen.findByTestId('square--isSelected');

      expect(clickedSquare);
    });

    test('then the positions to which it can move should be marked for the user to see', async () => {
      const allWhitePawns = await screen.findAllByRole('img', {
        name: 'white pawn chess piece',
      });

      await userEvent.click(allWhitePawns[0]);

      const possibleMoves = await screen.findAllByTestId(
        'square--possible-move',
      );

      expect(possibleMoves);
    });

    test('and the same piece is clicked again, nothing should change', async () => {
      const allWhitePawns = await screen.findAllByRole('img', {
        name: 'white pawn chess piece',
      });

      await userEvent.click(allWhitePawns[0]);

      const selectedPawn = await screen.findByTestId('square--isSelected');

      await userEvent.click(allWhitePawns[0]);

      const selectedPawnAfterSecondClick =
        await screen.findByTestId('square--isSelected');

      expect(selectedPawn).toEqual(selectedPawnAfterSecondClick);
    });

    test('and a valid new position is selected, then the piece should move to that new position', async () => {
      const allWhitePawnsBeforeMove = await screen.findAllByRole('img', {
        name: 'white pawn chess piece',
      });
      const boardDispositionBeforeMove = await screen.findAllByRole('button');

      await userEvent.click(allWhitePawnsBeforeMove[0]);

      const possibleMoves = await screen.findAllByTestId(
        'square--possible-move',
      );

      await userEvent.click(possibleMoves[0]);

      const boardDispositionAfterMove = await screen.findAllByRole('button');

      expect(boardDispositionBeforeMove).not.toEqual(boardDispositionAfterMove);
    });

    test('and an invalid new position is selected, then nothing should change', async () => {
      const allWhitePawnsBeforeMove = await screen.findAllByRole('img', {
        name: 'white pawn chess piece',
      });

      await userEvent.click(allWhitePawnsBeforeMove[0]);

      const selectedPawn = await screen.findByTestId('square--isSelected');
      const boardDispositionBeforeMove = await screen.findAllByRole('button');
      const emptySquares = await screen.findAllByTestId('empty-square');
      const invalidNewPosition = emptySquares[0];

      await userEvent.click(invalidNewPosition);

      const selectedPawnAfterSecondClick =
        await screen.findByTestId('square--isSelected');
      const boardDispositionAfterMove = await screen.findAllByRole('button');

      expect(selectedPawn).toEqual(selectedPawnAfterSecondClick);
      expect(boardDispositionBeforeMove).toEqual(boardDispositionAfterMove);
    });

    test('and then a different pawn of the same colour is selected, then the new pawn should be selected and the previous one unselected', async () => {
      const allWhitePawns = await screen.findAllByRole('img', {
        name: 'white pawn chess piece',
      });

      await userEvent.click(allWhitePawns[0]);

      const firstSelectedPawn = await screen.findByTestId('square--isSelected');

      await userEvent.click(allWhitePawns[1]);

      const newSelectedPawn = await screen.findByTestId('square--isSelected');

      expect(firstSelectedPawn).not.toEqual(newSelectedPawn);
    });

    test('and the colour does not match the current turn, then nothing should change on the board', async () => {
      const allWhitePawns = await screen.findAllByRole('img', {
        name: 'white pawn chess piece',
      });

      await userEvent.click(allWhitePawns[0]);

      const firstSelectedPawn = await screen.findByTestId('square--isSelected');
      const allBlackPawns = await screen.findAllByRole('img', {
        name: 'black pawn chess piece',
      });

      await userEvent.click(allBlackPawns[0]);

      const sameSelectedPawnAfterClick =
        await screen.findByTestId('square--isSelected');

      expect(firstSelectedPawn).toEqual(sameSelectedPawnAfterClick);
    });

    test('and a piece which is not a pawn is selected after, then nothing should change on the board', async () => {
      const allWhitePawns = await screen.findAllByRole('img', {
        name: 'white pawn chess piece',
      });

      await userEvent.click(allWhitePawns[0]);

      const selectedPawn = await screen.findByTestId('square--isSelected');

      const whiteQueen = await screen.findByRole('img', {
        name: 'white queen chess piece',
      });

      await userEvent.click(whiteQueen);

      const prevSelectedPawn = await screen.findByTestId('square--isSelected');

      expect(selectedPawn).toEqual(prevSelectedPawn);
    });
  });

  test('when the opposite player selects a pawn and makes a move to a valid new position, then the pawn should move', async () => {
    render(
      <PiecesProvider>
        <App />
      </PiecesProvider>,
    );

    const allWhitePawns = await screen.findAllByRole('img', {
      name: 'white pawn chess piece',
    });

    await userEvent.click(allWhitePawns[0]);

    const possibleWhiteMoves = await screen.findAllByTestId(
      'square--possible-move',
    );

    await userEvent.click(possibleWhiteMoves[0]);

    const boardDispositionBeforeBlackMove =
      await screen.findAllByRole('button');
    const allBlackPawns = await screen.findAllByRole('img', {
      name: 'black pawn chess piece',
    });

    await userEvent.click(allBlackPawns[0]);

    const possibleBlackMoves = await screen.findAllByTestId(
      'square--possible-move',
    );

    await userEvent.click(possibleBlackMoves[0]);

    const boardDispositionAfterBlackMove = await screen.findAllByRole('button');

    expect(boardDispositionBeforeBlackMove).not.toEqual(
      boardDispositionAfterBlackMove,
    );
  });

  test('when no pieces are selected and an empty square is clicked, then nothing should change', async () => {
    render(
      <PiecesProvider>
        <App />
      </PiecesProvider>,
    );

    const allSquares = await screen.findAllByRole('button');
    const emptySquares = await screen.findAllByTestId('empty-square');
    const emptySquare = emptySquares[0];
    const unselectedSquares = await screen.findAllByTestId('');

    await userEvent.click(emptySquare);

    expect(allSquares.length).toEqual(unselectedSquares.length);
  });
});
