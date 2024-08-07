// import React, { useEffect, useState } from "react";

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
//   className?: string;
// }

// const Modal: React.FC<ModalProps> = ({
//   isOpen,
//   onClose,
//   children,
//   className,
// }) => {
//   const [shouldRender, setShouldRender] = useState(isOpen);

//   useEffect(() => {
//     if (isOpen) setShouldRender(true);
//   }, [isOpen]);

//   const onAnimationEnd = () => {
//     if (!isOpen) setShouldRender(false);
//   };

//   return shouldRender ? (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         display: "flex",
//         justifyContent: "center",
//         // alignItems: "center",
//         backgroundColor: "rgba(0, 0, 0, 0.3)",
//         animation: `${isOpen ? "fadeIn" : "fadeOut"} 0.7s`,
//         zIndex: 50,
//       }}
//       onClick={onClose}
//     >
//       <div
//         style={{
//           padding: "20px",
//           background: "white",
//           display: "inline-block",
//           margin: "1rem",
//           boxShadow: "0 9px 16px rgba(0, 0, 0, 0.1)",
//           animation: `${isOpen ? "scaleIn" : "scaleOut"} 0.5s`,
//         }}
//         className={`h-max md:min-w-96 text-base rounded-lg ${className}`}
//         onClick={(e) => e.stopPropagation()}
//         onAnimationEnd={onAnimationEnd}
//       >
//         {children}
//       </div>
//     </div>
//   ) : null;
// };

// export default Modal;

// components/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
