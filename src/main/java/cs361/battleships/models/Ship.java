package cs361.battleships.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;

public class Ship {

	@JsonProperty private List<Square> occupiedSquares;
	private String kind;
	private int length;

	public Ship(String kind) {
		if(kind.equals("MINESWEEPER")){
		    this.kind="MINESWEEPER";
		    this.length=2;
        }else if(kind.equals("DESTROYER")){
		    this.kind="DESTROYER";
		    this.length=3;
        }else if(kind.equals("BATTLESHIP")){
		    this.kind="BATTLESHIP";
            this.length=4;
		}
        this.occupiedSquares = new ArrayList<>();
		//TODO implement
	}

	public void setList(int x, char y){
        for(int i=0;i<this.length;i++){
            this.occupiedSquares.add(new Square(x+i,y));
        }
    }

	public String getKind(){
	    return this.kind;
    }

    public int getLength(){
	    return this.length;
    }

	public List<Square> getOccupiedSquares() {
		//TODO implement
		return this.occupiedSquares;
	}
}
