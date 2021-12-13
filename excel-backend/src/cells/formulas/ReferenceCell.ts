import Cell from "../Cell"
import FormulaCell from "./FormulaCell"

export default class ReferenceCell extends FormulaCell {
    reference: [number, number]

    constructor(formula: string, reference: [number, number]) {
        super(formula)
        this.formula = formula
        this.reference = reference
    }

    analyseDependencies(cells: Cell[]): void {
        this.analyseDependency(cells, [this.reference])
    }

    view(): string {
        return this.dependencies[0].view()
    }
}
