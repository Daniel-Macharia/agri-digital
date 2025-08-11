import { useEffect, useState } from "react";
import { VENDOR_ROUTES } from "../../vendor-routes";
import { useNavigate } from "react-router-dom";
import { UserItemProps } from "./user-management-models";
import { toast } from "react-toastify";
import { UserStatus } from "./user-management-enums";
import AddUserModal from "./add-user-modal";

const UserItem: React.FC<UserItemProps> = (data: UserItemProps) => {


    return (<>
    <div className="col-12 d-flex">
        <p className="col-2 p-0 py-2 m-0 small-regular secondary-text"
        style={{ minWidth: "120px"}}>
            {data.name}
        </p>

        
        <p className="col-2 p-0 py-2 m-0 small-regular secondary-text"
        style={{ minWidth: "120px"}}>
            {data.email}
        </p>

        <p className="col-2 p-0 py-2 m-0 small-regular secondary-text"
        style={{ minWidth: "120px"}}>
            {`${data.role}`}
        </p>

        <p className="col-2 p-0 py-2 m-0 small-regular secondary-text"
        style={{ minWidth: "120px"}}>
            {`${data.joinedDate.toDateString()}`}
        </p>

        <div className="col-2 d-flex justify-content-center m-0 p-0"
        style={{ minWidth: "120px"}}>
            <label className="col-10 p-0 m-0 user-status-label small-medium py-2"
            style={{
                backgroundColor: `${(data.status.toString() === UserStatus.ACTIVE.toString()) ? "var(--Primary, #457900)" : (data.status.toString() === UserStatus.INACTIVE.toString()) ? "var(--Secondary, #FF9800)" : "var(--red, #F25C5E)"}`
            }}
            >
                {`${(data.status.toString() === UserStatus.ACTIVE.toString()) ? "ACTIVE" : (data.status.toString() === UserStatus.INACTIVE.toString()) ? "INACTIVE" : "DELETED"}`}
            </label>
        </div>

        <div className="d-flex col-2 justify-content-end"
        style={{ minWidth: "120px"}}
        >
            <button
            className=" m-0 p-0 pe-1"
            onClick={() => {
                toast.info("editing user");
            }}
            style={{
                borderStyle: "none"
            }}
            >
                <img
                className="m-0 p-0"
                src="/assets/images/vendor/manage-user/edit_user.svg"
                alt="edit"
                style={{
                    width: "16px",
                    height: "16px"
                }}
                />
            </button>
            <button
            className="m-0 p-0 ps-1"
            onClick={() => {
                toast.error("deleting user");
            }}
            style={{
                borderStyle: "none"
            }}
            >
                <img
                className="m-0 p-0"
                src="/assets/images/vendor/manage-user/delete_user.svg"
                alt="del"
                style={{
                    width: "16px",
                    height: "16px"
                }}
                />
            </button>
        </div>
    </div>
    </>);
};

const VendorManageUsers: React.FC = () => {

    const navigate = useNavigate();

    
    const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);

    const handleAddUser = () => {
        setShowAddUserModal(true);
    };

    const handleGoBackHome = () => {
        navigate(`${VENDOR_ROUTES.FULL.VENDOR_HOME_FULL}`);
    };
    
    const users: UserItemProps[] = [];
    
        const [listData, setListData] = useState<UserItemProps[]>(users);
        const sortOptions: string[] = ["role", "status", "name"];
        const [sortBy, setSortBy] = useState<string>(sortOptions[0]);
        const [currentPage, setCurrentPage] = useState<number>(1);
        const [currentStartIndex, setCurrentStartIndex] = useState<number>(0);

        for( let i = 0; i < 25; i++ )
        {
            users.push(
                {
                    name: `user ${i + 1 }`,
                    role: `role ${i + 1 }`,
                    joinedDate: new Date(),
                    status: (i % 3 === 0) ? UserStatus.ACTIVE : (i % 3 === 1) ? UserStatus.INACTIVE : UserStatus.DELETED,
                    email: `email${i + 1}@shambabot.com`
                }
            )
        }
        
        let dataSize: number = users.length;
        let pageSize: number = dataSize >= 10 ? 10 : dataSize;
    
        let numberOfPages: number = Math.trunc(dataSize / pageSize);
        
        if( numberOfPages === 0 )
            numberOfPages = 1;
        else if( (numberOfPages * pageSize) < dataSize )
            numberOfPages = numberOfPages + 1;
    
        console.log(numberOfPages);
        const pages: number[] = [];
    
        for( let count = 1; count <= numberOfPages; count++ )
        {
            pages.push(count);
        }
    
        useEffect(() => {
            dataSize = listData.length;
            //setCurrentStartIndex(0);
            pageSize = dataSize >= 10 ? 10 : dataSize;
        }, [listData]);
    
        useEffect(() => {
            //toast("sort altered");
            setListData(listData.sort((user1, user2) => {
                switch(sortBy)
                {
                    case "role":
                        if(user1.role < user2.role)
                            return -1;
                        else if( user1.role === user2.role)
                                return 0;
    
                        else
                            return 1;
                    case "status":
                        if( user1.status < user2.status)
                                return -1;
                        else if( user1.status == user2.status)
                                return 0;
                        else
                            return 1;
                    default:
                        return 0;
                }
                }
            ));
        listData.forEach(item => console.log(item));
        }, [sortBy]);
        
        const handleMoveToNext = () => {
            console.log("moving to the next page");
            setCurrentPage( (currentPage < numberOfPages) ? (currentPage + 1) : 1)
        }
    
        useEffect( () => {
            const startIndex: number = Math.trunc( currentPage * pageSize) - pageSize;
            const endIndex: number = Math.trunc(currentPage * pageSize);
    
            setCurrentStartIndex(startIndex);
    
            setListData(users.slice( startIndex, endIndex));
        }, [currentPage]);

    const columnLabels: string[] = [
        "Name", "Email", "Role", "Date Joined", "Status", "Actions"
    ];

    return(<>
    <div className="col-12">

        <div className="d-flex m-0 p-0 my-2">
        <div className="col-6 d-flex justify-content-start">
            <img
            src="/assets/images/back-icon.svg"
            style={{width: "24px"}} 
            onClick={handleGoBackHome}
            />
        </div>

        <div className="col-6 d-flex justify-content-end">
            <button
            className="col-12 col-md-4 crops-accept-button"
            onClick={handleAddUser}
            >
                Add a User
            </button>
        </div>
        </div>


        <div className="col-12 p-3 bg-white"
        style={{
            borderRadius: "8px"
        }}>
            <div className="row m-0 p-2 justify-content-end align-items-center">
                <p className="m-0 p-0 body-regular"
                style={{width: "max-content"}}>
                    {`Showing ${currentStartIndex + 1} to ${ currentStartIndex + listData.length} of ${dataSize} Users`}
                </p>
                <div className="m-0"
                style={{width: "max-content"}}>
                    <div className="row p-0 m-0" 
                    style={{width: "max-content"}}>
                        <p className=" m-0 p-2 invite-end-aligned-text body-regular"
                        style={{width: "max-content"}}>
                            Sort by: 
                        </p>
                        <select 
                        className="m-0 p-0 body-bold"
                        onChange={(event) => {
                            const value = event.target?.value;
                            //toast.info(`Selected: ${value}`);
                            setSortBy(value);
                        }}
                        
                        style={{
                            width: "max-content",
                            backgroundColor: "var(--Background, #F5F5F5)",
                            borderStyle: "none",
                            borderRadius: "4px", 
                        }}
                        >
                            {
                                sortOptions.map( (sortOption, index) => <option 
                                key={index} 
                                value={sortOption}
                                className="m-0 p-1"
                                style={{
                                    backgroundColor: "var(--Background, #F5F5F5)",
                                    borderStyle: "none"
                                }}
                                >
                                    {sortOption}
                                </option>)
                            }
                        </select>
                    </div>
                </div>
            </div>

            <div className="col-12">

                <div className="d-flex m-0"
                style={{width: "max-content"}}>
                    { 
                        columnLabels.map((label) => <p className="col-2 p-0 m-0"
                        style={{ minWidth: "120px", textAlign: "center"}}>
                            {label}
                        </p>)
                    }
                </div>

                <hr className="mt-0"/>

                <div className="col-12">
                    {
                        listData.map((user, index) => 
                            <div className="col-12 p-2 mt-2"
                            style={{
                                backgroundColor: `${(index % 2 == 0) ? "var(--Background, #F5F5F5)" : "rgba(245, 245, 245, 0.50)"}`,
                                borderStyle: "none",
                                borderRadius: "6px",
                                width: "100%"
                            }}>
                                <UserItem
                                name={user.name} 
                                email={user.email} 
                                role={user.role} 
                                joinedDate={user.joinedDate} 
                                status={user.status} 
                                />
                            </div>
                        )
                    
                    
                    }
                </div>
            </div>

            <div className="row m-0 p-0 justify-content-center">
                {
                    pages.map( (pageNumber, index) => 
                        <div className=" body-medium p-2 m-2 text-align-center"
                        style={{color: " var(--Primary, #457900)", 
                        backgroundColor: ( (index + 1) == currentPage ) ? "var(--Accent, #DAFFE7)" : "#ffffff",
                        borderStyle: "none",
                        borderRadius: "8px",
                        width: "40px",
                        textAlign: "center"}}
                        
                        onClick={() => {
                            setCurrentPage(index + 1);
                        }}
                        >
                            {pageNumber}
                        </div>
                    )
                }

                <div className="col-1 m-0">
                    <button 
                    className="small-medium m-2"
                    style={{
                        color: "var(--cards-form-bg, #FFF)",
                        borderStyle: "none",
                        borderRadius: "8px",
                        padding: "8px",
                        backgroundColor: "var(--Primary, #457900)"
                    }}
                    onClick={handleMoveToNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>

    </div>


    <AddUserModal show={showAddUserModal} setShow={setShowAddUserModal} />
    </>);
};

export default VendorManageUsers;