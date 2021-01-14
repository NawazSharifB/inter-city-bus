export class AddBusInfoModel {
    constructor(
        private busName: string,
        private busNumber: string,
        private busType: string,
        private onDays: number[],
        private seatLimit: number,
        private seatPattern: string,
        private startPoint: string,
        private endPoint: string,
        private busStopNames: string[],
        private busStopSchedules: number[],
        private fromBusStopNamesForFare: string[],
        private toBusStopNamesForFare: string[],
        private fare: number[]
    ) {}
}
