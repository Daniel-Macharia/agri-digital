
export interface QualityScoreCertificationItemProps{
    certificationName: string,
    completionDate: string,
    status: "verified" | "unverified"
};

export interface QualityScoreTrainingItemProps{
    trainingName: string,
    trainingDate: string,
    percentageScore: number
}