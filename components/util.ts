export function prefixNumber(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
}

export function formatDateString(date: Date): string {
    return `${prefixNumber(date.getHours())}:${prefixNumber(date.getMinutes())} ${date.getDate()}.${
        date.getMonth() + 1
    }.${date.getFullYear()}`;
}

export function parseDate(dateString: string, type: "start" | "end"): Date {
    // Format: '18:00 31.8.2018'
    // time[0] is hours, time[1] is minutes
    const time = dateString.split(" ")[0].split(":");
    // date[2] is year, date[1] is month, date[0] is day
    const date = dateString.split(" ").pop().split(".");
    // Year, month index, day, hour, minute, seconds, milliseconds
    return type === "start"
        ? new Date(+date[2], +date[1] - 1, +date[0], +time[0], +time[1])
        : new Date(+date[2], +date[1] - 1, +date[0], +time[0], +time[1], 59, 999);
}
