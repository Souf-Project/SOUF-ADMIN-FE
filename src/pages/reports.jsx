import { useEffect, useState } from "react";
import AdminLayout from "../components/layout/adminLayout";
import Table from "../components/common/table";
import Pagination from "../components/common/pagination";
import { getReport } from "../api/report";

export default function Reports() {
  const [typeFilter, setTypeFilter] = useState("ALL");
 
  const [typeFilterDate, setTypeFilterDate] = useState("newest");

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationData, setPaginationData] = useState([]);
  const pageSize = 10;

  const columns = [
    { key: "타입", value: "타입" },
    { key: "신고자", value: "신고자" },
    { key: "신고자닉네임", value: "신고자닉네임" },
    { key: "접수일", value: "접수일" },
    { key: "사유", value: "사유" },
    { key: "작성자", value: "작성자" },
    { key: "처리상태", value: "처리 상태" }
  ];

  const reasons = [
    {label: "개인정보 노출", value: 1},
    {label: "폭력성", value: 2}, 
    {label: "선정성", value: 3}, 
    {label: "부적절한 닉네임/이미지", value: 4},
    {label: "욕설/인신공격", value: 5}, 
    {label: "저작권 침해", value: 6}, 
    {label: "도배", value: 7}, 
    {label: "기타", value: 8},
  ]
  const getReportData = async () => {
    try {
      const params = {
        page: currentPage, 
        size: pageSize,
      };

      if (typeFilter !== "ALL") {
        params.postType = typeFilter;
      }
      
      const response = await getReport(params);
      console.log("API 응답 데이터:", response);

      if (response && response.result && response.result.content) {
        const reportData = response.result.content.map(report => {
          const reasonTexts = report.reasons.map(reasonId => {
            const reason = reasons.find(r => r.value === reasonId);
            return reason ? reason.label : `사유 ${reasonId}`;
          }).join(', ');
          
          return {
            타입: report.postType === "FEED" ? "피드" : 
                  report.postType === "RECRUIT" ? "공고문" : 
                  report.postType === "COMMENT" ? "댓글" : 
                  report.postType === "CHAT" ? "채팅" : 
                  report.postType === "PROFILE" ? "프로필" : report.postType,
            신고자: report.reportingPersonNickname,
            신고자닉네임: report.reportingPersonNickname,
            접수일: new Date(report.reportedDate).toLocaleString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }).replace(/\. /g, '.').replace(/\.$/, ''),
            사유: reasonTexts,
            작성자: report.reportedPersonNickname,
            처리상태: report.status === "PENDING" ? "대기중" : 
                      report.status === "REVIEWING" ? "검토중" : 
                      report.status === "RESOLVED" ? "처리완료" : 
                      report.status === "REJECTED" ? "거부됨" : report.status,
          };
        });
        
        setPaginationData(reportData);
        console.log("paginationData 설정됨:", reportData);
        
        const totalPages = response.result.page?.totalPages || 1;
        setTotalPages(totalPages);
        console.log("totalPages 설정됨:", totalPages);
        
        console.log("변환된 신고 데이터:", reportData);
      }
    } catch (error) {
      console.error("신고 데이터 조회 실패:", error);
      setPaginationData([]);
      setTotalPages(1);
    }
  }

  useEffect(() => {
    console.log("useEffect 실행 - currentPage:", currentPage, "typeFilter:", typeFilter);
    getReportData();
  }, [currentPage, typeFilter]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFilterChange = (value) => {
    setTypeFilter(value);
    setCurrentPage(0);
  };



  const handleFilterDateChange = (value) => {
    setTypeFilterDate(value);
    setCurrentPage(0);
  };

  const handleSearchChange = (value) => {
    console.log("검색어:", value);
  };

  return (
    <AdminLayout
      title="신고 관리"
      filters={[
        {
          label: "타입",
          value: typeFilter,
          options: [
            { label: "전체", value: "ALL" },
            { label: "공고문", value: "RECRUIT" },
            { label: "피드", value: "FEED" },
            { label: "댓글", value: "COMMENT" },
            { label: "프로필", value: "PROFILE" },
            { label: "채팅", value: "CHAT" },
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
