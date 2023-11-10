export const getYearMonthDay = (date: Date | undefined) => {
    if (!date) return { day: undefined, month: undefined, weekDay: undefined, year: undefined };

    const month = date.toLocaleDateString('es-MX', { month: 'long' });
    const year = date.toLocaleDateString('es-MX', { year: 'numeric' });
    const weekDay = date.toLocaleDateString('es-MX', { weekday: 'long' });
    const day = date.toLocaleDateString('es-MX', { day: '2-digit' });
    
    return {
        day,
        month,
        weekDay,
        year,
    }
}