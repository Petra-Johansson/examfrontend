 export const timeFormatter= (timestamp: string) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString();
    return formattedDate;
 }