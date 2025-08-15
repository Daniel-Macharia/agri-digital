import React, { useRef } from 'react';

const adverts = [
  {
    image: './assets/images/home/p0.png',
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
    <div style={styles.bannerContainer}>
        <button onClick={() => setShowBanner(false)} style={styles.closeButton}>X</button>
        <button onClick={() => scroll(-300)} style={{...styles.navButton, ...styles.leftButton}}>{'<'}</button>
        <div ref={scrollContainerRef} style={styles.advertsScroller}>
        {adverts.map((ad, index) => (
            <div key={index} style={styles.advertCard}>
            <img src={ad.image} alt={ad.title} style={styles.advertImage} />
            <div style={styles.advertContent}>
                <h4 style={styles.advertTitle}>{ad.title}</h4>
                <p style={styles.advertText}>{ad.content}</p>
                <a href="#" style={styles.advertLink}>{ad.linkText}</a>
            </div>
            </div>
        ))}
        </div>
        <button onClick={() => scroll(300)} style={{...styles.navButton, ...styles.rightButton}}>{'>'}</button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
    bannerContainer: {
        backgroundColor: '#e6f7ea',
        padding: '16px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
    },
    advertsScroller: {
        display: 'flex',
        overflowX: 'hidden',
        scrollBehavior: 'smooth',
        padding: '0 10px',
        gap: '16px',
    },
    advertCard: {
        backgroundColor: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        minWidth: '300px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    advertImage: {
        width: '100px',
        height: '100px',
        objectFit: 'cover',
    },
    advertContent: {
        padding: '8px',
    },
    advertTitle: {
        margin: 0,
        fontSize: '1em',
        fontWeight: 'bold',
    },
    advertText: {
        margin: '4px 0',
        fontSize: '0.9em',
    },
    advertLink: {
        color: '#28a745',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
    navButton: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        border: 'none',
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        cursor: 'pointer',
        fontSize: '18px',
        lineHeight: '30px',
        textAlign: 'center',
        zIndex: 2,
    },
    leftButton: {
        left: '20px',
    },
    rightButton: {
        right: '20px',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'transparent',
        border: 'none',
        fontSize: '18px',
        cursor: 'pointer',
        zIndex: 2,
    },
};

export default AdBanner;
