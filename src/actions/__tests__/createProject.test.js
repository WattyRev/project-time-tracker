import { createMockSpreadsheet } from '../../../testUtils/sheet';
import getSpreadsheet from '../../globals/Spreadsheet';
import createProject from '../createProject';

jest.mock('../../util/log');
jest.mock('../../globals/Spreadsheet');

describe('createProject', () => {
    let mockSpreadsheet;
    beforeEach(() => {
        mockSpreadsheet = createMockSpreadsheet();
        getSpreadsheet.mockReturnValue(mockSpreadsheet);
    });
    it('creates a new sheet with the template', () => {
        expect.assertions(1);
        createProject('test');
        expect(mockSpreadsheet.getData().test).toEqual([
            ['Start time', 'End time', 'Elapsed time', 'Total Time:', '=SUM(C:C)'],
        ]);
    });

    it('throws if a sheet already exists', () => {
        expect.assertions(1);
        mockSpreadsheet = createMockSpreadsheet({
            test: [],
        });
        getSpreadsheet.mockReturnValue(mockSpreadsheet);

        expect(() => createProject('test')).toThrow();
    });
});
