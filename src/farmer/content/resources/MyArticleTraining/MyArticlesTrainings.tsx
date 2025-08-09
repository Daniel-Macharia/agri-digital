import React, { useState, useMemo } from 'react';
import { FaPlus } from 'react-icons/fa';
import MyContentSearchFilter from './MyContentSearchFilter';
import MyContentTable from './MyContentTable';
import Pagination from '../../market-place/components/Pagination';
import CreateContentModal from './CreatContentModal';

// Types - Fixed to match your interface definitions
export interface MyArticle {
  id: string | number;
  title: string;
  type: 'Article'; // Fixed: should be literal type
  views?: number;
  attendees?: number;
  status: 'Published' | 'Under Review';
  price?: number;
  date?: string;
  ratings?: number;
  author?: string;
  readTime?: string;
  category?: string;
  description?: string;
  image?: string;
  datePublished?: string;
  downloads?: number;
  reads?: number;
}

export interface MyTraining {
  id: string | number;
  title: string;
  type: 'Training'; // Fixed: should be literal type
  views?: number;
  attendees?: number;
  status: 'Done' | 'Under Review' | 'In Progress';
  price?: number;
  date?: string;
  ratings?: number;
  organizationName?: string;
  duration?: string;
  location?: string;
  dateTime?: string;
  slotsLeft?: string;
  description?: string;
  image?: string;
  datePublished?: string;
  totalSlots?: number;
  registeredCount?: number;
}

export type MyContent = MyArticle | MyTraining;

interface MyArticlesTrainingsProps {
  articles?: MyArticle[];
  trainings?: MyTraining[];
  onCreateClick?: () => void;
  onViewDetails?: (item: MyContent) => void;
  onEdit?: (item: MyContent) => void;
  onDelete?: (item: MyContent) => void;
  itemsPerPage?: number;
  showCreateButton?: boolean;
  createButtonText?: string;
  onCreateArticle?: () => void;
  onCreateTraining?: () => void;
}

const MyArticlesTrainings: React.FC<MyArticlesTrainingsProps> = ({
  articles = [],
  trainings = [],
  onViewDetails,
  onEdit,
  onDelete,
  itemsPerPage = 10,
  showCreateButton = true,
  createButtonText = "Create Article / Training",
  onCreateArticle,
  onCreateTraining
}) => {

  const [searchValue, setSearchValue] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setShowCreateModal] = useState(false);

  const handleCreateClick = () => setShowCreateModal(true);
  const handleCreateModalClose = () => setShowCreateModal(false);

  const handleCreateArticle = () => {
    setShowCreateModal(false);
    onCreateArticle?.();
  };
  
  const handleCreateTraining = () => {
    setShowCreateModal(false);
    onCreateTraining?.();
  };

  // Handle view details - call external handler
  const handleViewDetails = (item: MyContent) => {
    onViewDetails?.(item);
  };

  // Handle edit from table
  const handleEditFromTable = (item: MyContent) => {
    onEdit?.(item);
  };

  // Handle delete from table
  const handleDeleteFromTable = (item: MyContent) => {
    onDelete?.(item);
  };

  /* ---------- Enhanced default data with more properties ---------- */
  const defaultData: MyContent[] = useMemo(() => [
    {
      id: 1,
      title: "How Ukilima Sawa Is Revolutionizing Agricultural Employment",
      type: "Article" as const,
      views: 10,
      status: "Published" as const,
      price: 500,
      date: "2025/01/20",
      ratings: 4,
      author: "Dr. Sarah Johnson",
      readTime: "8 Min Read",
      category: "Agronomy",
      description: "A comprehensive analysis of how digital platforms are transforming agricultural employment and connecting farmers with skilled workers.",
      image: "https://images.unsplash.com/photo-1695756133141-e72a22bc9594?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025/01/20",
      downloads: 45,
      reads: 120
    },
    {
      id: 2,
      title: "Digital Marketing Strategies for Modern Farmers",
      type: "Article" as const,
      views: undefined,
      status: "Under Review" as const,
      price: 300,
      date: "2025/01/25",
      ratings: undefined,
      author: "Mark Thompson",
      readTime: "12 Min Read",
      category: "Marketing",
      description: "Learn how to leverage digital platforms to effectively market your agricultural products and reach new customers.",
      image: "https://plus.unsplash.com/premium_photo-1663045589447-7f95d6b58629?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025/01/25"
    },
    {
      id: 3,
      title: "Sustainable Farming Workshop Series",
      type: "Training" as const,
      attendees: 10,
      status: "Done" as const,
      price: 500,
      date: "2025/01/20",
      ratings: 3,
      organizationName: "Green Agriculture Institute",
      duration: "3 Days",
      location: "Nairobi, Kenya",
      dateTime: "February 15-17, 2025",
      slotsLeft: "0",
      description: "Comprehensive workshop covering sustainable farming practices, soil conservation, and eco-friendly pest management techniques.",
      image: "https://images.unsplash.com/photo-1730659370558-e2472828a61d?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025/01/20",
      totalSlots: 25,
      registeredCount: 25
    },
    {
      id: 4,
      title: "Precision Agriculture Training Program",
      type: "Training" as const,
      attendees: 5,
      status: "In Progress" as const,
      price: 750,
      date: "2025/02/01",
      ratings: undefined,
      organizationName: "TechFarm Solutions",
      duration: "5 Days",
      location: "Nakuru, Kenya",
      dateTime: "March 10-14, 2025",
      slotsLeft: "15",
      description: "Advanced training in GPS-guided farming, sensor technology, and data-driven agricultural decision making.",
      image: "https://images.unsplash.com/photo-1589922583749-6b8473a85048?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025/02/01",
      totalSlots: 20,
      registeredCount: 5
    },
    {
      id: 5,
      title: "Organic Pest Control Methods",
      type: "Training" as const,
      attendees: undefined,
      status: "Under Review" as const,
      price: 400,
      date: "2025/02/05",
      ratings: undefined,
      organizationName: "Organic Farmers Association",
      duration: "2 Days",
      location: "Eldoret, Kenya",
      dateTime: "April 5-6, 2025",
      slotsLeft: "30",
      description: "Natural and sustainable approaches to managing pests without harmful chemicals, featuring hands-on demonstrations.",
      image: "https://images.unsplash.com/photo-1744726006622-f31b79d86642?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025/02/05",
      totalSlots: 30
    },
    {
      id: 6,
      title: "Climate Smart Agriculture Guide",
      type: "Article" as const,
      views: 25,
      status: "Published" as const,
      price: 350,
      date: "2025/01/15",
      ratings: 5,
      author: "Dr. Emily Chen",
      readTime: "15 Min Read",
      category: "Environment",
      description: "Strategies for adapting farming practices to climate change and building resilient agricultural systems.",
      image: "https://images.unsplash.com/photo-1696677049651-d0986696db55?w=600&auto=format&fit=crop",
      datePublished: "2025/01/15",
      downloads: 78,
      reads: 203
    },
    {
      id: 7,
      title: "Advanced Irrigation Techniques",
      type: "Training" as const,
      attendees: 15,
      status: "Done" as const,
      price: 600,
      date: "2025/01/10",
      ratings: 4,
      organizationName: "Water Management Institute",
      duration: "4 Days",
      location: "Mombasa, Kenya",
      dateTime: "January 20-23, 2025",
      slotsLeft: "0",
      description: "Master modern irrigation systems, water conservation techniques, and efficient water management for optimal crop yields.",
      image: "https://plus.unsplash.com/premium_photo-1663011351547-3cabf5b46837?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025/01/10",
      totalSlots: 15,
      registeredCount: 15
    },
    {
      id: 1,
      title: "How Ukilima Sawa Is Revolutionizing Agricultural Employment",
      type: "Article" as const,
      views: 10,
      status: "Published" as const,
      price: 500,
      date: "2025/01/20",
      ratings: 4,
      author: "Dr. Sarah Johnson",
      readTime: "8 Min Read",
      category: "Agronomy",
      description: "A comprehensive analysis of how digital platforms are transforming agricultural employment and connecting farmers with skilled workers.",
      image: "https://images.unsplash.com/photo-1695756133141-e72a22bc9594?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025/01/20",
      downloads: 45,
      reads: 120
    },
    {
      id: 2,
      title: "Digital Marketing Strategies for Modern Farmers",
      type: "Article" as const,
      views: undefined,
      status: "Under Review" as const,
      price: 300,
      date: "2025/01/25",
      ratings: undefined,
      author: "Mark Thompson",
      readTime: "12 Min Read",
      category: "Marketing",
      description: "Learn how to leverage digital platforms to effectively market your agricultural products and reach new customers.",
      image: "https://plus.unsplash.com/premium_photo-1663045589447-7f95d6b58629?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025/01/25"
    },
    {
      id: 3,
      title: "Sustainable Farming Workshop Series",
      type: "Training" as const,
      attendees: 10,
      status: "Done" as const,
      price: 500,
      date: "2025/01/20",
      ratings: 3,
      organizationName: "Green Agriculture Institute",
      duration: "3 Days",
      location: "Nairobi, Kenya",
      dateTime: "February 15-17, 2025",
      slotsLeft: "0",
      description: "Comprehensive workshop covering sustainable farming practices, soil conservation, and eco-friendly pest management techniques.",
      image: "https://images.unsplash.com/photo-1730659370558-e2472828a61d?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025/01/20",
      totalSlots: 25,
      registeredCount: 25
    },
    {
      id: 4,
      title: "Precision Agriculture Training Program",
      type: "Training" as const,
      attendees: 5,
      status: "In Progress" as const,
      price: 750,
      date: "2025/02/01",
      ratings: undefined,
      organizationName: "TechFarm Solutions",
      duration: "5 Days",
      location: "Nakuru, Kenya",
      dateTime: "March 10-14, 2025",
      slotsLeft: "15",
      description: "Advanced training in GPS-guided farming, sensor technology, and data-driven agricultural decision making.",
      image: "https://images.unsplash.com/photo-1589922583749-6b8473a85048?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025/02/01",
      totalSlots: 20,
      registeredCount: 5
    },
    {
      id: 5,
      title: "Organic Pest Control Methods",
      type: "Training" as const,
      attendees: undefined,
      status: "Under Review" as const,
      price: 400,
      date: "2025/02/05",
      ratings: undefined,
      organizationName: "Organic Farmers Association",
      duration: "2 Days",
      location: "Eldoret, Kenya",
      dateTime: "April 5-6, 2025",
      slotsLeft: "30",
      description: "Natural and sustainable approaches to managing pests without harmful chemicals, featuring hands-on demonstrations.",
      image: "https://images.unsplash.com/photo-1744726006622-f31b79d86642?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025/02/05",
      totalSlots: 30
    },
    {
      id: 6,
      title: "Climate Smart Agriculture Guide",
      type: "Article" as const,
      views: 25,
      status: "Published" as const,
      price: 350,
      date: "2025/01/15",
      ratings: 5,
      author: "Dr. Emily Chen",
      readTime: "15 Min Read",
      category: "Environment",
      description: "Strategies for adapting farming practices to climate change and building resilient agricultural systems.",
      image: "https://images.unsplash.com/photo-1696677049651-d0986696db55?w=600&auto=format&fit=crop",
      datePublished: "2025/01/15",
      downloads: 78,
      reads: 203
    },
    {
      id: 7,
      title: "Advanced Irrigation Techniques",
      type: "Training" as const,
      attendees: 15,
      status: "Done" as const,
      price: 600,
      date: "2025/01/10",
      ratings: 4,
      organizationName: "Water Management Institute",
      duration: "4 Days",
      location: "Mombasa, Kenya",
      dateTime: "January 20-23, 2025",
      slotsLeft: "0",
      description: "Master modern irrigation systems, water conservation techniques, and efficient water management for optimal crop yields.",
      image: "https://plus.unsplash.com/premium_photo-1663011351547-3cabf5b46837?w=600&auto=format&fit=crop&q=60",
      datePublished: "2025/01/10",
      totalSlots: 15,
      registeredCount: 15
    }
  ], []);
  
  const allContent = useMemo(() => {
    const provided = [...articles, ...trainings];
    return provided.length ? provided : defaultData;
  }, [articles, trainings, defaultData]);

  const filteredContent = useMemo(() => {
    let f = [...allContent];
    if (searchValue.trim())
      f = f.filter(i => i.title.toLowerCase().includes(searchValue.toLowerCase()));
    if (filterType !== 'all') f = f.filter(i => i.type === filterType);
    if (filterStatus !== 'all') f = f.filter(i => i.status === filterStatus);
    if (filterDate === 'latest')
      f.sort((a,b)=> (b.date ? new Date(b.date).getTime() : 0) - (a.date ? new Date(a.date).getTime() : 0));
    else if (filterDate === 'oldest')
      f.sort((a,b)=> (a.date ? new Date(a.date).getTime() : 0) - (b.date ? new Date(b.date).getTime() : 0));
    return f;
  }, [allContent, searchValue, filterType, filterStatus, filterDate]);

  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredContent.slice(startIndex, startIndex + itemsPerPage);

  React.useEffect(() => setCurrentPage(1), [searchValue, filterType, filterStatus, filterDate]);
  const handlePageChange = (p: number) => setCurrentPage(p);

  // Show list view
  return (
    <>
      <div className="container-fluid px-0 py-3" style={{ backgroundColor: '#fff', minHeight: '100vh', borderRadius: 20 }}>
        <div className="container px-2">
          <div className="mb-3">
            <h2 className="mb-0" style={{ fontSize: '24px', fontWeight: '600', color: '#374151' }}>
              My Articles & Trainings
            </h2>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-1 flex-wrap">
            <MyContentSearchFilter
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filterType={filterType}
              onFilterTypeChange={setFilterType}
              filterStatus={filterStatus}
              onFilterStatusChange={setFilterStatus}
              filterDate={filterDate}
              onFilterDateChange={setFilterDate}
            />
            {showCreateButton && (
              <button
                className="btn d-flex align-items-center"
                onClick={handleCreateClick}
                style={{ backgroundColor: '#7cb342', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: '500', gap: '8px', boxShadow: 'none', outline: 'none' }}
              >
                <FaPlus style={{ fontSize: '12px' }} />
                {createButtonText}
              </button>
            )}
          </div>

          <div className="bg-white rounded" style={{ boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)', overflow: 'hidden' }}>
            <MyContentTable 
              items={currentItems as MyContent[]} 
              onViewDetails={handleViewDetails} 
              onEdit={handleEditFromTable} 
              onDelete={handleDeleteFromTable} 
            />
          </div>

          {totalPages > 1 && (
            <div className="mt-0 mb-0" style={{ backgroundColor: '#eeeeee', padding: '20px',}}>
              <Pagination currentPage={currentPage} totalPages={100} onPageChange={handlePageChange} />
            </div>
          )}

          {filteredContent.length === 0 && (
            <div className="bg-white rounded p-5 text-center" style={{ boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)' }}>
              <div style={{ color: '#9ca3af', fontSize: '16px' }}>
                No articles or trainings found matching your criteria.
              </div>
            </div>
          )}
        </div>

        <CreateContentModal
          isOpen={isCreateModalOpen}
          onClose={handleCreateModalClose}
          onCreateArticle={handleCreateArticle}
          onCreateTraining={handleCreateTraining}
        />
      </div>
    </>
  );
};

export default MyArticlesTrainings;