import { BaseEntity, BaseRepository } from './repository';

/* The code is defining an interface named `IUser` that extends the `BaseEntity` interface. The `IUser`
interface has two properties: `email` and `password`, both of type `string`. This interface is used
to define the shape of objects that will be stored in the `UserRepository`. */
export interface IUser extends BaseEntity {
    email: string;
    password: string;
}

/* The UserRepository class extends the BaseRepository class and creates a new user with a random ID,
email, and password upon instantiation. */
export class UserRepository extends BaseRepository<IUser> {
    /**
     * The constructor creates a new user object with specific properties and adds it to the
     * repository.
     */
    constructor() {
        /* `super();` is calling the constructor of the parent class (`BaseRepository`) and executing
        its code. This is necessary because `UserRepository` extends `BaseRepository` and inherits
        its properties and methods. By calling `super();`, the `UserRepository` constructor is able
        to access and use the properties and methods of `BaseRepository`. */
        super();
        /* `this.create({ id: 1, email: 'admin@gmail.com', password: 'password' });` is creating a new user
        object with an ID of 1, email of 'admin@gmail.com', and password of 'password'. This user object is
        then added to the repository using the `create` method inherited from the `BaseRepository` class. */
        this.create({ id: 1, email: 'admin@gmail.com', password: 'password' });
    }
}