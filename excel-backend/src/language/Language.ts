import * as Parsimmon from 'parsimmon'
import Cell from '../cells/Cell';
import NumberCell from '../cells/literals/NumberCell';
import StringCell from '../cells/literals/StringCell';
import ArrayCell from '../cells/literals/ArrayCell';
import FormulaCell from '../cells/formulas/FormulaCell';
import ReferenceCell from '../cells/formulas/ReferenceCell';
import OperationCell from '../cells/formulas/operations/OperationCell';
import { Literal, Operand, operandToString, Operations } from '../utils/types';
import Reference from '../utils/Reference';

type Grammar = {
    Statement: Cell,
    Formula: FormulaCell,
    CellReference: Reference,
    Literal: Literal,
    Number: number,
    String: string,
    Array: number[],
    Operand: Operand,
    Operation: OperationCell
}

export const Lang = Parsimmon.createLanguage<Grammar>({
    Statement: (r) =>
        Parsimmon.alt(
            r.Formula,
            r.Literal.map((i) => {
                if (typeof i === "number") return new NumberCell(i)
                else if (typeof i === "string") return new StringCell(i)
                else if (Array.isArray(i))  return new ArrayCell(i)
            })
        ),
    Formula: (r) =>
        Parsimmon.seq(
            Parsimmon.regex(/=/),
            Parsimmon.alt(
                r.CellReference.map((i) => new ReferenceCell(i)),
                r.Operation
            )
        ).map((i) => i[1]),
    CellReference: (_) =>
        Parsimmon.seq(
            Parsimmon.regex(/[a-z]+/i),
            Parsimmon.regex(/[0-9]+/)
        ).map((i) => new Reference(i[0].toUpperCase(), i[1])
    ),
    Literal: (r) => Parsimmon.alt(r.Number, r.String, r.Array),
    Number: (_) =>
        Parsimmon.alt(
            Parsimmon.regexp(/\-?[0-9]+(\.[0-9]+)?/),
            Parsimmon.regexp(/\-?\.[0-9]+/)
        ).map((i) => Number(i).valueOf()),
    String: (_) =>
        Parsimmon.alt(
            Parsimmon.regex(/=/),
            Parsimmon.regex(/[^=\-\.\[\]][^"\[\]]*/)
        ),
    Operand: (r) =>
        Parsimmon.alt(
            Parsimmon.seq(
                Parsimmon.string('"'),
                r.String,
                Parsimmon.string('"')
            ).map((i) => i[1]),
            r.CellReference,
            r.Number,
            r.Array
        ),
    Operation: (r) =>
        Parsimmon.seq(
            Parsimmon.alt(
                ...getOperationParsers()
            ),
            Parsimmon.string("("),
            Parsimmon.seq(
                r.Operand,
                Parsimmon.seq(
                    Parsimmon.string(","),
                    r.Operand,
                ).many().map((i) => {
                    const operands: Operand[] = [];
                    for (const item of i) operands.push(item[1]);
                    return operands;
                })
            ).times(0,1).map((i) => {
                if (i.length === 0) return []
                const res: Operand[] = []
                res.push(i[0][0])
                res.push(...i[0][1])
                return res
            }),
            Parsimmon.string(")")
        ).map((i) => new Operations[i[0] as keyof typeof Operations](`=${i[0]}(${argumentsToString(i[2])})`, i[2])),
    Array: (r) =>
        Parsimmon.seq(
            Parsimmon.string("["),
            Parsimmon.seq(
                r.Number,
                Parsimmon.seq(
                    Parsimmon.string(","),
                    r.Number
                ).many().map((i) => {
                    const res: number[] = []
                    for (const item of i) res.push(item[1])
                    return res
                })
            ).times(0, 1).map((i) => {
                if (i.length === 0) return []
                const res: number[] = []
                res.push(i[0][0])
                res.push(...i[0][1])
                return res
            }),
        Parsimmon.string("]")
        ).map((i) => i[1]),
});

function getOperationParsers(): Parsimmon.Parser<string>[] {
    const parsers: Parsimmon.Parser<string>[] = []
    for (const operation of Object.keys(Operations))
        parsers.push(Parsimmon.string(operation))
    return parsers
}

function argumentsToString(args: Operand[]) : string {
    if (args.length === 0) return ""

    let result: string = operandToString(args[0])
    for (let i = 1; i < args.length; i++) {
        result += `,${operandToString(args[i])}`
    }
    return result
}
