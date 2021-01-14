export class PurchaseTicketModel {
    constructor(
        public busName: string,
        public busUid: string,
        public date: number,
        public seatArray: string[],
        public journeyTime: number,
        public arrivalTime: number,
        public startPoint: string,
        public endPoint: string,
        public totalFare: number,
        public busType: string,
        public busNumber: string
    ) {}
}
