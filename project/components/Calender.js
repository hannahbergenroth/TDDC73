import React, { useState }  from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

import {MONTH, YEAR, WEEK_DAYS, CALENDAR_MONTHS, getToday, getNumberOfDays, getNextMonth,
    getPrevMonth, getMonthFirstDay, zeroPad} from './CalenderData';

const Calender = (props) => {
    const [selected, setSelected] = useState(props.date ? props.date : '');
    const [month, setMonth] = useState(MONTH);
    const [year, setYear] = useState(YEAR);

    const today = getToday();

    // get month name from CALENDER_MONTH
    const monthName = Object.keys(CALENDAR_MONTHS)[month-1];
   
    const renderWeekDays = Object.entries(WEEK_DAYS).map(([key, value]) => {
        return <View key={key} style={styles.weekDays} ><Text style={styles.weekDaysText}>{value}</Text></View>
    })

    const prevMonth = () => {
        const data = getPrevMonth(month,year);
        setMonth(data.month);
        setYear(data.year);
    }
 
    const nextMonth = () => {
        const data = getNextMonth(month,year);
        setMonth(data.month);
        setYear(data.year);
    }

    const monthDays = getNumberOfDays(month, year);
    const monthFirstDay = getMonthFirstDay(month, year);
    const daysPrevMonth = monthFirstDay - 1;
    const daysNextMonth = 42 - (daysPrevMonth + monthDays);

    const prev = getPrevMonth(month, year);

    let days = []

    let prevDays = getNumberOfDays(prev.month, prev.year);
    for(let i = 1; i < monthFirstDay; i++) {
        days.push(prevDays);
        prevDays--;
    }
    days = days.reverse();

    for(let i = 1; i <= monthDays; i++) {
        days.push(i);
    }

    for(let i = 1; i <= daysNextMonth; i++) {
        days.push(i);
    }

    let renderItems = days.map((day,key) => {
        let date = [year,zeroPad(month,2),zeroPad(day,2)].join('-');
  
        let isSameMonth = true;
        const isPrevMonth = key < daysPrevMonth;
        const isNextMonth = key >= monthDays + daysPrevMonth; 

        if(isPrevMonth) {
            const data = getPrevMonth(month,year);
            date = [data.year,zeroPad(data.month,2),zeroPad(day,2)].join('-');
            isSameMonth = false;
        }

        else if (isNextMonth) {
            const data = getNextMonth(month,year);
            date = [data.year,zeroPad(data.month,2),zeroPad(day,2)].join('-');
            isSameMonth = false;
        }

        return (
        <TouchableOpacity onPressIn={props.getDate ? () => props.getDate(date) : () => {} } onPress={() => setSelected(date)} style={[today === date && styles.today, styles.dayElement]} key={key} >
            <Text style={[!isSameMonth ? styles.notInMonth : styles.inMonth, selected === date && styles.selected]}>{day}</Text> 
        </TouchableOpacity>
        )
    })

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.arrow} onPress={() => prevMonth() }>
                    <Text style={styles.arrowText}>
                        &#8592; prev
                    </Text>
                </TouchableOpacity>
                <View style={styles.currentMonth}>
                    <Text style={styles.currentMonthText}>{monthName} {year}</Text>
                </View>
                <TouchableOpacity style ={styles.arrow} onPress={() => nextMonth()}>
                    <Text style ={styles.arrowText}>
                        next &#8594; 
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.calenderContainer}>
                <View style={styles.headerWeekDays}>
                    {renderWeekDays}
                </View>
                <View style={styles.days}>
                    {renderItems}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1, 
        borderRadius: 15, 
        margin: 5, 
        marginHorizontal: 15
    },
    header: { 
        flexDirection: 'row', 
        margin: 5
    },
    arrow: {
        flex:1
    },
    arrowText: {
        textAlign: 'center'
    },
    currentMonth: {
        flex: 3,
    },
    currentMonthText: {
        textAlign: 'center', 
        fontSize: 20
    },
    today: {
        padding: 0,
        backgroundColor: 'rgba(200, 200, 200, 0.6)',
        borderRadius: 100,
    },
    notInMonth: {
        color: '#C7C7C7',
        padding: 6,
        textAlign: 'center',
    },
    inMonth: {
        color: 'black',
        padding: 6,
        textAlign: 'center',
    },
    days: {
        flexDirection: 'row', 
        flexWrap: 'wrap'
    },
    dayElement: {
        width: `${100/7}%`,
        height: 32,
    },
    selected: {
        color: '#09ABC1'

    },
    calenderContainer: { 
        margin: 9
    },
    headerWeekDays: {
        flexDirection: 'row',
        backgroundColor: '#C7C7C7',
        paddingVertical: 6,
        borderRadius: 5,
    },
    weekDays: {
        flex: 1,
    },
    weekDaysText: {
        textAlign: 'center',
    }
});
    
export default Calender;