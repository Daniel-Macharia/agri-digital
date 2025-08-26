import { NavLink, useNavigate } from "react-router-dom";

interface CropsTopBarItemProps{
    iconUrl: string,
    itemName: string,
    pageUrl: string
};

const CropsTopBarItem: React.FC<CropsTopBarItemProps> = ({iconUrl, itemName, pageUrl})=>{

    const navigate = useNavigate();

    const handleClickItem = ()=>{
      navigate(pageUrl);  
    };

    return (<>
    <NavLink
    to={pageUrl} end
    className="nav-link col-12 px-1"
    >
        {({}) => (
            <div className=" col-12 m-0" 
            onClick={handleClickItem} 
            >

                <img src={iconUrl} 
                style={{width: "32px", height: "32px"}}
                />

                <p className=" col-12 mx-0 my-0" 
                style={{ textWrap:  "nowrap"}}
                >
                    {itemName}
                </p>

            </div>
        )}
    </NavLink>
    </>);
}

export default CropsTopBarItem;