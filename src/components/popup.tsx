const Popup = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-blue-50 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-blue-200 px-5 rounded w-96 max-w-full shadow relative"
      >
        <button
          onClick={onClose}
          className="absolute top-0 right-1 cursor-pointer text-sm"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
