/* global SpreadsheetApp */

/**
 * The spreadsheet that backs the script.
 * https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet
 * @type {Spreadsheet}
 */
export default function getSpreadsheet() {
    return SpreadsheetApp.openByUrl(
        'https://docs.google.com/spreadsheets/d/1qjZjHGqGeOq7pv1ohsgupzh05Y_NsyTA5gAmJr7-cy8/edit#gid=0'
    );
}
