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

    const range = sheet.getRange(1, 1, 1, 5);
    range.setValues([['Start time', 'End time', 'Elapsed time', 'Total Time:', '=SUM(C:C)']]);

    const elapsedTimeRange = sheet.getRange(1, 3, 99, 1);
    elapsedTimeRange.setNumberFormat('[hh]:[mm]');

    const totalTimeRange = sheet.getRange(1, 5);
    totalTimeRange.setNumberFormat('[hh]:[mm]');
}
