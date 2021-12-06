import Cell from "./Cell"
import { ASCII_TO_COL } from "./ascii"

export default class FormulaCell extends Cell {
    formula: string
    dependencies: Cell[] = new Array<Cell>()

    constructor(line: number, column: number, formula: string, cells: Cell[]) {
        super(line, column)
        this.isEmpty = false
        this.formula = formula
        this.analyse(cells)
    }

    analyse(cells: Cell[]): void {
        const words: string[] = this.formula.substring(1).split('\'')
        const col: number = ASCII_TO_COL(words[0]) // A
        const line: number = Number(words[1]) - 1 // 1

        for (const cell of cells)
            if (cell.line === line && cell.column === col) {
                this.dependencies.push(cell)
                cell.dependents.push(this)
                return
            }
    }

    view(): string {
        // console.log(this.dependencies)
        if (this.dependencies.length === 1)
            return this.dependencies[0].view()
        return `F(${this.formula})`
    }

    content(): string {
        return this.formula
    }
}
