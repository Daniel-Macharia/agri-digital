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
            <nav
                className="navbar navbar-light bg-white shadow-sm w-100 position-sticky top-0 px-3 px-lg-4"
                style={{ zIndex: 2 }} // z-index lower than sidebar (z-3) so sidebar overlays in mobile
            >
                {/* Left : Menu toggle + greeting */}
                <div className="d-flex align-items-center flex-grow-1">
                    {/* Mobile menu toggle */}
                    <button
                        className="btn btn-link text-dark d-lg-none me-3 p-0"
                        type="button"
                        aria-label="Toggle sidebar"
                        onClick={toggleSidebar}
                    >
                        <i className="fas fa-bars fa-fw fs-4"></i>
                    </button>

                    {/* Greeting – hidden on mobile for space */}
                    <div className="d-none d-lg-flex flex-column">
                        <h6 className="mb-0 fw-semibold">Welcome, John Doe</h6>
                        <div className="d-flex align-items-center gap-1">
                            <small className="text-muted">Mugutha Farm, Ruiru</small>
                            <i className="fas fa-chevron-down small text-muted"></i>
                        </div>
                    </div>
                </div>

                {/* Right : Search + icons */}
                <div className="d-flex align-items-center gap-3">
                    {/* Search */}
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={searchForItem}
                    >
                        {() => (
                            <Form className="input-group rounded-pill overflow-hidden bg-light" style={{ maxWidth: "15rem" }}>
                                <span className="input-group-text bg-transparent border-0 py-0 ps-3 pe-0">
                                    <img src="/assets/images/search_icon.svg" alt="search" style={{ height: "1rem" }} />
                                </span>
                                <Field
                                    name="searchItem"
                                    type="text"
                                    className="form-control border-0 bg-transparent small-regular"
                                    placeholder="Search"
                                />
                            </Form>
                        )}
                    </Formik>

                    {/* Icons */}
                    <button className="btn btn-link position-relative p-0" onClick={loadNotifications}>
                        <img src="/assets/images/notification_icon.svg" alt="notifications" />
                    </button>

                    <button className="btn btn-link p-0" onClick={loadProfile}>
                        <img src="/assets/images/profile_icon.svg" alt="profile" />
                    </button>

                    <button className="btn btn-link p-0" onClick={showMoreActions}>
                        <img src="/assets/images/more_icon.svg" alt="more actions" />
                    </button>
                </div>
            </nav>
        );
    };

    return render();
}
