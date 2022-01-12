import OperationCell from "./OperationCell"
import { Literal, Operand } from "../../../utils/types"

export default class PropCell extends OperationCell {
    constructor(formula: string, operands: Operand[]) {
        super(formula, operands);
        this.minNumArgs = 2;
        this.maxNumArgs = 2;
    }

    calculateValue(): Literal {
        const values: Literal[] = this.operandsValueExtraction()
        if (!this.validNumArgs(values.length)) return "!Wrong Number of Arguments!"

        if (values[0] instanceof Object && !Array.isArray(values[0]) && typeof values[1] === "string") {
            if (!values[0].hasOwnProperty(values[1])) {
                this.hasException = true
                return "!Object doesn't have the specified property!"
            }
            return values[0][values[1]]
        }
        else {
            this.hasException = true
            return "!Invalid Types!"
        }
    }
}
