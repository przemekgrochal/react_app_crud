import React, { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { useSelector, useDispatch } from 'react-redux';
import { rootActions } from '../../redux/actions/index';
import { IReduxState } from '../../dataTypes/IReduxState';
import Loader from 'react-loader-spinner';
import jsonData from './data/data.json';
import './style/Users.scss';

const Users = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const urlApi: string = `${process.env.REACT_APP_API_URL}/users?page=${currentPage}`;

    const reduxState: any = useSelector((state: IReduxState) => {
        return {
            code: state.stateUsers.code,
            meta: state.stateUsers.meta,
            userRoles: state.stateUsers.userRoles,
            users: state.stateUsers.users,
        };
    });

    const dispatch = useDispatch();

    useEffect(() => {
        const abortController = new AbortController();

        dispatch(
            rootActions.usersActions.readUser({
                urlApi: urlApi,
                methods: 'GET',
                headers: {
                    ['Content-Type']: 'application/json',
                    ['Authorization']: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
                },
                bodyData: null,
            })
        );

        return () => {
            abortController.abort();
        };
    }, [currentPage]);

    const columns = [
        {
            name: 'Options',
            cell: () => <button onClick={(e) => console.log(e)}>Action</button>,
            // ignoreRowClick: true,
            // allowOverflow: true,
            // button: true,
        },
        {
            name: 'Id', // Name column
            selector: 'id', // key object from data
            sortable: true,
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'E-mail',
            selector: 'email',
            sortable: true,
        },
        {
            name: 'Gender',
            selector: 'gender',
            sortable: true,
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true,
        },
        {
            name: 'Created at',
            selector: 'created_at',
            sortable: true,
        },
        {
            name: 'Updated at',
            selector: 'updated_at',
            sortable: true,
        },
    ];

    return (
        <div>
            <DataTable
                title="Users"
                columns={columns}
                data={reduxState.users ? reduxState.users : []}
                selectableRows={true}
                pagination={true}
                paginationTotalRows={
                    reduxState.meta ? reduxState.meta.pagination.total : 0
                }
                onChangePage={(page: number, totalRows: number) => {
                    if (currentPage < totalRows) {
                        setCurrentPage(currentPage + 1);
                    }
                }}
                noDataComponent={
                    <div className="dataTables-loader">
                        <Loader
                            type="Puff"
                            color="#FF5722"
                            height={60}
                            width={60}
                        />
                    </div>
                }
                subHeader={true}
                subHeaderComponent={
                    <div className="xdt-header-container">
                        <div
                            style={{
                                color: '#606060',
                                fontSize: '34px',
                                fontWeight: 'bold',
                            }}
                        >
                            +
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default Users;
