import { ASCII_TO_COL } from "../../utils/ascii"
import { Literal } from "../../utils/types"
import Cell from "../Cell"
import EmptyCell from "../EmptyCell"
import FormulaCell from "./FormulaCell"

export default class ReferenceCell extends FormulaCell {
    reference: [number, number]

    constructor(reference: [string, string]) {
        super(`=${reference[0]}${reference[1]}`)
        this.formula = `=${reference[0]}${reference[1]}`
        this.reference = [Number(reference[1]) - 1, ASCII_TO_COL(reference[0])]
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
