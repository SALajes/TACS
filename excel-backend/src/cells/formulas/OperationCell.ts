import Cell from "../Cell";
import FormulaCell from "./FormulaCell"
import { Operand, Literal } from "../../utils/types"
import { findInCells } from "../cellsManager";
import { ASCII_TO_COL } from "../../utils/ascii";
import ReferenceCell from "./ReferenceCell";
import Reference from "../../utils/Reference";


export default abstract class OperationCell extends FormulaCell{
    operands : Operand[]
    references: Reference[]
    minNumArgs: number
    maxNumArgs: number

    constructor(formula: string, operands: Operand[]){
        super(formula)
        this.operands = operands;

        const getReference = (operand: Operand): Reference => {
            if (operand instanceof Reference) return operand
            else return null
        }

        for (let i = 0; i < this.operands.length; i++)
            this.references[i] = getReference(this.operands[i])
    }

    protected validNumArgs(numArgs: number): boolean {
        return ((this.minNumArgs === undefined || this.minNumArgs <= numArgs) &&(this.maxNumArgs === undefined || this.maxNumArgs >= numArgs))
    }

    operandsValueExtraction(): Literal[]{
        const extractValue = (operand: Operand, reference: Reference): Literal =>{
            if(operand instanceof Reference) {
                let cell: Cell = findInCells(reference)
                if(cell instanceof ReferenceCell){
                    cell = cell.findReferenceRoot()
                }

                return cell.getValue()
            }
            else return operand
        }

        const literals: Literal[] = []

        for (let i = 0; i < this.operands.length; i++)
            literals.push(extractValue(this.operands[i], this.references[i]))

        return literals
    }

    analyseDependencies(cells: Cell[]): void {
        this.analyseDependency(cells, this.references)
    }
}
