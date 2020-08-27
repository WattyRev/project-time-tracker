/**
 * Creates a mock sheet from the provided rectangular array data.
 */
export function createMockSheet(data) {
    return {
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
                    return data[rowStart - 1][columnStart - 1];
                },
                setValue(value) {
                    const updatedData = data;
                    updatedData[rowStart - 1][columnStart - 1] = value;
                    return createMockSheet(updatedData);
                },
                setValues(values) {
                    const updatedData = data;
                    values.forEach((valueRow, rowIndex) => {
                        updatedData[rowStart - 1 + rowIndex] = valueRow;
                    });
                    return createMockSheet(updatedData);
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
        getSheetByName(name) {
            return createMockSheet(data[name]);
        },
    };
}
