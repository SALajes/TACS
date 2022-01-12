import OperationCell from "./OperationCell"
import { Literal, Operand } from "../../../utils/types"

export default class SumCell extends OperationCell {
    constructor(formula: string, operands: Operand[]){
        super(formula, operands)
        this.minNumArgs = 1
    }

    calculateValue(): Literal {
        const values: Literal[] = this.operandsValueExtraction()
        if (!this.validNumArgs(values.length)) return "!Wrong Number of Arguments!"

        let sum: number = 0
        for (const value of values) {
            if (typeof value === "number") sum += value
            else if (Array.isArray(value)) sum += value.reduce((s, elem) => s + elem, 0)
            else {
                this.hasException = true
                return "!Invalid Types!"
            }
        }
        return sum
    }
}
