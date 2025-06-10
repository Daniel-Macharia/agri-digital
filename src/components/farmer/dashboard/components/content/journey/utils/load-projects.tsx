import type { Project } from "../projects/journey-item/jouney-item";

export function loadProjects() : Project[] {
    try{
        let projects: Project[] = [
            { projectId: 1, projectName: "Maize", projectDuration: 12, overallScore: 42, completionDate: "25/06/2025"},
            { projectId: 2, projectName: "Tomatoes", projectDuration: 10, overallScore: 38, completionDate: "25/06/2025"},
            { projectId: 3, projectName: "Onions", projectDuration: 16, overallScore: 93, completionDate: "25/06/2025"},
            { projectId: 4, projectName: "Kales", projectDuration: 8, overallScore: 57, completionDate: "25/06/2025"},
            { projectId: 5, projectName: "Beans", projectDuration: 16, overallScore: 68, completionDate: "25/06/2025"}
        ];

        return projects;
    }
    catch(error)
    {
        console.log("Failed to load projects");
        return [];
    }
}


