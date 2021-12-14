import { Lang } from "../language/Language";
import Cell from "./Cell";
import EmptyCell from "./EmptyCell";
import ErrorCell from "./ErrorCell";
import FormulaCell from "./formulas/FormulaCell";

export const cells: Cell[] = new Array<Cell>()

export function cellFactory(line: number, column: number, value: string): Cell {
    let cell: Cell;
    if (value === '') {
        cell = new EmptyCell()
    } else {
        const parse = Lang.Statement.parse(value)
        if (parse.status)
        cell = parse.value
        else cell = new ErrorCell(value)
    }
    cell.setCoords(line, column)
    return cell
}

export function updateCellMatrix(updatedCell: Cell): void {
    for (let i: number = 0; i < cells.length; i++) {
        if (cells[i].line === updatedCell.line && cells[i].column === updatedCell.column) {
            const oldCell: Cell = cells[i]
            if (oldCell instanceof FormulaCell) oldCell.removeDependencies()
            updatedCell.updateDependents(oldCell.dependents)
            cells.splice(i, 1)
            break
        }
    }

    if (updatedCell instanceof FormulaCell) updatedCell.analyseDependencies(cells)

    if (updatedCell.dependents.length !== 0 || !(updatedCell instanceof EmptyCell))
        cells.push(updatedCell)

    removeRemovableCells()
}

export function findCell(cellArray: Cell[], cell: Cell): Cell

export function findCell(cellArray: Cell[], line: number, column: number): Cell

export function findCell(cellArray: Cell[], line: string, column: string): Cell

export function findCell(cellArray: Cell[], lineOrCell: number | string | Cell, column?: number | string): Cell {
    if (typeof lineOrCell === "number")
        return cellArray.find((elem) => { return elem.line === lineOrCell && elem.column === column })
    if (typeof lineOrCell === "string")
        return cellArray.find((elem) => { return elem.line.toString() === lineOrCell && elem.column.toString() === column })
    if (lineOrCell instanceof Cell)
        return cellArray.find((elem) => { return elem.line === lineOrCell.line && elem.column === lineOrCell.column })
    return null
}

function removeRemovableCells(): void {
    for (let i: number = 0; i < cells.length; i++)
        if (cells[i].dependents.length === 0 && (cells[i] instanceof EmptyCell))
            cells.splice(i, 1)
}