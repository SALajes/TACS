const A_ASCII_CODE = 65

function COL_TO_ASCII(id) {
    if (id < 26)
        return String.fromCharCode(A_ASCII_CODE + id)
    else return String.fromCharCode(A_ASCII_CODE + id / 26 - 1, A_ASCII_CODE + id % 26)
}

function ASCII_TO_COL(string) {
    if (string.length === 1) {
        return string.charCodeAt(0) - A_ASCII_CODE
    } else return (string.charCodeAt(0) - A_ASCII_CODE + 1 ) * 26 + string.charCodeAt(1) - A_ASCII_CODE
}

module.exports = { COL_TO_ASCII, ASCII_TO_COL }