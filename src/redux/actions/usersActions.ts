import {
    CREATE_USER,
    READ_USER,
    UPDATE_USER,
    DELETE_USER,
} from "../../actionTypes/index";

export const usersActions = {
    createUser: (userObject?: any) => {
        return {
            type: CREATE_USER,
            payload: userObject,
        };
    },

    readUser: (userObject?: any) => {
        return {
            type: READ_USER,
            payload: userObject,
        };
    },

    updateUser: (userObject?: any) => {
        return {
            type: UPDATE_USER,
            payload: userObject,
        };
    },

    deleteUser: (userObject?: any) => {
        return {
            type: DELETE_USER,
            payload: userObject,
        };
    },
};
