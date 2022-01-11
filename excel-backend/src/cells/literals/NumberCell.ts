import { Literal } from "../../utils/types"
import Cell from "../Cell"

export default class NumberCell extends Cell{
    num: number

    constructor(num: number) {
        super()
        this.num = num
    }

    getValue():Literal {
        return this.num
    }

    content(): string {
        return this.num.toString()
    }
}
