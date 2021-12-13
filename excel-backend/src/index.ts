import express from "express";
import cors from "cors";
import { Lang } from "./Language";
import Cell from "./Cell";
import NumberCell from "./NumberCell";
import StringCell from "./StringCell";
import FormulaCell from "./FormulaCell";

const app = express();
const port = 8080; // default port to listen

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const cells:Cell[] = new Array<Cell>()

function cellFactory(line: number, column: number, value: string): Cell {
    console.log(Lang.Statement.parse(value))
    if (value === '')
        return new Cell(line, column)
    if (!isNaN(Number(value)))
        return new NumberCell(line, column, Number(value))
    if (value[0] === '=') {
        return new FormulaCell(line, column, value, cells)
    }
    return new StringCell(line, column, value)
}

function updateCellMatrix(updatedCell:Cell) {
    for (let i:number = 0; i < cells.length; i++)
        if (cells[i].line === updatedCell.line && cells[i].column === updatedCell.column) {
            updatedCell.updateDependencies(cells[i].dependents)
            cells.splice(i,1)
            break
        }
    if (!updatedCell.isEmpty)
        cells.push(updatedCell)
}

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Backend Online!");
});

app.get("/all", (_req, res) => {
    const result:object[] = new Array<object>()
    for (const cell of cells) {
        result.push({
            line: cell.line,
            column: cell.column,
            value: cell.view()
        })
    }
    res.status(200).json({
        cells: result
    })
});

app.get("/getCell", (req, res) => {
    const cell:Cell = cells.find((elem) => {
        return elem.line.toString() === req.query.line
        && elem.column.toString() === req.query.column
    })

    let result:string

    if (cell === undefined) result = ''
    else result = cell.content()

    res.status(200).json({
        line: req.query.line,
        column: req.query.column,
        value: result
    })
});

app.post("/updateCell", (req, res) => {
    const updatedCell:Cell = cellFactory(req.body.line, req.body.column, req.body.value.trim())
    updateCellMatrix(updatedCell)
    // console.log(cells)
    // console.log(updatedCell.dependents)

    const result: object[] = new Array<object>()
    result.push({
        line: updatedCell.line,
        column: updatedCell.column,
        value: updatedCell.view()
    })
    for (const cell of updatedCell.dependents) {
        result.push({
            line: cell.line,
            column: cell.column,
            value: cell.view()
        })
    }
    res.status(200).json({
        cells: result
    })
});

app.delete("/deleteAll", () => {
    cells.length = 0
})

// start the Express server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
