import log from '../util/log';
import getSpreadsheet from '../globals/Spreadsheet';

export default function stopProject(projectName) {
    log(`Stopping project named "${projectName}"`);

    // Get the spreadsheet
    const spreadsheet = getSpreadsheet();
    const sheet = spreadsheet.getSheetByName(projectName);

    // Throw if the sheet doesn't exist
    if (sheet == null) {
        throw new Error(`Could not stop project named "${projectName}" because it does not exist`);
    }

    // Get the last row (lowest row with content in it) to determine where to
    // put the new stop entry
    const lastRow = sheet.getLastRow();

    const range = sheet.getRange(lastRow, 2, 1, 2);

    // Check if there's already a stop value, then we must not have started a
    // new timer. Throw.
    if (range.getValue()) {
        throw new Error(
            `Could not stop project named "${projectName}" because it has not been started.`
        );
    }

    // Set the end time and add a forumula to calculate the elapsed time
    range.setValues([[new Date(), `=B${lastRow}-A${lastRow}`]]);
}
