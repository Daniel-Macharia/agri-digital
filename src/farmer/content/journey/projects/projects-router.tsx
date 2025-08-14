import { Route, Routes } from "react-router-dom";
import LivestockProjectViewMore from "./project-info/livestock-project-more-info";
import NotFound from "../../../../common/exceptions/NotFound";
import { PROJECTS_ROUTES } from "./projects-routes";
import ProjectInformation from "./project-info";
import MoreProjectReviews from "../reviews/more-project-reviews";



const ProjectsRouter: React.FC = () => {

    return (<>
    <Routes>
        <Route path={PROJECTS_ROUTES.PROJECT_INFO} element={<ProjectInformation />} />
        <Route path={PROJECTS_ROUTES.LIVESTOCK_PROJECT_MORE_INFO} element={<LivestockProjectViewMore />} />
        <Route path={PROJECTS_ROUTES.MORE_PROJECT_REVIEWS} element={<MoreProjectReviews />} />

        <Route path={PROJECTS_ROUTES.OTHER} element={<NotFound />} />
    </Routes>
    </>);
};

export default ProjectsRouter;