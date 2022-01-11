import OperationCell from "./OperationCell"
import { Literal, Operand } from "../../../utils/types"

export default class AtCell extends OperationCell {
    constructor(formula: string, operands: Operand[]) {
        super(formula, operands);
        this.minNumArgs = 2;
        this.maxNumArgs = 2;
    }

    calculateValue(): Literal {
        const values: Literal[] = this.operandsValueExtraction()
        if (!this.validNumArgs(values.length)) return "!Wrong Number of Arguments!"

        if (Array.isArray(values[0]) && typeof values[1] === "number") {
            if (values[0].length <= values[1]) {
                this.hasException = true
                return "!Index out of bounds!"
            }
            if (values[1] < 0) {
                this.hasException = true
                return "!The index must be a positive number!"
            }
            if (!Number.isInteger(values[1])) {
                this.hasException = true
                return "!The index must be an integer!"
            }
            return values[0][values[1]]
        }
        else {
            this.hasException = true
            return "!Invalid Types!"
        }
    }
}
