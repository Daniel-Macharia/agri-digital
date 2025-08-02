import { FARMER_ROUTES } from "../../farmer-routes";


export const INVITE_ROUTES = {
    VIA_EMAIL: "/via-email",
    VIA_LINK: "/via-link",
    
    OTHER: "*",

    INVITE_FULL: FARMER_ROUTES.FULL + "invite"
};