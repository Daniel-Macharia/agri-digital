import React from 'react';
interface ToastProps {
  show: boolean;
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const ToastT: React.FC<ToastProps> = ({ show, message, type, onClose }) => {
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
      className="position-fixed top-0 end-0 p-3"
      style={{ zIndex: 1050 }}
    >
      <div
        className={`alert ${
          type === 'success' ? 'alert-success' : 'alert-danger'
        } alert-dismissible fade show`}
        role="alert"
      >
        {message}
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
          aria-label="Close"
        />
      </div>
    </div>
  );
};

export default ToastT;