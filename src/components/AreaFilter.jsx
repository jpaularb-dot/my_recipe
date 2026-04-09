const AREAS = [
  'All', , 'British', , 'Chinese','French', 'Greek', 'Indian',
  , 'Italian', 'Jamaican', 'Japanese', 'Malaysian',
  'Mexican', 'Polish', 'Portuguese', 'Russian', 'Spanish',
  'Thai', 'Tunisian', 'Vietnamese',
];

function AreaFilter({ value, onChange }) {
  return (
    <div className="area-filter">
     
      <select
        id="area-select"
        className="area-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {AREAS.map((area) => (
          <option key={area} value={area}>{area}</option>
        ))}
      </select>
    </div>
  );
}

export default AreaFilter;