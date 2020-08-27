import log from '../util/log';
import getSpreadsheet from '../globals/Spreadsheet';

export default function stopProject(projectName) {
    log(`Stopping project named "${projectName}"`);

    const spreadsheet = getSpreadsheet();
    const sheet = spreadsheet.getSheetByName(projectName);
    if (sheet == null) {
        throw new Error(`Could not stop project named "${projectName}" because it does not exist`);
    }

    const lastRow = sheet.getLastRow();
    const range = sheet.getRange(lastRow, 2);
    if (range.getValue()) {
        throw new Error(
            `Could not stop project named "${projectName}" because it has not been started.`
        );
    }
    range.setValues([[new Date()]]);
}
