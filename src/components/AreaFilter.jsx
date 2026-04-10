const AREAS = [
  'All',
  'British',
  'Chinese',
  'French',
  'Greek',
  'Indian',
  'Italian',
  'Jamaican',
  'Japanese',
  'Malaysian',
  'Mexican',
  'Polish',
  'Portuguese',
  'Russian',
  'Spanish',
  'Thai',
  'Tunisian',
  'Vietnamese',
];

function AreaFilter({ value, onChange }) {
  return (
    <div className="area-filter">
      <label htmlFor="area-select" className="area-label">
        Filter by Region
      </label>
      <select
        id="area-select"
        className="area-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Filter recipes by region"
      >
        {AREAS.map((area) => (
          <option key={area} value={area}>
            {area === 'All' ? '🌐 All Regions' : area}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AreaFilter;
