import Cell from "../Cell"
import FormulaCell from "./FormulaCell"

export default class ReferenceCell extends FormulaCell {
    referenceLine: number
    referenceColumn: number

    constructor(formula: string, referenceLine: number, referenceColumn: number) {
        super(formula)
        this.formula = formula
        this.referenceLine = referenceLine
        this.referenceColumn = referenceColumn
    }

    analyseDependencies(cells: Cell[]): void {
        this.analyseDependency(cells, [[this.referenceLine, this.referenceColumn]])
    }

    view(): string {
        return this.dependencies[0].view()
    }
}
