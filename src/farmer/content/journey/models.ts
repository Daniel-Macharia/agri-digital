
export interface ProjectProps{
    projectId: number,
    projectName: string,
    projectDuration: number,
    overallScore: number,
    completionDate: string,
    currentStage: number,
    projectType: string
};

export interface ProjectReviewProps{
    username: string,
    userAccountState: string,
    reviewDate: Date,
    rating: number,
    comment: string
};

export interface LivestockProjectSummaryProps{
    livestockId: number,
    livestockName: string,
    shortDescription: string
};

export interface CropProjectSummaryProps{
    cropProjectStage: number,
    cropProjectDescription: string,
    stageScore: number
};