import MockDate from 'mockdate';
import { createMockSpreadsheet } from '../../../testUtils/sheet';
import getSpreadsheet from '../../globals/Spreadsheet';
import startProject from '../startProject';

jest.mock('../../util/log');
jest.mock('../../globals/Spreadsheet');

describe('startProject', () => {
    let mockSpreadsheet;
    beforeEach(() => {
        MockDate.set('2019-11-24T10:00:00.000Z');
        mockSpreadsheet = createMockSpreadsheet({
            test: [
                ['Start time', 'Stop time', 'Elapsed', 'Total', 'whatever'],
                [null, null, null],
            ],
        });
        getSpreadsheet.mockReturnValue(mockSpreadsheet);
    });
    it('adds a new start time to the sheet', () => {
        expect.assertions(1);
        startProject('test');
        expect(mockSpreadsheet.getData().test).toEqual([
            ['Start time', 'Stop time', 'Elapsed', 'Total', 'whatever'],
            [new Date('2019-11-24T10:00:00.000Z'), null, null],
        ]);
    });
    it('throws if the sheet does not exist', () => {
        expect.assertions(1);
        mockSpreadsheet = createMockSpreadsheet();
        getSpreadsheet.mockReturnValue(mockSpreadsheet);

        expect(() => startProject('test')).toThrow();
    });
    it("throws if the previous timer hasn't been stopped", () => {
        expect.assertions(1);
        mockSpreadsheet = createMockSpreadsheet({
            test: [
                ['Start time', 'Stop time', 'Elapsed', 'Total', 'whatever'],
                [new Date('2019-11-24T10:00:00.000Z'), null, null],
                [null, null, null],
            ],
        });
        getSpreadsheet.mockReturnValue(mockSpreadsheet);

        expect(() => startProject('test')).toThrow();
    });
});
