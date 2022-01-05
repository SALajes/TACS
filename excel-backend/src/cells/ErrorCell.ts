import { Literal } from "../utils/types"
import Cell from "./Cell"

export default class ErrorCell extends Cell {
    str: string

    constructor(str: string) {
        super()
        this.str = str
    }

    getValue(): Literal {
        return `!Syntax error!`
    }

    content(): string {
        return this.str
    }
}
