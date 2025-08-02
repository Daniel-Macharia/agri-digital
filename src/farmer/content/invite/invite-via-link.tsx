import React, { useState } from "react";
import { InviteItemProps } from "./invite-models";
import { InviteChannel } from "./invite-enums";
import { ShowMoreSharingOptionsModal } from "./invite-modals";
import { toast } from "react-toastify";

export const InviteViaLink: React.FC = () => {
    const [showMoreSharingOptions, setShowMoreSharingOptions] = useState<boolean>(false);

    let linkValue:string = "https://shambabot.com/kelvin/e.t.c";

    let inviteItems: InviteItemProps[] = [
        {iconUrl: "/assets/images/invite/whatsapp_icon.svg", inviteChannel: InviteChannel.WHATSAPP, itemWebUrl: "https://m.me"},
        {iconUrl: "/assets/images/invite/messenger_icon.svg", inviteChannel: InviteChannel.MESSENGER, itemWebUrl: "https://m.me"},
        {iconUrl: "/assets/images/invite/sms_icon.svg", inviteChannel: InviteChannel.SMS, itemWebUrl: "https://m.me"},
        {iconUrl: "/assets/images/invite/more_icon.svg", inviteChannel: InviteChannel.MORE, itemWebUrl: "more"},
    ];

    const handleCopyLinkAction = () => {
        navigator.clipboard.writeText(linkValue)
        .then(() => {
            toast.info("link copied to clipboard", {autoClose: 3000});
        })
        .catch(()=> {
            alert("failed to copy to clipboard");
        });
    };

    function InviteItem(data: InviteItemProps)
    {
        const handleShareAction = () => {
            navigator.clipboard.writeText(linkValue)
            .then(() => toast.info("link has been copied..", {autoClose: 3000}))
            .catch(() => alert("failed to copy link to clipboard"))

            switch(data.inviteChannel)
            {
                case InviteChannel.WHATSAPP:
                    //let encodedLink = encodeURIComponent(linkValue);
                    //const url = `whatsapp://send?text=${encodedLink}`;
                    window.open("https://wa.me", "_blank");
                    break;
                case InviteChannel.MESSENGER:
                    window.open("https://m.me", "_blank")
                    break;
                case InviteChannel.SMS:
                    let encodedMessage: string = encodeURIComponent(linkValue);
                    const smsLink: string = `sms:${""}?&body=${encodedMessage}`;
                    window.location.href = smsLink;
                    break;
                default:
                    setShowMoreSharingOptions(true);
                    break;
            }
        };

        return (<>
        <div className="col-12 p-1 align-content-center"
        onClick={handleShareAction}
        >
            <div className="col-12 m-0 d-flex justify-content-center">
                <img
                src={data.iconUrl}
                alt={data.inviteChannel}
                className=" m-0"
                style={{width: "32px", height: "32px"}}
                />
            </div>

            <p className="col-12 m-0 small-semibold primary-text invite-center-aligned-text">
                {data.inviteChannel}
            </p>
        </div>
        </>);
    };

    return (<>
    <div className="col-12">
        <p className="col-12">
            Share this link with other farmers to invite them directly.
        </p>
        <div className="col-12">
            <div className="row m-0 p-0"
            style={{alignItems: "center"}}>
                <div className="col-12 col-md-8 p-0 pe-0 pe-md-2">
                    <input
                    contentEditable={"false"}
                    type="text"
                    value={linkValue}
                    className="form-control m-0"
                    />
                </div>
                <div className="col-12 col-md-4 m-0 p-0 ps-0 ps-md-2 mt-2 mt-md-0">
                    <button
                    type="button"
                    className=" d-flex form-control m-0 small-medium invite-accept-button"
                    style={{alignItems: "center"}}
                    onClick={handleCopyLinkAction}
                    >
                        <img src={"/assets/images/invite/clipboard_icon.svg"}
                        style={{width: "16px", height: "16px"}}/>
                        <p className=" small-regular m-0 p-0"
                        style={{color: "var(--cards-form-bg, #FFF)"}}>
                            Copy
                        </p>
                    </button>
                </div>
            </div>

            <p className="col-12 my-3">
                Or share via:
            </p>
            <div className="col-12">
                <div className="row m-0">
                    {
                        inviteItems.map(item => <div className="col-6 col-md-3 m-0 p-0">
                            <InviteItem 
                            inviteChannel={item.inviteChannel}
                            iconUrl={item.iconUrl}
                            itemWebUrl={item.itemWebUrl}
                            />
                        </div>)
                    }
                </div>
            </div>
        </div>
    </div>

    <ShowMoreSharingOptionsModal show={showMoreSharingOptions} setShow={setShowMoreSharingOptions}/>
    </>);
};

export default InviteViaLink;