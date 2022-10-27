const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const parseDateToStr = (date: Date): string => {
    let month = months[date.getUTCMonth()]
    let day = date.getUTCDate()
    let year = date.getUTCFullYear()
    return month + ' ' + day + ' ' + year
}

const calcTimeLeft = (startDate: Date, endDate: Date): string => {
    /** Retrieve the times of start and end date in unix time */
    let startTime = startDate.getTime()
    let endTime = endDate.getTime()
    /** Compute the time left in unix time (milliseconds) */
    let timeLeft = endTime - startTime
    /** Compute the seconds left  from ms left*/
    let secLeft = Math.floor(timeLeft / 1000)
    if (secLeft <= 59) {
        if (secLeft === 1) return secLeft + ' Second Left'
        return secLeft + ' Seconds Left'
    }
    /** Compute the minutes left from seconds left */
    let minLeft = Math.floor(secLeft / 60)
    if (minLeft <= 59) {
        if (minLeft === 1) return minLeft + ' Minute Left'
        return minLeft + ' Minutes Left'
    }
    /** Compute the hours left from minutes left */
    let hrLeft = Math.floor(minLeft / 60)
    if (hrLeft <= 24) {
        if (hrLeft === 1) return hrLeft + ' Hour Left'
        return hrLeft + ' Hours Left'
    }
    /** Compute the days left from hours left */
    let dayLeft = Math.floor(hrLeft / 24)
    if (dayLeft <= 30) {
        if (dayLeft === 1) return dayLeft + ' Day Left'
        return dayLeft + ' Days Left'
    }
    /** Compute the months left from days left */
    let monLeft = Math.floor(dayLeft / 30)
    if (monLeft <= 12) {
        if (monLeft === 1) return monLeft + ' Month Left'
        return monLeft + ' Months Left'
    }
    /** Compute the years left from months left */
    let yrLeft = Math.floor(monLeft / 12)
    if (yrLeft === 1) return yrLeft + ' Year Left'
    return yrLeft + ' Years Left'
}

export { parseDateToStr, calcTimeLeft }