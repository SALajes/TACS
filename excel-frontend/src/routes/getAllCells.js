async function getAllCells() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch('http://localhost:8080/all', requestOptions)
        .then(response => response.json())
        .then(response => response.cells)
}

module.exports = { getAllCells }
