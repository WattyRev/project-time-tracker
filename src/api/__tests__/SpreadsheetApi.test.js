import getSpreadsheet from '../../globals/Spreadsheet';
import api from '../SpreadsheetApi';
import { createMockSpreadsheet } from '../../../testUtils/sheet';

jest.mock('../../globals/Spreadsheet');

describe('SpreadsheetApi', () => {
    beforeEach(() => {
        getSpreadsheet.mockReturnValue(createMockSpreadsheet());
    });
    describe('getLogsSheet', () => {
        it('returns the Logs sheet', () => {
            expect.assertions(1);
            const response = api.getLogsSheet();
            expect(response.getRange(1, 1).getValue()).toEqual('mock logs');
        });
    });
});
