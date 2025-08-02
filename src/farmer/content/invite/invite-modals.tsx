import { Modal } from "react-bootstrap";
import { InviteModalProps } from "./invite-models";


export const InviteSuccessfulModal = 
(data: InviteModalProps) => {

    return (<>
    <Modal
    show={data.show}
    onHide={() => data.setShow(false)}
    centered
    style={{justifyItems: "center"}}
    >
        <Modal.Body
        className="col-12"
        >
            <div className="row justify-content-center">
            <img
            src="/assets/images/invite/invite_successful_icon.svg"
            className="self-justify-center col-2"
            style={{width: "88px", height: "88px"}}
            alt="Successful"
            />
            </div>

            <p className="col-12 h3-bold primary-text invite-center-aligned-text">
                Invite Successful!
            </p>

            <p className="col-12 small-regular primary-text invite-center-aligned-text">
                Your invite has been sent successfully.
            </p>

            <button
            type="button"
            className="col-12 m-0 invite-accept-button"
            onClick={() => data.setShow(false)}
            style={{
                backgroundColor: "var(--Primary, #457900)",
                color: "var(--cards-form-bg, #FFF)"
            }}
            >
                Done
            </button>
        </Modal.Body>
    </Modal>
    </>);
};

export const InviteFailedModal = 
(data: InviteModalProps) => {

    return (<>
    <Modal
    show={data.show}
    onHide={() => data.setShow(false)}
    centered
    style={{
        justifyItems: "center"
    }}
    >
        <Modal.Body className="col-12 ">
            <div className="row justify-content-center">
                <img
                src="/assets/images/invite/invite_failed_icon.svg"
                style={{width: "88px", height: "88px"}}
                alt="Failed"
                />
            </div>
            <p className="col-12 h3-bold primary-text invite-center-aligned-text">
                Invite Failed!
            </p>

            <p className="col-12 small-regular primary-text invite-center-aligned-text">
                Looks like the invite didn't go through.
            </p>

            <button
            type="button"
            className="col-12 m-0 invite-accept-button"
            onClick={() => data.setShow(false)}
            style={{
                backgroundColor: "var(--red, #F25C5E)",
                color: "var(--cards-form-bg, #FFF)"
            }}
            >
                Try Again
            </button>
        </Modal.Body>
    </Modal>
    </>);
};

export const ShowMoreSharingOptionsModal = 
(data: InviteModalProps) => {

    const handleShareAction = () => {
        data.setShow(false);
    };

    return (<>
    <Modal
    show={data.show}
    onHide={ () => data.setShow(false)}
    centered={true}
    style={{
        justifyItems: "center"
    }}
    >
        <Modal.Header
        closeButton>
            <Modal.Title>
                <p className="col-12 h3-semibold primary-text m-0">
                    More sharing options
                </p>
            </Modal.Title>
        </Modal.Header>

        <Modal.Body
        className="col-12 align-items-center">
            <p className="col-12 m-0 body-regular primary-text">
                Here are more sharing options
            </p>
        </Modal.Body>

        <Modal.Footer>
            <button
            className="col-12 m-0 invite-accept-button"
            style={{
                backgroundColor: "var(--Primary, #457900)",
                color: "var(--cards-form-bg, #FFF)"
            }}
            onClick={handleShareAction}
            >
                Share
            </button>
        </Modal.Footer>

    </Modal>
    </>);
};