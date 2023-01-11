import MockDate from 'mockdate';
import { createMockSpreadsheet, createMockSheet } from '../../../testUtils/sheet';
import getSpreadsheet from '../../globals/Spreadsheet';
import stopProject from '../stopProject';

jest.mock('../../util/log');
jest.mock('../../globals/Spreadsheet');

describe('stopProject', () => {
    let mockSpreadsheet;
    beforeEach(() => {
        MockDate.set('2019-11-24T10:00:00.000Z');
        mockSpreadsheet = createMockSpreadsheet({
            1: createMockSheet([
                ['Start time', 'Stop time', 'Elapsed', 'Total', 'whatever'],
                [new Date('2019-11-23T10:00:00.000Z'), null, null],
            ]),
        });
        getSpreadsheet.mockReturnValue(mockSpreadsheet);
    });
    it('adds a new stop time to the sheet', () => {
        expect.assertions(1);
        stopProject();
        expect(mockSpreadsheet.getData()[1].getData()).toEqual([
            ['Start time', 'Stop time', 'Elapsed', 'Total', 'whatever'],
            [new Date('2019-11-23T10:00:00.000Z'), new Date('2019-11-24T10:00:00.000Z'), '=B2-A2'],
        ]);
    });
    it("throws if the timer hasn't been started", () => {
        expect.assertions(1);
        mockSpreadsheet = createMockSpreadsheet({
            1: createMockSheet([
                ['Start time', 'Stop time', 'Elapsed', 'Total', 'whatever'],
                [null, null, null],
            ]),
        });
        getSpreadsheet.mockReturnValue(mockSpreadsheet);

        expect(() => stopProject()).toThrow(
            'Could not stop project named "test name" because it has not been started.'
        );
    });
});
