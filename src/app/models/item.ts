export class Item {
    code: number;
    name: string;
    type: string;
    color: string;
    size: string;
    price: string;
    supply_time: string;
    constructor(_code, _name, _type, _color, _size, _price, _supply_time) {
        this.code = _code;
        this.name = _name;
        this.type = _type;
        this.color = _color;
        this.size = _size;
        this.price = _price;
        this.supply_time = _supply_time;
    }
}