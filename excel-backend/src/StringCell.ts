import Cell from "./Cell"

export default class StringCell extends Cell {
    str: string

    constructor(line: number, column: number, str: string) {
        super(line, column)
        this.isEmpty = false
        this.str = str
    }

    view(): string {
        return this.str
    }
}
