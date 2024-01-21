import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import App from './App';
import PiecesProvider from './store/context/Pieces.provider';
import userEvent from '@testing-library/user-event';
import MockProvider from './mocks/mock-provider';
import {
  blackTurnPawn,
  pawnsInBlackCapturePosition,
} from './mocks/preloaded-state';
import { cryptoMock } from './mocks/test-utils';

describe('Given a web page,', () => {
  test('when there is a title, then it should appear on the screen', () => {
    render(<App />);

    const title = screen.getByRole('heading', { name: 'Chess' });

    expect(title).toBeInTheDocument();
  });
});

describe('Given a chess game,', () => {
  describe('when a pawn within the board is selected,', () => {
    beforeEach(() => {
      cryptoMock;
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

      const clickedSquare = await screen.findByTestId('selected-piece');

      expect(clickedSquare);
    });

    test('then the positions to which it can move should be marked for the user to see', async () => {
      const allWhitePawns = await screen.findAllByRole('img', {
        name: 'white pawn chess piece',
      });

      await userEvent.click(allWhitePawns[0]);

      const possibleMoves = await screen.findAllByTestId('possible-move');

      expect(possibleMoves);
    });

    test('and the same piece is clicked again, nothing should change', async () => {
      const allWhitePawns = await screen.findAllByRole('img', {
        name: 'white pawn chess piece',
      });

      await userEvent.click(allWhitePawns[0]);

      const selectedPawn = await screen.findByTestId('selected-piece');

      await userEvent.click(allWhitePawns[0]);

      const selectedPawnAfterSecondClick =
        await screen.findByTestId('selected-piece');

      expect(selectedPawn).toEqual(selectedPawnAfterSecondClick);
    });

    test('and a valid new position is selected, then the piece should move to that new position', async () => {
      const allWhitePawnsBeforeMove = await screen.findAllByRole('img', {
        name: 'white pawn chess piece',
      });
      const boardDispositionBeforeMove = await screen.findAllByRole('button');

      await userEvent.click(allWhitePawnsBeforeMove[0]);

      const possibleMoves = await screen.findAllByTestId('possible-move');

      await userEvent.click(possibleMoves[0]);

      const boardDispositionAfterMove = await screen.findAllByRole('button');

      expect(boardDispositionBeforeMove).not.toEqual(boardDispositionAfterMove);
    });

    test('and an invalid new position is selected, then nothing should change', async () => {
      const allWhitePawnsBeforeMove = await screen.findAllByRole('img', {
        name: 'white pawn chess piece',
      });

      await userEvent.click(allWhitePawnsBeforeMove[0]);

      const selectedPawn = await screen.findByTestId('selected-piece');
      const boardDispositionBeforeMove = await screen.findAllByRole('button');
      const emptySquares = await screen.findAllByTestId('empty-square');
      const invalidNewPosition = emptySquares[0];

      await userEvent.click(invalidNewPosition);

      const selectedPawnAfterSecondClick =
        await screen.findByTestId('selected-piece');
      const boardDispositionAfterMove = await screen.findAllByRole('button');

      expect(selectedPawn).toEqual(selectedPawnAfterSecondClick);
      expect(boardDispositionBeforeMove).toEqual(boardDispositionAfterMove);
    });

    test('and then a different pawn of the same colour is selected, then the new pawn should be selected and the previous one unselected', async () => {
      const allWhitePawns = await screen.findAllByRole('img', {
        name: 'white pawn chess piece',
      });

      await userEvent.click(allWhitePawns[0]);

      const firstSelectedPawn = await screen.findByTestId('selected-piece');

      await userEvent.click(allWhitePawns[1]);

      const newSelectedPawn = await screen.findByTestId('selected-piece');

      expect(firstSelectedPawn).not.toEqual(newSelectedPawn);
    });

    test('and the colour does not match the current turn, then nothing should change on the board', async () => {
      const allWhitePawns = await screen.findAllByRole('img', {
        name: 'white pawn chess piece',
      });

      await userEvent.click(allWhitePawns[0]);

      const firstSelectedPawn = await screen.findByTestId('selected-piece');
      const allBlackPawns = await screen.findAllByRole('img', {
        name: 'black pawn chess piece',
      });

      await userEvent.click(allBlackPawns[0]);

      const sameSelectedPawnAfterClick =
        await screen.findByTestId('selected-piece');

      expect(firstSelectedPawn).toEqual(sameSelectedPawnAfterClick);
    });

    test('and a piece which is not a pawn is selected after, then nothing should change on the board', async () => {
      const allWhitePawns = await screen.findAllByRole('img', {
        name: 'white pawn chess piece',
      });

      await userEvent.click(allWhitePawns[0]);

      const selectedPawn = await screen.findByTestId('selected-piece');

      const whiteQueen = await screen.findByRole('img', {
        name: 'white queen chess piece',
      });

      await userEvent.click(whiteQueen);

      const prevSelectedPawn = await screen.findByTestId('selected-piece');

      expect(selectedPawn).toEqual(prevSelectedPawn);
    });

    test('and it moves to capture another piece, then the opposite piece should be captured', async () => {
      cleanup();
      render(
        <MockProvider preloadedState={pawnsInBlackCapturePosition}>
          <App />
        </MockProvider>,
      );

      const boardDispositionBeforeCapture =
        await screen.findAllByRole('button');

      const whitePawnBeforeMove = screen.getByRole('img', {
        name: 'white pawn chess piece',
      });

      await userEvent.click(whitePawnBeforeMove);

      const blackPawnBeforeCapture = screen.getByRole('img', {
        name: 'black pawn chess piece',
      });

      await userEvent.click(blackPawnBeforeCapture);

      const boardDispositionAfterCapture = await screen.findAllByRole('button');

      expect(boardDispositionBeforeCapture).not.toEqual(
        boardDispositionAfterCapture,
      );
    });
  });

  test('when the opposite player selects a pawn and makes a move to a valid new position, then the pawn should move', async () => {
    render(
      <MockProvider preloadedState={blackTurnPawn}>
        <App />
      </MockProvider>,
    );

    const boardDispositionBeforeBlackMove =
      await screen.findAllByRole('button');
    const blackPawn = await screen.findByRole('img', {
      name: 'black pawn chess piece',
    });

    await userEvent.click(blackPawn);

    const possibleBlackMoves = await screen.findAllByTestId('possible-move');

    await userEvent.click(possibleBlackMoves[0]);

    const boardDispositionAfterBlackMove = await screen.findAllByRole('button');

    expect(boardDispositionBeforeBlackMove).not.toEqual(
      boardDispositionAfterBlackMove,
    );
  });
});
