async function getCellData(line, column) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    var url = new URL('http://localhost:8080/getCell')
    var params = { line: line, column: column}
    url.search = new URLSearchParams(params).toString();

    return fetch(url, requestOptions)
        .then(response => response.json())
}

module.exports = { getCellData }
