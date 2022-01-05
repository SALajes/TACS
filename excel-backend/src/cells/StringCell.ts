import { Literal } from "../utils/types"
import Cell from "./Cell"

export default class StringCell extends Cell {
    str: string

    constructor(str: string) {
        super()
        this.str = str
    }

    getValue(): Literal {
        return this.str
    }

    content(): string {
        return this.str
    }
}
