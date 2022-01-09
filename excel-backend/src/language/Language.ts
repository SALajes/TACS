import * as Parsimmon from 'parsimmon'
import Cell from '../cells/Cell';
import EmptyCell from '../cells/EmptyCell';
import NumberCell from '../cells/NumberCell';
import StringCell from '../cells/StringCell';
import FormulaCell from '../cells/formulas/FormulaCell';
import ReferenceCell from '../cells/formulas/ReferenceCell';
import SumCell from '../cells/formulas/SumCell';
import SubCell from '../cells/formulas/SubCell';
import MulCell from '../cells/formulas/MulCell';
import DivCell from '../cells/formulas/DivCell';
import ArrayCell from '../cells/ArrayCell';
import BinaryOperationCell from '../cells/formulas/BinaryOperationCell';
import { Literal, Operand, Reference } from '../utils/types';

type Grammar = {
    Statement: Cell,
    Formula: FormulaCell,
    CellReference: Reference,
    Literal: Literal,
    Number: number,
    String: string,
    Array: number[],
    Operand: Operand,
    BinaryOperation: BinaryOperationCell
}

export const Lang = Parsimmon.createLanguage<Grammar>({
    Statement: (r) =>
        Parsimmon.alt(
            r.Formula,
            r.Literal.map((i) => {
                if (typeof i === "number") return new NumberCell(i)
                else if (typeof i === "string") return new StringCell(i)
                else if (Array.isArray(i))  return new ArrayCell(i)
                else return new EmptyCell()
            })
        ),
    Formula: (r) =>
        Parsimmon.seq(
            Parsimmon.regex(/=/),
            Parsimmon.alt(
                r.CellReference.map((i) => new ReferenceCell(i)),
                r.BinaryOperation
            )
        ).map((i) => i[1]),
    CellReference: (_) =>
        Parsimmon.seq(
            Parsimmon.regex(/[a-z]+/i),
            Parsimmon.regex(/[0-9]+/)
        ).map((i) => [i[0].toUpperCase(), i[1]]
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
            r.Number
        ),
    BinaryOperation: (r) =>
        Parsimmon.seq(
            Parsimmon.alt(
                Parsimmon.string("SUM"),
                Parsimmon.string("SUB"),
                Parsimmon.string('MUL'),
                Parsimmon.string('DIV')
            ),
            Parsimmon.string("("),
            r.Operand,
            Parsimmon.string(","),
            r.Operand,
            Parsimmon.string(")")
        ).map((i) => {
            const formula: string = `=${i[0]}(${argumentToString( i[2])},${argumentToString(i[4])})`;
            switch (i[0]) {
                case "SUM":
                    return new SumCell(formula, i[2], i[4]);
                case "SUB":
                    return new SubCell(formula, i[2], i[4]);
                case "MUL":
                    return new MulCell(formula, i[2], i[4]);
                case "DIV":
                    return new DivCell(formula, i[2], i[4]);
            }
        }),
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
                const res: number[] = []
                if (i.length === 0) return []
                res.push(i[0][0])
                res.push(...i[0][1])
                return res
            }),
        Parsimmon.string("]")
        ).map((i) => i[1]),
});


function argumentToString(arg: Operand) : string {
    if(typeof arg === "number")
        return arg.toString()
    else if(typeof arg === "string")
        return `"${arg}"`
    else return `${arg[0]}${arg[1]}`
}
