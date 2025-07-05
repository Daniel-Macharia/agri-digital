import React from 'react'; 
import { Card, Button } from 'react-bootstrap'; 
 
const FolderIcon = () => ( 
  <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" fill="green" viewBox="0 0 16 16"> 
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 11.03a.75.75 0 0 0 1.07 0l3.992-3.992a.75.75 0 1 0-1.06-1.06L7.5 9.439 5.53 7.47a.75.75 0 0 0-1.06 1.06l2.5 2.5z"/> 
</svg> 
); 
 
interface SavedProps { 
  onDone?: () => void; 
} 
 
const Saved: React.FC<SavedProps> = ({ onDone }) => { 
  return ( 
    <div className="d-flex justify-content-center mt-5"> 
      <Card 
        className="text-center p-4 shadow-sm" 
        style={{ maxWidth: '21.8125rem', borderRadius: '1rem', border: 'none' }} 
      > 
        <Card.Body className="d-flex flex-column align-items-center gap-4"> 
          <div> 
            <FolderIcon /> 
          </div> 
          <div> 
            <Card.Title as="h3" className="fw-semibold fs-5 mb-2"> 
              Saved 
            </Card.Title> 
            <Card.Text className="text-muted mb-0"> 
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
            </Card.Text> 
          </div> 
          <Button 
            variant="success" 
            className="w-100" 
            style={{ backgroundColor: '#457900', borderColor: '#457900', padding: '0.5rem 1rem' }} 
            onClick={onDone} 
          > 
            Done 
          </Button> 
        </Card.Body> 
      </Card> 
    </div> 
  ); 
}; 
 
export default Saved;
