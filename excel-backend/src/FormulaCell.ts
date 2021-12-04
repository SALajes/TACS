import Cell from "./Cell"

export default class FormulaCell extends Cell {
    formula: string

    constructor(line: number, column: number, formula: string) {
        super(line, column)
        this.isEmpty = false
        this.formula = formula
    }

    view(): string {
        return `F(${this.formula})`
    }

    content(): string {
        return this.formula
    }
}
