import React, {useState, useRef, useContext, useEffect} from "react";
import { Calendar, momentLocalizer, Views} from "react-big-calendar";
import moment from "moment";
import EventWrapper from "./EventWrapper";
import monthEventWrapper from "./monthEventWrapper";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)
let allViews = Object.keys(Views).map(k => Views[k])

export default function  CalendarView({allEvents}) {
    return (

    <Calendar
    localizer={localizer}
      components={{
        month : {
          eventWrapper: monthEventWrapper,
        },
        eventWrapper: EventWrapper,
        // event: Event
      }}
    style ={{height : '86vh', width : '100%'}}
      defaultDate={new Date}
      defaultView="day"
      events={allEvents}
      views={allViews}
    />
  );
} 