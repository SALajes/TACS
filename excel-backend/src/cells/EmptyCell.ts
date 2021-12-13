import Cell from "./Cell"

export default class EmptyCell extends Cell{

    view(): string { return '' }

    content(): string { return '' }
}
