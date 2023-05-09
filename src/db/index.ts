import { OrderRepository } from "./order";
import { DrinksRepository } from "./drinks";
import { UserRepository } from "./users";

/* The DB class creates instances of UserRepository, DrinksRepository, and OrderRepository. */
export class DB {
    public user: UserRepository;
    public drink: DrinksRepository;
    public order: OrderRepository;

    constructor() {
        this.user = new UserRepository();
        this.drink = new DrinksRepository();
        this.order = new OrderRepository();
        // this.cartProvider = new Cart(this.order);
    }
}

/* This code creates an instance of the `DB` class and assigns it to the constant variable `db`. It
then exports `db` as the default export of the module, which means that when this module is imported
in another module, the default export will be the `db` instance. This allows other modules to access
the `UserRepository`, `DrinksRepository`, and `OrderRepository` instances through the `db` object. */
const db = new DB();

export default db;