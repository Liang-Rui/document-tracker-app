export const dateToLocalString = (date: string): string => {
    return new Date(date).toLocaleDateString('en-AU', {year: 'numeric', month: '2-digit', day: '2-digit'})
}