import { findCell } from "./cellsManager"
import FormulaCell from "./formulas/FormulaCell"

export default abstract class Cell {
    line: number
    column: number
    dependents: FormulaCell[] = Array<FormulaCell>()

    setCoords(line: number, column: number) {
        this.line = line
        this.column = column
    }

    updateDependents(dependents: FormulaCell[]): void {
        this.dependents = dependents
        for (const dependent of this.dependents) {
            for (let i = 0; i < dependent.dependencies.length; i++) {
                if (dependent.dependencies[i].line === this.line && dependent.dependencies[i].column === this.column) {
                    dependent.dependencies.splice(i,1)
                    dependent.dependencies.push(this)
                    break;
                }
            }
        }
    }

    addDependent(newDependent: FormulaCell): void {
        const cell = findCell(this.dependents, newDependent)
        if (cell === undefined)
            this.dependents.push(newDependent)
    }

    removeDependent(oldDependent: this): void {
        for (let i = 0; i < this.dependents.length; i++)
            if (this.dependents[i].line === oldDependent.line && this.dependents[i].column === oldDependent.column) {
                this.dependents.splice(i, 1)
                return
            }
    }

    abstract view(): string

    abstract content(): string
}
