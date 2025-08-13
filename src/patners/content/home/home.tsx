import ProjectsOverview from "./overview/projects-overview";

import "./home.css";
import { ProjectsOverviewProps } from "./home-model";
import WeatherOverview from "./overview/weather-overview";
import SummariesOverview from "./overview/summaries-overview";
import MyProductsOverview from "./overview/my-products-overview";
import MarketPlaceOverview from "./overview/market-place-overview";
import HomeTasksOverview from "./overview/tasks-overview";
import HomeArticlesOverview from "./overview/articles-overview";
import HomeTrainingOverview from "./overview/training-overview";
import HomeNotificationOverview from "./overview/notification-overview";


export default function PatnerHome(){
    let projectsOverview: ProjectsOverviewProps = {projectName: "Maize", currentProjectStage: 4, projectType: "crop"};


    return(<>
    <div className="col-12 farmer-home-container">
        <div className="row ">
            <div className="col-12 col-md-8 px-0 pe-md-2">
                <div className="farmer-home-container bg-white col-12 p-4" >
                    <p className="col-12 h3-semibold primary-text">Project</p>
                    <ProjectsOverview 
                    projectName={projectsOverview.projectName} 
                    currentProjectStage={projectsOverview.currentProjectStage}
                    projectType={projectsOverview.projectType}
                    />
                </div>

                <div className="col-12 p-4 farmer-home-container bg-white mt-4">
                    <WeatherOverview />
                </div>

                <div className="col-12 p-0 farmer-home-container mt-4 " >
                    <SummariesOverview />
                </div>

                <div className="col-12 p-4 farmer-home-container bg-white mt-4">
                    <MyProductsOverview />
                </div>

                <div className="col-12 p-4 farmer-home-container bg-white mt-4">
                    <HomeTasksOverview />
                </div>

                <div className="col-12 p-4 farmer-home-container bg-white mt-4">
                    <MarketPlaceOverview />
                </div>
            </div>

            <div className="col-12 col-md-4 px-0 ps-md-2 ">
                <div className="col-12 farmer-home-container bg-white mt-4 mt-md-0" >
                    <HomeArticlesOverview />
                </div>

                <div className="col-12 farmer-home-container bg-white mt-4" >
                    <HomeTrainingOverview />
                </div>

                <div className="col-12 farmer-home-container bg-white mt-4" >
                    <HomeNotificationOverview />
                </div>
            </div> 
        </div>
    </div>
    </>);
}
