export class DatabaseConnectionError extends Error {
    reason = 'Failed connecting to database';

    constructor(){
        super();

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
}