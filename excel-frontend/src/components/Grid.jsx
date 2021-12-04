import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { sendCellData } from '../routes/updateCell';
import { getCellData } from '../routes/getCell';
import { getAllCells } from '../routes/getAllCells';
import { COL_TO_ASCII, ASCII_TO_COL } from '../lib/ascii';

const NUM_COLS = 20
const NUM_LINES = 20
const COL_WIDTH = 100

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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
            line: 0,
            column: 0
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

    handleOpen = () => {
        this.setState({ editing: true})
    }

    handleClose = () => { this.setState({ editing: false, value: '' }) }
    
    handleSubmit = () => {
        sendCellData(this.state.line, this.state.column, this.state.value)
            .then(cell => {
                var newRows = [...this.state.rows]
                newRows[cell.line][COL_TO_ASCII(cell.column)] = cell.value
                this.setState({ rows: newRows, editing: false, value: "" })
            })
    }

    onTextFieldChange = (e) => {
        if (e.target.value === '')
            e.target.value = " "
        this.setState({ value: e.target.value})
    }

    onCellEditStartHandler = params => {
        this.setState({ line: params.id - 1, column: ASCII_TO_COL(params.field)})
        getCellData(params.id - 1, ASCII_TO_COL(params.field))
            .then(cell => {
                this.setState({ value: cell.value})
                })
            .then(this.handleOpen())
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
                    onCellDoubleClick={this.onCellEditStartHandler}
                />
                <Modal
                    open={this.state.editing}
                    onClose={this.handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    hideBackdrop
                >
                    <Box sx={style}>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={10}
                            value={this.state.value}
                            fullWidth
                            onChange={this.onTextFieldChange}
                        />
                        <Button onClick={this.handleSubmit}>Submit</Button>
                    </Box>
                </Modal>
            </div>
        );
    }
}

export default Grid
