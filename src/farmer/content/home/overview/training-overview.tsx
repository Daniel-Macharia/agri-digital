import { HomeOverviewNavigation, HomeTrainingItemProps } from "../home-model";
import OverviewHeader from "./overview-header";


const HomeTrainingItem: React.FC<HomeTrainingItemProps> = (data: HomeTrainingItemProps) => {
    return (<>
    <div className="col-12 my-2">
        <div className="row" >
            <div className="col-1 m-0 justify-content-start">
                <img src="/assets/images/home/home_calendar_icon.svg"
                className="self-align-end"
                style={{width: "20px"}} />
            </div>

            <div className="col-11 m-0">
                <p className="col-12 small-regular secondary-text mb-0">
                    {data.trainingDate}
                </p>
                <p className="col-12 body-regular primary-text my-0">
                    {data.trainingTitle}
                </p>
            </div>
        </div>
    </div>
    </>);
};


const HomeTrainingOverview: React.FC<HomeOverviewNavigation> = (overviewNavigation: HomeOverviewNavigation) => {

    const trainings: HomeTrainingItemProps[] = [
        {trainingDate: "September 1, 2025 9:00 AM", trainingTitle: "Lorem ipsum dolor sit amet consectetur"},
        {trainingDate: "September 1, 2025 9:00 AM", trainingTitle: "Lorem ipsum dolor sit amet consectetur"},
        {trainingDate: "September 1, 2025 9:00 AM", trainingTitle: "Lorem ipsum dolor sit amet consectetur"}
    ];

    return (<>
    <div className="col-12">
        <OverviewHeader overviewTitle="Training" viewMoreUrl={overviewNavigation.viewMoreUrl} backUrl={overviewNavigation.backUrl} />

        <div className="col-12 m-0 p-0">
            {
                trainings.map( (training, index: number) => <div key={index}><HomeTrainingItem 
                key={index}
                trainingDate={training.trainingDate}
                trainingTitle={training.trainingTitle}
                />
                {( index < (trainings.length - 1) ) ? <hr/> : ""}
            </div>)
            }
        </div>
    </div>
    </>);
};

export default HomeTrainingOverview;