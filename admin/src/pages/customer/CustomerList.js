import React, { useState, useEffect, useMemo, useRef } from "react";
import Pagination from "@material-ui/lab/Pagination";
import CustomerDataService from "../../services/customer.service";
import { useTable } from "react-table";

const CustomerList = (props) => {
  const [customer, setCustomer] = useState([]);
  const [searchNama, setSearchNama] = useState("");
  const customerRef = useRef();

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const pageSizes = [3, 6, 9];

  customerRef.current = customer;

  const onChangeSearchNama = (e) => {
    const searchNama = e.target.value;
    setSearchNama(searchNama);
  };

  const getRequestParams = (searchNama, page, pageSize) => {
    let params = {};

    if (searchNama) {
      params["nama_perusahaan"] = searchNama;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrieveBarang = () => {
    const params = getRequestParams(searchNama, page, pageSize);

    CustomerDataService.getAll(params)
      .then((response) => {
        const { customer, totalPages } = response.data;

        setCustomer(customer);
        setCount(totalPages);

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveBarang, [page, pageSize]);

  const refreshList = () => {
    retrieveBarang();
  };

  const removeAllTutorials = () => {
    CustomerDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByNama = () => {
    setPage(1);
    retrieveBarang();
  };

  const openTutorial = (rowIndex) => {
    const id = customerRef.current[rowIndex].id_perusahaan;

    props.history.push("/customer/" + id);
  };

  const deleteTutorial = (rowIndex) => {
    const id = customerRef.current[rowIndex].id_perusahaan;

    CustomerDataService.remove(id)
      .then((response) => {
        props.history.push("/customer");

        let newTutorials = [...customerRef.current];
        newTutorials.splice(rowIndex, 1);

        setCustomer(newTutorials);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const handleAdd = () => {
    props.history.push("/customer/add");
  };

  const columns = useMemo(
    () => [
      {
        Header: "Id Perusahaan",
        accessor: "id_perusahaan",
      },
      {
        Header: "Nama Perusahaan",
        accessor: "nama_perusahaan",
      },
      {
        Header: "Contact Person",
        accessor: "contact_person",
      },
      {
        Header: "Alamat",
        accessor: "alamat",
      },
      {
        Header: "No Telp",
        accessor: "no_telp",
      },
      {
        Header: "Fax",
        accessor: "fax",
      },
      {
        Header: "Jenis Perusahaan",
        accessor: "jenis_perusahaan",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openTutorial(rowIdx)}>
                <i className='far fa-edit action mr-2'></i>
              </span>

              <span onClick={() => deleteTutorial(rowIdx)}>
                <i className='fas fa-trash action'></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: customer,
  });

  return (
    <div className='list row'>
      <div className='col-md-8'>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Cari Nama Customer'
            value={searchNama}
            onChange={onChangeSearchNama}
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByNama}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className='col-md-12 list'>
        <div className='mt-3'>
          {"Items per Page: "}
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <Pagination
            className='my-3'
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant='outlined'
            shape='rounded'
            onChange={handlePageChange}
          />
        </div>
        <button className='btn btn-sm btn-success tambah' onClick={handleAdd}>
          Tambah Customer
        </button>

        <table
          className='table table-striped table-bordered'
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className='col-md-8'>
        <button className='btn btn-sm btn-danger' onClick={removeAllTutorials}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default CustomerList;
