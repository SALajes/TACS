import Cell from "./Cell"

export default class NumberCell extends Cell{
    num: number

    constructor(line: number, column: number, num: number) {
        super(line, column)
        this.isEmpty = false
        this.num = num
    }

    view():string {
        return this.num.toString()
    }

    content(): string {
        return this.num.toString()
    }
}
