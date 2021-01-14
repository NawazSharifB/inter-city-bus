export class SearchDataModel {
    constructor(
        public from: string,
        public to: string,
        public date: number,
        public preferredTime: number,
        public busType: string
    ) {}
}
