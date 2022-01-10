import { ASCII_TO_COL, COL_TO_ASCII } from "./ascii";
import { ReferenceString } from "./types";

export default class Reference {
  column: number;
  line: number;

  constructor(col: string, line: string) {
    this.line = Number(line) - 1
    this.column = ASCII_TO_COL(col)
  }

  getReferenceString(): ReferenceString {
      return [COL_TO_ASCII(this.column), (this.line + 1).toString()]
  }
}