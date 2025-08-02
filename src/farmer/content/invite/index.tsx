import { useNavigate } from "react-router-dom";
import "./index.css";
import { BenefitItemProps } from "./invite-models";
import InviteTopBar from "./invite-top-bar";
import InviteViaLink from "./invite-via-link";
import InviteViaEmail from "./invite-via-email";
import { useState } from "react";
import { InviteType } from "./invite-enums";
import { FARMER_HOME_ROUTES } from "../home/home-routes";


const BenefitItem: React.FC<BenefitItemProps> = 
(data: BenefitItemProps) => {

    return (<>
    <div className="col-12">
        <div className="row d-flex">
            <div className="col-1">
                <img
                src="/assets/images/invite/benefit_icon.svg"
                alt="benefit"
                className=""
                style={{width: "24px", height: "24px"}}
                />
            </div>
            <div className="col-10">
                <p className="invite-benefit">
                    {data.benefit}
                </p>
            </div>
        </div>
    </div>
    </>);
};

export default function Invite()
{
    const navigate = useNavigate();

    const [inviteType, setInviteType] = useState<string>(InviteType.EMAIL);
    
    let benefits: BenefitItemProps[] = [
        {benefit: "Connect with local farming community"},
        {benefit: "Connect with local farming community"},
        {benefit: "Connect with local farming community"},
        {benefit: "Connect with local farming community"}
    ];

    const handleGoBackHome = () => {
        navigate(`${FARMER_HOME_ROUTES.HOME_FULL}`);
    };

    const renderContent = () => {
        switch(inviteType)
        {
            case InviteType.LINK :
                return (<InviteViaLink />);
            
            default:
                return (<InviteViaEmail />);
        }
    };

    const render = () =>{
        return (<>
        <div 
        className="col-12">

            <div className="col-12 d-flex justify-content-start mb-3">
                <img
                src="/assets/images/back-icon.svg"
                style={{width: "24px"}} 
                onClick={handleGoBackHome}
                />
            </div>

            <div className="col-12 invite-container bg-white p-3">
                <p className="col-12 h3-bold primary-text">
                    Send Invitations
                </p>
                <p className="col-12 body-regular secondary-text">
                    Grow your agricultural network by inviting other farmers to join AgriDigital. Connect, collaborate, and share farming insights with your community.
                </p>
                <div className="row invite-container m-0 pt-3 px-4 align-items-start"
                style={{
                    backgroundColor: "whitesmoke",
                    paddingBottom: "33px"
                }}>
                    <div className="col-12 col-md-6">
                        <p className="body-semibold primary-text mb-2">
                            Send invitations
                        </p>
                        <div className="col-12">
                            <InviteTopBar inviteType={inviteType} setInviteType={setInviteType} />
                            {
                                renderContent()
                            }
                        </div>
                    </div>


                    <div className="col-12 col-md-6"
                    style={{
                        borderStyle: "none",
                        borderLeftStyle: "solid",
                        borderLeftWidth: "1px",
                        borderLeftColor: "var(--secondary-text)",
                    }}>
                        <p className="body-semibold primary-text mb-2 mt-3 mt-md-0" >
                            Benefits of joining
                        </p>
                        <div className="col-12">
                            {
                                benefits.map(benefit => <BenefitItem benefit={benefit.benefit} />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>);
    };

    return render();
}