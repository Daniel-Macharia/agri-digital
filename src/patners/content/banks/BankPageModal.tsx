import React from 'react';
import './type/index.ts';
export interface ModalProps {
  show: boolean;
  onHide: () => void;
  children: React.ReactNode;
}
const BankPageModal: React.FC<ModalProps> = ({ show, children }) => {
  if (!show) return null;

  return (
    <div className="bankpage-modal modal d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 rounded-4 shadow">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BankPageModal;