import { FARMER_ROUTES } from "../../../farmer-routes";
import { HomeArticleItemProps } from "../home-model";
import OverviewHeader from "./overview-header";


const HomeArticleItem: React.FC<HomeArticleItemProps> = (data: HomeArticleItemProps) => {
    const handleReadMoreAction = () => {
        console.log("read more info");
    };

    return (<>
    <div className="col-12 px-2">
        <div className="col-12">
            <img src={data.articleImageUrl} alt="image"
            className="col-12"
            style={{borderRadius: "20px"}}/>
        </div>

        <div className="col-12">
            <p className="col-12 body-semibold primary-text my-3">
                {data.articleTitle}
            </p>
            <p className="col-12 small-regular secondary-text mt-0">
                {data.articleBriefDesc}
            </p>
        </div>

        <div className="col-12">
            <div className="row">
                <div className="col-6 ">
                    <button 
                    className="col-12 farmer-home-accept-button m-0 "
                    style={{borderRadius: "20px"}}
                    onClick={handleReadMoreAction}
                    >
                        Read More
                    </button>
                </div>

                <div className="col-5 ">
                    <div className="row">
                        <div className="col-2 m-0 p-0">
                            <img src="/assets/images/home/home_clock.svg" alt="time" 
                            className="col-12 align-self-center"
                            style={{width: "20px"}}/>
                        </div>
                        <div className="col-10 p-0 m-0">
                            <p className="col-12 m-0 px-0 py-1 small-regular align-self-center" 
                            style={{
                                color: "#000"
                            }}>
                                {`${data.articleReadTime} minutes read`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>);
};

const HomeArticlesOverview: React.FC = () => {

    const articles: HomeArticleItemProps[] = [
        {
            articleId: 1, 
            articleImageUrl: "/assets/images/home/home_farming_article.svg", 
            articleTitle: "How Ukilima Sawa Is Revolutionizing Agricultural Employment", 
            articleBriefDesc: "A deep dive into the Agri work feature and how it's connecting farmers with skilled laborers to improve efficiency and productivity", 
            articleReadTime: 8
        },
        {
            articleId: 2, 
            articleImageUrl: "/assets/images/home/home_livestock_article.svg", 
            articleTitle: "How Ukilima Sawa Is Revolutionizing Agricultural Employment", 
            articleBriefDesc: "A deep dive into the Agri work feature and how it's connecting farmers with skilled laborers to improve efficiency and productivity", 
            articleReadTime: 8
        }
    ];

    return (<>
    <div className="col-12">
        <OverviewHeader overviewTitle="Articles" viewMoreUrl={FARMER_ROUTES.RESOURCES} />

        <div className="col-12">
            {
                articles.map((article, index: number) => <div key={index} className="col-12" >
                    <HomeArticleItem 
                    key={index}
                    articleId={article.articleId} 
                    articleImageUrl={article.articleImageUrl} 
                    articleTitle={article.articleTitle} 
                    articleBriefDesc={article.articleBriefDesc} 
                    articleReadTime={article.articleReadTime} />

                    { (index < (articles.length - 1)) ? <hr className="my-4" /> : ""}
                </div>)
            }
        </div>
    </div>
    </>);
};

export default HomeArticlesOverview;