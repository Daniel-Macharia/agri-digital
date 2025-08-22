import { ServiceStatus } from "./my-services-enums";


export interface ServiceItemProps{
    serviceName: string,
    serviceDuration: number,
    serviceCost: number,
    serviceDescription: string,
    serviceImageUrl: string,
    serviceStatus: ServiceStatus,
    currency: string
};