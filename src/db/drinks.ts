import { BaseEntity, BaseRepository } from './repository';

/* The `export interface IDrinks` is defining an interface for a `Drinks` object that extends the
`BaseEntity` interface. It specifies that a `Drinks` object should have a `name` property of type
`string`, a `price` property of type `number`, and an `imageUrl` property of type `string`. This
interface can be used to ensure that any `Drinks` object created or used in the codebase conforms to
this structure. */
export interface IDrinks extends BaseEntity {
    name: string;
    price: number;
    imageUrl: string;
}

/* The DrinksRepository class extends a BaseRepository class and contains a list of drinks with their
respective properties. */
export class DrinksRepository extends BaseRepository<IDrinks> {
    /**
     * The constructor function creates a list of drinks with their respective properties and adds them
     * to the DrinksRepository class.
     */
    constructor() {
        /* `super();` is calling the constructor of the parent class `BaseRepository`. This is
        necessary because `DrinksRepository` extends `BaseRepository` and inherits its properties
        and methods. By calling `super();`, the constructor of `BaseRepository` is executed before
        the constructor of `DrinksRepository`, ensuring that the repository is properly initialized
        before any additional drinks are added to it. */
        super();
        /* The `this.create()` method is adding a list of drinks with their respective properties to
        the `DrinksRepository` class. Each drink is an object with an `id`, `name`, `price`, and
        `imageUrl` property. The `create()` method is a method inherited from the `BaseRepository`
        class and is used to add items to the repository. */
        this.create(
            {
                id: 1,
                name: "Jameson Jameson Irish Whiskey 70cl",
                price: 14,
                imageUrl:
                    "data:image/jpeg;base64,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",
            },
            {
                id: 2,
                name: "Johnnie Walker Black Pocket Size 20cl 12Y x1",
                price: 7.56,
                imageUrl:
                    "https://myliquorhub.com/wp-content/uploads/2021/07/myliquorhub_black-label-pocket-size.jpg",
            },
            {
                id: 3,
                name: "Martell Cognac Blue Swift 75cl (VSOP)",
                price: 37.56,
                imageUrl: "https://myliquorhub.com/wp-content/uploads/2019/12/Martell-Blue-Swift.jpg",
            },
            {
                id: 4,
                name: "Martell Cognac VS Single Distillery 70cl",
                price: 42.3,
                imageUrl: "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/19/460869/3.jpg?2195",
            },
            {
                id: 5,
                name: "Johnnie Walker Johnnie Walker Red Label 70cl x1",
                price: 24.2,
                imageUrl: "https://storage.googleapis.com/media-management-eu-alerzo/product-images/614c5698e6604a00eec816bd/uVIzD-wokj%20-%201658655727271.jpg",
            },
            {
                id: 6,
                name: "Chivas Chivas Scotch Whiskey 12YO 20cl",
                price: 4.92,
                imageUrl: "https://alldiscounts.ng/wp-content/uploads/2022/06/images-17.jpeg",
            },
            {
                id: 7,
                name: "Smirnoff Green Apple Vodka 1L x1",
                price: 7.5,
                imageUrl: "https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/C/Y/171191_1595087160.jpg",
            },
            {
                id: 8,
                name: "Jameson Jameson Black Barrel 70cl",
                price: 34.3,
                imageUrl: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/01/0603591/1.jpg?8636",
            },
            {
                id: 9,
                name: "Four Cousins",
                price: 43.5,
                imageUrl: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/01/0603591/1.jpg?8636",
            },
            {
                id: 10,
                name: "Johnnie Walker Blue Label 70cl x1",
                price: 152.3,
                imageUrl: "https://myliquorhub.com/wp-content/uploads/2019/11/Johnnie-Walker-Blue-Label-3-1.jpg",
            },
            {
                id: 11,
                name: "Hennessy VSOP PrIvilege Cognac 70CL",
                price: 152.95,
                imageUrl: "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/42/9527461/1.jpg?2050",
            },
            {
                id: 12,
                name: "Smirnoff Citrus Vodka 1L x1",
                price: 7.95,
                imageUrl: "https://htsplus.ng/wp-content/uploads/2021/09/Smirnoff-Citrus-Vodka-1.webp",
            }
        )
    }
}

