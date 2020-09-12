import { call, fork, put, take, takeLatest, all } from 'redux-saga/effects';
import { fetchData } from '../../api/index';
import {
    CREATE_USER,
    READ_USER,
    UPDATE_USER,
    DELETE_USER,
} from '../../actionTypes/index';
import { rootActions } from '../actions/index';

function* fetchUsers(action: any) {
    try {
        const dataFromApi = yield call(
            fetchData.usersApi as any,
            action.payload
        );
        yield put(rootActions.usersActions.readUser(dataFromApi));
    } catch (e) {
        console.log(e);
    }
}

function* watchUsersSagas() {
    yield takeLatest(READ_USER, fetchUsers);
}

export default function* usersSagas() {
    yield all([fork(watchUsersSagas)]);
}
