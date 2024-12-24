// Helper function to format date properly based on input size
const formatDate = (date, format) => {
  if (!date) {
    return;
  }

  const month_names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dateObject = new Date(date);

  let day = dateObject.getDate();
  if (
    day.toString().length < 2 &&
    (format === 'MM/DD/YYYY' || format === 'MM/DD/YY')
  ) {
    day = `0${day}`;
  }
  const month_index = dateObject.getMonth();

  const getFormattedMonth = () => {
    switch (format) {
      case 'Month, Date, Year':
        return month_names[month_index];
      case 'MM/DD/YY':
      case 'MM/DD/YYYY':
        let month = month_index + 1;
        return month < 10 ? `0${month}` : month;
      case 'M/D/YYYY':
        return month_index + 1;
      case 'Mon D, YYYY':
        return month_names[month_index].substring(0, 3);
    }
  };

  const shortYear = dateObject
    .getFullYear()
    .toString()
    .substring(2);
  const longYear = dateObject.getFullYear();

  const year = format === 'MM/DD/YY' ? shortYear : longYear;

  return format === 'Month, Date, Year' || format === 'Mon D, YYYY'
    ? '' + getFormattedMonth() + ' ' + day + ', ' + year
    : '' + getFormattedMonth() + '/' + day + '/' + year;
};

export default formatDate;
