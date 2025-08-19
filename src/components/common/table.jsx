export default function Table({ columns, data, renderAction }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse border border-gray-500">
        <thead className="bg-[#FDF6D3] border">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="border p-2 text-left">{col.value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="bg-white">
              {columns.map((col) => (
                <td key={col.key} className="border p-2">{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
