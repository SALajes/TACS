import Cell from "../Cell"

export default abstract class FormulaCell extends Cell {
    formula: string
    dependencies: Cell[] = new Array<Cell>()

    constructor(formula: string) {
        super()
        this.formula = formula
    }

    abstract analyseDependencies(cells: Cell[]): void

    protected analyseDependency(cells: Cell[], references:[number,number][]): void {
        for (const cell of cells)
            for (const reference of references)
                if (cell.line === reference[0] && cell.column === reference[1]) {
                    this.dependencies.push(cell)
                    cell.dependents.push(this)
                    return
                }
    }

    content(): string {
        return this.formula
    }
}
