import React from 'react';

interface ChimeCountryProps {
  onCountryChange: (country: string) => void;
}

const countries: string[] = [
  'Nepal',
  'India',
  'United States',
  'United Kingdom',
  'Australia',
  'Canada',
  'Germany',
  'France',
  'Japan',
  'China',
];

const ChimeCountry: React.FC<ChimeCountryProps> = ({ onCountryChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    onCountryChange(selected); // Send to parent
  };

  return (
    <div>
      <label htmlFor="country" style={{ display: 'block', marginBottom: '8px' }}>
        Select Country
      </label>
      <select
        id="country"
        onChange={handleChange}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        <option value="">-- Choose a country --</option>
        {countries.map((country) => (
          <option key={country} value={country} className='bg-blue-950'>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChimeCountry;
