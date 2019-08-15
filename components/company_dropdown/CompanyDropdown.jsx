const CompanyDropdown = ({ rankings, exclusionId, onSelect }) => {
  const listing = rankings
    .map(d => ({ id: d.company_id, name: d.company_name }))
    .filter(d => d.id !== exclusionId)
    .sort((a, b) => a.name < b.name ? -1 : 1);

  return (
    <select onChange={e => onSelect(e.target.value)}>
      <option disabled selected value> -- select an option -- </option>

      {listing.map(({ id, name }) => (

        <option key={id} value={id}>
          {name}
        </option>

      ))}
    </select>
  );
};

export default CompanyDropdown;
