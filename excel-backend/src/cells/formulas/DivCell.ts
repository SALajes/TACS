import Cell from "../Cell";
import FormulaCell from "./FormulaCell"
import OperationCell from "./OperationCell"
import { Literal, Operand } from "../../utils/types"

export default class DivCell extends OperationCell {
    constructor(formula: string, operands: Operand[]){
        super(formula, operands);
        this.minNumArgs = 2;
        this.maxNumArgs = 2;
    }

    calculateValue(): Literal {
        const values : Literal[] = this.operandsValueExtraction()
        if(!this.validNumArgs(values.length)) return "!Wrong Number of Arguments!"

        if (typeof values[0] === "number" && typeof values[1] === "number"){
            return values[0] / values[1]
        }
        else {
            this.hasException = true
            return "!Invalid Types!"
        }
    }
}
