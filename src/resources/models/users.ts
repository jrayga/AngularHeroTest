export class Users {
    constructor(
        public id: any,
        public createdAt: Date,
        public name: string,
        public avatar: string,
        public occupation: string,
        public salaryperhour: number,
        public archived: boolean
    ) { }
}