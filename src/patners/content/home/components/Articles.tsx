const Articles = () => {
  const articles = [
   
    {
      title: 'How Skillss Sans is Revolutionizing Agricultural Employment',
      excerpt: 'A deep-dive into the Agri work feature and how it is connecting farm owners with skilled laborers to improve efficiency and productivity.',
      image: '/assets/images/home/livestockarticle.png', 
    },
    {
      title: 'How Skillss Sans is Revolutionizing Agricultural Employment',
      excerpt: 'A deep-dive into the Agri work feature and how it is connecting farm owners with skilled laborers to improve efficiency and productivity.',
      image: '/assets/images/home/articles.png',
    },
  ];

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title fw-bold mb-0">Articles</h5>
          <a href="#" className="btn btn-link text-success text-decoration-none fw-medium">View More</a>
        </div>
        {articles.map((article, index) => (
          <div className="mb-4" key={index}>
            <img src={article.image} className="card-img-top rounded-4 mb-3" alt={article.title} />
            <h6 className="fw-bold">{article.title}</h6>
            <p className="text-muted small">{article.excerpt}</p>
            <div className="d-flex justify-content-between align-items-center">
              <a href="#" className="btn btn-success">Read More</a>
              <a href="#" className="text-muted small text-decoration-none"><i className="bi bi-bookmark"></i> Read Later</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
