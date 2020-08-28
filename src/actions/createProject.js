import log from '../util/log';
import getSpreadsheet from '../globals/Spreadsheet';

/**
 * Creates a new spreadsheet tab for a new project. This sets up the tab with
 * a basic template and preferred formatting.
 *
 * Throws if a tab already exists with the provided project name.
 *
 * @param  {String} projectName
 */
export default function createProject(projectName) {
    log(`Creating project named "${projectName}"`);

    // Get the spreadsheet
    const spreadsheet = getSpreadsheet();
    const existingSheet = spreadsheet.getSheetByName(projectName);

    // Can't create the sheet if one already exists
    if (existingSheet !== null) {
        throw new Error(`A project named "${projectName}" already exists`);
    }

    // Create the sheet with the project name
    const sheet = spreadsheet.insertSheet(projectName);

    // Add a heading row with a forumula for calculating total time.
    // The total time is in the top row to prevent interfering with automated
    // manipulation of subsequent rows.
    const range = sheet.getRange(1, 1, 1, 5);
    range.setValues([['Start time', 'End time', 'Elapsed time', 'Total Time:', '=SUM(C:C)']]);

    // Add duration formatting for the elapsed time column
    const elapsedTimeRange = sheet.getRange(1, 3, 99, 1);
    elapsedTimeRange.setNumberFormat('[hh]:[mm]');

    // Add duration formatting for the total time
    const totalTimeRange = sheet.getRange(1, 5);
    totalTimeRange.setNumberFormat('[hh]:[mm]');

    // Add date/time formatting for the start/end columns
    const dateLogRange = sheet.getRange(1, 1, 99, 2);
    dateLogRange.setNumberFormat('yyyy-mm-dd hh:mm A/P".M."');
}
