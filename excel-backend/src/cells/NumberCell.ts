import Cell from "./Cell"

export default class NumberCell extends Cell{
    num: number

    constructor(num: number) {
        super()
        this.num = num
    }

    view():string {
        return this.num.toString()
    }

    content(): string {
        return this.num.toString()
    }
}
