import OperationCell from "./OperationCell"
import { Literal, Operand } from "../../../utils/types"

export default class SubstrCell extends OperationCell {
    constructor(formula: string, operands: Operand[]){
        super(formula, operands);
        this.minNumArgs = 2;
        this.maxNumArgs = 3;
    }

    calculateValue(): Literal {
        const values : Literal[] = this.operandsValueExtraction()
        if(!this.validNumArgs(values.length)) return "!Wrong Number of Arguments!"

        if (typeof values[0] === "string" && typeof values[1] === "number"){
            const endIndex : number = values.length === 3 && typeof values[2] === "number" ? values[2] : undefined

            if(values[1] >= 1 && values[1] <= values[0].length
                && (endIndex === undefined
                    || (values[1] <= endIndex && endIndex <= values[0].length)
                )
            )
                return values[0].substring(values[1]-1, endIndex)
            else {
                this.hasException = true
                return "!Invalid index(es)!"
            }
        }

        this.hasException = true
        return "!Invalid Types!"
    }
}
