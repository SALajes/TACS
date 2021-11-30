function sendCellData(line, column, value) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ line: line, column: column, value: value })
    };
    fetch('http://localhost:8080/updateCell', requestOptions)
        .then(response => {
            console.log(response.status)
        })
}

module.exports = { sendCellData }