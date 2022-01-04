function changeTimezone(date, ianatz) {
    var invdate = new Date(date.toLocaleString('en-US', {
      timeZone: ianatz
    }));
  
    var diff = date.getTime() - invdate.getTime();
    let diffTime =date.getTime()-diff;
    let thereDate=new Date(diffTime);
    return thereDate.toString();
  
  }

module.exports = {
    changeTimezone
}
