import { useSelector, useDispatch } from "react-redux";
import { rootActions } from "../redux/actions/index";
// import { IUsersApi } from "../dataTypes/IUsersApi";

interface IUsersApi {
    urlApi: string;
    methods: string;
    headers: Headers | string[][];
    bodyData: string | null;
}

export const usersApi = async (object: IUsersApi): Promise<any> => {
    try {
        const response = await fetch(object.urlApi, {
            method: object.methods,
            headers: object.headers,
            body: object.bodyData ? JSON.stringify(object.bodyData) : null,
        });

        const result = await response.json();
        // console.log(result);
        return result;
    } catch (err) {
        if (!window.navigator.onLine) {
            console.log("Sprawdz połączenie z internetem!");
        }

        const timeOut = (url: string): void => {
            setTimeout(function () {
                fetch(url);
            }, 5000);
        };

        timeOut(object.urlApi);
    }
};
