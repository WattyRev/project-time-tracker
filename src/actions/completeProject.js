import moment from 'moment';
import log from '../util/log';
import getSpreadsheet from '../globals/Spreadsheet';

/**
 * Renames a project to mark it as complete.
 *
 * Throws if the project doesn't exist.
 *
 * @param  {String} projectName
 */
export default function completeProject() {
    // Get the spreadsheet
    const spreadsheet = getSpreadsheet();

    // Always getting the second sheet since that's where we put it on createProject
    const sheet = spreadsheet.getSheets()[1];
    const sheetName = sheet.getName();
    log(`Completing project named "${sheetName}"`);

    // Can't complete a project that doesn't exist
    if (sheetName.includes('Completed')) {
        throw new Error(
            `Could not complete project named "${sheetName}" because it is already completed.`
        );
    }

    sheet.setName(`${sheetName} - Completed ${moment().format('YYYY/MM/DD hh:mm:ss a')}`);
}
