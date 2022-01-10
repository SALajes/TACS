import Reference from "./Reference"

export type ReferenceString = [string, string]
export type Operand = number | string | Reference
export type Literal = number | string | number[]

export function toString(value: Literal): string {
    if (Array.isArray(value))
        return `[${value.toString()}]`
    return value.toString()
}
