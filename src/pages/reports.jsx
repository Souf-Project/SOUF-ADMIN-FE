import { useEffect, useState } from "react";
import AdminLayout from "../components/layout/adminLayout";
import Table from "../components/common/table";
import Pagination from "../components/common/pagination";
import { getReport, patchReport } from "../api/report";

export default function Reports() {
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [typeFilterDate, setTypeFilterDate] = useState("newest");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationData, setPaginationData] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const pageSize = 10;

  const columns = [
    { key: "타입", value: "타입" },
    { key: "신고자", value: "신고자" },
    { key: "접수일", value: "접수일" },
    { key: "사유", value: "사유" },
    { key: "작성자", value: "작성자" },
    { 
      key: "처리상태", 
      value: "처리 상태",
      render: (value, row) => (
        <span className={row.처리상태색상 || "text-gray-600"}>
          {value}
        </span>
      )
    }
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
          const reasonTexts = report.reasons && report.reasons.length > 0
            ? report.reasons.map(reasonId => {
                const reason = reasons.find(r => r.value === reasonId);
                return reason ? reason.label : `사유 ${reasonId}`;
              }).join(', ')
            : "사유 없음";
          
          return {
            타입: report.postType === "FEED" ? "피드" : 
                  report.postType === "RECRUIT" ? "공고문" : 
                  report.postType === "COMMENT" ? "댓글" : 
                  report.postType === "CHAT" ? "채팅" : 
                  report.postType === "PROFILE" ? "프로필" : report.postType,
            신고자: report.reportingPersonNickname,
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
            처리상태색상: report.status === "PENDING" ? "text-gray-600" : 
                          report.status === "REVIEWING" ? "text-blue-600" : 
                          report.status === "RESOLVED" ? "text-green-600" : 
                          report.status === "REJECTED" ? "text-red-600" : "text-gray-600",
            // 원본 데이터도 함께 저장
            reportedPersonId: report.reportedPersonId,
            postId: report.postId,
            reportId: report.reportId,
            originalData: report, // 원본 데이터 전체 저장
            reportedDate: report.reportedDate, // 정렬을 위한 원본 날짜 저장
          };
        });
        
        // 접수일 기준 정렬
        const sortedData = [...reportData].sort((a, b) => {
          const dateA = new Date(a.reportedDate || a.originalData?.reportedDate);
          const dateB = new Date(b.reportedDate || b.originalData?.reportedDate);
          
          if (typeFilterDate === "newest") {
            // 최신순: 내림차순 (최신이 먼저)
            return dateB - dateA;
          } else {
            // 오래된 순: 오름차순 (오래된 것이 먼저)
            return dateA - dateB;
          }
        });
        
        setPaginationData(sortedData);

        const totalPages = response.result.page?.totalPages || 1;
        setTotalPages(totalPages);

      }
    } catch (error) {
      console.error("신고 데이터 조회 실패:", error);
      setPaginationData([]);
      setTotalPages(1);
    }
  }

  useEffect(() => {
    getReportData();
  }, [currentPage, typeFilter, typeFilterDate]);

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

  const handleRowClick = (report, originalData) => {
    const reportData = originalData || report;
    setSelectedReport({ ...report, originalData: reportData });
    setShowModal(true);
    setSelectedStatus(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReport(null);
    setSelectedStatus(null);
  };

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
  };

  const handleProcessComplete = async () => {
    if (!selectedStatus || !selectedReport) {
      alert('처리 상태를 선택해주세요.');
      return;
    }

    try {
      const reportId = Number(selectedReport.reportId);
      if (isNaN(reportId)) {
        alert('유효하지 않은 신고 ID입니다.');
        return;
      }

      const response = await patchReport({
        reportId: reportId,
        reportStatus: selectedStatus,
      });

      console.log("신고 처리 응답:", response);

      alert('신고 처리가 완료되었습니다.');
      
      handleCloseModal();
      getReportData();
    } catch (error) {
      console.error('신고 처리 실패:', error);
      alert('신고 처리에 실패했습니다.');
    }
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
        <Table 
          columns={columns} 
          data={paginationData} 
          onRowClick={handleRowClick}
          originalData={paginationData.map(item => item.originalData)}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* 신고 처리 모달 */}
      {showModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={handleCloseModal}>
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-5xl p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">신고 처리</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="flex gap-6">
              {/* 왼쪽: 신고 정보 */}
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">신고 타입</label>
                  <div className="p-3 bg-gray-50 rounded border">{selectedReport.타입}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
                  <div className="p-3 bg-gray-50 rounded border">
                    {selectedReport.originalData?.postTitle || "제목 없음"}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">신고 내용</label>
                  <div className="p-3 bg-gray-50 rounded border min-h-[100px] whitespace-pre-wrap">
                    {selectedReport.originalData?.description || "내용 없음"}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">사유</label>
                  <div className="p-3 bg-gray-50 rounded border">
                    {selectedReport.사유 || "사유 없음"}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">신고자</label>
                  <div className="p-3 bg-gray-50 rounded border">{selectedReport.신고자}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">작성자</label>
                  <div className="p-3 bg-gray-50 rounded border">{selectedReport.작성자}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">접수일</label>
                  <div className="p-3 bg-gray-50 rounded border">{selectedReport.접수일}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">현재 상태</label>
                  <div className="p-3 bg-gray-50 rounded border">{selectedReport.처리상태}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">이동하기</label>
                  {(() => {
                    const postType = selectedReport.originalData?.postType;
                    let linkUrl = "";
                    let linkText = "";
                    
                    if (postType === "FEED") {
                      linkUrl = `https://www.souf.co.kr/profileDetail/${selectedReport.reportedPersonId}/post/${selectedReport.postId}`;
                      linkText = "피드 바로가기";
                    } else if (postType === "RECRUIT") {
                      linkUrl = `https://www.souf.co.kr/recruitDetails/${selectedReport.postId}`;
                      linkText = "공고문 바로가기";
                    } else if (postType === "PROFILE") {
                      linkUrl = `https://www.souf.co.kr/profileDetail/${selectedReport.reportedPersonId}`;
                      linkText = "프로필 바로가기";
                    } else {
                      // COMMENT, CHAT 등 기타 타입
                      linkUrl = `https://www.souf.co.kr/profileDetail/${selectedReport.reportedPersonId}/post/${selectedReport.postId}`;
                      linkText = "바로가기";
                    }
                    
                    return (
                      <a 
                        href={linkUrl}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-500 underline underline-offset-4"
                      >
                        {linkText}
                      </a>
                    );
                  })()}
                </div>
              </div>
              
              {/* 오른쪽: 처리 상태 변경 */}
              <div className="flex-1 border-l pl-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">처리 상태 변경</h3>
                <div className="flex flex-col gap-2">
                  <button 
                    className={`w-full p-3 rounded font-medium transition-colors border focus:ring-2 focus:ring-gray-300 ${
                      selectedStatus === 'REVIEWING' 
                        ? 'bg-gray-400 text-white font-bold border-none' 
                        : 'bg-white text-gray-500 border-gray-500 hover:bg-gray-300 hover:text-white hover:font-bold'
                    }`}
                    onClick={() => handleStatusChange('REVIEWING')}
                  >
                    검토중
                  </button>
                  <button 
                    className={`w-full p-3 rounded font-medium transition-colors border focus:ring-2 focus:ring-green-300 ${
                      selectedStatus === 'RESOLVED' 
                        ? 'bg-green-400 text-white font-bold border-none' 
                        : 'bg-white text-green-500 border-green-500 hover:bg-green-300 hover:text-white hover:font-bold'
                    }`}
                    onClick={() => handleStatusChange('RESOLVED')}
                  >
                    처리완료
                  </button>
                  <button 
                    className={`w-full p-3 rounded font-medium transition-colors border focus:ring-2 focus:ring-red-300 ${
                      selectedStatus === 'REJECTED' 
                        ? 'bg-red-400 text-white font-bold border-none' 
                        : 'bg-white text-red-500 border-red-500 hover:bg-red-300 hover:text-white hover:font-bold'
                    }`}
                    onClick={() => handleStatusChange('REJECTED')}
                  >
                    거부됨
                  </button>
                </div>
                
                <div className="flex gap-3 pt-6">
                  <button 
                    className="flex-1 bg-blue-main text-white font-semibold py-3 px-4 rounded hover:bg-blue-point transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleProcessComplete}
                    disabled={!selectedStatus}
                  >
                    처리 완료
                  </button>
                  <button 
                    onClick={handleCloseModal}
                    className="flex-1 bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded hover:bg-gray-400 transition-colors"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
