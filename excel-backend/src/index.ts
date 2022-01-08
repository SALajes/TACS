import express from "express";
import cors from "cors";
import Cell from "./cells/Cell";
import { cellFactory, cells, findCell, updateCellMatrix } from "./cells/cellsManager";
import { toString } from "./utils/types";

const app = express();
const port = 8080; // default port to listen

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// define a route handler for the default home page
app.get("/", (_, res) => {
    res.send("Backend Online!");
});

app.get("/all", (_req, res) => {
    const result:object[] = new Array<object>()
    for (const cell of cells) {
        result.push({
            line: cell.line,
            column: cell.column,
            view: toString(cell.getValue())
        })
    }
    res.status(200).json({
        cells: result
    })
});

app.get("/getCell", (req, res) => {
    const cell: Cell = findCell(cells, String(req.query.line), String(req.query.column))

    let content: string = ''
    let view: string = ''

    if (cell !== undefined) {
        content = cell.content()
        view = toString(cell.getValue());
    }

    res.status(200).json({
        line: req.query.line,
        column: req.query.column,
        content,
        view
    })
});

app.post("/updateCell", (req, res) => {
    const updatedCell:Cell = cellFactory(req.body.line, req.body.column, req.body.value.trim())
    updateCellMatrix(updatedCell)
    // console.log(cells)

    const result: object[] = new Array<object>()
    result.push({
        line: updatedCell.line,
        column: updatedCell.column,
        view: toString(updatedCell.getValue())
    })
    const allDependents: Cell[] = updatedCell.getAllDependents()
    for (const cell of allDependents) {
        result.push({
          line: cell.line,
          column: cell.column,
          view: toString(cell.getValue())
        });
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
