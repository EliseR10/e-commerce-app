//Determine how many hours of sleep do you have each nights
const getSleepHours = day => {
    if (day === 'Monday'){
      return 8;
    } else if (day === 'Tuesday') {
      return 10;
    } else if (day === 'Wednesday') {
      return 8;
    } else if (day === 'Thursday') {
      return 8;
    } else if (day === 'Friday') {
      return 6;
    } else if (day === 'Saturday') {
      return 7;
    } else if (day === 'Sunday') {
      return 10;
    }
  }
  
  /*console.log(getSleepHours('Monday'));
  console.log(getSleepHours('Wednesday'));
  console.log(getSleepHours('Friday'));
  console.log(getSleepHours('Sunday'));*/
  
  //Get the total hours you slept
  const getActualSleepHours = () => {
    return getSleepHours('Monday') + 
    getSleepHours('Tuesday') + 
    getSleepHours('Wednesday') + 
    getSleepHours('Thursday') + 
    getSleepHours('Friday') + 
    getSleepHours('Saturday') + 
    getSleepHours('Sunday');
  };
  
  //Get the ideal hours prefered
  const getIdealSleepHours = () => {
    let idealHours = 8;
    return idealHours * 7;
  };
  
  /*console.log(getActualSleepHours());
  console.log(getIdealSleepHours());*/
  
  //Calculate the difference and return something
  const calculateSleepDebt = () => {
    let actualSleepHours = getActualSleepHours();
    let idealSleepHours = getIdealSleepHours();
  
    if (actualSleepHours === idealSleepHours) {
      console.log('You have the perfect amount of sleep');
    } else if (actualSleepHours > idealSleepHours) {
      console.log('You have ' + (actualSleepHours - idealSleepHours) + ' hours more than needed.');
    } else {
      console.log('You slept ' + (idealSleepHours - actualSleepHours) + ' hours less than what you should get.');
    }
  };
  
  //Call the function
  calculateSleepDebt();