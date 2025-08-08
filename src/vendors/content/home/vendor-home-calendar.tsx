import { Calendar, dateFnsLocalizer, ToolbarProps } from 'react-big-calendar';
import {format} from 'date-fns/format';
import {parse} from 'date-fns/parse';
import {startOfWeek} from 'date-fns/startOfWeek';
import {getDay} from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useCallback, useState } from 'react';

const locales = {
  'en-US': import('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
});

interface CustomDateCellWrapperProps{
    children: React.ReactNode;
    value: Date;
}

const CustomDateCellWrapper: React.FC<CustomDateCellWrapperProps> = ({children, value}) => {

    const handleDateClick = useCallback(() => {
        console.log(`clicked: ${value}`);
    }, [value]);


    return (<div 
    onClick={handleDateClick}
    style={{cursor: "pointer"}}
    >
        {children}
    </div>);
};

const CustomToolBar: React.FC<ToolbarProps> = (toolbar: ToolbarProps) => {

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
        onClick={navigateBack}>
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

const VendorHomeCalendar: React.FC = () => {

    const [events] = useState([
        {
            title: "First event",
            start: new Date(),
            end: new Date()
        },
    ]);


    return (<>
    <div className="col-12" 
    style={{height: "320px"}}>
        <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        components={{
            dateCellWrapper: CustomDateCellWrapper,
            toolbar: CustomToolBar,
        }}
        onDrillDown={(date: Date) => {
            console.log(`Clicked date: ${date}`)
        }}
        eventPropGetter={() => {
            return{
                style: {
                    backgroundColor: "purple"
                }
            };
        }}

        style={{
            height: "100%"
        }}

        />
    </div>
    </>);
};

export default VendorHomeCalendar;