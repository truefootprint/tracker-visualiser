const CompanyDropdown = ({ rankings, trendView, onSelect }) => {
  const counts = {};

  rankings.forEach(r => {
    counts[r.company_id] = counts[r.company_id] || 0;

    if (trendView === "by_value" && r.value !== null) {
      counts[r.company_id] += 1;
    }

    if (trendView === "by_rank" && r.rank !== null) {
      counts[r.company_id] += 1;
    }
  });

  const seen = {};
  const listing = [];

  rankings.forEach(r => {
    if (seen[r.company_id]) {
      return;
    }

    seen[r.company_id] = true;

    listing.push({
      id: r.company_id,
      name: r.company_name,
      count: counts[r.company_id],
    });
  });

  const sorted = listing.sort((a, b) => a.name < b.name ? -1 : 1);

  return (
    <select onChange={e => onSelect(e.target.value)}>
      <option disabled selected value> -- select an option -- </option>

      {sorted.map(({ id, name, count }) => (

        <option key={id} value={id}>
          {name} ({count})
        </option>

      ))}
    </select>
  );
};

export default CompanyDropdown;
