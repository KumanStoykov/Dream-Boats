export const dateFormate = (dateValue) => {
    const date = new Date(dateValue);

   return date.getHours() + ':' + date.getMinutes() + ', ' + date.toDateString();   
} 
