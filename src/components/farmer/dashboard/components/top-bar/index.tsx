import { Formik, Form, Field } from "formik";

import * as Yup from 'yup';



export default function TopBar({ toggleSidebar }: { toggleSidebar: () => void }) {
    const initialValues = {
        searchItem: '',
    };

    const validationSchema = Yup.object({
        searchItem: Yup.string().required('Required'),
    });

    const searchForItem = async (values: typeof initialValues, { }: any) => {
        let value = values.searchItem;
        console.log("searching item ", value);
    };

    const loadNotifications = () => {
        console.log("loading notifications...");
    };

    const showMoreActions = () => {
        console.log("Here are more actions...");
    };

    const loadProfile = () => {
        console.log("loading profile...");
    };

    let render = () => {
        return (
            <div className="container d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column align-items-start gap-1 flex-shrink-0 col-3 col-sm-2 col-md-2">
                    <button className="btn btn-link text-dark d-lg-none me-3" onClick={toggleSidebar}>
                        <i className="fas fa-bars fa-fw"></i>
                    </button>

                    <div className="d-none d-lg-block">
                        <h3 className="h2-bold">Welcome, full name</h3>
                        <div className="d-flex align-items-center gap-2">
                            <p className="small-regular mb-0">
                                Farm name, Location
                            </p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="5" viewBox="0 0 9 5" fill="none">
                                <path d="M7.94141 0.757812L4.47041 4.24381L0.999406 0.757813" stroke="#777777" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                    </div>
                </div>
                <div className="d-flex align-items-center gap-3 flex-shrink-0 px-4 py-2 rounded-pill bg-white w-100" style={{ maxWidth: '23.9375rem' }}>
                    <div
                        className="d-flex flex-column justify-content-center align-items-start gap-2 flex-shrink-0 px-4 py-3 rounded bg-light"
                        style={{ width: '13.375rem', height: '2.5rem', borderRadius: '1.25rem', background: 'var(--Background, #F5F5F5)' }}
                    >

                        <div className="d-flex align-items-center gap-3">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={searchForItem}
                            >
                                {({ }) => (
                                    <Form className="input-group">
                                        <button className="btn btn-light " type="submit">
                                            <img src="/assets/images/search_icon.svg" alt="search" style={{ height: '1rem' }} />
                                        </button>
                                        <Field
                                            name='searchItem'
                                            type='text'
                                            className="form-control small-regular"
                                            placeholder='Search'
                                        />

                                    </Form>
                                )}

                            </Formik>
                        </div>



                    </div>


                    <div className="d-flex align-items-center gap-4">
                        <div
                            className="d-inline-block"
                            style={{ width: '1.5rem', height: '1.5rem' }}
                        >
                            <img onClick={loadNotifications} style={{ cursor: 'pointer' }} className="me-3" alt="notifications" src="/assets/images/notification_icon.svg" />
                        </div>
                        



                        <img onClick={loadProfile} style={{ cursor: 'pointer' }} className="me-3" alt="profile" src="/assets/images/profile_icon.svg" />
                        <img onClick={showMoreActions} style={{ cursor: 'pointer' }} alt="more actions" src="/assets/images/more_icon.svg" />
                    </div>
                </div>
            </div>
        );
    };

    return render();
}
