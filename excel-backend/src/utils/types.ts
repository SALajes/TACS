import ArrayOpCell from "../cells/formulas/operations/ArrayOpCell"
import MinCell from "../cells/formulas/operations/MinCell"
import MaxCell from "../cells/formulas/operations/MaxCell"
import PropCell from "../cells/formulas/operations/PropCell"
import AtCell from "../cells/formulas/operations/AtCell"
import DivCell from "../cells/formulas/operations/DivCell"
import LenCell from "../cells/formulas/operations/LenCell"
import MulCell from "../cells/formulas/operations/MulCell"
import SubCell from "../cells/formulas/operations/SubCell"
import SumCell from "../cells/formulas/operations/SumCell"
import Reference from "./Reference"

export type ObjectLiteral = Record<string, number | string | number[]>
export type ReferenceString = [string, string]
export type Literal = number | string | number[] | ObjectLiteral
export type Operand = Literal | Reference

export function operandToString(value: Operand): string {
    if (Array.isArray(value))
    return `[${value.toString()}]`
    else if (typeof value === "string")
    return `"${value}"`
    else if (typeof value === "number" || value instanceof Reference)
    return value.toString()
    else return objectOperandToString(value)
}

export function literalToString(value: Literal): string {
    if (Array.isArray(value))
        return `[${value.toString()}]`
    else if (typeof value === "string" || typeof value === "number")
        return value.toString()
    else return objectLiteralToString(value)
}

export function objectOperandToString(value: ObjectLiteral) {
    const keys: string[] = Object.keys(value)
    if (keys.length === 0) return "{}"

    let result: string = "{"
    for (let i = 0; i < keys.length; i++) {
        result += `"${keys[i]}":${literalToString(value[keys[i]])}`
        if (i+1 !== keys.length) result += ","
    }

    result += "}"
    return result
}

function objectLiteralToString(value: ObjectLiteral) {
    const keys: string[] = Object.keys(value)
    if (keys.length === 0) return "{}"

    let result: string = "{"
    for (let i = 0; i < keys.length; i++) {
        result += `${keys[i]}:${literalToString(value[keys[i]])}`
        if (i+1 !== keys.length) result += ","
    }
    result += "}"
    return result
}


export const Operations = {
    'SUM': SumCell,
    'SUB': SubCell,
    'MUL': MulCell,
    'DIV': DivCell,
    'LEN': LenCell,
    'AT': AtCell,
    'PROP': PropCell,
    'MAX': MaxCell,
    'MIN': MinCell,
    'ARRAY': ArrayOpCell
}
