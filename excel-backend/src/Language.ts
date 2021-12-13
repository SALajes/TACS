import * as Parsimmon from 'parsimmon';

export let Lang = Parsimmon.createLanguage({
    Statement: r => Parsimmon.alt(r.Function,r.Value),
    Function: r => Parsimmon.seq(
        Parsimmon.regex(/=/),
        Parsimmon.alt(
            r.BiFunction
        )
    ),
    BiFunction: r => Parsimmon.seq(
        Parsimmon.alt(
            r.Sum,
            r.Sub,
            r.Mul,
            r.Div
        ),
        r.Args
    ),
    Sum: _ => Parsimmon.regex(/Sum/),
    Sub: _ => Parsimmon.regex(/Sub/),
    Mul: _ => Parsimmon.regex(/Mul/),
    Div: _ => Parsimmon.regex(/Div/),
    Args: r =>
        Parsimmon.seq(
            Parsimmon.regex(/\(/),
            r.Value,
            Parsimmon.regex(/,/),
            r.Value,
            Parsimmon.regex(/\)/),
        ),
    Arg: r =>
        Parsimmon.seq(
            Parsimmon.regex(/\(/),
            r.Value,
            Parsimmon.regex(/\)/),
        ),
    Value: r => Parsimmon.alt(r.Number, r.CellReference),
    CellReference: _ => Parsimmon.seq(Parsimmon.letters,Parsimmon.digits),
    Number: _ => Parsimmon.regexp(/[0-9]+(\.[0-9]+)?/).map(Number),
    String: _ => Parsimmon.regex(/[^=\(\),]*/).map(String),
});
