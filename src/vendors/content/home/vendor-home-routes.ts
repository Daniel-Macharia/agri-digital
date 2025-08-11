import { VENDOR_ROUTES } from "../../vendor-routes";


export const VENDOR_HOME_ROUTES = {
    VENDOR_HOME_TRACK_ORDER: "/track-order",
    VENDOR_HOME_STOCK_SALES: "/stock-sales",

    HOME: "/",

    HOME_OTHER: "*",

    FULL: {
        HOME_FULL: `${VENDOR_ROUTES.FULL.VENDOR_HOME_FULL}`,
        VENDOR_HOME_TRACK_ORDER_FULL: `${VENDOR_ROUTES.FULL.VENDOR_HOME_FULL}/track-order`,
        VENDOR_HOME_STOCK_SALES_FULL: `${VENDOR_ROUTES.FULL.VENDOR_HOME_FULL}/stock-sales`
    }
}