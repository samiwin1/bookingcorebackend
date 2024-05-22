export interface Booking {
    id?: string; // Optional auto-generated ID (if using MongoDB)
    name: string;
    email: string;
    checkInDate: Date;
    checkOutDate: Date;
    adults: number;
    children: number;
    specialRequests?: string;
    offername:string;
    _id: string;

}
