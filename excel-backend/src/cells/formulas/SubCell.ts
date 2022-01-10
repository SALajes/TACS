import Cell from "../Cell";
import FormulaCell from "./FormulaCell"
import OperationCell from "./OperationCell"
import { Literal, Operand } from "../../utils/types"

export default class SubCell extends OperationCell {
    constructor(formula: string, operands: Operand[]){
        super(formula, operands)
        this.minNumArgs = 2
    }

    calculateValue(): Literal {
        const values : Literal[] = this.operandsValueExtraction()
        if(!this.validNumArgs(values.length)) return "!Wrong Number of Arguments!"

        let result : number = 0

        const getNumber = (value: Literal): number => {
            if(typeof value === "number")
                return value
            else return null
        }

        for(let i=0; i < values.length; i++){
            const v: number = getNumber(values[i])

            if (v !== null){
                if(i === 0){
                    result += v
                }
                else result -= v
            }
            else {
                this.hasException = true
                return "!Invalid Types!"
            }
        }
        return result
    }
}
