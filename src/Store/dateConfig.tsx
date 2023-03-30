export const dateFormat = (date: any) => {
  const newDate = new Date(date);
  return new Intl.DateTimeFormat("en-EN", { dateStyle: "long" }).format(
    newDate
  );
};
