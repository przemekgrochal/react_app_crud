import React, { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { useSelector, useDispatch } from 'react-redux';
import { rootActions } from '../../redux/actions/index';
import { IReduxState } from '../../dataTypes/IReduxState';
import { Popup } from 'devextreme-react/popup';
import { Button } from 'devextreme-react/button';
import TextBox from 'devextreme-react/text-box';
import RadioGroup from 'devextreme-react/radio-group';
import Loader from 'react-loader-spinner';
import jsonData from './data/data.json';
import './style/Users.scss';

const Users = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [popupVisible, setPopupVisible] = useState<any>(false);
    const [dataInput, setDataInput] = useState<any>({
        id: 0,
        create: false,
        update: false,
        name: '',
        surname: '',
        email: '',
        gender: '',
        status: '',
    });
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

    const createUser = () => {
        dispatch(
            rootActions.usersActions.readUser({
                urlApi: urlApi,
                methods: 'POST',
                headers: {
                    ['Content-Type']: 'application/json',
                    ['Authorization']: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
                },
                bodyData: {
                    name: dataInput.name + ' ' + dataInput.surname,
                    email: dataInput.email,
                    gender: dataInput.gender,
                    status: dataInput.status,
                },
            })
        );

        setDataInput({
            id: 0,
            create: false,
            update: false,
            name: '',
            surname: '',
            email: '',
            gender: '',
            status: '',
        });

        setPopupVisible(false);
    };

    const deleteUser = (row: any) => {
        window.document.getElementById(`row-${row.id}`)?.remove();
        dispatch(
            rootActions.usersActions.readUser({
                urlApi: `${process.env.REACT_APP_API_URL}/users/${row.id}`,
                methods: 'DELETE',
                headers: {
                    ['Content-Type']: 'application/json',
                    ['Authorization']: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
                },
                bodyData: null,
            })
        );
    };

    const handleChange = (e: any) => {
        e.event.target.value = e.event.target.value.replace(/ /g, '');
        setDataInput({
            ...dataInput,
            [e.event.target.name]: e.event.target.value,
        });
    };

    const handleSubmit = () => {
        if (dataInput.upadate) {
            window.alert('user update');
        }

        if (dataInput.create) {
            createUser();
        }
    };

    const columns = [
        {
            name: 'Settings',
            cell: (row: any, index: any, column: any, id: any) => {
                return (
                    <>
                        <Button
                            icon="trash"
                            onClick={() => {
                                deleteUser(row);
                            }}
                        />
                        <Button icon="edit" onClick={(e) => console.log(row)} />
                    </>
                );
            },
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
        <section className="users">
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
                            className="btn-add-user"
                            id="create-user"
                            style={{
                                color: '#606060',
                                fontSize: '34px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                setDataInput({
                                    ...dataInput,
                                    create: true,
                                });
                                setPopupVisible(true);
                            }}
                        >
                            +
                        </div>
                    </div>
                }
            />
            <Popup
                visible={popupVisible}
                onHiding={() => setPopupVisible(false)}
                // dragEnabled={false}
                closeOnOutsideClick={true}
                showTitle={true}
                title="User"
                width={400}
                height={450}
            >
                <p>
                    <TextBox
                        name="name"
                        mode="text"
                        placeholder="Enter name"
                        showClearButton={true}
                        onChange={handleChange}
                        value={dataInput.name}
                    />
                </p>
                <p>
                    <TextBox
                        name="surname"
                        mode="text"
                        placeholder="Enter surname"
                        showClearButton={true}
                        onChange={handleChange}
                        value={dataInput.surname}
                    />
                </p>
                <p>
                    <TextBox
                        name="email"
                        mode="text"
                        placeholder="Enter e-mail address"
                        showClearButton={true}
                        onChange={handleChange}
                        value={dataInput.email}
                    />
                </p>
                <p>
                    <RadioGroup
                        name="gender"
                        items={['Male', 'Female']}
                        onValueChanged={(e) =>
                            setDataInput({
                                ...dataInput,
                                gender: e.value,
                            })
                        }
                        value={dataInput.gender}
                    />
                    <hr />
                    <RadioGroup
                        items={['Active', 'Inactive']}
                        onValueChanged={(e) =>
                            setDataInput({
                                ...dataInput,
                                status: e.value,
                            })
                        }
                        value={dataInput.status}
                    />
                </p>
                <p>
                    <Button
                        width={120}
                        text="Send"
                        type="success"
                        stylingMode="contained"
                        onClick={handleSubmit}
                    />
                </p>
            </Popup>
        </section>
    );
};

export default Users;
