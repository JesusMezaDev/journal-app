import { expect, describe, it } from 'vitest';

import { getYearMonthDay } from '../../../../src/modules/daybook/helpers/getYearMonthDay';

describe('GetYearMonthDay Helper', () => {
    it('GetYearMonthDay send undefined', () => {
        const result = getYearMonthDay(undefined);
        expect(result).toMatchObject({ day: undefined, month: undefined, weekDay: undefined, year: undefined });
    });
    
    it('GetYearMonthDay send today', () => {
        const date = new Date();
        const month = date.toLocaleDateString('es-MX', { month: 'long' });
        const year = date.toLocaleDateString('es-MX', { year: 'numeric' });
        const weekDay = date.toLocaleDateString('es-MX', { weekday: 'long' });
        const day = date.toLocaleDateString('es-MX', { day: '2-digit' });
        const result = getYearMonthDay(date);
        expect(result).toMatchObject({ day, month, weekDay, year });
    });
});