import { format as dateFormat } from 'date-fns';
export default date => {
  return dateFormat(new Date(date), 'MM/DD/YYYY');
};
