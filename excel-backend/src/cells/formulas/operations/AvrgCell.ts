import OperationCell from "./OperationCell"
import { Literal, Operand } from "../../../utils/types"

export default class AvrgCell extends OperationCell {
    constructor(formula: string, operands: Operand[]) {
        super(formula, operands);
        this.minNumArgs = 1;
    }

    calculateValue(): Literal {
        const values: Literal[] = this.operandsValueExtraction()
        if (!this.validNumArgs(values.length)) return "!Wrong Number of Arguments!"

        let total: number = 0
        let count: number = 0
        for (const value of values) {
            if (typeof value === "number") total += value, count++
            else if (Array.isArray(value)) {
                total += value.reduce((s, elem) => s + elem, 0)
                count += value.length
            }
            else {
                this.hasException = true
                return "!Invalid Types!"
            }
        }
        return total/count
    }
}
