import { initialState } from "../state/index";
import {
    CREATE_USER,
    READ_USER,
    UPDATE_USER,
    DELETE_USER,
} from "../../actionTypes/index";

interface IAction {
    type: string;
    payload: any;
}

export const usersReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case CREATE_USER:
            console.log("CREATE_USER");
            return state;

        case READ_USER:
            console.log("READ_USER");
            if (!action.payload.hasOwnProperty("urlApi")) {
                return {
                    code: action.payload.code,
                    meta: {
                        pagination: {
                            total: action.payload.meta.pagination.total,
                            pages: action.payload.meta.pagination.pages,
                            page: action.payload.meta.pagination.page,
                            limit: action.payload.meta.pagination.limit,
                        },
                    },
                    users: state.users.concat(action.payload.data),
                };
            } else {
                return state;
            }

        case UPDATE_USER:
            console.log("UPDATE_USER");
            return state;

        case DELETE_USER:
            console.log("DELETE_USER");
            return state;

        default:
            return state;
    }
};
