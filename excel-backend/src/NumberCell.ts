import Cell from "./Cell"

export default class NumberCell extends Cell{
    num: number

    constructor(line: number, column: number, num: number) {
        super(line, column)
        this.isEmpty = false
        this.num = num
    }
}