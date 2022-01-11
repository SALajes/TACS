import AtCell from "../cells/formulas/operations/AtCell"
import DivCell from "../cells/formulas/operations/DivCell"
import LenCell from "../cells/formulas/operations/LenCell"
import MulCell from "../cells/formulas/operations/MulCell"
import SubCell from "../cells/formulas/operations/SubCell"
import SumCell from "../cells/formulas/operations/SumCell"
import Reference from "./Reference"

export type ReferenceString = [string, string]
export type Literal = number | string | number[]
export type Operand = Literal | Reference

export function operandToString(value: Operand): string {
    if (Array.isArray(value))
        return `[${value.toString()}]`
    else if (typeof value === "string")
        return `"${value}"`
    return value.toString()
}

export function literalToString(value: Literal): string {
    if (Array.isArray(value))
        return `[${value.toString()}]`
    return value.toString()
}

export const Operations = {
    'SUM': SumCell,
    'SUB': SubCell,
    'MUL': MulCell,
    'DIV': DivCell,
    'LEN': LenCell,
    'AT': AtCell
}
