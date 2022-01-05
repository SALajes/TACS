import Cell from "../Cell";
import FormulaCell from "./FormulaCell"
import BinaryOperationCell from "./BinaryOperationCell"
import { Literal, Operand } from "../../utils/types"

// SUM(X, X') -> somar dois valores ou SUM(X:X') -> somar todas as celulas num intervalo

export default class SumCell extends BinaryOperationCell {
    constructor(formula: string, op1: Operand, op2: Operand){
        super(formula, op1, op2)
    }

    calculateValue(): Literal {
        const result : [Literal, Literal] = this.operandsValueExtraction()

        if (typeof result[0] === "number" && typeof result[1] === "number"){
            return result[0] + result[1]
        }
        else {
            this.hasException = true
            return "!Invalid Types!"
        }
    }
}
