import React, { createContext, useContext } from 'react';
import { DB } from './../db';
import db from '../db';

// Define the db context with initial values
/* `export const DataBaseContext = createContext<DB | null>(null)` is creating a context object for the
`DB` class. The `createContext` function creates a new context object, which can be used to pass
data down the component tree without having to pass props manually at every level. The `DB | null`
type parameter specifies the type of data that will be stored in the context object, which in this
case is either an instance of the `DB` class or `null`. The `null` value is the default value for
the context object. */
export const DataBaseContext = createContext<DB | null>(null);

// Create a custom hook to access the cart context
/**
 * This function returns the database context for use in a TypeScript React application.
 * @returns The function `useDB` is returning an instance of the `DB` object, which is obtained from
 * the `DataBaseContext` using the `useContext` hook. If the `DataBaseContext` is not available, an
 * error is thrown.
 */
export const useDB = (): DB => {
    const db = useContext(DataBaseContext);
    if (!db) throw new Error('useDB must be used within a DataBaseContext');
    return db;
};

// Create a DataBaseProvider component to wrap your app with
/**
 * This is a TypeScript React component that provides a database context for its children.
 * @param {any}  - The above code is a React component that exports a constant named
 * `DataBaseProvider`. It takes in a single parameter, `children`, which is of type `any`. The
 * `children` parameter represents the child components that will be wrapped by the
 * `DataBaseContext.Provider` component. The `DataBaseContext.Provider
 */
export const DataBaseProvider = ({ children }: any) => {
    // provide the implementation for IOrderRepository
    return <DataBaseContext.Provider value={db}>{children}</DataBaseContext.Provider>;
};
