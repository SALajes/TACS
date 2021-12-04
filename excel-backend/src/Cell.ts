export default class Cell {
    isEmpty:boolean = true
    line: number
    column: number

    constructor(line: number, column: number) {
        this.line = line
        this.column = column
    }

    view():string {return ''}

    content():string {return ''}
}
