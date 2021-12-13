import Cell from "./Cell"

export default class ErrorCell extends Cell {
    str: string

    constructor(str: string) {
        super()
        this.isEmpty = false
        this.str = str
    }

    view(): string {
        return `Error: ${this.str}`
    }

    content(): string {
        return this.str
    }
}
