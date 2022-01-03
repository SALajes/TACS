import Cell from "../Cell";
import FormulaCell from "./FormulaCell"
import BinaryOperationCell from "./BinaryOperationCell"
import { Literal, Operand } from "../../utils/types"

// SUM(X, X') -> somar dois valores ou SUM(X:X') -> somar todas as celulas num intervalo

export default class SumCell extends BinaryOperationCell {
    op1 : Operand
    op2 : Operand

    constructor(formula: string, op1: Operand, op2: Operand){
        super(formula, op1, op2)

        this.op1 = op1
        this.op2 = op2
    }

    calculateValue(): string {
        let result : [Literal, Literal] = this.operandsValueExtraction(this.op1, this.op2)

        if (typeof result[0] === "number" && typeof result[1] === "number"){
            this.value = result[0] + result[1]
            return this.value.toString()
        }
        else return "!Types don't match!"
    }
}
