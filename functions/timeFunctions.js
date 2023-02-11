export function unixToDatetimeFunction(unix) {
    var dateString = new Date(unix);
    return dateString;
}


export function getDaysSinceLastMessage(datetime) {
    let differenceInDays = (Date.now() - datetime) / (1000 * 3600 * 24);
    //console.log(differenceInDays)
    return Math.floor(differenceInDays);
}