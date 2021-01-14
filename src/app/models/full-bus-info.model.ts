export class FullBusInfoModel {
    busName: string;
    busNumber: string;
    seatLimit: number;
    busStopNames: string[];
    busStopSchedules: number[];
    busType: string;
    endPoint: string;
    startPoint: string;
    fare: number[];
    fromBusStopNamesForFare: string[];
    onDays: number[];
    seatPattern: string;
    toBusStopNamesForFare: string[];
    uid: string;

}
