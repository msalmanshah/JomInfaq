export class Trans {
    constructor(
        public transdate:Date, 
        public transid:string, 
        public type:string, 
        public amount:number, 
        public status:string,
        public name:string,
        public flag:number) {

        }
  }