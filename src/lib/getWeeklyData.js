export default function(date) {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const numDaysInMonth = new Date(year, month, 0).getDate();
  let dayOfWeek = new Date(year, month - 1, 1).getDay();
  let monthlyData = [];
  let weeklyData = [];

  // fill monthlyData with [dayOfWeek, date] arrays
  for (let i = 1; i <= numDaysInMonth; i++) {
    monthlyData.push([dayOfWeek, i]);
    dayOfWeek = (dayOfWeek + 1) % 7;
  }

  // calculate and add null padding to prep for weeklyData
  let paddingFront = new Array(monthlyData[0][0]).fill([null, null]);
  let paddingRear = new Array(6 - monthlyData[monthlyData.length - 1][0]).fill([
    null,
    null
  ]);
  monthlyData = paddingFront.concat(monthlyData).concat(paddingRear);

  // shape into weeklyData
  while (monthlyData.length) {
    weeklyData.push(monthlyData.splice(0, 7));
  }

  return weeklyData;
}
