import { Calendar, dateFnsLocalizer, SlotInfo, Views } from 'react-big-calendar';

import { format, parse, startOfWeek, getDay } from 'date-fns';
import {enUS} from 'date-fns/locale/en-US';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useCallback, useEffect, useState } from 'react';
import { AddCalendarEventModalProps, VendorCalendarEvent, VendorHomeOrderItemProps } from './vendor-home-models';
import { Modal } from 'react-bootstrap';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

import * as Yup from "yup";
import { VENDOR_HOME_ROUTES } from './vendor-home-routes';
import { CustomToolBar } from './vendor-home-calendar-overview';

import styles from "./vendor-home-calendar-details.module.css";
import TimePicker from 'react-time-picker';
import { ModalProps } from '../user-management/user-management-models';
import { toast } from 'react-toastify';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
});


const addCalendarEventInitialValues:VendorHomeOrderItemProps = {
    buyerName: '',
    phoneNumber: '',
    productName: '',
    time: "",
    // startTime: "",
    // endTime: "",
    amount: 0,
    location: '',
    orderDate: new Date()
};

const addCalendarEventValidationSchema = Yup.object({
    buyerName: Yup.string().required("Buyer name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    productName: Yup.string().required("Product name is required"),
    time: Yup.string().required("time is required"),
    // startTime: Yup.string().required("start time is required"),
    // endTime: Yup.string().required("end time is required"),
    amount: Yup.number().required("amount is required").typeError("amount must be a number"),
    location: Yup.string().required("location is required")
});

export const AddCalendarEventModal: React.FC<AddCalendarEventModalProps> = (modalProps:AddCalendarEventModalProps) =>{
    const [selectedTime, setSelectedTime] = useState<string|null>(null);

    const handleAddEvent = ( data: VendorHomeOrderItemProps) => {
        //console.log(data);
        modalProps.setEvents([...modalProps.events, 
            {
                title: `${data.productName}\n${data.time}\n${data.buyerName}` ,
                start: modalProps.eventDate, 
                end: modalProps.eventDate
            }
        ]);

        data.orderDate = modalProps.eventDate;
        modalProps.setOrders([...modalProps.orders,
            data
        ]);

        modalProps.setShow(false);
    };

    const handleCancelAction = () => {
        console.log("Cancel add event");
    };

    return (
    // <div className='col-12'>
        <Modal
        show={modalProps.show}
        onHide={ () => modalProps.setShow(false) }
        >
            <Modal.Header closeButton>
                <Modal.Title className="col-10">
                    <p className="m-0 p-0 h3-bold primary-text">
                        Add Order
                    </p>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Formik
                initialValues={addCalendarEventInitialValues}
                validationSchema={addCalendarEventValidationSchema}
                onSubmit={handleAddEvent} 
                >
                    {({setFieldValue}) => (
                        <Form
                        className='col-12'>
                            <div className='col-12 mb-2'>
                                <label className=' m-0 p-0 body-regular primary-text' htmlFor='buyerName'>
                                    Buyer name
                                </label>
                                <div className='form-group m-0 p-0'>
                                    <Field
                                    type="text"
                                    name="buyerName"
                                    className="form-control body-regular"
                                    placeholder="enter buyer name..."
                                    />
                                    <div className='text-danger small m-0 p-0'>
                                        <ErrorMessage name='buyerName' />
                                    </div>
                                </div>
                            </div>

                            <div className='col-12 mb-2'>
                                <label className=' m-0 p-0 body-regular primary-text' htmlFor='phoneNumber'>
                                    Phone number
                                </label>
                                <div className='form-group m-0 p-0'>
                                    <Field
                                    type="text"
                                    name="phoneNumber"
                                    className="form-control body-regular"
                                    placeholder="enter phone number..."
                                    />
                                    <div className='text-danger small m-0 p-0'>
                                        <ErrorMessage name='phoneNumber' />
                                    </div>
                                </div>
                            </div>

                            <div className='col-12 mb-2'>
                                <label className=' m-0 p-0 body-regular primary-text' htmlFor='productName'>
                                    Service name
                                </label>
                                <div className='form-group m-0 p-0'>
                                    <Field
                                    type="text"
                                    name="productName"
                                    className="form-control body-regular"
                                    placeholder="enter service name..."
                                    />
                                    <div className='text-danger small m-0 p-0'>
                                        <ErrorMessage name='productName' />
                                    </div>
                                </div>
                            </div>

                            <div className='col-12 mb-2'>
                                <label className=' m-0 p-0 body-regular primary-text' htmlFor='time'>
                                    Time
                                </label>
                                <div className='form-group m-0 p-0'>
                                    <TimePicker
                                    name="time"
                                    className="form-control body-regular"
                                    value={selectedTime}
                                    disableClock={true}
                                    clearIcon={null}
                                    onChange={(time) => {
                                        console.log(`selected time: ${time}`);
                                        setSelectedTime(time);
                                        setFieldValue("time", time);
                                    }}
                                    />
                                    <div className='text-danger small m-0 p-0'>
                                        <ErrorMessage name='time' />
                                    </div>
                                </div>
                            </div>

                            {/* <div className='col-12 mb-2'>
                                <label className=' m-0 p-0 body-regular primary-text' htmlFor='startTime'>
                                    Start time
                                </label>
                                <div className='form-group m-0 p-0'>
                                    <TimePicker
                                    name="startTime"
                                    className="form-control body-regular"
                                    value={selectedTime}
                                    disableClock={true}
                                    clearIcon={null}
                                    onChange={(time) => {
                                        setSelectedTime(time);
                                        setFieldValue("startTime", time);
                                    }}
                                    />
                                    <div className='text-danger small m-0 p-0'>
                                        <ErrorMessage name='startTime' />
                                    </div>
                                </div>
                            </div>

                            <div className='col-12 mb-2'>
                                <label className=' m-0 p-0 body-regular primary-text' htmlFor='endTime'>
                                    End time
                                </label>
                                <div className='form-group m-0 p-0'>
                                    <TimePicker
                                    name="endTime"
                                    className="form-control body-regular"
                                    value={selectedTime}
                                    disableClock={true}
                                    clearIcon={null}
                                    onChange={(time) => {
                                        setSelectedTime(time);
                                        setFieldValue("endTime", time);
                                    }}
                                    />
                                    <div className='text-danger small m-0 p-0'>
                                        <ErrorMessage name='endTime' />
                                    </div>
                                </div>
                            </div> */}

                            <div className='col-12 mb-2'>
                                <label className=' m-0 p-0 body-regular primary-text' htmlFor='amount'>
                                    Amount
                                </label>
                                <div className='form-group m-0 p-0'>
                                    <Field
                                    type="text"
                                    name="amount"
                                    className="form-control body-regular"
                                    placeholder="enter amount..."
                                    />
                                    <div className='text-danger small m-0 p-0'>
                                        <ErrorMessage name='amount' />
                                    </div>
                                </div>
                            </div>

                            <div className='col-12 mb-2'>
                                <label className=' m-0 p-0 body-regular primary-text' htmlFor='location'>
                                    Location
                                </label>
                                <div className='form-group m-0 p-0'>
                                    <Field
                                    type="text"
                                    name="location"
                                    className="form-control body-regular"
                                    placeholder="select location..."
                                    />
                                    <div className='text-danger small m-0 p-0'>
                                        <ErrorMessage name='location' />
                                    </div>
                                </div>
                            </div>

                            <div
                            className='col-12 d-flex justify-content-between'
                            >
                                <button
                                type='button'
                                className='m-0 p-2 vendor-other-button body-bold'
                                onClick={handleCancelAction}
                                >
                                    Cancel
                                </button>

                                <button
                                type='submit'
                                className='m-0 p-2 vendor-accept-button body-bold'
                                >
                                    Save Order
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    // </div>
    );
};

interface ShowEventDetailsModalProps{
    data: VendorHomeOrderItemProps,
    modalData: ModalProps
}
const ShowEventDetailsModal: React.FC<ShowEventDetailsModalProps> = (
    props: ShowEventDetailsModalProps
) => {

    return (<>
    <Modal
    show={props.modalData.show}
    onHide={() => props.modalData.setShow(false)}
    >
        <Modal.Header closeButton>
            <Modal.Title >
                <p className=" m-0 p-0 h3-bold primary-text">
                    Order Information
                </p>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className='m-0'>
            <div className='d-flex my-1'>
                <p className='col-6 m-0 p-0 body-regular primary-text text-start'>
                    Buyer
                </p>
                <p className='col-6 m-0 p-0 body-bold primary-text text-end'>
                    {props.data.buyerName}
                </p>
            </div>

            <div className='d-flex my-1'>
                <p className='col-6 m-0 p-0 body-regular primary-text text-start'>
                    Phone Number
                </p>
                <p className='col-6 m-0 p-0 body-bold primary-text text-end'>
                    {props.data.phoneNumber}
                </p>
            </div>

            <div className='d-flex my-1'>
                <p className='col-6 m-0 p-0 body-regular primary-text text-start'>
                    Service Ordered
                </p>
                <p className='col-6 m-0 p-0 body-bold primary-text text-end'>
                    {props.data.productName}
                </p>
            </div>

            <div className='d-flex my-1'>
                <p className='col-6 m-0 p-0 body-regular primary-text text-start'>
                    Time
                </p>
                <p className='col-6 m-0 p-0 body-bold primary-text text-end'>
                    {`${props.data.time}`}
                </p>
            </div>

            <div className='d-flex my-1'>
                <p className='col-6 m-0 p-0 body-regular primary-text text-start'>
                    Amount
                </p>
                <p className='col-6 m-0 p-0 body-bold primary-text text-end'>
                    {`KES ${props.data.amount}`}
                </p>
            </div>

            <div className='d-flex my-1'>
                <p className='col-6 m-0 p-0 body-regular primary-text text-start'>
                    Location
                </p>
                <p className='col-6 m-0 p-0 body-bold primary-text text-end'>
                    {props.data.location}
                </p>
            </div>
        </Modal.Body>
    </Modal>
    </>);
};

const VendorHomeDetailedCalendar: React.FC = () => {

    const navigate = useNavigate();

    const [showAddOrder, setShowAddOrder] = useState<boolean>(false);
    const [showEventDetails, setShowEventDetails] = useState<boolean>(false);

    const [clickedDate, setClickedDate] = useState<Date>(new Date());
    const [selectedEvent, setSelectedEvent] = useState<VendorCalendarEvent>();
    const [selectedEventCorrespondingOrder, setSelectedEventCorrespondingOrder] = 
    useState<VendorHomeOrderItemProps>(
        {
            buyerName: "",
            productName: "",
            time: "",
            location: "",
            amount: 0,
            phoneNumber: "",
            orderDate: new Date()
        }
    );

    const showEventDetailsModalProps: ModalProps = {
        show: showEventDetails,
        setShow: setShowEventDetails
    };

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

    useEffect( () => {
        const order: VendorHomeOrderItemProps|undefined = orders.find( order =>{
            //console.log(`${order.orderDate.toDateString()} - ${selectedEvent?.start.toDateString()}`);
            return order.orderDate.toDateString() === selectedEvent?.start.toDateString();
        });
        setSelectedEventCorrespondingOrder( order !== undefined ? order : selectedEventCorrespondingOrder);
        //console.log(orders);
    }, [selectedEvent]);
    

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
          backgroundColor: "var(--cards-form-bg, #FFF)", 
        },
      };
    }
    return {};
  };

    const handleDateClicked = (slotInfo: SlotInfo) => {
       // console.log(`Clicked date: ${slotInfo.start.toDateString()} - ${new Date().toDateString()}`);
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

    const handleGoBackHome = () => {
        navigate(VENDOR_HOME_ROUTES.FULL.HOME_FULL);
    };

    return (<>
    <div className="col-12 mx-md-4">
    
        <div className="col-6 d-flex justify-content-start mb-4">
            <img
            src="/assets/images/back-icon.svg"
            style={{width: "24px"}} 
            onClick={handleGoBackHome}
            />
        </div>

        <div className="col-12 my-0  vendor-item-container bg-white p-3">
            <div className={styles.calendarDetailsStylesWrapper} >
                <Calendar
                localizer={localizer}
                events={events}

                views={[Views.MONTH]}
                drilldownView={null}
                selectable={true}

                dayPropGetter={dayPropGetter}

                startAccessor="start"
                endAccessor="end"
                components={{
                    toolbar: CustomToolBar,
                }}

                onSelectSlot={handleDateClicked}
                onSelectEvent={(event) => {
                    setSelectedEvent(event);
                    setShowEventDetails(true);
                }}
                eventPropGetter={() => {
                    return{
                        style: {
                            backgroundColor: "#DAFFE7",
                            color: "#457900"
                        }
                    };
                }}
                style={{
                    height: "100%"
                }}
                />
            </div>
        </div>
        
        <AddCalendarEventModal show={showAddOrder} setShow={setShowAddOrder} 
        events={events} setEvents={setEvents}
        orders={orders} setOrders={setOrders}
        eventDate={clickedDate}/>

        <ShowEventDetailsModal 
        data={selectedEventCorrespondingOrder} 
        modalData={showEventDetailsModalProps}
        />
    </div>
    </>);
};

export default VendorHomeDetailedCalendar;