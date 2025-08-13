import { InviteType } from "./invite-enums";
import { InviteTypeProps } from "./invite-models";

const InviteTopBar: React.FC<InviteTypeProps> = ({inviteType, setInviteType}: InviteTypeProps) => {

    return (<>
    <div className="col-12 d-flex">
        <div
        className={"col-6 col-md-4 nav-link d-flex"}
        style={{
            alignItems: "center",
            color: inviteType === InviteType.EMAIL ? "var(--Primary, #457900)" : "#000000"
        }}
        onClick={() => {
            setInviteType(InviteType.EMAIL);
            
        }}
        >
            <img
            src="/assets/images/invite/email_icon.svg"
            alt="link"
            className=""
            style={{width: "16px", height: "16px"}}
            />
            <p className="col-8">
                Via email
            </p>
        </div>

        <div
        className={"col-6 col-md-4 nav-link d-flex"}
        style={{
            alignItems: "center",
            color: inviteType === InviteType.LINK ? "var(--Primary, #457900)" : "#000000"
        }}
        onClick={() => setInviteType(InviteType.LINK)}
        >
            <img
            src="/assets/images/invite/link_icon.svg"
            alt="link"
            className=""
            style={{width: "16px", height: "16px"}}
            />
            <p className="col-8">
                Via link
            </p>
        </div>
    </div>
    </>);
};

export default InviteTopBar;