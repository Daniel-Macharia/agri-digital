const MarketPlace = () => {
  const products = [
    {
      name: 'Organic Tomatoes',
      seller: 'Sold by Agri Farmers',
      price: 'KES 150 per kg',
      image: '/assets/images/home/m1.png',
    },
    {
      name: 'Manure',
      seller: 'Sold by Agri Farmers',
      price: 'KES 150 per kg',
      image: '/assets/images/home/m2.png',
    },
    {
      name: 'Seeds',
      seller: 'Sold by Agri Farmers',
      price: 'KES 150 per kg',
      image: '/assets/images/home/m3.png',
    },
  ];

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title fw-bold mb-0">Market Place</h5>
          <a href="#" className="btn btn-link text-success text-decoration-none fw-medium">View More</a>
        </div>
        <div className="row g-3">
          {products.map((product, index) => (
            <div className="col-lg-4 col-md-6 mb-3" key={index}>
              <div className="card h-100 rounded-4">
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h6 className="fw-bold">{product.name}</h6>
                  <p className="text-muted small">{product.seller}</p>
                  <p className="fw-bold text-success">{product.price}</p>
                  <a href="#" className="btn btn-success w-100">See More</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
