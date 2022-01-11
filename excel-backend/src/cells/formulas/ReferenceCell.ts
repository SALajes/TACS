import { Literal } from "../../utils/types"
import Cell from "../Cell"
import FormulaCell from "./FormulaCell"
import Reference from "../../utils/Reference"

export default class ReferenceCell extends FormulaCell {
    reference: Reference

    constructor(reference: Reference) {
        super(`=${reference.getReferenceString()[0]}${reference.getReferenceString()[1]}`)
        this.formula = `=${reference.getReferenceString()[0]}${reference.getReferenceString()[1]}`
        this.reference = reference
    }

    analyseDependencies(cells: Cell[]): void {
        this.analyseDependency(cells, [this.reference])
    }

    findReferenceRoot(): Cell {
        let cell: Cell = this.dependencies[0]
        while (cell instanceof ReferenceCell) {
            cell = cell.dependencies[0]
        }
        return cell
    }

    calculateValue(): Literal {
        if (this.dependencies.length === 0)
            return ''
        return this.dependencies[0].getValue()
    }
}
