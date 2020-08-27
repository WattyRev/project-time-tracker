import getSpreadsheet from '../globals/Spreadsheet';

class SpreadsheetApi {
    getLogsSheet() {
        return getSpreadsheet().getSheetByName('Logs');
    }
}

export default new SpreadsheetApi();
