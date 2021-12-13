import Cell from "./Cell"

export default class StringCell extends Cell {
    str: string

    constructor(str: string) {
        super()
        this.str = str
    }

    view(): string {
        return this.str
    }

    content(): string {
        return this.str
    }
}
