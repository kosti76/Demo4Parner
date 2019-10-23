export class Order {
    code: number;
    discount: string;
    supply_time: string;
    total_sum: string;
    entry_date: string;
    status:string;
    constructor(_code, _discount, _supply_time, _total_sum, _entry_date,_status) {
      this.code = _code;
      this.discount = _discount;
      this.supply_time = _supply_time;
      this.total_sum = _total_sum;
      this.entry_date = _entry_date;
      this.status= _status;
    }
  }