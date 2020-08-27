import log from '../util/log';
import getSpreadsheet from '../globals/Spreadsheet';

export default function createProject(projectName) {
    log(`Creating project named "${projectName}"`);
    const spreadsheet = getSpreadsheet();
    const existingSheet = spreadsheet.getSheetByName(projectName);
    if (existingSheet !== null) {
        throw new Error(`A project named "${projectName}" already exists`);
    }

    const sheet = spreadsheet.insertSheet();
    sheet.setName(projectName);

    const range = sheet.getRange(1, 1, 2, 4);
    range.setValues([
        ['Start time', 'End time', 'Elapsed time', 'Total Time'],
        ['', '', '', '=SUM(C:C)'],
    ]);
}
