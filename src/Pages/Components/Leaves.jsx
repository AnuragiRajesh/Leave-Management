import React, { useEffect, useState } from 'react';
import { getLeaveApi } from '../../Services/LeaveService';
import ReactPaginate from 'react-paginate';
import RequestLeave from './ReqLeave';
import { requestLeaveApi } from '../../Services/LeaveService';
import { useNavigate } from 'react-router-dom';
import "../../App.css"
import UpcomingLeavesTable from './Table';
const ShowLeaves = () => {
  const [reqModalIsOpen, setReqModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [filterOption, setFilterOption] = useState('');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [leaveData, setLeaveData] = useState([]);
  const [leaveDataSource, setPastLeaveDataSource] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);
  const [leaveId_Prop, setLeaveId_Prop] = useState({});
const navigate = useNavigate();
 
  useEffect(() => {
    getAllLeaves()

  }, []);

  const getAllLeaves = () => getLeaveApi().then((response) => {
    const data = response.data
    console.log("njjjjjjjjjjjjjjjjjjjjjjjjj",data)
    setPastLeaveDataSource(data)
    setLeaveData(data);
  })
    .catch((error) => {
      alert(
        error.response.data.message
      )
      localStorage.clear()
      navigate("/")
      console.log(error.response.data.message, "koko");
    });



  let upcomingLeaves
  let pastLeaves
  upcomingLeaves = leaveData.filter(
    (leave) => new Date(leave.end_date) >= new Date()
  )
  pastLeaves = leaveData.filter(
    (leave) => new Date(leave.end_date) < new Date()
  )


  const columns = [
    {
      Header: 'Start Date',
      accessor: 'start_date',
    },
    {
      Header: 'End Date',
      accessor: 'end_date',
    },
    {
      Header: 'Reason',
      accessor: 'reason',
    },
    
    
  ];
  


  const filterLeaves = (option) => {
    const currentDate = new Date();
    let startDate, endDate;
    let filteredLeaves = [];
    if (filterOption === 'custom' && (!customStartDate || !customEndDate)) {
      console.log("dates not provided")
      return; // Return if custom dates are not provided
    }

    if (filterOption === 'custom') {
      console.log(customStartDate, customEndDate)
      const customStartDate2 = new Date(customStartDate);
      const customEndDate2 = new Date(customEndDate);

      filteredLeaves = leaveDataSource.filter((leave) => {
        const leaveStartDate = new Date(leave.start_date);
        const leaveEndDate = new Date(leave.end_date);

        return (
          leaveStartDate >= customStartDate2 &&
          leaveEndDate <= customEndDate2
        );
      });
      console.log(filteredLeaves, "cutomes dates done")
    }


    switch (option) {
      case 'currentMonth':
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        break;
      case 'lastMonth':
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        break;
      case 'last6Months':
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, 1);
        endDate = currentDate;
        break;
      case 'lastYear':
        startDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1);
        endDate = currentDate;
        break;
      default:
        return; // No filtering for custom dates
    }

    filteredLeaves = leaveDataSource.filter((leave) => {
      const leaveStartDate = new Date(leave.start_date);
      const leaveEndDate = new Date(leave.end_date);

      return leaveStartDate >= startDate && leaveEndDate <= endDate;
    });
    console.log(filteredLeaves, "Finally")
    setLeaveData(filteredLeaves);
  };


  // Filter Button
  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
    setFilterApplied(false);
  };
  const handleFilterSubmit = () => {
    filterLeaves(filterOption);
  };
  const handleApplyFilter = () => {
    filterLeaves(filterOption);
    if (!filterOption) {
      return alert("please select a date")
    }
    setFilterApplied(true);
  };
  const handleRemoveFilter = () => {
    setLeaveData(leaveDataSource)
    setFilterApplied(false);
  };


// Request a Leave
  const handleOpenModal = () => {
    setReqModalIsOpen(true);
  };
  const handleCloseModal = () => {
    setReqModalIsOpen(false);
  };
  const handleYesClick = (start_date, end_date, reason) => {
    console.log(start_date, end_date, reason)
    requestLeaveApi({ start_date: start_date, end_date: end_date, reason: reason }).then((response) => {
      alert("Applied a leave Successfully")
      console.log(response.config.data);

      getAllLeaves()
    })
      .catch((error) => {
        alert(error.response.data.message)
        console.log(error.response.data.message, "koko");
      });
    setReqModalIsOpen(false);
  };



  return (
    <React.Fragment>

      <div>

             {/* Filter Implementation */}
        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "1rem", marginTop: "1rem" }}>
          <div><button style={{ width: "250px", height: "40px", borderRadius: "5px", borderColor:"green" , fontWeight:"bold"}} onClick={() => {
            handleOpenModal();
          }}>Apply For a Leave ++</button></div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <label>
                <select style={{ width: "280px", height: "40px", border: "solid green 2px", fontWeight:"bold", borderRight: "none", borderRadius: "5px" }} value={filterOption} onChange={handleFilterChange}>
                  <option value="">Select an option</option>
                  <option value="currentMonth">Current Month</option>
                  <option value="lastMonth">Last Month</option>
                  <option value="last6Months">Last 6 Months</option>
                  <option value="lastYear">Last 1 Year</option>
                  <option value="custom">Custom Dates</option>
                </select>
              </label>
              <div>
                {filterApplied ? (
                  <button style={{ height: "40px", fontWeight:"bold",borderColor:"green", borderRadius: "5px" ,backgroundColor:"red"}} onClick={handleRemoveFilter}>Remove Filter X</button>
                ) : (
                  <button style={{ height: "40px",fontWeight:"bold",borderColor:"green", borderRadius: "5px" }} onClick={handleApplyFilter}>Apply Filter</button>
                )}
              </div></div>
            {filterOption === 'custom' && (
              <div>
                <label>
                  Start Date:
                  <input name='star_date' type="date" onChange={(event) => { setCustomStartDate(event.target.value) }} />
                </label>
                <label>
                  End Date:
                  <input name='end_date' type="date" onChange={(event) => { setCustomEndDate(event.target.value) }} />
                </label>
              </div>
            )}
          </div>
        </div>
{/* Filter Implementation Finish */}



{/* Upcomin Leaves Implementation */}
        <div style={{ display: 'flex', flexDirection: "row", textAlign: "center" }}>
          <div>
            <h3>Upcoming Leaves</h3>

             <UpcomingLeavesTable columns={columns} data={upcomingLeaves}  getAllLeaves={ getAllLeaves}  />
            {upcomingLeaves.length === 0 ? (
              <p>No upcoming leaves.</p>
            ) : (<p></p>)}
          </div>
{/* Upcopming Leaves Finish */}




         {/* Past Implementation */}
          <div>
            <h3>Past Leaves</h3>

            <UpcomingLeavesTable columns={columns} data={pastLeaves}  getAllLeaves={ getAllLeaves}  />
            {pastLeaves.length === 0 ? (
              <p>No past leaves.</p>
            ) : (<p></p>)}
          </div>
        </div>
      </div>
      {/* Upcomin Leaves Finish */}


      {/* Request a Leave Implementation */}
      <RequestLeave
        isOpen={reqModalIsOpen}
        closeModal={handleCloseModal}
        handleYesClick={handleYesClick}
      />
      <div>
     
    </div> </React.Fragment>
  );
};

export default ShowLeaves;
