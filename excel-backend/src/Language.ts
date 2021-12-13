import * as Parsimmon from 'parsimmon'
import Cell from './Cell';
import FormulaCell from './FormulaCell';
import NumberCell from './NumberCell';
import StringCell from './StringCell';

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
//             Parsimmon.regex(/"/),
//             Parsimmon.regex(/[^"]*/).map(String),
//             Parsimmon.regex(/"/)
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
    CellReference: string,
    Value: NumberCell | StringCell,
    Number: NumberCell,
    String: StringCell
}

export const Lang = Parsimmon.createLanguage<Grammar>({
    Statement: r => Parsimmon.alt(r.Formula, r.Value),
    Formula: r => Parsimmon.seq(
        Parsimmon.regex(/=/),
        Parsimmon.alt(
            r.CellReference.map(i => new FormulaCell("="+i))
        )
    ).map(i => i[1]),
    CellReference: _ => Parsimmon.seq(Parsimmon.letters, Parsimmon.digits).map(i => i[0] + '\'' + i[1]),
    Value: r => Parsimmon.alt(r.Number, r.String),
    Number: _ => Parsimmon.alt(
        Parsimmon.regexp(/[0-9]+(\.[0-9]+)?/),
        Parsimmon.regexp(/\.[0-9]+/),
    ).map(i => new NumberCell(Number(i))),
    String: _ => Parsimmon.alt(
        Parsimmon.regex(/=/).map(String),
        Parsimmon.regex(/[^=].*/).map(String),
    ).map(i => new StringCell(i))
});

// Lang.Statement.tryParse("=A1") //?
// const input = "7u8uu8" // ?
// Lang.Statement.tryParse(input) // ?
