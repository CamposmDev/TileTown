const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const dateToStr = (date: Date): string => {
    let month = months[date.getUTCMonth()]
    let day = date.getUTCDate()
    let year = date.getUTCFullYear()
    return month + ' ' + day + ' ' + year
}

export const isExpired = (date: Date): boolean => {
    let endTime = date.getTime()
    let currentTime = new Date().getTime()
    return (endTime - currentTime) <= 0
}

export const calcTimeLeft = (endDate: Date): string => {
    /** Retrieve the times of start and end date in unix time */
    let endTime = endDate.getTime()
    /** Compute the time left in unix time (milliseconds) */
    let timeLeft = endTime - new Date().getTime()
    /** Compute the seconds left  from ms left*/
    let secLeft = Math.floor(timeLeft / 1000)
    if (secLeft <= 59) {
        if (secLeft <= 0) return 'Contest Over!'
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

export const dateToPostedStr = (date: Date | undefined): string => {
    if (!date) return 'Failed to Parse Date'
    let currentDate = new Date()
    let timeInterval = currentDate.getTime() - date.getTime()
    /** Compute the seconds left  from ms left*/
    let secLeft = Math.floor(timeInterval / 1000)
    if (secLeft <= 59) {
        if (secLeft === 1) return secLeft + ' Second Ago'
        return secLeft + ' Seconds Ago'
    }
    /** Compute the minutes left from seconds left */
    let minLeft = Math.floor(secLeft / 60)
    if (minLeft <= 59) {
        if (minLeft === 1) return minLeft + ' Minute Ago'
        return minLeft + ' Minutes Ago'
    }
    /** Compute the hours left from minutes left */
    let hrLeft = Math.floor(minLeft / 60)
    if (hrLeft <= 24) {
        if (hrLeft === 1) return hrLeft + ' Hour Ago'
        return hrLeft + ' Hours Ago'
    }
    /** Compute the days left from hours left */
    let dayLeft = Math.floor(hrLeft / 24)
    if (dayLeft <= 30) {
        if (dayLeft === 1) return dayLeft + ' Day Ago'
        return dayLeft + ' Days Ago'
    }
    /** Compute the months left from days left */
    let monLeft = Math.floor(dayLeft / 30)
    if (monLeft <= 12) {
        if (monLeft === 1) return monLeft + ' Month Ago'
        return monLeft + ' Months Ago'
    }
    /** Compute the years left from months left */
    let yrLeft = Math.floor(monLeft / 12)
    if (yrLeft === 1) return yrLeft + ' Year Ago'
    return yrLeft + ' Years Ago'
}

/**
 * Returns the date as a pretty string: Month XX, Year (X Time Ago)
 * @param d 
 * @returns 
 */
export const dateToPrettyString = (d: Date): string => {
    return `${dateToStr(d)} (${dateToPostedStr(d)})`
}