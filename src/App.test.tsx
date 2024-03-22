import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import App from './App';
import PiecesProvider from './store/context/Pieces.provider';
import userEvent from '@testing-library/user-event';
import MockProvider from './mocks/mock-provider';
import { cryptoMock } from './mocks/test-utils';
import {
  blackTurnPawn,
  pawnsInBlackCapturePosition,
} from './mocks/preloaded-state/pawn-mocks';
import {
  rookInHorizontalBlackCapturePosition,
  rookInVerticalDirectBlackCapturePosition,
  rookWithTwoPawnsInFront,
  rookWithTwoPawnsToTheRight,
} from './mocks/preloaded-state/rook-mocks';
import { kingInDefaultPosition } from './mocks/preloaded-state/king-mocks';

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

  describe('when a rook is selected,', () => {
    test('and it moves vertically to capture an opponent pawn directly in front of it, then the pawn should be captured', async () => {
      render(
        <MockProvider preloadedState={rookInVerticalDirectBlackCapturePosition}>
          <App />
        </MockProvider>,
      );

      const whiteRookBeforeMove = screen.getByRole('button', {
        name: 'white rook chess piece',
      });
      const boardDispositionBeforeMove = await screen.findAllByRole('button');

      await userEvent.click(whiteRookBeforeMove);

      const blackPawnBeforeCapture = screen.getByRole('img', {
        name: 'black pawn chess piece',
      });

      await userEvent.click(blackPawnBeforeCapture);

      const boardDispositionAfterMove = await screen.findAllByRole('button');

      expect(boardDispositionBeforeMove).not.toEqual(boardDispositionAfterMove);
    });

    test('and it attempts to capture an opponent pawn not directly in front of it, then the rook should not move', async () => {
      render(
        <MockProvider preloadedState={rookWithTwoPawnsInFront}>
          <App />
        </MockProvider>,
      );

      const whiteRookBeforeMove = screen.getByRole('button', {
        name: 'white rook chess piece',
      });

      await userEvent.click(whiteRookBeforeMove);

      const blackPawnsOnBoard = await screen.findAllByRole('img', {
        name: 'black pawn chess piece',
      });
      const lastBlackPawn = blackPawnsOnBoard[0];

      await userEvent.click(lastBlackPawn);

      const blackPawnsOnBoardAfterMove = await screen.findAllByRole('img', {
        name: 'black pawn chess piece',
      });

      expect(blackPawnsOnBoard).toEqual(blackPawnsOnBoardAfterMove);
    });

    test('and it moves horizontally to capture an opponent pawn directly beside it, then the pawn should be captured', async () => {
      render(
        <MockProvider preloadedState={rookInHorizontalBlackCapturePosition}>
          <App />
        </MockProvider>,
      );

      const whiteRookBeforeMove = screen.getByRole('button', {
        name: 'white rook chess piece',
      });
      const boardDispositionBeforeMove = await screen.findAllByRole('button');

      await userEvent.click(whiteRookBeforeMove);

      const blackPawnBeforeCapture = screen.getByRole('img', {
        name: 'black pawn chess piece',
      });

      await userEvent.click(blackPawnBeforeCapture);

      const boardDispositionAfterMove = await screen.findAllByRole('button');

      expect(boardDispositionBeforeMove).not.toEqual(boardDispositionAfterMove);
    });
  });

  test('and it attempts to capture an opponent pawn not directly beside it, then the rook should not move', async () => {
    render(
      <MockProvider preloadedState={rookWithTwoPawnsToTheRight}>
        <App />
      </MockProvider>,
    );

    const whiteRookBeforeMove = screen.getByRole('button', {
      name: 'white rook chess piece',
    });

    await userEvent.click(whiteRookBeforeMove);

    const blackPawnsOnBoard = await screen.findAllByRole('img', {
      name: 'black pawn chess piece',
    });
    const lastBlackPawn = blackPawnsOnBoard[blackPawnsOnBoard.length - 1];

    await userEvent.click(lastBlackPawn);

    const blackPawnsOnBoardAfterMove = await screen.findAllByRole('img', {
      name: 'black pawn chess piece',
    });

    expect(blackPawnsOnBoard).toEqual(blackPawnsOnBoardAfterMove);
  });

  test('when a piece with no possible moves is selected, no possible moves should display on the board', async () => {
    render(
      <MockProvider preloadedState={kingInDefaultPosition}>
        <App />
      </MockProvider>,
    );

    const whiteKing = screen.getByRole('button', {
      name: 'white king chess piece',
    });

    await userEvent.click(whiteKing);

    const possibleMove = await screen.queryByTestId('possible-move');

    expect(possibleMove).toBeNull();
  });
});
