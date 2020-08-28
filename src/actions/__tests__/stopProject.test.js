import MockDate from 'mockdate';
import { createMockSpreadsheet } from '../../../testUtils/sheet';
import getSpreadsheet from '../../globals/Spreadsheet';
import stopProject from '../stopProject';

jest.mock('../../util/log');
jest.mock('../../globals/Spreadsheet');

describe('stopProject', () => {
    let mockSpreadsheet;
    beforeEach(() => {
        MockDate.set('2019-11-24T10:00:00.000Z');
        mockSpreadsheet = createMockSpreadsheet({
            test: [
                ['Start time', 'Stop time', 'Elapsed', 'Total', 'whatever'],
                [new Date('2019-11-23T10:00:00.000Z'), null, null],
            ],
        });
        getSpreadsheet.mockReturnValue(mockSpreadsheet);
    });
    it('adds a new stop time to the sheet', () => {
        expect.assertions(1);
        stopProject('test');
        expect(mockSpreadsheet.getData().test).toEqual([
            ['Start time', 'Stop time', 'Elapsed', 'Total', 'whatever'],
            [new Date('2019-11-23T10:00:00.000Z'), new Date('2019-11-24T10:00:00.000Z'), '=B2-A2'],
        ]);
    });
    it('throws if the sheet does not exist', () => {
        expect.assertions(1);
        mockSpreadsheet = createMockSpreadsheet();
        getSpreadsheet.mockReturnValue(mockSpreadsheet);

        expect(() => stopProject('test')).toThrow();
    });
    it("throws if the timer hasn't been started", () => {
        expect.assertions(1);
        mockSpreadsheet = createMockSpreadsheet({
            test: [
                ['Start time', 'Stop time', 'Elapsed', 'Total', 'whatever'],
                [null, null, null],
            ],
        });
        getSpreadsheet.mockReturnValue(mockSpreadsheet);

        expect(() => stopProject('test')).toThrow();
    });
});
