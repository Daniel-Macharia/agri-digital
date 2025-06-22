import { Formik, Form, Field } from "formik";

import * as Yup from 'yup';



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
        <div className="d-flex justify-content-between align-items-center p-3 w-100 bg-white shadow-sm">
            <div className="d-flex align-items-center">
                <button className="btn btn-link text-dark d-lg-none me-3" onClick={toggleSidebar}>
                    <i className="fas fa-bars fa-fw"></i>
                </button>
            
                <div className="d-none d-lg-block">
                    <h3 className="h5 mb-0 fw-bold">Welcome, full name</h3> 
                    <p className="mb-0 small text-muted">
                        Farm name, Location
                    </p>
                </div>
            </div>
            <div className="d-flex align-items-center">
                <div className="d-none d-md-block me-3">
                    <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={searchForItem}
                    >
                        {({}) => (
                            <Form className="input-group">
                                <Field
                                name='searchItem'
                                type='text'
                                className="form-control"
                                placeholder='search'
                                />
                                <button className="btn btn-light border" type="submit">
                                    <img src="/assets/images/search_icon.svg" alt="search" style={{ height: '1rem' }}/>
                                </button>
                            </Form>
                        )}
                        
                    </Formik>
                </div>
                <div className="d-flex align-items-center">
                    <img onClick={loadNotifications} style={{ cursor: 'pointer' }} className="me-3" alt="notifications" src="/assets/images/notification_icon.svg" />
                    <img onClick={loadProfile} style={{ cursor: 'pointer' }} className="me-3" alt="profile" src="/assets/images/profile_icon.svg" />
                    <img onClick={showMoreActions} style={{ cursor: 'pointer' }} alt="more actions" src="/assets/images/more_icon.svg" />
                </div>
            </div>
        </div>
        );
    };

    return render();
}
