import moment from "moment";
export const formatEvents = (stations: IEvents[] | undefined) => {
  const events: any = [];
  stations?.forEach((station) => {
    station.bookings.forEach((booking) => {
      const event = {
        id: booking.id,
        station: station.name,
        days: handleDuration(booking.startDate, booking.endDate),
        startDate: handleDateFormat(booking.startDate),
        endDate: handleDateFormat(booking.endDate),
        customerName: booking.customerName,
      };
      events.push({
        ...event,
        title: booking.customerName,
        color: "#1c3553",
        date: booking.endDate,
      });
    });
  });
  return events;
};

export const handleDuration = (startDate: IDate, endDate: IDate): number => {
  const date1 = new Date(startDate).valueOf();
  const date2 = new Date(endDate).valueOf();
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const handleDateFormat = (date: IDate): IDate => {
  return moment(date).format("DD-MM-YYYY");
};
