import MockDate from 'mockdate';
import { createMockSheet } from '../../../testUtils/sheet';
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
            getSheets: jest.fn(() => [null, mockSheet]),
        });
    });
    it('marks the project as complete', () => {
        expect.assertions(1);
        completeProject();
        expect(mockSheet.setName).toHaveBeenCalledWith(
            'test name - Completed 2019/11/24 02:00:00 am'
        );
    });
    it('throws if the project was already completed', () => {
        expect.assertions(1);
        mockSheet.getName.mockReturnValue('test name - Completed');

        expect(() => completeProject()).toThrow(
            'Could not complete project named "test name - Completed" because it is already completed.'
        );
    });
});
