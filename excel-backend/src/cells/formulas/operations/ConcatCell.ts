import OperationCell from "./OperationCell"
import { Literal, Operand } from "../../../utils/types"

export default class ConcatCell extends OperationCell {
    constructor(formula: string, operands: Operand[]){
        super(formula, operands);
        this.minNumArgs = 2;
    }

    calculateValue(): Literal {
        const values : Literal[] = this.operandsValueExtraction()
        if(!this.validNumArgs(values.length)) return "!Wrong Number of Arguments!"

        let result: string = ""

        for(const v of values){
            if (typeof v === "string" || typeof v === "number"){
                result += v
            }
            else {
                this.hasException = true
                return "!Invalid Types!"
            }
        }
        return result
    }
}
