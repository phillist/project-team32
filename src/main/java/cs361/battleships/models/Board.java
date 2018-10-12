package cs361.battleships.models;

import java.util.ArrayList;
import java.util.List;

public class Board {

	private Square[][] board;
	private ArrayList<Ship> ships;

	/*
	DO NOT change the signature of this method. It is used by the grading scripts.
	 */
	public Board() {
		// TODO Implement
		// Create a new 10x10 2D array as the game board
		board = new Square[10][10];

		// Puts squares in the 2D array
		for (int i = 0; i < 10; i++) {
			for (char j = 'A'; j < 10; j++) {
				board[i][j] = new Square(i, j);
			}
		}

		// Adds one of each ship to the board object
		ships = new ArrayList<>();
		ships.add(new Ship("MINESWEEPER"));
		ships.add(new Ship("DESTROYER"));
		ships.add(new Ship("BATTLESHIP"));

	}

	/*
	DO NOT change the signature of this method. It is used by the grading scripts.
	 */
	public boolean placeShip(Ship ship, int x, char y, boolean isVertical) {
		// TODO Implement

		int length = ship.getLength();
		int maxRow;
		char maxCol;

		// Check the bounds to make sure that the ship is not exceeding them
			// If the ship is vertical then figure out the max
		if (isVertical) {
			maxRow = x + length;
			if (maxRow > 10) {
				return false;
			}
		} else {
			maxCol = (char) (y + length);
			if (maxCol > 'J') {
				return false;
			}
		}

		// Check for ship overlap

		// If the ship is within the given bounds then you should add it to the board (2D array)
		for (int i=0; i<length; i++) {
			if (isVertical) {
				// Set the add the square to the ships occupied squares array list
				ship.setSquare(x + i, y);
			} else {
				ship.setSquare(x, (char) (y + i));
			}
		}

		return true;
	}

	/*
	DO NOT change the signature of this method. It is used by the grading scripts.
	 */
	public Result attack(int x, char y) {
		//TODO Implement
		return null;
	}

	public List<Ship> getShips() {
		//TODO implement
		return null;
	}

	public void setShips(List<Ship> ships) {
		//TODO implement
	}

	public List<Result> getAttacks() {
		//TODO implement
		return null;
	}

	public void setAttacks(List<Result> attacks) {
		//TODO implement
	}
}
