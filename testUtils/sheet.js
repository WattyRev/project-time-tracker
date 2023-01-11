/* global jest */

/**
 * Creates a mock sheet from the provided rectangular array data.
 */
export function createMockSheet(data, { numberFormat = null, name = 'test name' } = {}) {
    if (!data) {
        return null;
    }
    return {
        getData() {
            return data;
        },
        setName: jest.fn(),
        numberFormat,
        getName: jest.fn().mockReturnValue(name),
        getLastRow() {
            return data.reduce((lastRow, row, index) => {
                if (row.find(cell => !!cell)) {
                    return index + 1;
                }
                return lastRow;
            }, 1);
        },
        getRange(rowStart, columnStart, numRows = 1, numColumns = 1) {
            const rows = data.filter(
                (_, index) => index >= rowStart - 1 && index < numRows + rowStart - 1
            );
            const filteredRows = rows.map(row =>
                row.filter(
                    (_, index) => index >= columnStart - 1 && index < numColumns + columnStart - 1
                )
            );
            return {
                getValues() {
                    return filteredRows;
                },
                getValue() {
                    if (!filteredRows || !filteredRows[0]) {
                        return null;
                    }
                    return filteredRows[0][0];
                },
                setValue(value) {
                    const updatedData = data;
                    updatedData[rowStart - 1][columnStart - 1] = value;
                    return createMockSheet(updatedData);
                },
                setValues(values) {
                    const updatedData = data;
                    values.forEach((valueRow, rowIndex) => {
                        valueRow.forEach((cell, cellIndex) => {
                            if (!updatedData[rowStart - 1 + rowIndex]) {
                                updatedData[rowStart - 1 + rowIndex] = [];
                            }
                            updatedData[rowStart - 1 + rowIndex][
                                columnStart - 1 + cellIndex
                            ] = cell;
                        });
                    });
                    return createMockSheet(updatedData);
                },
                setNumberFormat(updatedFormat) {
                    return createMockSheet(data, { numberFormat: updatedFormat });
                },
            };
        },
    };
}

/**
 * Creates a mock Spreadsheet with multiple sheets
 */
export function createMockSpreadsheet(overrides = {}) {
    const data = {
        Logs: [['mock logs']],
        ...overrides,
    };
    return {
        getSheets() {
            return data;
        },
        insertSheet(name, index) {
            data[index] = [];
            return createMockSheet(data[index]);
        },
        getData() {
            return data;
        },
    };
}
