export class SearchBusListModel {
    busName: string;
    busNumber: string;
    busStartPoint: string;
    busEndPoint: string;
    journeyStartPoint: string;
    journeyEndPoint: string;
    journeyStartTime: number;
    arrivalTime: number;
    date: number;
    fare: number;
    availableSeat: number;
    unAvailableSeat: string[];
    seatPattern: string;
    busType: string;
    uid: string;
}
