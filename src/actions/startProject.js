import log from '../util/log';
import getSpreadsheet from '../globals/Spreadsheet';

export default function startProject(projectName) {
    log(`Starting project named "${projectName}"`);

    // Get the spreadsheet
    const spreadsheet = getSpreadsheet();
    const sheet = spreadsheet.getSheetByName(projectName);

    // Throw if a tab with the provided project name doesn't exist
    if (sheet == null) {
        throw new Error(`Could not start project named "${projectName}" because it does not exist`);
    }

    // Get the last row (lowest row with content in it) to determine where to
    // put the new start entry
    const lastRow = sheet.getLastRow();

    // Check the last row's stop column to see if there's a value. Throw if not,
    // because it doesn't make sense to start logging time when it was never
    // stopped.
    const latestStop = sheet.getRange(lastRow, 2).getValue();
    if (!latestStop) {
        throw new Error(
            `Could not start project named "${projectName}" because it has not been stopped.`
        );
    }

    // Add the start time
    const range = sheet.getRange(lastRow + 1, 1);
    range.setValue(new Date());
}
