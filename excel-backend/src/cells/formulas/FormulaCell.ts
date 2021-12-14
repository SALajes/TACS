import Cell from "../Cell"
import EmptyCell from "../EmptyCell"
import ErrorCell from "../ErrorCell"

export default abstract class FormulaCell extends Cell {
    formula: string
    hasException: boolean = false
    dependencies: Cell[] = new Array<Cell>()

    constructor(formula: string) {
        super()
        this.formula = formula
    }

    abstract analyseDependencies(cells: Cell[]): void

    protected analyseDependency(cells: Cell[], references: [number, number][]): void {
        for (const reference of references) {
            if (this.line === reference[0] && this.column === reference[1]) {
                this.hasException = true
                continue
            }
            let foundReference: boolean = false
            for (const cell of cells) {
                if (cell.line === reference[0] && cell.column === reference[1]) {
                    this.dependencies.push(cell)
                    cell.addDependent(this)
                    foundReference = true
                    break
                }
            }
            if (foundReference) continue
            else {
                const cell: Cell = new EmptyCell()
                cell.setCoords(reference[0], reference[1])
                this.dependencies.push(cell)
                cell.addDependent(this)
                cells.push(cell)
            }
        }
    }

    removeDependencies(): void {
        for (const dependency of this.dependencies)
            dependency.removeDependent(this)
        this.dependencies = new Array<Cell>()
    }

    abstract calculateValue(): string

    content(): string {
        return this.formula
    }

    view(): string {
        if (this.hasException)
            return "!Formula can't reference itself!"
        for (const dependency of this.dependencies)
            if (dependency instanceof ErrorCell || (dependency instanceof FormulaCell && dependency.hasException))
                return "!Formula references a cell with an error"
        return this.calculateValue()
    }
}
