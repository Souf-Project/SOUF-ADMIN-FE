import { useEffect, useState } from "react";
import AdminLayout from "../components/layout/adminLayout";
import Table from "../components/common/table";
import Pagination from "../components/common/pagination";

export default function Posts() {
  const [typeFilter, setTypeFilter] = useState("recruit");
  const [typeFilterDate, setTypeFilterDate] = useState("newest");

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationData, setPaginationData] = useState([]);
  const pageSize = 10;

  const columns = [
    { key: "타입", value: "타입" },
    { key: "작성자", value: "작성자" },
    { key: "제목", value: "제목" },
    { key: "작성일", value: "작성일" },
    { key: "관리", value: "관리" },
  ];

  const data = [
    { 타입: "공고문", 작성자: "스타트업A", 제목: "프론트엔드 개발자 모집", 작성일: "2025-08-01", 관리: ">" },
    { 타입: "공고문", 작성자: "테크기업B", 제목: "AI 연구원 채용", 작성일: "2025-08-02", 관리: ">" },
    { 타입: "피드", 작성자: "정유진", 제목: "오늘 다녀온 맛집 후기 🍜", 작성일: "2025-08-03", 관리: ">" },
    { 타입: "피드", 작성자: "박서연", 제목: "캠핑 다녀왔습니다⛺", 작성일: "2025-08-04", 관리: ">" },
    { 타입: "피드", 작성자: "한지민", 제목: "코딩 스터디 모집합니다", 작성일: "2025-08-05", 관리: ">" },
    { 타입: "피드", 작성자: "이민수", 제목: "여행 사진 공유 🌍", 작성일: "2025-08-06", 관리: ">" },
    { 타입: "공고문", 작성자: "스타트업C", 제목: "백엔드 인턴 채용 공고", 작성일: "2025-08-07", 관리: ">" },
    { 타입: "피드", 작성자: "최우진", 제목: "새로운 책 추천합니다 📚", 작성일: "2025-08-08", 관리: ">" },
    { 타입: "공고문", 작성자: "글로벌기업D", 제목: "데이터 분석가 모집", 작성일: "2025-08-09", 관리: ">" },
    { 타입: "피드", 작성자: "정예린", 제목: "헬스 루틴 공유 💪", 작성일: "2025-08-10", 관리: ">" },
    { 타입: "피드", 작성자: "조민호", 제목: "맛집 탐방 리스트", 작성일: "2025-08-11", 관리: ">" },
    { 타입: "공고문", 작성자: "스타트업E", 제목: "UX 디자이너 모집", 작성일: "2025-08-12", 관리: ">" },
    { 타입: "피드", 작성자: "서가영", 제목: "드라마 추천 🎬", 작성일: "2025-08-13", 관리: ">" },
    { 타입: "피드", 작성자: "홍승우", 제목: "헬스 식단 공유", 작성일: "2025-08-14", 관리: ">" },
    { 타입: "공고문", 작성자: "기업F", 제목: "풀스택 개발자 모집", 작성일: "2025-08-15", 관리: ">" },
  ];

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFilterChange = (value) => {
    setTypeFilter(value);
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
      title="게시글 관리"
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
      searchPlaceholder="작성자 또는 제목을 검색하세요"
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
