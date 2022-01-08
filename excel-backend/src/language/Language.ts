import * as Parsimmon from 'parsimmon'
import ReferenceCell from '../cells/formulas/ReferenceCell';
import Cell from '../cells/Cell';
import FormulaCell from '../cells/formulas/FormulaCell';
import NumberCell from '../cells/NumberCell';
import StringCell from '../cells/StringCell';
import EmptyCell from '../cells/EmptyCell';
import SumCell from '../cells/formulas/SumCell';
import ArrayCell from '../cells/ArrayCell';
import SubCell from '../cells/formulas/SubCell';

type Grammar = {
    Statement: Cell,
    Formula: FormulaCell,
    CellReference: [string, string],
    Value: number | string,
    Number: number,
    String: string,
    Array: number[],
    BinaryOperation: SumCell // | SubCell | MulCell | DivCell
}

export const Lang = Parsimmon.createLanguage<Grammar>({
    Statement: (r) =>
    Parsimmon.alt(
        r.Formula,
        r.Value.map((i) => {
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
    Value: (r) => Parsimmon.alt(r.Number, r.String, r.Array),
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
    BinaryOperation: (r) =>
    Parsimmon.seq(
        Parsimmon.alt(
        Parsimmon.string("SUM"),
        Parsimmon.string("SUB")// , Parsimmon.string('MUL'), Parsimmon.string('DIV')
        ),
        Parsimmon.string("("),
        Parsimmon.alt(
            Parsimmon.seq(
                Parsimmon.string('"'),
                r.String,
                Parsimmon.string('"')
            ).map((i) => i[1]),
            r.CellReference,
            r.Number
        ),
        Parsimmon.string(","),
        Parsimmon.alt(
            Parsimmon.seq(
                Parsimmon.string('"'),
                r.String,
                Parsimmon.string('"')
            ).map((i) => i[1]),
            r.CellReference,
            r.Number
        ),
        Parsimmon.string(")")
    ).map((i) => {
        const formula: string = `=${i[0]}(${argumentToString( i[2])},${argumentToString(i[4])})`;
        switch (i[0]) {
        case "SUM":
            return new SumCell(formula, i[2], i[4]);
        case "SUB":
            return new SubCell(formula, i[2], i[4]);
            //
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


function argumentToString(arg: number | string | [string, string]) : string {
    if(typeof arg === "number")
        return arg.toString()
    else if(typeof arg === "string")
        return `"${arg}"`
    else return `${arg[0]}${arg[1]}`
}
