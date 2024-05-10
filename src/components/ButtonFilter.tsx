import React, { useState } from 'react';
import DatabaseSummary from './DatabaseSummary';

const ButtonFilter: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="">
      <button onClick={togglePopup} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Report</button>
    {showPopup && <DatabaseSummary onClose={togglePopup} />}
    </div>
  );
};

export default ButtonFilter;
