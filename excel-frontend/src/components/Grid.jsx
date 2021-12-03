import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { sendCellData } from '../routes/updateCell';
import { getAllCells } from '../routes/getAllCells';
import { COL_TO_ASCII, ASCII_TO_COL } from '../lib/ascii';

const NUM_COLS = 20
const NUM_LINES = 20

class Grid extends React.Component {

    columns = [
        {
            field: 'id',
            headerName: '',
            width: 30,
            sortable: false
        }
    ]

    constructor(props) {
        super(props)
        this.state = {
            rows: []
        }

        for (let i = 0; i < NUM_COLS; i++) {
            this.columns.push({
                field: COL_TO_ASCII(i),
                width: 75,
                editable: true,
                sortable: false,
            })
        }

        for (let i = 0; i < NUM_LINES; i++) {
            this.state.rows.push({
                id: i + 1,
                A: '',
                B: '',
                C: '',
                D: '',
                E: '',
                F: '',
                G: '',
                H: '',
                I: '',
                J: '',
            })
        }
    }

    getCells() {
        getAllCells()
            .then(cells => {
                var newRows = [...this.state.rows]
                for (var cell of cells) {
                    newRows[cell.line][COL_TO_ASCII(cell.column)] = cell.value
                }
                this.setState({ rows: newRows })
            })
            .catch()
    }

    componentDidMount() {
        this.getCells()
    }

    onCellChangeHandler(params) {
        sendCellData(params.id - 1, ASCII_TO_COL(params.field), params.value)
    }

    render() {        
        return (
            <div style={{ height: '100%', width: '100%'}}>
                <DataGrid
                    rows={this.state.rows}
                    columns={this.columns}
                    pageSize={100}
                    rowsPerPageOptions={[100]}
                    disableSelectionOnClick
                    hideFooterPagination
                    disableColumnFilter
                    showCellRightBorder
                    showColumnRightBorder
                    disableColumnSelector
                    disableColumnMenu
                    disableExtendRowFullWidth
                    autoHeight
                    onCellEditCommit={this.onCellChangeHandler}
                />
            </div>
        );
    }
}

export default Grid
