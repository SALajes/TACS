import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { sendCellData } from '../routes/updateCell';
import { getCellData } from '../routes/getCell';
import { getAllCells } from '../routes/getAllCells';
import { deleteAllData } from '../routes/deleteAll';
import { COL_TO_ASCII, ASCII_TO_COL } from '../lib/ascii';

const NUM_COLS = 20
const NUM_LINES = 20
const COL_WIDTH = 100

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
            rows: [],
            editing: false,
            value: '',
            line: -1,
            column: -1
        }

        for (let i = 0; i < NUM_COLS; i++) {
            this.columns.push({
                field: COL_TO_ASCII(i),
                width: COL_WIDTH,
                editable: false,
                sortable: false,
            })
        }

        for (let i = 0; i < NUM_LINES; i++) {
            this.state.rows.push({
                id: i + 1
            })
        }
    }

    componentDidMount() {
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
    
    onButtonClickHandler = () => {
        sendCellData(this.state.line, this.state.column, this.state.value)
            .then(cells => {
                console.log(cells)
                var newRows = [...this.state.rows]
                for (var cell of cells) {
                    newRows[cell.line][COL_TO_ASCII(cell.column)] = cell.value
                }
                this.setState({ rows: newRows, editing: false, value: '' })
            })
            .catch()
    }

    onDeleteClickHandler = () => {
        deleteAllData()
            .then(() => {
                var newRows = []
                for (let i = 0; i < NUM_LINES; i++) {
                    newRows.push({
                        id: i + 1
                    })
                }
                this.setState({
                    rows: newRows,
                    editing: false,
                    value: '',
                    line: -1,
                    column: -1
                })
            })
    }

    onTextFieldChange = (e) => {
        if (e.target.value === '')
            e.target.value = " "
        this.setState({ value: e.target.value})
    }

    onCellClickHandler = params => {
        if (params.field === 'id') return
        this.setState({ editing: false })
        getCellData(params.id - 1, ASCII_TO_COL(params.field))
            .then(cell => {
                this.setState({ line: params.id - 1, column: ASCII_TO_COL(params.field), value: cell.value })
            })
    }

    onCellDoubleClickHandler = params => {
        if (params.field === 'id') return
        this.setState({ editing: true})
    }

    render() {        
        return (
            <div style={{ height: '100%', width: '100%'}}>
                <div style={{ height: '100%', width: '98%', margin:'auto', display:'flex' }}>
                    <div style={{ height: '100%', width: '5%', margin: 'auto' }}>
                        <IconButton
                            aria-label="delete"
                            onClick={this.onDeleteClickHandler}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                    <div style={{ height: '100%', width: '5%', margin: '0% 1%'}}>
                        <TextField
                            id="outlined-singleline-static"
                            variant='outlined'
                            margin='dense'
                            disabled
                            value={this.state.line !== -1 ? `${COL_TO_ASCII(this.state.column)}${this.state.line+1}` : ""}
                        />
                    </div>
                    <div style={{ height: '100%', width: '80%', margin: '0% auto' }}>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            variant={this.state.editing ? 'outlined' : 'filled'}
                            rows={1}
                            margin='dense'
                            fullWidth
                            value={this.state.value}
                            disabled={!this.state.editing}
                            onChange={this.onTextFieldChange}
                        />
                    </div>
                    <div style={{ height: '100%', width: '10%', margin: '1%' }}>
                        <Button
                            onClick={this.onButtonClickHandler}
                            variant="outlined"
                            size="large"
                            fullWidth
                        >OK</Button>
                    </div>
                </div>                
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
                    onCellClick={this.onCellClickHandler}
                    onCellDoubleClick={this.onCellDoubleClickHandler}
                />
            </div>
        );
    }
}

export default Grid
