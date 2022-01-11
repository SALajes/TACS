import OperationCell from "./OperationCell"
import { Literal, Operand } from "../../../utils/types"

export default class LenCell extends OperationCell {
    constructor(formula: string, operands: Operand[]){
        super(formula, operands);
        this.minNumArgs = 1;
        this.maxNumArgs = 1;
    }

    calculateValue(): Literal {
        const values : Literal[] = this.operandsValueExtraction()
        if(!this.validNumArgs(values.length)) return "!Wrong Number of Arguments!"

        if (Array.isArray(values[0])){
            return values[0].length
        }
        else {
            this.hasException = true
            return "!Invalid Types!"
        }
    }
}
