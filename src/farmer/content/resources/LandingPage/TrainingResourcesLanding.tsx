// Updated TrainingResourcesLanding with Library Tab Support
import React, { useMemo } from 'react';
import { Article, Training } from '../types';
import ArticlesSection from './ArticlesSection';
import WebinarsSection from './WebinarsSection';
import LibraryArticlesSection from '../Library/LibraryArticleSection';
import LibraryTrainingsSection from '../Library/LibraryTrainingSection';
import NavigationTabs from './NavigationTabs';
import PageHeader from './PageHeader';
import PolicyPayment from '../../insurance/PolicyPayment';
import TrainingRegistrationModal from './TrainingRegistrationModal';
import ArticleDetailPage from '../ArticleDetailsFolder/ArticleDetailPage';
import TrainingDetailPage from '../TrainingDertails/TrainingDetail';
import { TrainingResourcesProvider, useTrainingResources } from '../TrainingResourcesContext';

interface Tab {
  id: string;
  label: string;
}

interface TrainingResourcesLandingProps {
  // Navigation props
  tabs?: Tab[];
  initialActiveTab?: string;
  showSearch?: boolean;
  showFilter?: boolean;
  
  // Data props
  articles?: Article[];
  trainings?: Training[];
  
  // Event handlers
  onBackClick?: () => void;
  onTabChange?: (tabId: string) => void;
  onSearchChange?: (value: string) => void;
  onFilterClick?: () => void;
  onArticlePurchase?: (article: Article) => void;
  onArticleClick?: (article: Article) => void;
  onTrainingRegister?: (training: Training) => void;
  onTrainingClick?: (training: Training) => void;
  onArticlesViewMore?: () => void;
  onTrainingsViewMore?: () => void;
  
  // Library specific handlers
  onLibraryArticleRead?: (article: Article) => void;
  onLibraryArticleDownload?: (article: Article) => void;
  onLibraryTrainingAccess?: (training: Training) => void;
  onLibraryTrainingCertificate?: (training: Training) => void;
  
  // Customization props
  articlesTitle?: string;
  trainingsTitle?: string;
  libraryArticlesTitle?: string;
  libraryTrainingsTitle?: string;
  showArticlesViewMore?: boolean;
  showTrainingsViewMore?: boolean;
  containerClassName?: string;
  
  // Card customization
  articleCardProps?: Record<string, unknown>;
  trainingCardProps?: Record<string, unknown>;
}

// Inner component that uses the context
const TrainingResourcesContent: React.FC<Omit<TrainingResourcesLandingProps, 'onTabChange' | 'onSearchChange' | 'onArticlePurchase' | 'onArticleClick' | 'onTrainingRegister' | 'onTrainingClick'>> = ({
  tabs = [
    { id: 'all', label: 'All' },
    { id: 'library', label: 'My Library' }
  ],
  showSearch = true,
  showFilter = true,
  articles = [],
  trainings = [],
  onBackClick,
  onArticlesViewMore,
  onTrainingsViewMore,
  onLibraryArticleRead,
  onLibraryArticleDownload,
  onLibraryTrainingAccess,
  onLibraryTrainingCertificate,
  articlesTitle = "Articles",
  trainingsTitle = "Webinars and Trainings",
  libraryArticlesTitle = "Purchased Articles",
  libraryTrainingsTitle = "Registered Trainings",
  showArticlesViewMore = true,
  showTrainingsViewMore = true,
  containerClassName = "",
  articleCardProps = {},
  trainingCardProps = {}
}) => {
  const {
    activeTab,
    searchValue,
    filterOption,
    showPayment,
    selectedItem,
    showRegistrationModal,
    selectedTraining,
    showArticleDetail,
    selectedArticle,
    showTrainingDetail,
    selectedTrainingDetail,
    purchasedArticles,
    registeredTrainings,
    setActiveTab,
    setSearchValue,
    setFilterOption,
    handlePaymentSuccess,
    handlePaymentCancel,
    handleBackFromArticleDetail,
    handleBackFromTrainingDetail,
    handleProceedToPayment,
    closeRegistrationModal,
    handleArticlePurchase,
    handleTrainingRegister,
    handleArticleImageClick,
    handleTrainingImageClick,
  } = useTrainingResources();

  // Default sample data (fallback)
  const defaultArticles: Article[] = [
    {
      id: 9,
      title: "How Ukilima Sawa Is Revolutionizing Agricultural Employment",
      author: "Author's Name",
      readTime: "8 Min Read",
      views: "1.2k views",
      category: "Agronomy",
      description: "A deep dive into the Agri work feature and how it's connecting farmers with skilled laborers to improve efficiency and productivity.",
      price: 300,
      image: "https://images.unsplash.com/photo-1695756133141-e72a22bc9594?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025-01-15"
    },
    {
      id: 8,
      title: "Title of the Article",
      author: "Author",
      readTime: "8 Min Read",
      views: "1.2k views",
      category: "Marketing",
      description: "A deep dive into the Agri work feature and how it's connecting farmers with skilled laborers to improve efficiency and productivity.",
      price: 300,
      image: "https://plus.unsplash.com/premium_photo-1663045589447-7f95d6b58629?w=600&auto=format&fit=crop&q=60&",
      datePublished: "2025-01-20"
    },
    {
      id: 7,
      title: "Title of the Article",
      author: "Author",
      readTime: "8 Min Read",
      views: "1.2k views",
      category: "Agronomy",
      description: "A deep dive into the Agri work feature and how it's connecting farmers with skilled laborers to improve efficiency and productivity.",
      price: 300,
      image: "https://images.unsplash.com/photo-1514411203766-15eb4eb377dc?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025-01-25"
    },
    {
      id: 1,
      title: "Advanced Crop Rotation Techniques",
      author: "Dr. Sarah Johnson",
      readTime: "8 Min Read",
      views: "1.2k views",
      category: "Agronomy",
      description: "A comprehensive guide to implementing effective crop rotation strategies for sustainable farming.",
      price: 300,
      image: "https://images.unsplash.com/photo-1630322185796-e74bcd8e39ec?w=600&auto=format&fit=crop&q=60&",
      datePublished: "2025-01-10"
    },
    {
      id: 2,
      title: "Digital Marketing for Farmers",
      author: "Mark Thompson",
      readTime: "12 Min Read",
      views: "2.1k views",
      category: "Marketing",
      description: "Learn how to leverage digital platforms to market your agricultural products effectively.",
      price: 250,
      image: "https://plus.unsplash.com/premium_photo-1661811702909-7771dc119508?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025-01-12"
    },
    {
      id: 3,
      title: "Soil Health Management",
      author: "Dr. Emily Chen",
      readTime: "15 Min Read",
      views: "3.5k views",
      category: "Agronomy",
      description: "Understanding soil composition and implementing practices for optimal soil health.",
      price: 400,
      image: "https://images.unsplash.com/photo-1696677049651-d0986696db55?w=600&auto=format&fit=crop",
      datePublished: "2025-01-18"
    },
    {
      id: 4,
      title: "Precision Agriculture Technology",
      author: "John Martinez",
      readTime: "10 Min Read",
      views: "1.8k views",
      category: "Technology",
      description: "Exploring GPS, sensors, and data analytics in modern farming practices.",
      price: 350,
      image: "https://images.unsplash.com/photo-1571707575761-2ac4b63d30e2?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025-01-22"
    },
    {
      id: 5,
      title: "Sustainable Water Management",
      author: "Lisa Rodriguez",
      readTime: "9 Min Read",
      views: "2.7k views",
      category: "Environment",
      description: "Implementing water-efficient irrigation systems and conservation techniques.",
      price: 280,
      image: "https://plus.unsplash.com/premium_photo-1663011351547-3cabf5b46837?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025-01-28"
    },
    {
      id: 6,
      title: "Organic Pest Control Methods",
      author: "Dr. Robert Kim",
      readTime: "11 Min Read",
      views: "4.2k views",
      category: "Organic Farming",
      description: "Natural and sustainable approaches to managing pests without harmful chemicals.",
      price: 320,
      image: "https://images.unsplash.com/photo-1744726006622-f31b79d86642?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025-01-30"
    }
  ];

  const defaultTrainings: Training[] = [
    {
      id: 9,
      title: "Title of the Training",
      organizationName: "Organization Name",
      duration: "Duration of the training",
      location: "Location",
      dateTime: "Date & Time",
      slotsLeft: "2",
      description: "A deep dive into the Agri work feature and how it's connecting farmers with skilled laborers to improve efficiency and productivity.",
      price: 300,
      image: "https://plus.unsplash.com/premium_photo-1714229505550-3518d761d549?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025-01-15"
    },
    {
      id: 8,
      title: "Title of the Training",
      organizationName: "Organization Name",
      duration: "Duration of the training",
      location: "Location",
      dateTime: "Date & Time",
      slotsLeft: "2",
      description: "A deep dive into the Agri work feature and how it's connecting farmers with skilled laborers to improve efficiency and productivity.",
      price: 300,
      image: "https://images.unsplash.com/photo-1567497063796-7952e455a2a6?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025-01-20"
    },
    {
      id: 7,
      title: "Title of the Training",
      organizationName: "Organization Name",
      duration: "Duration of the training",
      location: "Location",
      dateTime: "Date & Time",
      slotsLeft: "2",
      description: "A deep dive into the Agri work feature and how it's connecting farmers with skilled laborers to improve efficiency and productivity.",
      price: 300,
      image: "https://images.unsplash.com/photo-1721240074674-35a47e1bdb13?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025-01-25"
    },
    {
      id: 1,
      title: "Sustainable Farming Practices",
      organizationName: "Organization's Name",
      duration: "3 Days",
      location: "Nairobi, Kenya",
      dateTime: "March 15-17, 2025",
      slotsLeft: "5",
      description: "Agriculture is the backbone of many economies, but one of the biggest challenges farmers face today is finding skilled labor to support their operations. Labor shortages, lack of efficiency, and high operational costs make farming more difficult, affecting productivity and profitability. This is where AgriWork comes in—a revolutionary platform designed to connect farmers with skilled laborers to optimize farm operations, reduce inefficiencies, and improve productivity. In this article, we take a deep dive into how AgriWork is transforming the agricultural workforce and making farming more efficient.",
      price: 500,
      image: "https://images.unsplash.com/photo-1730659370558-e2472828a61d?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025-01-10"
    },
    {
      id: 2,
      title: "Digital Agriculture Webinar",
      organizationName: "FarmTech Solutions",
      duration: "2 Hours",
      location: "Online",
      dateTime: "March 20, 2025",
      slotsLeft: "15",
      description: "Learn about IoT sensors, drones, and data analytics in agriculture.",
      price: 150,
      image: "https://images.unsplash.com/photo-1589922583749-6b8473a85048?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025-01-12"
    },
    {
      id: 3,
      title: "Sustainable Farming Certification",
      organizationName: "Green Agriculture Hub",
      duration: "5 Days",
      location: "Mombasa, Kenya",
      dateTime: "April 5-9, 2025",
      slotsLeft: "8",
      description: "Comprehensive certification program for sustainable and organic farming practices.",
      price: 750,
      image: "https://images.unsplash.com/photo-1721240074674-35a47e1bdb13?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025-01-18"
    },
    {
      id: 4,
      title: "Livestock Management Training",
      organizationName: "Animal Husbandry Center",
      duration: "4 Days",
      location: "Eldoret, Kenya",
      dateTime: "April 15-18, 2025",
      slotsLeft: "12",
      description: "Advanced techniques in livestock breeding, feeding, and healthcare management.",
      price: 600,
      image: "https://images.unsplash.com/photo-1667644125871-28dc320652e7?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025-01-22"
    },
    {
      id: 5,
      title: "Agricultural Finance Workshop",
      organizationName: "Rural Finance Institute",
      duration: "2 Days",
      location: "Kisumu, Kenya",
      dateTime: "May 3-4, 2025",
      slotsLeft: "20",
      description: "Understanding agricultural loans, crop insurance, and financial planning for farmers.",
      price: 300,
      image: "https://plus.unsplash.com/premium_photo-1713890431555-a86ba9933f11?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025-01-28"
    },
    {
      id: 6,
      title: "Climate-Smart Agriculture",
      organizationName: "Climate Resilience Foundation",
      duration: "3 Days",
      location: "Nakuru, Kenya",
      dateTime: "May 20-22, 2025",
      slotsLeft: "10",
      description: "Adapting farming practices to climate change and building resilient agricultural systems.",
      price: 450,
      image: "https://images.unsplash.com/photo-1744726006622-f31b79d86642?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025-01-30"
    }
  ];

  const articlesToRender = articles.length > 0 ? articles : defaultArticles;
  const trainingsToRender = trainings.length > 0 ? trainings : defaultTrainings;

  // Filter and search logic
  const filteredArticles = useMemo(() => {
    let filtered = [...articlesToRender];

    if (searchValue.trim()) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        (article.author && article.author.toLowerCase().includes(searchValue.toLowerCase()))
      );
    }

    switch (filterOption) {
      case 'author':
        filtered.sort((a, b) => (a.author || '').localeCompare(b.author || ''));
        break;
      case 'date':
        filtered.sort((a, b) => {
          const dateA = new Date(a.datePublished || '');
          const dateB = new Date(b.datePublished || '');
          return dateB.getTime() - dateA.getTime();
        });
        break;
      case 'price':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [articlesToRender, searchValue, filterOption]);

  const filteredTrainings = useMemo(() => {
    let filtered = [...trainingsToRender];

    if (searchValue.trim()) {
      filtered = filtered.filter(training =>
        training.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        (training.organizationName && training.organizationName.toLowerCase().includes(searchValue.toLowerCase()))
      );
    }

    switch (filterOption) {
      case 'author':
        filtered.sort((a, b) => (a.organizationName || '').localeCompare(b.organizationName || ''));
        break;
      case 'date':
        filtered.sort((a, b) => {
          const dateA = new Date(a.datePublished || '');
          const dateB = new Date(b.datePublished || '');
          return dateB.getTime() - dateA.getTime();
        });
        break;
      case 'price':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [trainingsToRender, searchValue, filterOption]);

  // Library mode handlers
  const handleLibraryArticleRead = (article: Article) => {
    console.log('Reading article from library:', article.title);
    if (onLibraryArticleRead) {
  onLibraryArticleRead(article);
} else {
  handleArticleImageClick(article);
}
  };

  const handleLibraryArticleDownload = (article: Article) => {
    console.log('Downloading article from library:', article.title);
    if (onLibraryArticleDownload) {
      onLibraryArticleDownload(article);
    } else {
      // Default download logic
      const fileUrl = `/downloads/${article.id}.pdf`;
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `${article.title.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleLibraryTrainingAccess = (training: Training) => {
    console.log('Accessing training from library:', training.title);
    if (onLibraryTrainingAccess) {
      onLibraryTrainingAccess(training);
    } else {
      handleTrainingImageClick(training);
    }
  };

  const handleLibraryTrainingCertificate = (training: Training) => {
    console.log('Downloading certificate from library:', training.title);
    if (onLibraryTrainingCertificate) {
      onLibraryTrainingCertificate(training);
    } else {
      // Default certificate download logic
      const certificateUrl = `/certificates/${training.id}.pdf`;
      const link = document.createElement('a');
      link.href = certificateUrl;
      link.download = `${training.title.replace(/\s+/g, '_')}_Certificate.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Show article detail page
  if (showArticleDetail && selectedArticle) {
    return (
      <ArticleDetailPage
        article={selectedArticle}
        onBackClick={handleBackFromArticleDetail}
        isPurchased={purchasedArticles.has(selectedArticle.id)}
        onPurchaseClick={handleArticlePurchase}
      />
    );
  }

  // Show training detail page
  if (showTrainingDetail && selectedTrainingDetail) {
    return (
      <TrainingDetailPage
        training={selectedTrainingDetail}
        onBackClick={handleBackFromTrainingDetail}
        isRegistered={registeredTrainings.has(selectedTrainingDetail.id)}
        onRegisterClick={handleTrainingRegister}
      />
    );
  }

  const isLibraryMode = activeTab === 'library';

  return (
    <>
      {showPayment && selectedItem ? (
        <PolicyPayment
          onPaymentSuccess={handlePaymentSuccess}
          total={selectedItem.price || 0}
          title={`${selectedItem && 'price' in selectedItem ? 'Purchase Article' : 'Register for Training'}`}
          description={`Complete your ${selectedItem && 'price' in selectedItem ? 'purchase' : 'registration'} for: "${selectedItem.title}" `}
          onCancel={handlePaymentCancel}
        />
      ) : (
        <div 
          className={`container-fluid py-4 trl-main-container ${containerClassName}`} 
          style={{ backgroundColor: '#eeeeee', padding: '0px' }}
        >
          <div className="container">
            <PageHeader onBackClick={onBackClick} />
            
            <NavigationTabs 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={tabs}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              onFilterChange={setFilterOption}
              filterOption={filterOption}
              showSearch={showSearch}
              showFilter={showFilter}
            />
            
            {isLibraryMode ? (
              // Library Mode - Show purchased/registered items
              <>
                <LibraryArticlesSection 
                  articles={filteredArticles}
                  purchasedArticleIds={purchasedArticles}
                  title={libraryArticlesTitle}
                  onViewMore={onArticlesViewMore}
                  showViewMore={showArticlesViewMore}
                  onReadClick={handleLibraryArticleRead}
                  onDownloadClick={handleLibraryArticleDownload}
                />
                
                <LibraryTrainingsSection 
                  trainings={filteredTrainings}
                  registeredTrainingIds={registeredTrainings}
                  title={libraryTrainingsTitle}
                  onViewMore={onTrainingsViewMore}
                  showViewMore={showTrainingsViewMore}
                  onAccessClick={handleLibraryTrainingAccess}
                  onDownloadCertificate={handleLibraryTrainingCertificate}
                />
              </>
            ) : (
              // Regular Mode - Show all items with purchase/register options
              <>
                <ArticlesSection 
                  articles={filteredArticles}
                  title={articlesTitle}
                  onViewMore={onArticlesViewMore}
                  showViewMore={showArticlesViewMore}
                  cardProps={articleCardProps}
                />
                
                <WebinarsSection 
                  trainings={filteredTrainings}
                  title={trainingsTitle}
                  onViewMore={onTrainingsViewMore}
                  showViewMore={showTrainingsViewMore}
                  cardProps={trainingCardProps}
                />
              </>
            )}
          </div>
        </div>
      )}

      {/* Training Registration Modal */}
      <TrainingRegistrationModal
        show={showRegistrationModal}
        training={selectedTraining}
        onHide={closeRegistrationModal}
        onProceedToPayment={handleProceedToPayment}
      />
    </>
  );
};

// Main component with provider
const TrainingResourcesLanding: React.FC<TrainingResourcesLandingProps> = (props) => {
  return (
    <TrainingResourcesProvider
      initialActiveTab={props.initialActiveTab}
      onTabChange={props.onTabChange}
      onSearchChange={props.onSearchChange}
      onArticlePurchase={props.onArticlePurchase}
      onArticleClick={props.onArticleClick}
      onTrainingRegister={props.onTrainingRegister}
      onTrainingClick={props.onTrainingClick}
    >
      <TrainingResourcesContent {...props} />
    </TrainingResourcesProvider>
  );
};

export default TrainingResourcesLanding;