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
export default function createProject(projectName) {
    log(`Completing project named "${projectName}"`);

    // Get the spreadsheet
    const spreadsheet = getSpreadsheet();
    const sheet = spreadsheet.getSheetByName(projectName);

    // Can't complete a project that doesn't exist
    if (sheet == null) {
        throw new Error(
            `Could not complete project named "${projectName}" because it does not exist.`
        );
    }

    sheet.setName(`${projectName} - Completed ${moment().format('YYYY/MM/DD hh:mm:ss a')}`);
}
