export type Operand = number | [string, string] | string
export type Literal = number | string | number[]

export function toString(value: Literal): string {
    if (Array.isArray(value))
        return `[${value.toString()}]`
    return value.toString()
}
