export interface ProjectsOverviewProps {
    projectName: string,
    currentProjectStage: number,
    projectType: string
};



export interface WeatherSummaryProps{
    farmLocation: string,
    farmName: string,
    sun: string,
    temperature: number,
    humidity: number,
    windSpeed: number
};


export interface HomeSummaryItemProps{
    itemTitle: string,
    itemCount: number,
    itemDesc: string,
    detailsUrl: string
};

export interface HomeProductItemProps{
    productImageUrl: string,
    productName: string,
    productQuantity: number,
    productPrice: number,
    unitName: string
};

export interface HomeMarketplaceItemProps{
    productImageUrl: string,
    productName: string,
    productSeller: string,
    productPrice: number,
    unitName: string
};

export interface HomeTaskItemProps{
    title: string,
    stage: string,
    notes: string
};

export interface TaskItemProps{
    taskTitle: string, 
    taskDate: Date,
    taskDesc: string
};

export interface HomeArticleItemProps{
    articleId: number,
    articleImageUrl: string,
    articleTitle: string,
    articleBriefDesc: string,
    articleReadTime: number
};

export interface HomeTrainingItemProps{
    trainingDate: string,
    trainingTitle: string
};

export interface HomeNotificationItemProps{
    notificationTitle: string,
    notificationDesc: string,
    receivedAt: string
};

export interface OverviewHeaderProps{
    overviewTitle: string,
    viewMoreUrl: string
};

export interface HomeOrderItemProps{
    itemImageUrl: string,
    itemName: string,
    itemUnitCount: number, //e.g 35
    itemUnitName: string, //e.g Kg, Litres
    itemCost: number,
    customerName: string,
    orderStatus: string
};