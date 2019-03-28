import hashedPassword from '../helpers/hashPassword';
import userData from '../../data/users';


/**
 * @exports
 * @class User
 */
class User {
    /**
     * Creates an instance of a User.
     * @memberof User
     * @param { object } data
     */
    constructor() {
        this.users = userData;
    }

    /**
     * @param {*} data
     * @memberof User
     * @returns { object } office object
     */
    create(data) {
        const newUser = {
            id: this.users.length + 1,
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            password: hashedPassword(data.password, 10),
            type: data.type,
            isAdmin: data.isAdmin || false,
            createdAt: new Date(),
            modifiedAt: null,
        }

        this.users.push(newUser);
        return newUser;
    }
}

export default new User();