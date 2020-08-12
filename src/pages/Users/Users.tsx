import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { allActions } from "../../redux/actions/index";
import { FetchData } from "../../api";
import { IUsers } from "../../dataTypes/IUsers";
import Loader from "react-loader-spinner";
import jsonData from "./data/data.json";
import "./Users.scss";
import { event } from "devextreme/events";

// interface IUsers {
//     _meta: {};
//     result: [];
// }

const Users = () => {
    const [data, setData] = useState<IUsers>();
    const [page, setPage] = useState<any>({ startPage: "&page=1" });
    // const urlApi: string = `https://gorest.co.in/public-api/users?access-token=HDOxDOwpo0acumRYzPl0SLcsxB51dIae7Pak${page.startPage}`;
    const urlApi: string = `https://gorest.co.in/public-api/users?${page.startPage}`;
    const counter = useSelector<any>((state) => state.counter);
    const isLogged = useSelector<any>((state) => state.isLogged);
    const dispatch = useDispatch();

    useEffect(() => {
        new FetchData().fetch(urlApi, "GET", null).then((res) => {
            setData(res);
            console.log(res);
        });
    }, [page]);

    const columns = [
        {
            name: "Options",
            cell: () => <button onClick={(e) => console.log(e)}>Action</button>,
            // ignoreRowClick: true,
            // allowOverflow: true,
            // button: true,
        },
        {
            name: "Id", // Name column
            selector: "id", // key object from data
            sortable: true,
        },
        {
            name: "First Name",
            selector: "first_name",
            sortable: true,
        },
        {
            name: "Last Name",
            selector: "last_name",
            sortable: true,
        },
        {
            name: "E-mail",
            selector: "email",
            sortable: true,
        },
        {
            name: "Gender",
            selector: "gender",
            sortable: true,
        },
        {
            name: "Date of birth",
            selector: "dob",
            sortable: true,
        },
        {
            name: "Address",
            selector: "address",
            sortable: true,
        },
        {
            name: "Phone",
            selector: "phone",
            sortable: true,
        },
        {
            name: "Website",
            selector: "website",
            sortable: true,
        },
        {
            name: "Status",
            selector: "status",
            sortable: true,
        },
    ];

    return (
        <div>
            {/* {console.log(page)} */}
            {/* <div className="App">
                <button onClick={() => dispatch(allActions.signIn())}>
                    User is logged: {isLogged.toString()}
                </button>
                <button onClick={() => dispatch(allActions.increment())}>
                    +
                </button>
                <button onClick={() => dispatch(allActions.decrement())}>
                    -
                </button>
                <div>{counter as any}</div>
            </div> */}
            <DataTable
                title="Users"
                columns={columns}
                data={data ? (data.result as any) : []}
                selectableRows={true}
                //Pagination options
                paginationDefaultPage={1}
                // paginationPerPage={5}
                // paginationTotalRows={data.itemsCnt}
                // sortServer={true}
                // paginationServer={true}
                // paginationServerOptions={{
                //     persistSelectedOnPageChange: false,
                //     persistSelectedOnSort: true,
                // }}
                pagination={true}
                paginationTotalRows={data ? data._meta.totalCount : 0}
                onChangePage={
                    (e) => {
                        console.log(e);
                    }
                    // (e) => setPage({ ...page, startPage: `?page=${e}` })
                }
                //
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
                                color: "#606060",
                                fontSize: "34px",
                                fontWeight: "bold",
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
