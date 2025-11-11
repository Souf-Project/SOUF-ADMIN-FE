export default function Table({ columns, data, renderAction, onRowClick, originalData }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse border border-gray-500 text-black">
        <thead className="bg-blue-200 border">
          <tr>
            {columns.map((col) => (
              <th 
                key={col.key} 
                className="border p-2 text-left"
                style={col.width ? { width: col.width, maxWidth: col.width } : {}}
              >
                {col.value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr 
              key={idx} 
              className={`bg-white ${onRowClick ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''}`}
              onClick={() => onRowClick && onRowClick(row, originalData && originalData[idx])}
            >
              {columns.map((col) => (
                <td 
                  key={col.key} 
                  className="border p-2"
                  style={col.width ? { width: col.width, maxWidth: col.width } : {}}
                >
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
