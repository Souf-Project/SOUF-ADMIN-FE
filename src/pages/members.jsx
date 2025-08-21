import { useEffect, useState } from "react";
import { getMember } from "../api/member";
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

const getMemberData = async () => {
  try {
    const response = await getMember({page: currentPage, size: pageSize});

      if (response && response.result && response.result.content) {
        console.log("API 응답 데이터:", response.result.content);
        const memberData = response.result.content.map(member => ({
          타입: member.roleType === "STUDENT" ? "학생" : member.roleType === "ADMIN" ? "관리자" : "기업",
          이름: member.username,
          닉네임: member.nickname,
          이메일: member.email,
          관리: member.isDeleted ? "탈퇴" : "활성"
        }));
        
        setPaginationData(memberData);

        const totalElements = response.result.totalElements || memberData.length;
        setTotalPages(Math.ceil(totalElements / pageSize));
      }
  } catch (error) {
    console.error("회원 데이터 조회 실패:", error);
   
  }
}

useEffect(() => {
  getMemberData();
}, [currentPage]);

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

  // 이 useEffect는 제거 - getMemberData에서 처리함
  
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
