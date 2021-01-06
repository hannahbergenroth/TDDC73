export const DATE = new Date().getDate();
export const MONTH = new Date().getMonth() + 1;
export const YEAR = new Date().getFullYear();

export const WEEK_DAYS = {
    Sunday: "Sun",
    Monday: "Mon",
    Tuesdday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat"
}

export const CALENDAR_MONTHS = {
    January: "Jan",
    Februari: "Feb",
    March: "Mar",
    April: "Apr",
    May: "May",
    June: "Jun",
    July: "Jul",
    August: "Aug",
    September: "Sep",
    October: "Oct",
    November: "Nov",
    December: "Dec"
}

//Pad a string value with zeros until desired length
export const zeroPad = (value, length) => {
    return `${value}`.padStart(length, '0');
}

export const getToday = () => {
    return [
        YEAR,
        zeroPad(MONTH, 2),
        zeroPad(DATE, 2)
      ].join('-');
}

export const getNumberOfDays = (month = MONTH, year = YEAR) => {
    const month30 = [4,6,9,11];
    const leapYear = ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);

    return month === 2 
        ? leapYear 
            ? 29 
            : 28 
        : month30.includes(month) 
            ? 30
            : 31;
}

export const getMonthFirstDay = (month = MONTH, year = YEAR) => {
    return +(new Date(`${year}-${zeroPad(month, 2)}-01`).getDay()) + 1;
}
  
export const getPrevMonth = (month, year) => {
    const prevMonth = (month > 1) ? month - 1 : 12;
    const prevMonthYear = (month > 1) ? year : year - 1;
  
    return { month: prevMonth, year: prevMonthYear };
}
  
export const getNextMonth = (month, year) => {
    const nextMonth = (month < 12) ? month + 1 : 1;
    const nextMonthYear = (month < 12) ? year : year + 1;
  
    return { month: nextMonth, year: nextMonthYear };
}
