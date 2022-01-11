import { Literal } from "../../utils/types"
import Cell from "../Cell"

export default class ArrayCell extends Cell {
  array: number[];

  constructor(array: number[]) {
    super();
    this.array = array;
  }

  getValue(): Literal {
    return this.array;
  }

  content(): string {
    return `[${this.array.toString()}]`;
  }
}
