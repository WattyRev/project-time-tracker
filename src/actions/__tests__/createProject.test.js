import { createMockSpreadsheet, createMockSheet } from '../../../testUtils/sheet';
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
        createProject();
        expect(mockSpreadsheet.getData()[1]).toEqual([
            ['Start time', 'End time', 'Elapsed time', 'Total Time:', '=SUM(C:C)'],
        ]);
    });

    it('creates a new sheet with the template even if there is an existing completed project', () => {
        expect.assertions(1);
        mockSpreadsheet = createMockSpreadsheet({
            1: createMockSheet([[]], { name: 'test - Completed' }),
        });
        getSpreadsheet.mockReturnValue(mockSpreadsheet);
        createProject();
        expect(mockSpreadsheet.getData()[1]).toEqual([
            ['Start time', 'End time', 'Elapsed time', 'Total Time:', '=SUM(C:C)'],
        ]);
    });

    it('throws if there is an incomplete project', () => {
        expect.assertions(1);
        mockSpreadsheet = createMockSpreadsheet({
            1: createMockSheet([[]], { name: 'test' }),
        });
        getSpreadsheet.mockReturnValue(mockSpreadsheet);

        expect(() => createProject('test')).toThrow(
            'Project test is not yet completed. Complete that project before starting a new one.'
        );
    });
});
