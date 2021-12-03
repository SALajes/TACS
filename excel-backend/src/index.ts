import express from "express";
import cors from "cors";
import Cell from "./Cell";
import NumberCell from "./NumberCell";
import StringCell from "./StringCell";

const app = express();
const port = 8080; // default port to listen

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const cellMatrix:Cell[] = new Array()

function cellFactory(line: number, column: number, value: string): Cell {
    if (value === '')
        return new Cell(line, column)
    if (!isNaN(Number(value)))
        return new NumberCell(line, column, Number(value))
    else return new StringCell(line, column, value)
}

function updateCellMatrix(updatedCell:Cell) {
    for (let i:number = 0; i < cellMatrix.length; i++)
        if (cellMatrix[i].line === updatedCell.line && cellMatrix[i].column === updatedCell.column)
            cellMatrix.splice(i,1)
    if (!updatedCell.isEmpty)
        cellMatrix.push(updatedCell)
}

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Backend Online!");
});

app.post("/updateCell", (req, res) => {
    //console.log(req.body)
    const updatedCell:Cell = cellFactory(req.body.line, req.body.column, req.body.value)
    updateCellMatrix(updatedCell)
    //console.log(cellMatrix)
    res.sendStatus(200);
});

// start the Express server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
