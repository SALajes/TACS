import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const NUM_COLS = 20
const NUM_LINES = 20
const A_ASCII_CODE = 65

function colHeader(id) {
    if (id < 26)
        return String.fromCharCode(A_ASCII_CODE + id)
    else return String.fromCharCode(A_ASCII_CODE + id / 26 - 1, A_ASCII_CODE + id%26)
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
        field: colHeader(i),
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
            />
        </div>
    );
}
