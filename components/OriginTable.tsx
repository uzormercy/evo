const  OriginTable = ({ origins }: any) => {

  const rows = [];

  for (const originName in origins) {
    const species = origins[originName].species;

    rows.push(
      <tr key={originName}>
        <td>{originName}</td>
        <td className="flex gap-2">
          {Object.keys(species).map(name => (
            <div key={name}>{name + " ," }</div>
          ))}
        </td>
        <td>
           { Object.values(species).reduce((a, b) => a + b, 0) }
        </td>
      </tr>
    );
  }

  return (
    <table className="width-full styled-table">
      <thead>
        <tr>
          <th>Origin</th>
          <th>Species</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default  OriginTable