import { CropProjectSummaryProps, LivestockProjectSummaryProps, ProjectProps, ProjectReviewProps } from "../models";


export function loadProjects() : ProjectProps[] {
    try{
        const projects: ProjectProps[] = [
            { projectId: "1", projectName: "Maize", projectDuration: 12, overallScore: 42, completionDate: "25/06/2025", currentStage: 5, projectType: "crop"},
            { projectId: "2", projectName: "Rabbits", projectDuration: 10, overallScore: 38, completionDate: "25/06/2025", currentStage: 7, projectType: "livestock"},
            { projectId: "3", projectName: "Potatoes", projectDuration: 16, overallScore: 93, completionDate: "25/06/2025", currentStage: 6, projectType: "crop"},
            { projectId: "4", projectName: "Kales", projectDuration: 8, overallScore: 57, completionDate: "25/06/2025", currentStage: 6, projectType: "crop"},
            { projectId: "5", projectName: "Poultry", projectDuration: 16, overallScore: 94, completionDate: "25/06/2025", currentStage: 6, projectType: "livestock"},
            { projectId: "6", projectName: "Maize 2", projectDuration: 16, overallScore: 94, completionDate: "25/06/2025", currentStage: 6, projectType: "crop"},
            { projectId: "7", projectName: "Rabbits 3", projectDuration: 16, overallScore: 94, completionDate: "25/06/2025", currentStage: 6, projectType: "livestock"},
            { projectId: "8", projectName: "Poultry", projectDuration: 16, overallScore: 94, completionDate: "25/06/2025", currentStage: 6, projectType: "livestock"}
        ];

        return projects;
    }
    catch(error)
    {
        console.log("Failed to load projects", error);
        return [];
    }
}


export function loadProjectReviews(projectId: string): ProjectReviewProps[]{
    try{
        console.log(`livestock projectId: ${projectId}`);
        const reviews: ProjectReviewProps[] = [
            {username: "Julius Kiptoo",
            userAccountState: "verified",
            reviewDate: new Date("06/24/2025"),
            rating: 4,
            comment: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum repellat placeat quisquam! Laborum obcaecati provident nesciunt unde officiis, rerum mollitia?"},

            {username: "Sandra Juma", 
            userAccountState: "verified", 
            reviewDate: new Date("06/10/2025"), 
            rating: 2, 
            comment: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum repellat placeat quisquam! Laborum obcaecati provident nesciunt unde officiis, rerum mollitia?"},
            
            {username: "Millicent Ole Sapit", 
            userAccountState: "verified", 
            reviewDate: new Date("05/26/2025"), 
            rating: 1, 
            comment: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum repellat placeat quisquam! Laborum obcaecati provident nesciunt unde officiis, rerum mollitia?"},
            
            {username: "Kevin Maiyo", 
            userAccountState: "verified", 
            reviewDate: new Date("05/20/2025"), 
            rating: 3, 
            comment: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum repellat placeat quisquam! Laborum obcaecati provident nesciunt unde officiis, rerum mollitia?"},

            {username: "Sylvia Nanyama", 
            userAccountState: "verified", 
            reviewDate: new Date("05/13/2025"), 
            rating: 4, 
            comment: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum repellat placeat quisquam! Laborum obcaecati provident nesciunt unde officiis, rerum mollitia?"}
        ];

        return reviews;
    }
    catch( error )
    {
        console.log("Failed loading errors", error);
        return [];
    }
}


export function loadLivestockProjectDetails(projectId: string): LivestockProjectSummaryProps[]
{
    try{
        console.log(`livestock projectId: ${projectId}`);
        const details: LivestockProjectSummaryProps[] = [
            {livestockId: 1, livestockName: "Gift", shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore harum delectus praesentium ipsa! Debitis quae quibusdam perferendis sequi numquam et!"},
            {livestockId: 2, livestockName: "Lucky", shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore harum delectus praesentium ipsa! Debitis quae quibusdam perferendis sequi numquam et!"},
            {livestockId: 3, livestockName: "Jimmy", shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore harum delectus praesentium ipsa! Debitis quae quibusdam perferendis sequi numquam et!"},
            {livestockId: 4, livestockName: "Blacky", shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore harum delectus praesentium ipsa! Debitis quae quibusdam perferendis sequi numquam et!"},
            {livestockId: 5, livestockName: "Jane", shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore harum delectus praesentium ipsa! Debitis quae quibusdam perferendis sequi numquam et!"},
            {livestockId: 6, livestockName: "Mary", shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore harum delectus praesentium ipsa! Debitis quae quibusdam perferendis sequi numquam et!"},
            {livestockId: 7, livestockName: "Joe", shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore harum delectus praesentium ipsa! Debitis quae quibusdam perferendis sequi numquam et!"},
            {livestockId: 8, livestockName: "Whitey", shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore harum delectus praesentium ipsa! Debitis quae quibusdam perferendis sequi numquam et!"},
            {livestockId: 9, livestockName: "Donald", shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore harum delectus praesentium ipsa! Debitis quae quibusdam perferendis sequi numquam et!"},
            {livestockId: 10, livestockName: "Jerry", shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore harum delectus praesentium ipsa! Debitis quae quibusdam perferendis sequi numquam et!"},
            {livestockId: 11, livestockName: "Tom", shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore harum delectus praesentium ipsa! Debitis quae quibusdam perferendis sequi numquam et!"},
            {livestockId: 12, livestockName: "Sam", shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore harum delectus praesentium ipsa! Debitis quae quibusdam perferendis sequi numquam et!"},
            {livestockId: 13, livestockName: "Chris", shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore harum delectus praesentium ipsa! Debitis quae quibusdam perferendis sequi numquam et!"},
            {livestockId: 14, livestockName: "Burner", shortDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore harum delectus praesentium ipsa! Debitis quae quibusdam perferendis sequi numquam et!"},
        ];

        return details;
    }catch(error)
    {
        console.log("Error getting details", error);
        return [];
    }
}


export function loadCropProjectDetails(projectId: string) :CropProjectSummaryProps[] {
    try{
        console.log(`livestock projectId: ${projectId}`);
        const details: CropProjectSummaryProps[] = [
            {cropProjectStage: 1, stageScore: 92, cropProjectDescription: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At consequuntur tempore a, eos nostrum amet dolorem unde aliquam doloremque quam est neque accusantium, dolores asperiores labore, consequatur quaerat? Tempore aliquid sint saepe? Quibusdam tempore magni officiis, aliquid consectetur necessitatibus odit nulla amet obcaecati est exercitationem animi magnam nam at repellendus."},
            {cropProjectStage: 2, stageScore: 72, cropProjectDescription: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At consequuntur tempore a, eos nostrum amet dolorem unde aliquam doloremque quam est neque accusantium, dolores asperiores labore, consequatur quaerat? Tempore aliquid sint saepe? Quibusdam tempore magni officiis, aliquid consectetur necessitatibus odit nulla amet obcaecati est exercitationem animi magnam nam at repellendus."},
            {cropProjectStage: 3, stageScore: 88, cropProjectDescription: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At consequuntur tempore a, eos nostrum amet dolorem unde aliquam doloremque quam est neque accusantium, dolores asperiores labore, consequatur quaerat? Tempore aliquid sint saepe? Quibusdam tempore magni officiis, aliquid consectetur necessitatibus odit nulla amet obcaecati est exercitationem animi magnam nam at repellendus."},
            {cropProjectStage: 4, stageScore: 79, cropProjectDescription: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At consequuntur tempore a, eos nostrum amet dolorem unde aliquam doloremque quam est neque accusantium, dolores asperiores labore, consequatur quaerat? Tempore aliquid sint saepe? Quibusdam tempore magni officiis, aliquid consectetur necessitatibus odit nulla amet obcaecati est exercitationem animi magnam nam at repellendus."},
            {cropProjectStage: 5, stageScore: 94, cropProjectDescription: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At consequuntur tempore a, eos nostrum amet dolorem unde aliquam doloremque quam est neque accusantium, dolores asperiores labore, consequatur quaerat? Tempore aliquid sint saepe? Quibusdam tempore magni officiis, aliquid consectetur necessitatibus odit nulla amet obcaecati est exercitationem animi magnam nam at repellendus."},
            {cropProjectStage: 6, stageScore: 86, cropProjectDescription: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At consequuntur tempore a, eos nostrum amet dolorem unde aliquam doloremque quam est neque accusantium, dolores asperiores labore, consequatur quaerat? Tempore aliquid sint saepe? Quibusdam tempore magni officiis, aliquid consectetur necessitatibus odit nulla amet obcaecati est exercitationem animi magnam nam at repellendus."}
        ];

        return details;
    }
    catch(error)
    {
        console.log("Error: ", error);
        return [];
    }
}

