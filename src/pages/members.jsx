import { useEffect, useState } from "react";
import AdminLayout from "../components/layout/adminLayout";
import Table from "../components/common/table";
import Pagination from "../components/common/pagination";

export default function Members() {
  const [typeFilter, setTypeFilter] = useState("student");
  const [typeFilterDate, setTypeFilterDate] = useState("student");

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationData,setPaginationData] = useState([]);
  const pageSize = 10;
  const columns = [
  { key: "타입", value: "타입" },
  { key: "이름", value: "이름" },
  { key: "닉네임", value: "닉네임" },
  { key: "이메일", value: "이메일" },
  { key: "관리", value: "관리" },
];
const data = [
  { 타입: "학생", 이름: "김서현", 닉네임: "책벌레", 이메일: "booklover@mail.com", 관리: "탈퇴" },
  { 타입: "학생", 이름: "박지훈", 닉네임: "여행가", 이메일: "traveler@example.com", 관리: "탈퇴" },
  { 타입: "학생", 이름: "최민지", 닉네임: "코딩마스터", 이메일: "codingmaster@mail.com", 관리: "탈퇴" },
  { 타입: "학생", 이름: "이도현", 닉네임: "커피러버", 이메일: "coffee@demo.net", 관리: "탈퇴" },
  { 타입: "학생", 이름: "정예린", 닉네임: "음악매니아", 이메일: "musicfan@mail.com", 관리: "탈퇴" },
  { 타입: "학생", 이름: "오세훈", 닉네임: "야구소년", 이메일: "baseball@test.org", 관리: "탈퇴" },
  { 타입: "학생", 이름: "한수진", 닉네임: "그림쟁이", 이메일: "artist@mail.com", 관리: "탈퇴" },
  { 타입: "기업", 이름: "스타트업A", 닉네임: "창업드림", 이메일: "startupA@mail.com", 관리: "탈퇴" },
  { 타입: "학생", 이름: "조민호", 닉네임: "맛집헌터", 이메일: "foodhunter@test.org", 관리: "탈퇴" },
  { 타입: "학생", 이름: "양지우", 닉네임: "캠핑족", 이메일: "camping@demo.net", 관리: "탈퇴" },
  { 타입: "학생", 이름: "서가영", 닉네임: "드라마퀸", 이메일: "dramaqueen@mail.com", 관리: "탈퇴" },
  { 타입: "학생", 이름: "홍승우", 닉네임: "헬스매니아", 이메일: "fitness@test.org", 관리: "탈퇴" },
  { 타입: "기업", 이름: "테크기업B", 닉네임: "혁신리더", 이메일: "techB@mail.com", 관리: "탈퇴" },
  { 타입: "학생", 이름: "배유진", 닉네임: "고양이집사", 이메일: "catlover@test.org", 관리: "탈퇴" },
  { 타입: "학생", 이름: "임하늘", 닉네임: "사진작가", 이메일: "photographer@demo.net", 관리: "탈퇴" }
]


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

  useEffect( () => {
    setPaginationData(data.slice(currentPage*pageSize , (currentPage+1)*pageSize));
    setTotalPages(Math.ceil(data.length/pageSize));
  },[currentPage,data]);
  
  return (
    <AdminLayout
      title="회원 관리"
      filters={[
        {
          label: "타입",
          value: typeFilter,
          options: [
            { label: "학생", value: "student" },
            { label: "기업", value: "company" },
          ],
          onFilterChange : handleFilterChange
        },
      ]}
      onFilterChange={handleFilterChange}
      searchPlaceholder="이름 또는 닉네임을 검색하세요"
      onSearchChange={handleSearchChange}
    >
      <div className="bg-white min-h-[550px] flex flex-col justify-between mx-4">
      <Table columns={columns} data={paginationData}/>
      <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
      </div>
        
     
    </AdminLayout>
  );
}
