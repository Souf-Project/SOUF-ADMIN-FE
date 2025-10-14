import Dropdown from "../common/dropdown";
import SearchBar from "../common/searchBar";

export default function AdminLayout({
  title,
  filters = [], // [{ label: "타입", value: selectedValue, options: [{label, value}] }]
  onFilterChange = () => {},
  searchPlaceholder = "검색어를 입력하세요",
  onSearchChange = () => {},
  showSearch = true,
  children, // 테이블 등 내용
}) {
  return (
    <div className="bg-blue-bright min-h-screen p-6">
      {/* 제목 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center justify-center gap-4">
            <h1 className="text-3xl font-bold text-black">{title}</h1>
            <div className="flex items-center gap-4">
            {filters.map((filter, idx) => (
                <div key={idx} className="flex items-center gap-2">
                <Dropdown
                    label={filter.label}
                    options={filter.options}
                    value={filter.value}
                    onChange={filter.onFilterChange}
                />
                </div>
            ))}
            </div>
        </div>
        {showSearch && (
          <SearchBar
            placeholder={searchPlaceholder}
            onChange={onSearchChange}
            width="w-80"
          />
        )}
      </div>



      {/* 컨텐츠 영역 */}
      <div>{children}</div>
    </div>
  );
}
