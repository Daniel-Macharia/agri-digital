

import { Formik, Form, Field } from "formik";

import * as Yup from 'yup';

import "./index.css";

export default function TopBar()
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
            <div id="details-div">
                <h3>Welcome, full name</h3>
                <p>
                    Farm name<span>, Location</span><span></span>
                </p>
            </div>
            <div id="profile-div">
                <div id="search-div">
                    <img src="/src/assets/search_icon.svg" />
                    
                    <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={searchForItem}
                    >

                        {({}) => (
                            <Form>
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
                    <img onClick={loadNotifications} className="profile-icon" src="/../../../../../assets/notification_icon.svg" />
                    <img onClick={loadProfile} id="profile-icon" className="profile-icon" src="/../../../../../assets/profile_icon.svg" />
                    <img onClick={showMoreActions} className="profile-icon" src="/../../../../../assets/more_icon.svg" />
                </div>
            </div>
        </div>
        );
    };

    return render();
}
