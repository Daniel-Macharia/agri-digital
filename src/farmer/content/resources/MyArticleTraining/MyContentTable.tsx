// MyContentTable.tsx
import React from 'react';
import { FaStar, FaRegStar} from 'react-icons/fa';
import { MyContent } from './MyContent';

interface MyContentTableProps {
  items: MyContent[];
  onViewDetails?: (item: MyContent) => void;
  onEdit?: (item: MyContent) => void;
  onDelete?: (item: MyContent) => void;
}

const MyContentTable: React.FC<MyContentTableProps> = ({
  items,
  onViewDetails,
  //onEdit,
  //onDelete
}) => {
  // Status color mapping
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Published':
      case 'Done':
        return {
          backgroundColor: '#7cb342',
          color: 'white'
        };
      case 'Under Review':
        return {
          backgroundColor: '#ff9800',
          color: 'white'
        };
      case 'In Progress':
        return {
          backgroundColor: '#f44336',
          color: 'white'
        };
      default:
        return {
          backgroundColor: '#6b7280',
          color: 'white'
        };
    }
  };

  // Row background color based on type
  const getRowBackgroundColor = (type: string, index: number) => {
    if (type === 'Article') {
      return index % 2 === 0 ? '#fafafa' : '#f5f5f5';
    } else {
      return index % 2 === 0 ? '#f0f0f0' : '#e8e8e8';
    }
  };

  // Render star ratings
  const renderStars = (rating?: number) => {
    if (rating === undefined) return null;
    
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} style={{ color: '#ffc107', fontSize: '12px', marginRight: '2px' }} />
        ) : (
          <FaRegStar key={i} style={{ color: '#e5e7eb', fontSize: '12px', marginRight: '2px' }} />
        )
      );
    }
    return <div className="d-flex align-items-center">{stars}</div>;
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return dateString.replace(/\//g, '/');
  };

  // Format price
  const formatPrice = (price?: number) => {
    if (price === undefined) return 'N/A';
    return `KES ${price}`;
  };

  return (
    <div className="table-responsive">
      <table className="table table-borderless mb-0" style={{ minWidth: '1000px' }}>
        <thead style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e5e7eb' }}>
          <tr>
            <th style={{ 
              padding: '16px', 
              fontSize: '12px', 
              fontWeight: '600', 
              color: '#6b7280', 
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              width: '25%',
              minWidth: '200px'
            }}>
              Title
            </th>
            <th style={{ 
              padding: '16px', 
              fontSize: '12px', 
              fontWeight: '600', 
              color: '#6b7280', 
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              width: '8%',
              minWidth: '80px'
            }}>
              Type
            </th>
            <th style={{ 
              padding: '16px', 
              fontSize: '12px', 
              fontWeight: '600', 
              color: '#6b7280', 
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              width: '8%',
              minWidth: '80px'
            }}>
              Views
            </th>
            <th style={{ 
              padding: '16px', 
              fontSize: '12px', 
              fontWeight: '600', 
              color: '#6b7280', 
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              width: '10%',
              minWidth: '100px'
            }}>
              Attendees
            </th>
            <th style={{ 
              padding: '16px', 
              fontSize: '12px', 
              fontWeight: '600', 
              color: '#6b7280', 
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              width: '12%',
              minWidth: '120px'
            }}>
              Status
            </th>
            <th style={{ 
              padding: '16px', 
              fontSize: '12px', 
              fontWeight: '600', 
              color: '#6b7280', 
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              width: '10%',
              minWidth: '100px'
            }}>
              Price
            </th>
            <th style={{ 
              padding: '16px', 
              fontSize: '12px', 
              fontWeight: '600', 
              color: '#6b7280', 
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              width: '10%',
              minWidth: '100px'
            }}>
              Date
            </th>
            <th style={{ 
              padding: '16px', 
              fontSize: '12px', 
              fontWeight: '600', 
              color: '#6b7280', 
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              width: '12%',
              minWidth: '120px'
            }}>
              Ratings
            </th>
            <th style={{ 
              padding: '16px', 
              fontSize: '12px', 
              fontWeight: '600', 
              color: '#6b7280', 
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              width: '10%',
              minWidth: '100px'
            }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr 
              key={item.id}
              style={{ 
                backgroundColor: getRowBackgroundColor(item.type, index),
                borderBottom: '1px solid #f0f0f0'
              }}
            >
              {/* Title */}
              <td style={{ padding: '16px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                <div style={{ 
                  maxWidth: '200px',
                  wordWrap: 'break-word',
                  lineHeight: '1.4'
                }}>
                  {item.title}
                </div>
              </td>

              {/* Type */}
              <td style={{ padding: '16px', fontSize: '14px', color: '#6b7280' }}>
                <span style={{ whiteSpace: 'nowrap' }}>
                  {item.type}
                </span>
              </td>

              {/* Views */}
              <td style={{ padding: '16px', fontSize: '14px', color: '#6b7280' }}>
                {item.views !== undefined ? (
                  <div className="d-flex align-items-center" style={{ whiteSpace: 'nowrap' }}>
                    <span>{item.views}</span>
                  </div>
                ) : (
                  <span style={{ whiteSpace: 'nowrap' }}>N/A</span>
                )}
              </td>

              {/* Attendees */}
              <td style={{ padding: '16px', fontSize: '14px', color: '#6b7280' }}>
                {item.attendees !== undefined ? (
                  <div className="d-flex align-items-center" style={{ whiteSpace: 'nowrap' }}>
                    <span>{item.attendees}</span>
                  </div>
                ) : (
                  <span style={{ whiteSpace: 'nowrap' }}>N/A</span>
                )}
              </td>

              {/* Status */}
              <td style={{ padding: '16px' }}>
                <span
                  style={{
                    ...getStatusStyle(item.status),
                    padding: '6px 8px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500',
                    display: 'inline-block',
                    textAlign: 'center',
                    minWidth: '100px',
                    width: '100px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {item.status}
                </span>
              </td>

              {/* Price */}
              <td style={{ padding: '16px', fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>
                <span style={{ whiteSpace: 'nowrap' }}>
                  {formatPrice(item.price)}
                </span>
              </td>

              {/* Date */}
              <td style={{ padding: '16px', fontSize: '14px', color: '#6b7280' }}>
                <span style={{ whiteSpace: 'nowrap' }}>
                  {formatDate(item.date)}
                </span>
              </td>

              {/* Ratings */}
              <td style={{ padding: '16px' }}>
                <div style={{ minWidth: '100px' }}>
                  {(item.status === 'Published' || item.status === 'Done') && item.ratings ? (
                    renderStars(item.ratings)
                  ) : (
                    <span style={{ fontSize: '14px', color: '#9ca3af' }}>N/A</span>
                  )}
                </div>
              </td>

              {/* Actions */}
              <td style={{ padding: '16px' }}>
                <button
                  onClick={() => onViewDetails?.(item)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#7cb342',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    padding: '0',
                    whiteSpace: 'nowrap'
                  }}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="text-center py-5" style={{ color: '#9ca3af' }}>
          <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>
            No content found
          </div>
          <div style={{ fontSize: '14px' }}>
            Try adjusting your search or filter criteria
          </div>
        </div>
      )}
    </div>
  );
};

export default MyContentTable;