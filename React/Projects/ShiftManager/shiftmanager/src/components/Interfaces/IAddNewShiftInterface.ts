export interface INewShift {
  id: string; // generated UUID
  date: string; // "YYYY-MM-DD"
  checkIn: string; // "YYYY-MM-DDTHH:mm"
  checkOut: string; // "YYYY-MM-DDTHH:mm"
  duration: string; // "8h 0m" format
  salary: number;
  moderators: string[]; // array of user ids or names
  users: string[]; // array of user ids or names
}
