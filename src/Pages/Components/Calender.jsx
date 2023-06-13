import React, { useEffect, useState } from 'react';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getLeaveApi } from '../../Services/LeaveService';
import { useNavigate } from 'react-router-dom';
function Calendar() {
    const [events, setEvents] = useState()
    const navigate = useNavigate();
    useEffect(() => {
        getLeaveApi().then((response) => {
            const responseData = response.data
            const data = []
            responseData.map((ele) =>
                data.push({
                    title: ele.reason,
                    start: ele.start_date,
                    end: ele.end_date
                })
            )
            // console.log(data)
            setEvents(data);
        })
            .catch((error) => {
                alert(error.response.data.message)
                // console.log(error.response.data.message, "koko");
                navigate('login')
            });
    }, []);

    return (
        <div>
            <Fullcalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"}
                headerToolbar={{
                    start: "today prev,next", // will normally be on the left. if RTL, will be on the right
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
                }}
                height={"90vh"}
                events={events}
                eventBackgroundColor="green"
                eventDidMount={(info) => {
                    return new bootstrap.Popover(info.el, {
                        title: info.event.title,
                        placement: "auto",
                        trigger: "hover",
                        // customClass:"popoverStyle",
                        html: true,
                        content: '<p>This UI is Developed by Rajesh Anuragi</p>'
                    })
                }}
            />
        </div>
    )
};

export default Calendar;
