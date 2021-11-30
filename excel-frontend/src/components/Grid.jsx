import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { sendCellData } from '../routes/updateCell';
import { COL_TO_ASCII, ASCII_TO_COL } from '../lib/ascii';

const NUM_COLS = 20
const NUM_LINES = 20

function onCellChangeHandler(params) {
    sendCellData(params.id - 1, ASCII_TO_COL(params.field), params.value)
}

let columns = [
    {
        field: 'id',
        headerName: '',
        width: 30,
        sortable: false
    }
];

for (let i = 0; i < NUM_COLS; i++) {
    columns.push({
        field: COL_TO_ASCII(i),
        width: 75,
        editable: true,
        sortable: false,
    })
}
let rows = []

for (let i = 0; i < NUM_LINES; i++) {
    rows.push({
        id: i+1,
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

export default function Grid() {
    return (
        <div style={{ height: '100%', width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
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
                onCellEditCommit={onCellChangeHandler}
            />
        </div>
    );
}
