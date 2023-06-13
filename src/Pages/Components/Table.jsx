import React, { useState } from 'react';
import { useTable, usePagination } from 'react-table';
import "../../App.css"
import { deleteLeaveApi } from '../../Services/LeaveService';
import UpdateLeave from './UpdateLeave'
import { updateLeaveApi } from '../../Services/LeaveService';

const LeavesTable = ({ columns, data, getAllLeaves }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  const TableHeader = () => (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
          ))}
          <th>Action</th>
        </tr>
      ))}
    </thead>
  );

  const TableBody = () => (
    <tbody {...getTableBodyProps()}>
      {page.map((row) => {
        const rowId = row.original.id;
        prepareRow(row);
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map((cell) => (
              <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
            ))}
            <td>
              <button
                style={{ fontWeight: "bold" }}
                className="btn btn-primary btn-sm"
                onClick={() => editHandleOpenModal(row.original)}
              >
                Edit
              </button>
              <button
                style={{ fontWeight: "bold" }}
                className="btn btn-danger btn-sm"
                onClick={() => deleteLeave(rowId)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );

  const deleteLeave = (id) => {
    const result = window.confirm("Are you sure you want to delete this leave?");
    if (result) {
      deleteLeaveApi(id)
        .then((response) => {
          // console.log(response);
          alert("Leave deleted successfully");
          getAllLeaves();
        })
        .catch((error) => {
          console.log(error);
          alert("Something went wrong");
        });
    }
  };

  const editHandleYesClick = (start_date, end_date, reason, id) => {
    // console.log(id, "ready to call the API")
    updateLeaveApi({ start_date: start_date, end_date: end_date, reason: reason }, id)
      .then((response) => {
        // console.log(response.data);
        alert("Leave successfully updated");
        getAllLeaves();
      })
      .catch((error) => {
        // console.log(error.response.data.error_description);
      });
  };

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const editHandleOpenModal = (row) => {
    setSelectedRow(row);
    setEditModalIsOpen(true);
  };

  const edithandleCloseModal = () => {
    setEditModalIsOpen(false);
    setSelectedRow(null);
  };

  return (
    <div>
      <table className='leave-table' style={{ margin: 'auto' }} {...getTableProps()}>
        <TableHeader />
        <TableBody />
      </table>
      <div style={{ textAlign: "center", marginTop: "5px" }}>
        <button
          style={{ borderRadius: "5px", fontWeight: "bold", borderColor: "green" }}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {page.length}
          </strong>
        </span>
        <button
          style={{ borderRadius: "5px", borderColor: "green", fontWeight: "bold", width: "80px" }}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </button>
      </div>
      {editModalIsOpen && selectedRow && (
        <UpdateLeave
          isOpen={editModalIsOpen}
          closeModal={edithandleCloseModal}
          editHandleYesClick={editHandleYesClick}
          row={selectedRow}
        />
      )}
    </div>
  );
};

export default LeavesTable;
