package cs361.battleships.models;

import java.util.ArrayList;
import java.util.List;

public class Board {
	private List<Ship> ships;
	private List<Result> attacks;

	private Square[][] board;
	//private ArrayList<Ship> ships;

	/*
	DO NOT change the signature of this method. It is used by the grading scripts.
	 */
	public Board() {
		// TODO Implement

		this.attacks = new ArrayList<Result>();
		this.ships = new ArrayList<Ship>();
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
		ship.setList(x,y);
		ships.add(ship);

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
		return this.ships;
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
