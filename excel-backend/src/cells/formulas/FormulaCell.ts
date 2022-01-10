import Cell from "../Cell"
import { findCell } from "../cellsManager"
import { Literal } from "../../utils/types"
import EmptyCell from "../EmptyCell"
import ErrorCell from "../ErrorCell"
import Reference from "../utils/Reference"

export default abstract class FormulaCell extends Cell {
    formula: string
    hasCircularDependency: boolean = false
    hasException: boolean = false
    dependencies: Cell[] = new Array<Cell>()

    constructor(formula: string) {
        super()
        this.formula = formula
    }

    abstract analyseDependencies(cells: Cell[]): void

    protected analyseDependency(cells: Cell[], references: Reference[]): void {
        for (const reference of references) {
            if(reference === null) continue 

            if (this.line === reference[0] && this.column === reference[1]) {
                this.hasCircularDependency = true
                continue
            }

            const referenceCell = findCell(cells, reference[0], reference[1])
            if (referenceCell !== undefined) {
                const allDependents = this.getAllDependents()
                if (findCell(allDependents, referenceCell) !== undefined) {
                    this.hasCircularDependency = true
                    this.formula = ''
                    continue
                }
                this.dependencies.push(referenceCell)
                referenceCell.addDependent(this)
                continue
            }

            const cell: Cell = new EmptyCell()
            cell.setCoords(reference[0], reference[1])
            this.dependencies.push(cell)
            cell.addDependent(this)
            cells.push(cell)
        }
    }

    removeDependencies(): void {
        for (const dependency of this.dependencies)
            dependency.removeDependent(this)
        this.dependencies = new Array<Cell>()
    }

    abstract calculateValue(): Literal

    content(): string {
        return this.formula
    }

    getValue(): Literal {
        this.hasException = false
        if (this.hasCircularDependency) {
            this.hasException = true
            return "!Circular dependence found!"
        }
        for (const dependency of this.dependencies)
            if (dependency instanceof ErrorCell || (dependency instanceof FormulaCell && dependency.hasException)) {
                this.hasException = true
                return "!Formula references a cell with an error!"
            }
        return this.calculateValue()
    }
}
