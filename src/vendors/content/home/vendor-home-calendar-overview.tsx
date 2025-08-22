import { Calendar, dateFnsLocalizer, SlotInfo, ToolbarProps, Views } from 'react-big-calendar';
// import {format} from 'date-fns/format';
// import {parse} from 'date-fns/parse';
// import {startOfWeek} from 'date-fns/startOfWeek';
// import {getDay} from 'date-fns/getDay';

import { format, parse, startOfWeek, getDay } from 'date-fns';
import {enUS} from 'date-fns/locale/en-US';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useCallback, useState } from 'react';
import { VendorCalendarEvent, VendorHomeOrderItemProps } from './vendor-home-models';
import OverviewHeader from '../../../farmer/content/home/overview/overview-header';

import styles from "./vendor-home-calendar-overview.module.css";
import { AddCalendarEventModal } from './vendor-home-calendar-details';
import { toast } from 'react-toastify';
import { HomeOverviewNavigation } from '../../../farmer/content/home/home-model';

const locales = {
  'en-US': enUS,//import('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
});

export function CustomToolBar(toolbar: ToolbarProps<VendorCalendarEvent, object>){

    const navigateBack = () => {
        toolbar.onNavigate("PREV");
    };

    const navigateNext = () => {
        toolbar.onNavigate("NEXT");
    };

    const label = () => {
        const date = toolbar.date;

        return <span >{format(date, "MMMM yyyy")}</span>
    };
    return (<>
    <div className='d-flex justify-content-between align-items-center p-3'>
        <button 
        className="body-medium secondary-text my-0"
        style={{
            borderStyle: "none",
            backgroundColor: "#ffffff"
        }}
        onClick={navigateBack}
        aria-label="Previous Month"
        >
            {`<`}
        </button>

        <p className="">
            {label()}
        </p>

        <button 
        className="body-medium secondary-text my-0"
        style={{
            borderStyle: "none",
            backgroundColor: "#ffffff"
        }}
        onClick={navigateNext}>
            {`>`}
        </button>
    </div>
    </>);
};

const VendorHomeCalendar: React.FC<HomeOverviewNavigation> = (overviewNavigation: HomeOverviewNavigation) => {

    const [showAddOrder, setShowAddOrder] = useState<boolean>(false);
    const [events, setEvents] = useState<VendorCalendarEvent[]>([
        {
            title: "First event",
            start: new Date(),
            end: new Date()
        },
    ]);
    const [orders, setOrders] = useState<VendorHomeOrderItemProps[]>([
        {
            buyerName: "First Buyer",
            productName: "First service",
            time: "10:10",
            location: "Nairobi",
            amount: 3000,
            phoneNumber: "0123456789",
            orderDate: new Date()
        }
    ]);

    const [clickedDate, setClickedDate] = useState<Date>(new Date());

    // Helper function to check if a date has events
    const hasEventsOnDate = useCallback((date: Date) => {
        return events.some(event => {
            const eventStart = new Date(event.start);
            const eventEnd = new Date(event.end);
            const checkDate = new Date(date);
            
            // Check if the date falls within any event's date range
            return (
                checkDate.toDateString() === eventStart.toDateString() ||
                checkDate.toDateString() === eventEnd.toDateString() ||
                (checkDate >= eventStart && checkDate <= eventEnd)
            );
        });
    }, [events]);

    const dayPropGetter = (date: Date) => {
    const hasEvent = hasEventsOnDate(date);

    if (hasEvent) {
      return {
        style: {
          backgroundColor: "var(--Accent, #DAFFE7)", // light orange background
        },
      };
    }
    return {};
  };

  const handleDateClicked = (slotInfo: SlotInfo) => {
        console.log(`Clicked date: ${slotInfo.start}`)
        if( slotInfo.start.getDate() >= new Date().getDate() )
        {
            setShowAddOrder(true);
        }
        else
        {
            toast.error("orders can only be set for today or later");
        }
        setClickedDate(slotInfo.start);
    };

    return (<>
    <div className="col-12">
    <OverviewHeader
        overviewTitle="Calendar"
        viewMoreUrl={overviewNavigation.viewMoreUrl}
        backUrl={overviewNavigation.backUrl}
        />
    <div className={styles.calendarStylesWrapper}>
        {/* <div className={styles.calendarStylesWrapper}> */}
            <Calendar
            localizer={localizer}
            events={[]}

            views={[Views.MONTH]}
            drilldownView={null}
            dayPropGetter={dayPropGetter}

            selectable={true}

            startAccessor="start"
            endAccessor="end"
            components={{
                toolbar: CustomToolBar,
            }}
            onSelectSlot={handleDateClicked}

            style={{
                height: "100%"
            }}

            />

        {/* </div> */}
    </div>
    
    <AddCalendarEventModal show={showAddOrder} setShow={setShowAddOrder} 
    events={events} setEvents={setEvents}
    orders={orders} setOrders={setOrders}
    eventDate={clickedDate}/>
    </div>
    </>);
};

export default VendorHomeCalendar;