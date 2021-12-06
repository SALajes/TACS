import FormulaCell from "./FormulaCell"

export default class Cell {
    isEmpty:boolean = true
    line: number
    column: number
    dependents: FormulaCell[] = Array<FormulaCell>()

    constructor(line: number, column: number) {
        this.line = line
        this.column = column
    }

    updateDependencies(dependents: FormulaCell[]) {
        this.dependents = dependents
        for (const dependent of this.dependents) {
            for (let i = 0; i < dependent.dependencies.length; i++) {
                if (dependent.dependencies[i].line === this.line
                    && dependent.dependencies[i].column === this.column) {
                    dependent.dependencies.splice(i,1)
                    dependent.dependencies.push(this)
                    break;
                }
            }
        }
    }

    view():string {return ''}

    content():string {return ''}
}
