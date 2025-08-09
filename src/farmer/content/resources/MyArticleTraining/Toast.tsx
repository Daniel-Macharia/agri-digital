import React from 'react';

// Toast Component
interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  show: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', show, onClose }) => {
  React.useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className={`position-fixed top-0 end-0 m-3 alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`}
      style={{ zIndex: 1050, minWidth: '300px' }}
      role="alert"
    >
      {message}
      <button
        type="button"
        className="btn-close"
        onClick={onClose}
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Toast;