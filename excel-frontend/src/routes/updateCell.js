async function sendCellData(line, column, value) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ line: line, column: column, value: value })
    };
    return fetch('http://localhost:8080/updateCell', requestOptions)
        .then(response => response.json())
        .then(response => response.cells)
}

module.exports = { sendCellData }
