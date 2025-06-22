import { Formik, Form, Field } from "formik";

import * as Yup from 'yup';

import "./index.css";

export default function TopBar({ toggleSidebar }: { toggleSidebar: () => void })
{
    const initialValues = {
        searchItem: '',
    };

    const validationSchema = Yup.object({
        searchItem: Yup.string().required('Required'),
    });

    const searchForItem = async ( values: typeof initialValues, {}: any) => {
        let value = values.searchItem;
      console.log("searching item ", value);  
    };

    const loadNotifications = ()=>{
        console.log("loading notifications...");
    };

    const showMoreActions = ()=>{
        console.log("Here are more actions...");
    };

    const loadProfile = ()=>{
        console.log("loading profile...");
    };

    let render = ()=>{
        return (
        <div id="top-bar">
            <div className="d-lg-none">
                <button className="btn btn-link text-dark" onClick={toggleSidebar}>
                    <i className="fas fa-bars"></i>
                </button>
            </div>
            <div id="details-div">
                <h3>Welcome, full name</h3>
                <p>
                    Farm name<span>, Location</span><span></span>
                </p>
            </div>
            <div id="profile-div-container">
                <div id="profile-div">
                    <div>
                        <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={searchForItem}
                        >

                            {({}) => (
                                <Form id="search-div" >
                                    <Field 
                                    type="image" 
                                    id="search-icon" 
                                    src="/assets/images/search_icon.svg" 
                                    />
                                    
                                    <Field
                                    name='searchItem'
                                    type='text'
                                    id="search-item"
                                    placeholder='search'
                                    ></Field>
                                </Form>
                            )}
                            
                        </Formik>
                    </div>
                    <div id="icons-div">
                        <img onClick={loadNotifications} id="notification-icon" className="profile-icon" src="/assets/images/notification_icon.svg" />
                        <img onClick={loadProfile} id="profile-icon" className="profile-icon" src="/assets/images/profile_icon.svg" />
                        <img onClick={showMoreActions} id="more-icon" className="profile-icon" src="/assets/images/more_icon.svg" />
                    </div>
                </div>
            </div>
        </div>
        );
    };

    return render();
}
