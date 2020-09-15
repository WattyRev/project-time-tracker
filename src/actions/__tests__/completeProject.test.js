import MockDate from 'mockdate';
import { createMockSheet, createMockSpreadsheet } from '../../../testUtils/sheet';
import getSpreadsheet from '../../globals/Spreadsheet';
import completeProject from '../completeProject';

jest.mock('../../util/log');
jest.mock('../../globals/Spreadsheet');

describe('completeProject', () => {
    let mockSheet;
    beforeEach(() => {
        MockDate.set('2019-11-24T10:00:00.000Z');
        mockSheet = createMockSheet([[]]);
        getSpreadsheet.mockReturnValue({
            getSheetByName: jest.fn(() => mockSheet),
        });
    });
    it('marks the project as complete', () => {
        expect.assertions(1);
        completeProject('test');
        expect(mockSheet.setName).toHaveBeenCalledWith('test - Completed 2019/11/24 02:00:00 am');
    });
    it('throws if the sheet does not exist', () => {
        expect.assertions(1);
        mockSheet = createMockSpreadsheet();
        getSpreadsheet.mockReturnValue(mockSheet);

        expect(() => completeProject('test')).toThrow();
    });
});
