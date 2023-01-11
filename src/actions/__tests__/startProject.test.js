import MockDate from 'mockdate';
import { createMockSpreadsheet, createMockSheet } from '../../../testUtils/sheet';
import getSpreadsheet from '../../globals/Spreadsheet';
import startProject from '../startProject';

jest.mock('../../util/log');
jest.mock('../../globals/Spreadsheet');

describe('startProject', () => {
    let mockSpreadsheet;
    beforeEach(() => {
        MockDate.set('2019-11-24T10:00:00.000Z');
        mockSpreadsheet = createMockSpreadsheet({
            1: createMockSheet([
                ['Start time', 'Stop time', 'Elapsed', 'Total', 'whatever'],
                [null, null, null],
            ]),
        });
        getSpreadsheet.mockReturnValue(mockSpreadsheet);
    });
    it('adds a new start time to the sheet', () => {
        expect.assertions(1);
        startProject();
        expect(mockSpreadsheet.getData()[1].getData()).toEqual([
            ['Start time', 'Stop time', 'Elapsed', 'Total', 'whatever'],
            [new Date('2019-11-24T10:00:00.000Z'), null, null],
        ]);
    });
    it('throws if the project has been completed', () => {
        expect.assertions(1);
        mockSpreadsheet = createMockSpreadsheet({
            1: createMockSheet(
                [
                    ['Start time', 'Stop time', 'Elapsed', 'Total', 'whatever'],
                    [null, null, null],
                ],
                { name: 'test - Completed' }
            ),
        });
        getSpreadsheet.mockReturnValue(mockSpreadsheet);

        expect(() => startProject('test')).toThrow(
            'Could not start project named "test - Completed" because it has already been completed.'
        );
    });
    it("throws if the previous timer hasn't been stopped", () => {
        expect.assertions(1);
        mockSpreadsheet = createMockSpreadsheet({
            1: createMockSheet([
                ['Start time', 'Stop time', 'Elapsed', 'Total', 'whatever'],
                [new Date('2019-11-24T10:00:00.000Z'), null, null],
                [null, null, null],
            ]),
        });
        getSpreadsheet.mockReturnValue(mockSpreadsheet);

        expect(() => startProject('test')).toThrow(
            'Could not start project named "test name" because it has not been stopped.'
        );
    });
});
