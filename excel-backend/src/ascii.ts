const A_ASCII_CODE = 65

export function COL_TO_ASCII(id: number) {
    if (id < 26)
        return String.fromCharCode(A_ASCII_CODE + id)
    else return String.fromCharCode(A_ASCII_CODE + id / 26 - 1, A_ASCII_CODE + id % 26)
}

export function ASCII_TO_COL(str: string) {
    if (str.length === 1) {
        return str.charCodeAt(0) - A_ASCII_CODE
    } else return (str.charCodeAt(0) - A_ASCII_CODE + 1 ) * 26 + str.charCodeAt(1) - A_ASCII_CODE
}
