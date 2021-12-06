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
        let words: string[] = this.formula.substring(1).split('\'')
        let col: number = ASCII_TO_COL(words[0]) //A
        let line: number = Number(words[1]) - 1 //1

        for (let i: number = 0; i < cells.length; i++)
            if (cells[i].line === line && cells[i].column === col) {
                this.dependencies.push(cells[i])
                cells[i].dependents.push(this)
                return
            }
    }

    view(): string {
        // console.log(this.dependencies)
        if (this.dependencies.length == 1)
            return this.dependencies[0].view()
        return `F(${this.formula})`
    }

    content(): string {
        return this.formula
    }
}
