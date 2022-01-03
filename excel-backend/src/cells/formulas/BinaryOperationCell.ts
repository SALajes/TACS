import Cell from "../Cell";
import FormulaCell from "./FormulaCell"
import { Operand, Literal } from "../../utils/types"


export default abstract class BinaryOperationCell extends FormulaCell{    
    value : Literal

    constructor(formula: string, op1: Operand, op2: Operand){
        super(formula)

        this.operandsValueExtraction(op1, op2)
    }

    operandsValueExtraction(op1: Operand, op2: Operand): [Literal, Literal]{
        // extract values from cell literals or 
        return [null, null]
    }

    analyseDependencies(cells: Cell[]): void {
        throw new Error("Method not implemented.");
    }
}


