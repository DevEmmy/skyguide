'use client';
import React, { useState, ChangeEvent } from 'react';

const APIsSourceToggle = () => {
  const [apiSource, setApiSource] = useState('Rasp.stratus');

  const handleApiSourceChange = (e : ChangeEvent<HTMLSelectElement> ) => {
    setApiSource(e.target.value);
  };

  return (
    <div>
      <label>API Source:</label>
      <select value={apiSource} onChange={handleApiSourceChange}>
        <option value="Rasp.stratus">Rasp.stratus</option>
        <option value="MetOffice">MetOffice</option>
        <option value="Windy">Windy</option>
      </select>
    </div>
  );
};

export default APIsSourceToggle;