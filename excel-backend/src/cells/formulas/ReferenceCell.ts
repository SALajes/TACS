import { ASCII_TO_COL } from "../../utils/ascii"
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

    findReferenceRoot(): Cell { //TODO
        return null
    }

    calculateValue(): string {
        if (this.dependencies.length === 0)
            return ''
        return this.dependencies[0].view()
    }
}
