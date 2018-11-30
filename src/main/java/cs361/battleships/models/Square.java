package cs361.battleships.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@SuppressWarnings("unused")
public class Square {

	@JsonProperty private int row;
	@JsonProperty private char column;
	@JsonProperty private boolean hit = false;
	@JsonProperty private boolean capQuarter = false;
	// Gave the captain quarters armor so if it is hit it can be set to false and sent a MISS signal
	// This allows the cap quarters to be hit twice if given armor
	@JsonProperty private boolean capQuarterArmor = true;

	public Square() {
	}

	public Square(int row, char column) {
		this.row = row;
		this.column = column;
	}

	public Square(int row, char column, boolean capQuarter, boolean capQuarterArmor) {
		this.row = row;
		this.column = column;
		this.capQuarter = capQuarter;
		this.capQuarterArmor = capQuarterArmor;
	}

	public char getColumn() {
		return column;
	}

	public void setCapQuarterArmor() {
		capQuarterArmor = false;
	}
	public boolean hasCapQuarterArmor() {
		return capQuarterArmor;
	}
	public boolean isCapQuarter() {
		return capQuarter;
	}
	public void setCapQuarter() {
		capQuarter = true;
	}


	public int getRow() {
		return row;
	}

	public void setColumn(char newCol) {
		column = newCol;
	}

	public void setRow(int newRow) {
		row = newRow;
	}

	@Override
	public boolean equals(Object other) {
		if (other instanceof Square) {
			return ((Square) other).row == this.row && ((Square) other).column == this.column;
		}
		return false;
	}

	@Override
	public int hashCode() {
		return 31 * row + column;
	}

	@JsonIgnore
	public boolean isOutOfBounds() {
		return row > 10 || row < 1 || column > 'J' || column < 'A';
	}

	public boolean isHit() {
		return hit;
	}

	public void hit() {
		hit = true;
	}

	@Override
	public String toString() {
		return "(" + row + ", " + column + ')';
	}
}