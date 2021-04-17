import React, { useState, useEffect, useMemo, useRef } from "react";
import AllUserDataService from "../../services/alluser.service";
import { useTable } from "react-table";

const AllUserList = (props) => {
  const [user, setUser] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const tutorialsRef = useRef();

  tutorialsRef.current = user;

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTutorials = () => {
    AllUserDataService.getAll()
      .then((response) => {
        setUser(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTutorials();
  };

  const removeAllTutorials = () => {
    AllUserDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    AllUserDataService.findByTitle(searchTitle)
      .then((response) => {
        setUser(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openTutorial = (rowIndex) => {
    const id = tutorialsRef.current[rowIndex].id;

    props.history.push("/alluser/" + id);
  };

  const deleteTutorial = (rowIndex) => {
    const id = tutorialsRef.current[rowIndex].id;

    AllUserDataService.remove(id)
      .then((response) => {
        props.history.push("/alluser");

        let newTutorials = [...tutorialsRef.current];
        newTutorials.splice(rowIndex, 1);

        setUser(newTutorials);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleAdd = () => {
    props.history.push("/signup");
  };

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Nama",
        accessor: "nama",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "No Telp",
        accessor: "no_telp",
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
    data: user,
  });

  return (
    <div className='list row'>
      <div className='col-md-8'>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by title'
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <button className='btn btn-sm btn-success tambah' onClick={handleAdd}>
        Tambah User
      </button>
      <div className='col-md-12 list'>
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
    </div>
  );
};

export default AllUserList;
