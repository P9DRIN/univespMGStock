import React, { useState } from 'react';
import DatabaseSummary from './DatabaseSummary';

const ButtonFilter: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="">
      <button onClick={togglePopup} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Resumo</button>
    {showPopup && <DatabaseSummary onClose={togglePopup} />}
    </div>
  );
};

export default ButtonFilter;
