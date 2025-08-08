import { useState } from "react";

interface HomeAdvertItemProps{
    imageUrl: string,
    itemName: string,
    itemDescription: string,
    registrationLink: string
};

const HomeAdvertItem: React.FC<HomeAdvertItemProps> = ( data: HomeAdvertItemProps) => {

    const handleRegisterAction = () => {
        console.log(`registering ${data.itemName}`);
    };

    return (<>
    <div className={`d-flex m-2 my-2 p-0 align-items-center`}
    
    style={{
        borderStyle: "none",
        borderRadius: "8px",
        borderWidth: "1px",
        borderColor: "var(--red, #5e598dff)",
        width: 'min-content'
    }}>
        <img
        src={data.imageUrl}
        alt="event"
        className="m-0"
        style={{
            width: "81px",
            height: "100",
            borderStyle: "none",
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px"
        }}

        />
        <div className="d-block m-0 p-2"
        style={{
            width: "160px"
        }}>
            <p className="col-12 m-0"
            style={{
                color: "var(--Primary-Text, #333)",
                fontFamily: "Roboto",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "600",
                lineHeight: "19.2px"
            }}>
                {data.itemName}
            </p>

            <p className="col-12 m-0 secondary-text"
            style={{
                color: "var(--Secondary-Text, #777)",
                fontFamily: "Roboto",
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "16px"
                }}>
                {/* {data.itemDescription} */}
                advert content here
            </p>

            <div className="col-12 m-0">
                <button
                className="m-0 p-0"
                style={{
                    color: "var(--Primary, #457900)",
                    borderStyle: "none",
                    backgroundColor: "var(--Accent, #DAFFE7)",
                    
                }}

                onClick={handleRegisterAction}>
                    Register Now
                </button>
            </div>
        </div>
    </div>
    </>);
}

const HomeAdvertChain: React.FC = () => {

    const [showAdverts, setShowAdverts] = useState<boolean>(true);

    const adverts: HomeAdvertItemProps[] = [
        {
            itemName: "Farming equipent sale",
            itemDescription: "Attend to purchase farming equipment. Easen your farming experience.",
            registrationLink: "#",
            imageUrl: "/assets/images/vendor/home/planting_notification.svg"
        },
        {
            itemName: "Farming equipent sale",
            itemDescription: "Attend to purchase farming equipment. Easen your farming experience.",
            registrationLink: "#",
            imageUrl: "/assets/images/vendor/home/planting_notification.svg"
        },
        {
            itemName: "Farming equipent sale",
            itemDescription: "Attend to purchase farming equipment. Easen your farming experience.",
            registrationLink: "#",
            imageUrl: "/assets/images/vendor/home/planting_notification.svg"
        },
        {
            itemName: "Farming equipent sale",
            itemDescription: "Attend to purchase farming equipment. Easen your farming experience.",
            registrationLink: "#",
            imageUrl: "/assets/images/vendor/home/planting_notification.svg"
        },
        {
            itemName: "Farming equipent sale",
            itemDescription: "Attend to purchase farming equipment. Easen your farming experience.",
            registrationLink: "#",
            imageUrl: "/assets/images/vendor/home/planting_notification.svg"
        },
        {
            itemName: "Farming equipent sale",
            itemDescription: "Attend to purchase farming equipment. Easen your farming experience.",
            registrationLink: "#",
            imageUrl: "/assets/images/vendor/home/planting_notification.svg"
        },
        {
            itemName: "Farming equipent sale",
            itemDescription: "Attend to purchase farming equipment. Easen your farming experience.",
            registrationLink: "#",
            imageUrl: "/assets/images/vendor/home/planting_notification.svg"
        },
        {
            itemName: "Farming equipent sale",
            itemDescription: "Attend to purchase farming equipment. Easen your farming experience.",
            registrationLink: "#",
            imageUrl: "/assets/images/vendor/home/planting_notification.svg"
        }

    ];

    return (<>
    <div className={`${ (showAdverts) ? "d-flex" : "d-none"} overflow-auto vendor-hidden-scrollbar m-0 my-3 p-2 py-0`}

    style={{
        backgroundColor: "var(--Accent, #DAFFE7)"
    }}>
        {
            adverts.map((advert) => <HomeAdvertItem 
            imageUrl={advert.imageUrl} 
            itemName={advert.itemName} 
            itemDescription={advert.itemDescription} 
            registrationLink={advert.registrationLink} 
            />)
        }
        <button
        type="button"
        className="translate-middle-y position-absolute top-20 me-2 end-0 btn btn-sm secondary-text"
        onClick={() => setShowAdverts(false) }
        style={{zIndex: 2}}
        >
            X
        </button>
    </div>
    
    </>);
};

export default HomeAdvertChain;