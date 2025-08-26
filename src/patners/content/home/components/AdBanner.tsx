import React, { useRef } from 'react';

const adverts = [
  {
    image: 'https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Farming Equipment Sale',
    content: 'Content of the advert',
    linkText: 'Register Now',
  },
  {
    image: 'https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Farming Equipment Sale',
    content: 'Content of the advert',
    linkText: 'Register Now',
  },
  {
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Farming Equipment Sale',
    content: 'Content of the advert',
    linkText: 'Register Now',
  },
  {
    image: 'https://images.unsplash.com/photo-1579113800036-3b6b74843c39?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Farming Equipment Sale',
    content: 'Content of the advert',
    linkText: 'Register Now',
  },
  {
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Farming Equipment Sale',
    content: 'Content of the advert',
    linkText: 'Register Now',
    
  },
];

const AdBanner = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showBanner, setShowBanner] = React.useState(true);

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="position-relative d-flex align-items-center overflow-hidden" 
         style={{backgroundColor: '#f0f8f0', padding: '20px', minHeight: '140px'}}>
      <button 
        onClick={() => setShowBanner(false)} 
        className="btn btn-success rounded-circle position-absolute d-flex align-items-center justify-content-center fw-bold"
        style={{top: '12px', right: '12px', width: '24px', height: '24px', fontSize: '14px', zIndex: 3}}>
        ✕
      </button>
      
      <button 
        onClick={() => scroll(-300)} 
        className="btn btn-light rounded-circle position-absolute d-flex align-items-center justify-content-center shadow-sm"
        style={{top: '50%', left: '8px', transform: 'translateY(-50%)', width: '32px', height: '32px', fontSize: '20px', zIndex: 2}}>
        ‹
      </button>
      
      <div 
        ref={scrollContainerRef} 
        className="d-flex overflow-hidden"
        style={{padding: '0 40px', gap: '20px', flex: 1, scrollBehavior: 'smooth'}}>
        {adverts.map((ad, index) => (
          <div 
            key={index} 
            className="d-flex rounded-3 shadow-sm"
            style={{
              backgroundColor: '#f0f8f0', 
              minWidth: '320px', 
              maxWidth: '320px', 
              padding: '12px', 
              gap: '12px'
            }}>
            <div 
              className="rounded-3 overflow-hidden bg-white"
              style={{width: '80px', height: '80px', flexShrink: 0}}>
              <img 
                src={ad.image} 
                alt={ad.title} 
                className="w-100 h-100 object-fit-cover rounded-3" />
            </div>
            <div className="d-flex flex-column justify-content-center flex-fill">
              <h4 className="mb-1 fw-bold" style={{fontSize: '16px', color: '#333'}}>
                {ad.title}
              </h4>
              <p className="mb-2" style={{fontSize: '14px', color: '#666'}}>
                {ad.content}
              </p>
              <a 
                href="#" 
                className="text-success fw-bold text-decoration-underline"
                style={{fontSize: '14px'}}>
                {ad.linkText}
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={() => scroll(300)} 
        className="btn btn-light rounded-circle position-absolute d-flex align-items-center justify-content-center shadow-sm"
        style={{top: '50%', right: '8px', transform: 'translateY(-50%)', width: '32px', height: '32px', fontSize: '20px', zIndex: 2}}>
        ›
      </button>
    </div>
  );
};

export default AdBanner;
