async function deleteAllData() {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    fetch('http://localhost:8080/deleteAll', requestOptions)
}

module.exports = { deleteAllData }
