import { Literal } from "../utils/types"
import Cell from "./Cell"

export default class EmptyCell extends Cell{

    getValue(): Literal { return '' }

    content(): string { return '' }
}
