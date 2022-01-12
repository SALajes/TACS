import { Literal, ObjectLiteral, objectOperandToString } from "../../utils/types"
import Cell from "../Cell"

export default class ObjectCell extends Cell {
    obj: ObjectLiteral

    constructor(obj: ObjectLiteral) {
        super()
        this.obj = obj
    }

    getValue(): Literal {
        return this.obj
    }

    content(): string {
        return objectOperandToString(this.obj)
    }
}
