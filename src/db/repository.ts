export interface BaseEntity {
    id: number,
}

/**
 * The function generates a random ID between 0 and 10,000,000.
 */
export const randomID = () => Math.round(Math.random() * 10000000)

/* The code defines an abstract class `BaseRepository` that serves as a base class for other repository
classes. The class has a generic type `T` that extends the `BaseEntity` interface. The class has an
array property `entities` that holds objects of type `T`. The class has several methods for CRUD
operations on the `entities` array, including `create`, `all`, `find`, `findFirst`, `update`, and
`remove`. These methods allow for creating, reading, updating, and deleting objects in the
`entities` array. The class also has two protected methods `getEntityById` and `removeEntityById`
that are commented out, but could be used by subclasses to get or remove an entity by its ID. */
export abstract class BaseRepository<T extends BaseEntity> {
    /* `private entities: T[] = [];` is defining a private property `entities` that is an array of
    objects of type `T`. The property is initialized as an empty array. This property is used to
    store the objects that are created, read, updated, or deleted by the repository methods. */
    private entities: T[] = [];

    /**
     * The function creates and adds one or more entities to an array.
     * @param {T[]} dto - The parameter "dto" is a rest parameter of type T[], which means it can
     * accept any number of arguments of type T and store them in an array. The function is likely used
     * to create and add multiple entities of type T to an array or collection.
     * @returns The `create` method is returning the result of calling the `push` method on the
     * `entities` array with the spread operator applied to the `dto` array. The `push` method returns
     * the new length of the array after the elements have been added, so the `create` method is
     * returning this new length.
     */
    public create(...dto: T[]) {
        return this.entities.push(...dto);
    }

    /**
     * The function "all" returns all entities.
     * @returns The method `all()` is returning the value of `this.entities`.
     */
    public all() {
        return this.entities;
    }

    /**
     * This function finds and returns an array of elements that match a given query.
     * @param query - A function that takes in three parameters: value (an element from the array),
     * index (the index of the element in the array), and array (the array being filtered). The
     * function should return a boolean value indicating whether the element should be included in the
     * filtered array.
     * @param {any} [thisArg] - The `thisArg` parameter is an optional argument that can be passed to
     * the `find` method. It is used as the `this` value when executing the `query` function. If
     * `thisArg` is not provided, `undefined` is used as the `this` value.
     * @returns A method named "find" is being returned. This method takes a query function as its
     * parameter, which is used to filter the entities array and return a new array of entities that
     * match the query. If no entities match the query, an empty array is returned.
     */
    public find(query: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T[] {
        return this.entities?.filter(query, thisArg) || [];
    }

    /**
     * This function finds the first element in an array that matches a given query.
     * @param query - A function that takes in three parameters: value (of type T), index (of type
     * number), and array (of type T[]), and returns a boolean value. This function is used to
     * determine if the first element in the array matches a certain condition.
     * @param {any} [thisArg] - The `thisArg` parameter is an optional argument that specifies the
     * value to be used as `this` when executing the `query` function. If `thisArg` is not provided,
     * `undefined` is used as the default value for `this`.
     * @returns The `findFirst` method is returning either the first element in the `entities` array
     * that satisfies the `query` function or `null` if no element satisfies the `query` function.
     */
    public findFirst(query: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T | null {
        return this.entities?.find(query, thisArg) || null;
    }

    /**
     * This function updates an entity in an array based on a query.
     * @param {T} dto - The data transfer object (DTO) that contains the updated information to be
     * applied to the entity.
     * @param query - A function that will be used to find the index of the entity to be updated in the
     * array of entities. The function takes three parameters: value (the current element being
     * processed in the array), index (the index of the current element being processed in the array),
     * and obj (the array being processed
     * @param {any} [thisArg] - The `thisArg` parameter is an optional parameter that specifies the
     * value to use as `this` when executing the `query` function. If `thisArg` is not provided,
     * `undefined` is used as the `this` value.
     * @returns The `update` method returns the updated entity of type `T` that was found and replaced
     * in the `entities` array.
     */
    public update(dto: T, query: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T {
        const index = this.entities.findIndex(query, thisArg);
        this.entities[index] = dto;
        return this.entities[index];
    }

    /**
     * This function removes elements from an array based on a given query.
     * @param query - A function that takes in three parameters: the current value being processed in
     * the array, the index of the current value, and the array being processed. The function should
     * return a boolean value indicating whether the current value should be removed from the array or
     * not.
     * @param {any} [thisArg] - The `thisArg` parameter is an optional argument that can be used to set
     * the value of `this` when executing the `query` function. If `thisArg` is not provided,
     * `undefined` is used as the default value of `this`.
     * @returns The `remove` method returns an array of type `T[]`.
     */
    public remove(query: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T[] {
        this.entities = this.entities?.filter(query, thisArg) || [];
        return this.entities;
    }
}
