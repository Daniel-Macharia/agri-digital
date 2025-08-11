import TopBar from "../farmer/top-bar";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../common/exceptions/NotFound";
import VendorMyServices from "./content/my-services/my-services";
import VendorMyProducts from "./content/my-products/my-products";
import { VENDOR_ROUTES } from "./vendor-routes";
import VendorSideBar from "./vendor-side-bar";

import "./vendor-style.css";
import VendorManageUsers from "./content/user-management/user-management";
import VendorHomeRouter from "./content/home/vendor-home-router";


const VendorRouter: React.FC = () => {    
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (<>
    <div
      className="container-fluid position-absolute top-0 start-0 vh-100 w-100 overflow-x-hidden "
      style={{ backgroundColor: '#ececec', height: "100vh" }}
    >
    
                <div className="row h-100">
                    {/* Sidebar - collapsible on small screens */}
                    <div
                        className={`col-9 col-sm-6 col-lg-3 col-xl-2 bg-white h-100 p-0 overflow-auto ${
                            isSidebarVisible ? "position-fixed start-0 top-0 z-3 shadow" : "d-none d-lg-block"
                        }`}
                        style={{ zIndex: isSidebarVisible ? 1200 : undefined }}
                    >
                        <VendorSideBar toggleSidebar={toggleSidebar} />
                    </div>
    
                    {/* Overlay for mobile view */} 
                    {isSidebarVisible && (
                        <div
                            className="position-fixed top-0 start-0 w-100 h-100 bg-dark d-lg-none"
                            style={{ opacity: 0.5, zIndex: 1100 }}
                            onClick={toggleSidebar}
                        ></div>
                    )}
    
                    {/* Main content area */}
                    <div className=" overflow-auto col-12 col-lg-9 col-xl-10 d-flex flex-column flex-grow-1 px-0"
                    style={{height: "100vh"}}>
                        
                        <TopBar toggleSidebar={toggleSidebar} />
    
                        <div className="col-12 px-4 m-0 ">
                            <Routes>
                                <Route path={VENDOR_ROUTES.VENDOR_HOME} element={<VendorHomeRouter />} />
                                <Route path={VENDOR_ROUTES.VENDOR_MY_PRODUCTS} element={<VendorMyProducts />} />
                                <Route path={VENDOR_ROUTES.VENDOR_MY_SERVICES} element={<VendorMyServices />} />

                                <Route path={VENDOR_ROUTES.VENDOR_MANAGE_USERS} element={<VendorManageUsers />} />
                                
                                <Route path={VENDOR_ROUTES.VENDOR_OTHER} element={<NotFound />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
    </>);
};

export default VendorRouter;