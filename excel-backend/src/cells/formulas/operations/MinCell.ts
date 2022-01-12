import OperationCell from "./OperationCell"
import { Literal, Operand } from "../../../utils/types"

export default class MinCell extends OperationCell {
    constructor(formula: string, operands: Operand[]) {
        super(formula, operands);
        this.minNumArgs = 1;
    }

    calculateValue(): Literal {
        const values: Literal[] = this.operandsValueExtraction()
        if (!this.validNumArgs(values.length)) return "!Wrong Number of Arguments!"

        let all: number[] = []
        for (let value of values) {
            if (typeof value === "number") all.push(value)
            else if (Array.isArray(value)) all.push(...value)
            else {
                this.hasException = true
                return "!Invalid Types!"
            }
        }
        return Math.min(...all)
    }
}
