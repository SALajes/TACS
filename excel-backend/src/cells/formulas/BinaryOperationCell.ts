import Cell from "../Cell";
import FormulaCell from "./FormulaCell"
import { Operand, Literal } from "../../utils/types"
import { findInCells } from "../cellsManager";
import { ASCII_TO_COL } from "../../utils/ascii";
import ReferenceCell from "./ReferenceCell";


export default abstract class BinaryOperationCell extends FormulaCell{
    op1 : Operand
    op2 : Operand

    reference1: [number, number]
    reference2: [number, number]

    constructor(formula: string, op1: Operand, op2: Operand){
        super(formula)
        this.op1 = op1
        this.op2 = op2

        this.reference1 = Array.isArray(op1)? [Number(op1[1]) - 1, ASCII_TO_COL(op1[0])] : null
        this.reference2 = Array.isArray(op2)? [Number(op2[1]) - 1, ASCII_TO_COL(op2[0])] : null
    }

    operandsValueExtraction(): [Literal, Literal]{
        const extractValue = (op: Operand, reference: [number, number]): Literal =>{
            if(Array.isArray(op)) {
                let cell: Cell = findInCells(reference[0], reference[1])
                if(cell instanceof ReferenceCell){
                    cell = cell.findReferenceRoot()
                }

                return cell.getValue()
            }
            else return op
        }

        const literal1: Literal = extractValue(this.op1, this.reference1)
        const literal2: Literal = extractValue(this.op2, this.reference2)

        return [literal1, literal2]
    }

    analyseDependencies(cells: Cell[]): void {
        if(this.reference1 !== null) this.analyseDependency(cells, [this.reference1])
        if(this.reference2 !== null) this.analyseDependency(cells, [this.reference2])
    }
}
