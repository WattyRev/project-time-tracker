import log from '../util/log';
import getSpreadsheet from '../globals/Spreadsheet';

export default function startProject(projectName) {
    log(`Starting project named "${projectName}"`);

    const spreadsheet = getSpreadsheet();
    const sheet = spreadsheet.getSheetByName(projectName);
    if (sheet == null) {
        throw new Error(`Could not start project named "${projectName}" because it does not exist`);
    }

    const lastRow = sheet.getLastRow();
    const latestStop = sheet.getRange(lastRow, 2).getValue();
    log('last row', lastRow);
    log('latestStop', latestStop);
    if (!latestStop) {
        throw new Error(
            `Could not start project named "${projectName}" because it has not been stopped.`
        );
    }
    const range = sheet.getRange(lastRow + 1, 1);
    range.setValue(new Date());
}