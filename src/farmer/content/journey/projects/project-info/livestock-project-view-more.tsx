import { useLocation } from "react-router-dom";



const LivestockProjectViewMore: React.FC = () => {
    const state = useLocation().state;

    return (<>
    <div className="col-12">
        <div className="col-12">
            {`Livestock ID: ${state.livestockId}`}
        </div>
    </div>
    </>);
};

export default LivestockProjectViewMore;