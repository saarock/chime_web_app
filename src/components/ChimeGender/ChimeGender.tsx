import React, { ChangeEvent } from 'react';

interface ChimeGenderProps {
  onGenderChange: (gender: string) => void;
}

const ChimeGender: React.FC<ChimeGenderProps> = ({ onGenderChange }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onGenderChange(event.target.value);
  };

  return (
    <div>
      <label htmlFor="gender" style={{ display: 'block', marginBottom: '8px' }}>
        Select Gender:
      </label>
      <select
        id="gender"
        onChange={handleChange}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        <option value="">-- Choose gender --</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>
  );
};

export default ChimeGender;
