import { useEffect, useState } from "react";
import AdminLayout from "../components/layout/adminLayout";
import Table from "../components/common/table";
import Pagination from "../components/common/pagination";

export default function Reports() {
  const [typeFilter, setTypeFilter] = useState("recruit");
  const [typeFilterCount, setTypeFilterCount] = useState("5");
  const [typeFilterDate, setTypeFilterDate] = useState("newest");

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationData, setPaginationData] = useState([]);
  const pageSize = 10;

  const columns = [
    { key: "신고자", value: "신고자" },
    { key: "접수일", value: "접수일" },
    { key: "사유", value: "사유" },
    { key: "작성자", value: "작성자" },
    { key: "상세", value: "상세" },
  ];

  // 더미 데이터
  const data = [
    { 신고자: "김서현", 접수일: "2025-08-01", 사유: "욕설", 작성자: "이민호", 상세: ">" },
    { 신고자: "박지훈", 접수일: "2025-08-02", 사유: "스팸", 작성자: "정지수", 상세: ">" },
    { 신고자: "최민지", 접수일: "2025-08-03", 사유: "허위정보", 작성자: "한수민", 상세: ">" },
    { 신고자: "이도현", 접수일: "2025-08-04", 사유: "불법 광고", 작성자: "오유진", 상세: ">" },
    { 신고자: "정예린", 접수일: "2025-08-05", 사유: "혐오 발언", 작성자: "김민재", 상세: ">" },
    { 신고자: "오세훈", 접수일: "2025-08-06", 사유: "도배", 작성자: "홍길동", 상세: ">" },
    { 신고자: "한수진", 접수일: "2025-08-07", 사유: "음란물", 작성자: "박지민", 상세: ">" },
    { 신고자: "조민호", 접수일: "2025-08-08", 사유: "허위 사실", 작성자: "최예린", 상세: ">" },
    { 신고자: "양지우", 접수일: "2025-08-09", 사유: "욕설", 작성자: "강민수", 상세: ">" },
    { 신고자: "서가영", 접수일: "2025-08-10", 사유: "스팸", 작성자: "이도훈", 상세: ">" },
    { 신고자: "홍승우", 접수일: "2025-08-11", 사유: "불법 광고", 작성자: "정민호", 상세: ">" },
    { 신고자: "배유진", 접수일: "2025-08-12", 사유: "욕설", 작성자: "김하늘", 상세: ">" },
    { 신고자: "임하늘", 접수일: "2025-08-13", 사유: "도배", 작성자: "박준영", 상세: ">" },
    { 신고자: "강서현", 접수일: "2025-08-14", 사유: "음란물", 작성자: "최수정", 상세: ">" },
    { 신고자: "문지호", 접수일: "2025-08-15", 사유: "혐오 발언", 작성자: "조현우", 상세: ">" },
    { 신고자: "윤채린", 접수일: "2025-08-16", 사유: "스팸", 작성자: "김지후", 상세: ">" },
    { 신고자: "이승우", 접수일: "2025-08-17", 사유: "허위정보", 작성자: "박서연", 상세: ">" },
    { 신고자: "정다은", 접수일: "2025-08-18", 사유: "욕설", 작성자: "한지민", 상세: ">" },
    { 신고자: "고현서", 접수일: "2025-08-19", 사유: "불법 광고", 작성자: "오민석", 상세: ">" },
    { 신고자: "차유나", 접수일: "2025-08-20", 사유: "음란물", 작성자: "홍지훈", 상세: ">" },
  ];

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFilterChange = (value) => {
    setTypeFilter(value);
  };

  const handleFilterCountChange = (value) => {
    setTypeFilterCount(value);
  };

  const handleFilterDateChange = (value) => {
    setTypeFilterDate(value);
  };

  const handleSearchChange = (value) => {
    console.log("검색어:", value);
  };

  useEffect(() => {
    setPaginationData(data.slice(currentPage * pageSize, (currentPage + 1) * pageSize));
    setTotalPages(Math.ceil(data.length / pageSize));
  }, [currentPage, data]);

  return (
    <AdminLayout
      title="신고 관리"
      filters={[
        {
          label: "타입",
          value: typeFilter,
          options: [
            { label: "공고문", value: "recruit" },
            { label: "피드", value: "feed" },
          ],
          onFilterChange: handleFilterChange,
        },
        {
          label: "누적 신고 횟수",
          value: typeFilterCount,
          options: [
            { label: "5회 미만", value: "5" },
            { label: "10회 미만", value: "10" },
            { label: "20회 미만", value: "20" },
            { label: "20회 이상", value: "21" },
          ],
          onFilterChange: handleFilterCountChange,
        },
        {
          label: "작성일",
          value: typeFilterDate,
          options: [
            { label: "최신순", value: "newest" },
            { label: "오래된 순", value: "oldest" },
          ],
          onFilterChange: handleFilterDateChange,
        },
      ]}
      onFilterChange={handleFilterChange}
      searchPlaceholder="접수일 또는 닉네임을 검색하세요"
      onSearchChange={handleSearchChange}
    >
      <div className="bg-white min-h-[550px] flex flex-col justify-between mx-4">
        <Table columns={columns} data={paginationData} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </AdminLayout>
  );
}
