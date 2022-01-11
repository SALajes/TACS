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
