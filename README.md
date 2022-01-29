# TACS
## Spreadsheet Editor

<p align="center">
  <img width="720" height="405" src="https://user-images.githubusercontent.com/45019363/151676286-4131659b-3924-4648-9cd6-3e074691fadb.png"/>
</p>

## Table of Contents
- [Background](#background)
  - [Authors](#authors)
- [Running](#running)
  - [Running Backend](#running-backend)
  - [Running Frontend](#running-frontend)
- [Using](#using)
  - [Interface](#interface)
  - [Language](#language)
    - [Literals](#literals)
    - [Operations](#operations)
    - [Cell referencing](#cell-referencing)
    - [Error checking](#error-checking)

## Background

This project was developed in the subject of Advanced Software Construction Techniques.<br/>
We explored the typing capabilities of TypeScript to create a spreadsheet editor.<br/>
The frontend consists of a React webapp developed with the [MUI](https://mui.com/) library.<br/>
The backend was developed in Node.js with TypeScript.<br/>

### Authors

- Andreia Barreto Gouveia
- João Ricardo Ribeiro Cardoso
- Sofia de Araújo Lajes

## Running
### Running Backend

To start the backend, simply run the following commands, starting in the root of the project:

```
cd excel-backend
npm install
npm start
```

### Running Frontend

To start the frontend, simply run the following commands, starting in the root of the project:

```
cd excel-frontend
npm install
npm start
```

## Using
### Interface

Left clicking a cell updates header of the page, displaying the expression of that cell as well as the result of the expression.<br/>
Double clicking a cell enables the input field, allowing the user to input an expression. To confirm the changes, click the OK button.<br/>
The trash icon resets the content of every cell.<br/>

### Language

For this spreadsheet editor, we created a Domain Specific Language with the [Parsimmon](https://www.npmjs.com/package/parsimmon) library.<br/>

#### Literals
This DSL has 4 kinds of literals: Numbers (integers and floats, ex: `0.54`), Strings (ex: `str`), Arrays ( of numbers, ex: `[5,3]`) and Objects (JSON syntax, ex: `{"a":4,"b":[6],"c":str}`).<br/>

#### Operations
Additionally, we implemented some operations for manipulating literals. The syntax for these operations are as follow:<br/>
`={operationName}({operand1},{operand2},{...})`<br/>
where {operationName} should be replaced for the name of desired operation, and {operandX} for the operands (only literal operands are supported and Strings should be put between `""`). Ex: `=SUM(7,6.5,[5,4])`<br/>

The implemented operations are:

- SUM: Takes at least 1 operand of type Number and/or Array and returns the sum of every Number and element of Array
- SUB: Takes at least 2 operand of type Number and returns the difference between the first operand and the sum of the following operands
- MUL: Takes at least 2 operand of type Number and returns the product of all operands
- DIV: Takes 2 operand of type Number and returns the division of all operands
- MAX: Takes at least 1 operand of type Number and/or Array and returns the largest of all the Numbers and elements of Arrays
- MIN: Takes at least 1 operand of type Number and/or Array and returns the lowest of all the Numbers and elements of Arrays
- AVRG: Takes at least 1 operand of type Number and/or Array and returns the average of every Number and element of Array
- ARRAY: Takes any number of operands of type Number and/or Array and returns an Array containing every Number and element of Array. If no operands are given, the operation returns an empty Array
- LEN: Takes 1 operand of type Array or String and returns the number of elements/characters of the operand
- AT: Takes 2 operands, the first of type Array and the second of type Number and returns the element of the Array of the first operand, in the position of the second operand. Indexing starts at 0
- SUBSTR: Takes 2 or 3 operands, the first of type String and the following of type Number and returns the part of the String of the first operand between the start and end indexes specified by the second and third operands respectively. Indexing starts at 1 and is inclusive
- CONCAT: Takes 2 operands of type String and/or Number and returns the 2 operands combined as Strings
- PROP: Takes 2 operands, the first of type Object and the second of type String and returns the value in the Object of the first operand with the key of the second operand.

#### Cell referencing
It's also possible to reference the value of another cell.<br/>
This can be done with the coordinates of the cell (ex: `A1`), and can be used alone (by using the `=A1` expression) or as an operand of an operation. Ex: `=SUM(A1,6)`<br/>

#### Error checking
The DSL has syntax error checking, so be sure to follow the syntax defined.<br/>
We also implemented semantic error checking, like type checking, indexes out of bounds, etc...<br/>
Referencing cells that contain any type of error creates another error, that will disappear once the first error is solved.<br/>
Circular referencing is also detected and causes an error too.<br/>
