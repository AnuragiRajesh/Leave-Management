import React, { useMemo,useState } from 'react';
import { useTable, usePagination } from 'react-table';
import "../../App.css"
import { deleteLeaveApi } from '../../Services/LeaveService';
import { useNavigate } from 'react-router-dom';
import UpdateLeave from './UpdateLeave'
import { updateLeaveApi } from '../../Services/LeaveService';
const UpcomingLeavesTable = ({ columns, data,getAllLeaves}) => {
    const navigate = useNavigate();
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [row, setRow] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
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
    <tbody  {...getTableBodyProps()}>
      {page.map((row) => {
        const rowId = row.original.id;
        prepareRow(row);
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map((cell) => (
              <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
            ))}
            <td>
            <button className="btn btn-primary btn-sm" onClick={() =>  editHandleOpenModal(row)}>edit</button><button className="btn btn-danger btn-sm" onClick={() => deleteLeave(rowId)}>delete</button>
              
              
            </td>
          </tr>
        );
      })}
    </tbody>
  );

//   const handleAction = (row) => {
//     // Handle the action for the selected row
//     console.log('Perform action for row:', row.original);
//   };

const deleteLeave = (id)=>{
    console.log(id)
  const result =  window.confirm("Are you sure you want to log out?")
  if (result) {
    deleteLeaveApi(id).then((response)=>{
      console.log(response)
      alert("Leave delete successfully")
      getAllLeaves()
    }).catch((error)=>{
      console.log(error)
      alert("something went wrong")
   
    }) }

}

// Edit a Leave
  const editHandleYesClick = (start_date,end_date,reason,id) => {
    console.log(id,"ready to call the apiii")
    updateLeaveApi({start_date:start_date,end_date:end_date,reason:reason},id).then((response) => {
        console.log(response.data);
        alert("Leave successfully updated")
        getAllLeaves()
        
      })
      .catch((error) => {
      
        console.log(error.response.data.error_description,"koko");
      });
    setEditModalIsOpen(false);
  };
  const editHandleOpenModal = (params) => {
    setRow(params.original)
    setSelectedRow(params);
   console.log(row,"hhh")
    // console.log(leaveId_Prop)

    setEditModalIsOpen(true);
  };
  const edithandleCloseModal = () => {
    setEditModalIsOpen(false);
    setSelectedRow(null);
  };

  return (
    <div >
      <table  className='leave-table' style={{ margin: 'auto' }} {...getTableProps()}>
        <TableHeader />
        <TableBody />
      </table>
      <div style={{textAlign:"center", marginTop:"5px"}}>
        <button style={{borderRadius:"5px",fontWeight:"bold", borderColor:"green"}} onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {page.length}
          </strong>
        </span>
        <button style={{borderRadius:"5px", borderColor:"green", fontWeight:"bold" ,width:"80px"}}  onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
       {/* Update a Leave Implementation */}
       {selectedRow && ( // Render the UpdateLeave modal if a row is selected
        <UpdateLeave
          isOpen={editModalIsOpen}
          closeModal={edithandleCloseModal}
          editHandleYesClick={editHandleYesClick}
          row={row}
        />
      )}
    </div>
  );
};

export default  UpcomingLeavesTable;
