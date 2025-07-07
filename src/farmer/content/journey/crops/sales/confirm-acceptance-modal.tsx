import { Modal } from "react-bootstrap";

interface ConfirmAcceptanceProps{
    show: boolean,
    setShow: Function
}

const ConfirmAcceptanceModal: React.FC<ConfirmAcceptanceProps> = (props: ConfirmAcceptanceProps) => {

    const handleConfirmAction = () => {
        console.log("confirmed..");
        props.setShow(false);
    };

    const handleCancelAction = () => {
        console.log("Cancelled..");
        props.setShow(false);
    };
    const render = () => {
        return (<>
        <Modal 
        show={props.show}
        onHide={ () => props.setShow(false)}

        style={{width: "min-content", marginLeft: "40%", marginRight: "40%"}}

        centered
        dialogClassName="mx-auto"

        
        >
            <Modal.Header style={{justifyContent: "center"}}>
                <Modal.Title style={{padding: "0px"}}>
                    <p className="body-semibold" style={{textAlign: "center", margin: "0px"}}>
                        Confirm Acceptance
                    </p>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body style={{width: "max-content"}}>
                <p className="body-regular" style={{textAlign: "center"}}>
                    Are you sure you want to accept this <br/>offer ?
                    This will finalize the deal.
                </p>
            </Modal.Body>

            <Modal.Footer className="col-sm-12 row nowrap"
            style={{
                display: "flex", 
                flexDirection: "row", 
                flexWrap: "nowrap", 
                justifyContent: "space-between", 
                alignItems: "center"
            }}>
                <button
                className="other-button col-sm-4"
                onClick={handleConfirmAction}
                >
                    Cancel
                </button>

                <button
                className="confirm-button col-sm-4"
                onClick={handleCancelAction}
                >
                    Confirm
                </button>

            </Modal.Footer>
        </Modal>
        </>);
    };
    return render();
}; 

export default ConfirmAcceptanceModal;
