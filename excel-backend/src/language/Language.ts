import * as Parsimmon from 'parsimmon'
import ReferenceCell from '../cells/formulas/ReferenceCell';
import Cell from '../cells/Cell';
import FormulaCell from '../cells/formulas/FormulaCell';
import NumberCell from '../cells/NumberCell';
import StringCell from '../cells/StringCell';
import { ASCII_TO_COL } from '../utils/ascii';
import EmptyCell from '../cells/EmptyCell';
import SumCell from '../cells/formulas/SumCell';

// type Grammar = {
//     Statement: Cell,
//     Formula: FormulaCell,
//     BiFormula: FormulaCell,
//     Sum: string,
//     Sub: string,
//     Mul: string,
//     Div: string,
//     TwoArgs: [Cell, Cell],
//     Arg: Cell,
//     ArgString: StringCell,
//     Value: NumberCell | StringCell,
//     CellReference: Cell,
//     Number:NumberCell,
//     String: StringCell
// }

// export const Lang = Parsimmon.createLanguage({
//     Statement: r => Parsimmon.alt(r.Formula,r.Value),
//     Formula: r => Parsimmon.seq(
//         Parsimmon.regex(/=/).skip,
//         Parsimmon.alt(
//             r.BiFormula,
//             r.CellReferencing
//         )
//     ),
//     BiFormula: r => Parsimmon.seq(
//         Parsimmon.alt(
//             r.Sum,
//             r.Sub,
//             r.Mul,
//             r.Div
//         ),
//         r.TwoArgs
//     ),
//     Sum: _ => Parsimmon.regex(/Sum/),
//     Sub: _ => Parsimmon.regex(/Sub/),
//     Mul: _ => Parsimmon.regex(/Mul/),
//     Div: _ => Parsimmon.regex(/Div/),
//     TwoArgs: r =>
//         Parsimmon.seq(
//             Parsimmon.regex(/\(/),
//             r.Arg,
//             Parsimmon.regex(/,/),
//             r.Arg,
//             Parsimmon.regex(/\)/),
//         ),
//     Arg: r => Parsimmon.alt(r.Number, r.CellReference, r.ArgString),
//     ArgString: _ =>
//         Parsimmon.seq(
//             Parsimmon.regex(/'/),
//             Parsimmon.regex(/[^']*/).map(String),
//             Parsimmon.regex(/'/)
//         ),
//     CellReference: _ => Parsimmon.seq(Parsimmon.letters,Parsimmon.digits),
//     Value: r => Parsimmon.alt(r.Number, r.String),
//     Number: _ => Parsimmon.alt(
//         Parsimmon.regexp(/[0-9]+(\.[0-9]+)?/).map(Number),
//         Parsimmon.regexp(/\.[0-9]+/).map(Number),
//     ),
//     String: _ => Parsimmon.alt(
//         Parsimmon.regex(/=/).map(String),
//         Parsimmon.regex(/[^=].*/).map(String),
//     )
// });

type Grammar = {
    Statement: Cell,
    Formula: FormulaCell,
    CellReference: [string, string],
    Value: number | string,
    Number: number,
    String: string,
    BinaryOperation: SumCell // | SubCell | MulCell | DivCell
}

export const Lang = Parsimmon.createLanguage<Grammar>({
    Statement: r => Parsimmon.alt(r.Formula, r.Value.map(i => {
        if(typeof i === "number")
            return new NumberCell(i)
        else if(typeof i === "string")
            return new StringCell(i)
        else return new EmptyCell()
    })),
    Formula: r => Parsimmon.seq(
        Parsimmon.regex(/=/),
        Parsimmon.alt(
            r.CellReference.map(i => new ReferenceCell(i)),
            r.BinaryOperation
        )
    ).map(i => i[1]),
    CellReference: _ => Parsimmon.seq(Parsimmon.regex(/[a-z]+/i), Parsimmon.regex(/[0-9]+/)).map(i => [i[0].toUpperCase(),i[1]]),
    Value: r => Parsimmon.alt(r.Number, r.String),
    Number: _ => Parsimmon.alt(
        Parsimmon.regexp(/[0-9]+(\.[0-9]+)?/),
        Parsimmon.regexp(/\.[0-9]+/),
    ).map(i => Number(i).valueOf()),
    String: _ => Parsimmon.alt(
        Parsimmon.regex(/=/),
        Parsimmon.regex(/[^=][^"]*/),
    ),
    BinaryOperation: r => Parsimmon.seq(
        Parsimmon.alt(
            Parsimmon.string('SUM')
            // Parsimmon.string('SUB'), Parsimmon.string('MUL'), Parsimmon.string('DIV')
        ),
        Parsimmon.string('('),
        Parsimmon.alt(Parsimmon.seq(Parsimmon.string('\"'), r.String, Parsimmon.string('\"')).map(i => i[1]), r.CellReference, r.Number),
        Parsimmon.string(','),
        Parsimmon.alt(Parsimmon.seq(Parsimmon.string('\"'), r.String, Parsimmon.string('\"')).map(i => i[1]), r.CellReference, r.Number),
        Parsimmon.string(')')
    ).map(i => {
        const formula:string = `=${i[0]}(${argumentToString(i[2])},${argumentToString(i[4])})`

        switch (i[0]) {
            case 'SUM':
                return new SumCell(formula, i[2], i[4])
            //
        }
    })
});


function argumentToString(arg: number | string | [string, string]) : string {
    if(typeof arg === "number")
        return arg.toString()
    else if(typeof arg === "string")
        return `"${arg}"`
    else return `${arg[0]}${arg[1]}`
}


// Lang.Statement.tryParse('=A1') //?
// const input = '7u8uu8' // ?
// Lang.Statement.tryParse(input) // ?
