package cs361.battleships.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;

public class Ship {

	private String kind;
	private int length;
	private boolean vertical;
	@JsonProperty private List<Square> occupiedSquares;

	public Ship() {
		occupiedSquares = new ArrayList<>();
	}

	// Default constructor that initializes a ship object
	public Ship(String kind) {
		//TODO implement
		// Based on the string being passed to the function it uses a equality to determine what is the ships type
			// Also sets the length of the ship at the same time
		if (kind.equals("MINESWEEPER")) {

			this.length = 2;
			this.kind = "MINESWEEPER";

		} else if (kind.equals("DESTROYER")) {

			this.length = 3;
			this.kind = "DESTROYER";

		} else {

			this.length = 4;
			this.kind = "BATTLESHIP";
		}

		// An array list that houses square objects that corresponds to the squares that the ship occupies
		this.occupiedSquares = new ArrayList<>();

	}
	// Returns an array list of all the occupied squares
	public List<Square> getOccupiedSquares() {
		return occupiedSquares;
	}

	// Allows the user to add a new square object to the occupiedSquares list of a ship
	public void setSquare(int x, char y){
		this.occupiedSquares.add(new Square(x, y));
	}

	// Returns the length of the ship
	public int getLength() {
		return length;
	}

	// Returns a bool to determine if the ship is vertical or not
	public boolean isVertical() {
		// Determines whether or not the ship is vertical
		if (vertical) {
			return true;
		} else {
			return false;
		}
	}

	// Allows the user to set the verticallity of the ship
	public void setVertical(boolean verticality) {
		this.vertical = verticality;
	}

	// Returns the type of ship that this function is being called on
	public String getKind() {
		return kind;
	}

}
