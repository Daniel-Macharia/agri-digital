import { useEffect, useState } from "react";
import { ServiceItemProps } from "./my-services-models";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import { ServiceStatus, VendorCurrency } from "./my-services-enums";

import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

import "./my-services.css";
import { toast } from "react-toastify";
import VendorMyServicesAddServiceModal from "./my-services-modals";


const editServiceInitialValues = {
    serviceDescription: "",
    serviceCost: 0,
    currency: "",
    serviceDuration: 0,
};

const editServiceValidationSchema = Yup.object({
    serviceDescription: Yup.string().required("description is required"),
    serviceCost: Yup.number().required("cost is required").typeError("cost must be a number"),
    currency: Yup.string().required("select a currency"),
    serviceDuration: Yup.number().required("duration is required").typeError("duration must be a number"),
});

export interface VendorMyServicesModalProps{
    show: boolean, 
    setShow: React.Dispatch<React.SetStateAction<boolean>>
};

const PopulateFormOnMount = (data: typeof editServiceInitialValues) => {
    const {setFieldValue, values} = useFormikContext<typeof editServiceInitialValues>();

    useEffect( () => {
        if( !values.currency )
        {
            setFieldValue("currency", data.currency);
        }

        if( !values.serviceCost )
        {
            setFieldValue("serviceCost", data.serviceCost);
        }

        if( !values.serviceDuration )
        {
            setFieldValue("serviceDuration", data.serviceDuration);
        }

        if( !values.serviceDescription )
        {
            setFieldValue("serviceDescription", data.serviceDescription);
        }
    }, []);

    return null;
};

const AddServiceCard: React.FC<VendorMyServicesModalProps> = (data: VendorMyServicesModalProps) => {

    return (<>
    <div 
    className="col-12 m-0 p-0 border-1 border border-dark 
    vendor-my-service-item-container 
    justify-content-center align-content-center 
    p-3 h-100 
    vendor-cursor-pointer"
    onClick={() => data.setShow(true)}
    >
        <div className="col-12 d-flex justify-content-center">
        <img 
        src="/assets/images/vendor/my-services/add_icon.svg"
        className="m-0 w-20"/>

        </div>

        <p className="h3-bold primary-text text-center">
            Add a New Service
        </p>
    </div>
    </>);
};

const ServiceItem: React.FC<ServiceItemProps> = ( data: ServiceItemProps ) => {

    const [ showEditView, setShowEditView] = useState<boolean>(false);
    
    const handleDeleteService = () => {
        toast.error("deleting service");
    };

    const handleEditService = () => {
        toast.info("allowing edit of service");
        setShowEditView(true);
    };

    const handleSaveEditService = ( data: typeof editServiceInitialValues) => {
        const collectedData: string = `Description: ${data.serviceDescription}\n
        Cost: ${data.currency} ${data.serviceCost}\n
        Duration: ${data.serviceDuration}`;
        toast(collectedData);
        setShowEditView(false);
    };

    const handleCancelAction = () => {
        toast.error("cancelled editing of service");
        setShowEditView(false);
    };

    const handlePostToMarket = () => {
        toast.info("adding product to market..");
    };

    return (<>
    <div className="col-12 vendor-my-service-item-container card bg-white p-0 border-0 h-100">
        <div className="col-12 p-0">
            <img
            src={data.serviceImageUrl}
            className="w-100 m-0"
            alt="service"
            />
            
            <label
            className="small-medium vendor-my-services-badge py-1 px-2 rounded-pill position-absolute top-0 end-0 m-3">
                {data.serviceStatus}
            </label>
        </div>

        <div className="col-12 p-3">
            {
                (!showEditView) && (<div className="col-12" >
                    <div className="col-12 d-flex justify-content-between">
                        <p className="col-8 m-0 p-0 body-medium primary-text">
                            {data.serviceName}
                        </p>

                        <div className="col-4 m-0 p-0 d-flex">
                            <button
                            className="col-6 m-0 p-0 border-0"
                            onClick={handleEditService}
                            >
                                <img 
                                src="/assets/images/vendor/my-services/edit_icon.svg"
                                className="vendor-my-services-icon"/>
                            </button>
                            <button
                            className="col-6 m-0 p-0 border-0"
                            onClick={handleDeleteService}
                            >
                                <img 
                                src="/assets/images/vendor/my-services/delete_icon.svg"
                                className="vendor-my-services-icon"/>
                            </button>
                        </div>
                    </div>
                    
                    <div className="col-12 m-0 my-1 p-0 d-flex justify-content-start align-items-center">
                        <img 
                        src="/assets/images/vendor/my-services/clock.svg"
                        className="vendor-my-services-icon"/>

                        <p className="col-8 ps-2 small-regular m-0 secondary-text">
                            {data.serviceDuration}
                        </p>
                    </div>

                    <div className="col-12 m-0 my-1 p-0 d-flex justify-content-start align-items-center">
                        <img 
                        src="/assets/images/vendor/my-services/tag.svg"
                        className="vendor-my-services-larger-icon"/>

                        <p className="col-8 ps-2 h2-bold m-0 primary-text">
                            {`${data.currency} ${data.serviceCost}`}
                        </p>
                    </div>

                    <div className="col-12 m-0 p-0 d-flex justify-content-start mb-4">
                        <p className="col-12 m-0  small-regular primary-text">
                            {data.serviceDescription}
                        </p>
                    </div>

                    <div className="col-12 m-0 p-0 d-flex justify-content-cener">
                        <button
                        className="col-12 m-0 p-2 vendor-accept-button small-medium"
                        onClick={handlePostToMarket}
                        >
                            Post to Market Place
                        </button>
                    </div>
                </div>
            )}

            {
                (showEditView) && (
                <div className="col-12">
                    <Formik
                    initialValues={editServiceInitialValues}
                    validationSchema={editServiceValidationSchema}
                    onSubmit={handleSaveEditService}
                    >
                        {({setFieldValue}) => (
                            <Form>
                                <PopulateFormOnMount 
                                serviceDescription={data.serviceDescription} 
                                serviceCost={data.serviceCost} 
                                currency={data.currency} 
                                serviceDuration={data.serviceDuration} 
                                />

                                <div className="col-12 d-flex justify-content-between">
                                    <p className="col-8 m-0 p-0 body-medium primary-text">
                                        {data.serviceName}
                                    </p>

                                    <div className="col-4 m-0 p-0 d-flex">
                                        <button
                                        className="col-6 m-0 p-0 border-0"
                                        type="submit"
                                        >
                                            <img 
                                            src="/assets/images/vendor/my-services/save_icon.svg"
                                            className="vendor-my-services-icon"/>
                                        </button>
                                        <button
                                        className="col-6 m-0 p-0 border-0"
                                        type="button"
                                        onClick={handleCancelAction}
                                        >
                                            <img 
                                            src="/assets/images/vendor/my-services/cancel_icon.svg"
                                            className="vendor-my-services-icon"/>
                                        </button>
                                    </div>
                                </div>

                                <div className="m-0 p-0 form-group d-flex my-1">
                                    <label htmlFor="serviceDuration" className="m-0 p-0 py-1 col-6 text-start body-regular secondary-text">
                                        Duration
                                    </label>

                                    <div className="m-0 p-0 col-6">
                                        <Field
                                        className="form-control body-regular m-0 py-1"
                                        name="serviceDuration"

                                        />
                                        <div className="text-danger small m-0">
                                            <ErrorMessage name="serviceDuration"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="m-0 p-0 form-group my-1 d-flex">
                                    <div className="col-3 col-md-2">
                                        <select className="m-0 p-0 py-1 text-start form-control body-regular secondary-text"
                                        name="currency"
                                        onChange={(event) => {
                                            const val = event.target?.value;
                                            console.log(`selected: ${val}`);
                                            setFieldValue( "currency", val);
                                        }}
                                        >
                                            <option value={VendorCurrency.KES}>
                                                {VendorCurrency.KES}
                                            </option>
                                            <option value={VendorCurrency.UGSH}>
                                                {VendorCurrency.UGSH}
                                            </option>
                                            <option value={VendorCurrency.TZSH}>
                                                {VendorCurrency.TZSH}
                                            </option>
                                        </select>
                                        <div className="text-danger small m-0">
                                            <ErrorMessage name="currency"/>
                                        </div>
                                    </div>

                                    <div className="m-0 p-0 col-9 col-md-10">
                                        <Field
                                        className="form-control body-regular py-1 m-0"
                                        name="serviceCost"
                                        placeholder="service cost"
                                        />
                                        <div className="text-danger small m-0">
                                            <ErrorMessage name="serviceCost"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="m-0 p-0 form-group my-1 d-flex">
                                    <label htmlFor="serviceDescription" className="m-0 p-0 py-1 col-4 text-start body-regular secondary-text">
                                        Description
                                    </label>

                                    <div className="m-0 p-0 col-8">
                                        <Field
                                        className="form-control body-regular py-1 m-0"
                                        name="serviceDescription"
                                        placeholder="service description"
                                        />
                                        <div className="text-danger small m-0">
                                            <ErrorMessage name="serviceDescription"/>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            )}

        </div>
    </div>
    </>);
};

const VendorMyServices: React.FC = () => {

    const navigate = useNavigate();
    const backUrl = useLocation().state;
    const [listData, setListData] = useState<ServiceItemProps[]>();
    const [showAddServiceModal, setShowAddServiceModal] = useState<boolean>(false);

    const myServices: ServiceItemProps[] = [];

    useEffect(() => {
        //toast("Hello world");
        for( let i = 0; i < 4; i++ )
        {
            //toast(i);
            myServices.push(
                {
                    serviceName: `Veterinary Service ${i + 1}`,
                    serviceDescription: `description ${i + 1}`,
                    serviceDuration: 2,
                    serviceStatus: ServiceStatus.AVAILABLE,
                    serviceCost: 3000,
                    currency: VendorCurrency.KES,
                    serviceImageUrl: "/assets/images/vendor/my-services/veterinary_service.svg"
                }
            );
            myServices.push(
                {
                    serviceName: `Farmer Training ${i + 1}`,
                    serviceDescription: `Description ${i + 1}`,
                    serviceDuration: 3,
                    serviceStatus: ServiceStatus.AVAILABLE,
                    serviceCost: 1000,
                    currency: VendorCurrency.UGSH,
                    serviceImageUrl: "/assets/images/vendor/my-services/farmers_training.svg"
                }
            );
            myServices.push(
                {
                    serviceName: `Soil Testing ${i + 1}`,
                    serviceDescription: `Description ${i + 1}`,
                    serviceDuration: 1,
                    serviceStatus: ServiceStatus.AVAILABLE,
                    serviceCost: 1500,
                    currency: VendorCurrency.TZSH,
                    serviceImageUrl: "/assets/images/vendor/my-services/soil_testing.svg"
                }
            );
        }
        //toast("done");
        setListData(myServices);
    }, []);

    const handleGoBackHome = () => {
        navigate(backUrl);
    };

    return (<>
    <div className="col-12 px-md-4">
        <div className="col-6 d-flex justify-content-start">
            <img
            src="/assets/images/back-icon.svg"
            style={{width: "24px"}} 
            onClick={handleGoBackHome}
            className="vendor-cursor-pointer"
            />
        </div>

        <div className="row m-0 p-0 my-3">
            <div className="col-12 col-md-4 p-0 m-0 pt-3 px-md-2">
                <AddServiceCard 
                show={showAddServiceModal} 
                setShow={setShowAddServiceModal} 
                />
            </div>

            {
                (listData !== undefined) && listData.map((service, index) => <div 
                className={`col-12 col-md-4 m-0 p-0 pt-3 ${((index) % 3 === 1) ? "pe-md-0 ps-md-2" : "px-md-2"}`}>
                    <ServiceItem 
                    serviceName={service.serviceName} 
                    serviceDuration={service.serviceDuration} 
                    serviceCost={service.serviceCost} 
                    serviceDescription={service.serviceDescription} 
                    serviceImageUrl={service.serviceImageUrl} 
                    serviceStatus={service.serviceStatus} 
                    currency={service.currency}
                    />
                </div>)
            }
        </div>

        <VendorMyServicesAddServiceModal 
        show={showAddServiceModal} 
        setShow={setShowAddServiceModal} 
        />
    </div>
    </>);
};

export default VendorMyServices;