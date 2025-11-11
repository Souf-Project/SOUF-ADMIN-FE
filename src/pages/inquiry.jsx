import { getInquiry, patchInquiryStatus } from "../api/inquiry";
import AdminLayout from "../components/layout/adminLayout";
import Table from "../components/common/table";
import Pagination from "../components/common/pagination";
import { useState, useEffect } from "react";

export default function Inquiry() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationData, setPaginationData] = useState([]);
  const pageSize = 10;
  const [inquiryType, setInquiryType] = useState("ALL");
  const [inquiryStatus, setInquiryStatus] = useState("ALL");
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [answer, setAnswer] = useState("");


  const columns = [
    { key: "문의 유형", value: "문의 유형" },
    { key: "문의 제목", value: "문의 제목" },
    { 
      key: "문의 내용", 
      value: "문의 내용",
      maxWidth: "600px",
      render: (content) => {
        if (!content) return "";
        const truncated = content.length > 40 ? content.substring(0, 40) + "..." : content;
        return (
          <div className="truncate" title={content}>
            {truncated}
          </div>
        );
      }
    },
    { key: "문의 상태", value: "문의 상태" },
    { key: "작성자", value: "작성자" },
    { key: "문의 작성일", value: "문의 작성일" },
  ];

 const handleTypeChange = (value) => {
  setInquiryType(value);
  setCurrentPage(0);
 };

 const handleStatusChange = (value) => {
  setInquiryStatus(value);
  setCurrentPage(0);
 };
 
 
 const getInquiryData = async () => {
  try {
    const params = {
      page: currentPage, 
      size: pageSize,
      inquiryType: inquiryType,
      inquiryStatus: inquiryStatus,
    };

    const response = await getInquiry(params);
    if (response && response.data && response.data.result) {
      console.log("API 응답 데이터:", response.data.result.content);
      
      // inquiryType 숫자를 한국어로 변환하는 함수
      const getInquiryTypeLabel = (type) => {
        if (typeof type === 'number') {
          const typeMap = {
            1: "피드",
            2: "외주",
            3: "후기",
            4: "채팅",
            5: "계정/인증",
            6: "기타"
          };
          return typeMap[type] || `유형 ${type}`;
        }
        const stringMap = {
          "RELATED_FEED": "피드",
          "RELATED_RECRUIT": "외주",
          "RELATED_REVIEW": "후기",
          "RELATED_CHAT": "채팅",
          "RELATED_AUTHENTICATION": "계정/인증",
          "ETC": "기타"
        };
        return stringMap[type] || type;
      };
      
      const inquiryData = response.data.result.content.map(inquiry => {
        // 날짜 포맷팅
        const formatDate = (dateString) => {
          if (!dateString) return "";
          try {
            return new Date(dateString).toLocaleString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }).replace(/\. /g, '.').replace(/\.$/, '');
          } catch (e) {
            return dateString;
          }
        };
        
        const mappedData = {
          "문의 유형": getInquiryTypeLabel(inquiry.inquiryType),
          "문의 제목": inquiry.title || "",
          "문의 내용": inquiry.content || "",
          "문의 작성일": formatDate(inquiry.createdTime || inquiry.createdAt || inquiry.createdDate),
          "작성자": inquiry.writer || inquiry.writerName || inquiry.memberName || "",
          "문의 상태": inquiry.status === "PENDING" ? "답변 대기" : 
                      inquiry.status === "RESOLVED" ? "답변 완료" : 
                      inquiry.status === "REJECTED" ? "답변 거절" : inquiry.status || "미설정",
          inquiryId: inquiry.inquiryId,
          originalData: inquiry,
        };
        
        console.log("매핑된 데이터:", mappedData);
        return mappedData;
      });
      
      console.log("전체 inquiryData:", inquiryData);
      setPaginationData(inquiryData);

      const totalElements = response.data.result.page?.totalElements || response.data.result.totalElements || inquiryData.length;
      setTotalPages(Math.ceil(totalElements / pageSize));
    }
  } catch (error) {
    console.error("문의 데이터 조회 실패:", error);
    setPaginationData([]);
    setTotalPages(1);
  }
}

useEffect(() => {
  getInquiryData();
}, [currentPage, inquiryType, inquiryStatus]);

const handleRowClick = (inquiry, originalData) => {
  const inquiryData = originalData || inquiry;
  setSelectedInquiry(inquiry);
  setShowModal(true);
  setSelectedStatus(null);
  setAnswer("");
};


const handleProcessingChange = (value) => {
  setSelectedStatus(value);
};

const handleProcessComplete = async () => {
  if (!selectedInquiry || !selectedStatus) {
    alert('상태를 선택해주세요.');
    return;
  }

  try {
    const inquiryId = selectedInquiry.inquiryId || (selectedInquiry.originalData && selectedInquiry.originalData.inquiryId);
    if (!inquiryId) {
      alert('문의 ID를 찾을 수 없습니다.');
      return;
    }

    await patchInquiryStatus({
      inquiryId: inquiryId,
      answer: answer,
      status: selectedStatus,
    });

    alert('문의 답변이 작성되었습니다.');
    handleCloseModal();
    getInquiryData();
  } catch (error) {
    console.error('문의 답변 실패:', error);
    alert('문의 답변에 실패했습니다.');
  }
};

const handleCloseModal = () => {
  setShowModal(false);
  setSelectedInquiry(null);
  setSelectedStatus(null);
  setAnswer("");
};

  return (
    <AdminLayout title="문의"
    filters={[
      {
        label: "문의 유형", 
        value: inquiryType,
        options: [
          { label: "전체", value: "ALL" },
          { label: "피드", value: "RELATED_FEED" },
          { label: "외주", value: "RELATED_RECRUIT" },
          { label: "후기", value: "RELATED_REVIEW" },
          { label: "채팅", value: "RELATED_CHAT" },
          { label: "계정/인증", value: "RELATED_AUTHENTICATION" },
          { label: "기타", value: "ETC" },
        ],
        onFilterChange: handleTypeChange,
      },
      {
        label: "문의 상태",
        value: inquiryStatus,
        options: [
          { label: "전체", value: "ALL" },
          { label: "답변 대기", value: "PENDING" },
          { label: "답변 완료", value: "RESOLVED" },
          { label: "답변 거절", value: "REJECTED" },
        ],
        onFilterChange: handleStatusChange,
      }
    ]}
    >
      <div className="bg-white min-h-[550px] flex flex-col justify-between mx-4">
        <Table 
          columns={columns} 
          data={paginationData} 
          onRowClick={handleRowClick}
          originalData={paginationData.map(item => item.originalData)}
        />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

      {/* 문의 상세 모달 */}
      {showModal && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={handleCloseModal}>
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-5xl p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">문의 상세</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="flex gap-6">
              {/* 왼쪽: 문의 정보 */}
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">문의 유형</label>
                  <div className="p-3 bg-gray-50 rounded border">{selectedInquiry["문의 유형"]}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">문의 제목</label>
                  <div className="p-3 bg-gray-50 rounded border">{selectedInquiry["문의 제목"]}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">문의 내용</label>
                  <div className="p-3 bg-gray-50 rounded border min-h-[100px] whitespace-pre-wrap">
                    {selectedInquiry["문의 내용"]}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">작성자</label>
                  <div className="p-3 bg-gray-50 rounded border">{selectedInquiry["작성자"]}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">문의 작성일</label>
                  <div className="p-3 bg-gray-50 rounded border">{selectedInquiry["문의 작성일"]}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">문의 상태</label>
                  <div className="p-3 bg-gray-50 rounded border">{selectedInquiry["문의 상태"]}</div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-4">이미지</h3>
                <div className="text-gray-500 py-8 text-center">
                  이미지가 없습니다.
                </div>

                
              </div>
              
              {/* 오른쪽: 답변 처리 (답변 대기 상태일 때만 표시) */}
              <div className="flex-1 border-l pl-6">
              {selectedInquiry["문의 상태"] === "답변 대기" ? (
                <>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">문의 상태 처리</h3>
                  <div className="flex flex-col gap-2"> 
                  <button 
                            className={`w-full p-3 rounded font-medium transition-colors border focus:ring-2 focus:ring-green-300 ${
                              selectedStatus === 'PENDING' 
                                ? 'bg-gray-400 text-white font-bold border-none' 
                                : 'bg-white text-gray-400 border-gray-400 hover:bg-gray-400 hover:text-white hover:font-bold'
                            }`}
                            onClick={() => handleProcessingChange('PENDING')}
                          >답변 대기</button>
                    <button 
                            className={`w-full p-3 rounded font-medium transition-colors border focus:ring-2 focus:ring-green-300 ${
                              selectedStatus === 'RESOLVED' 
                                ? 'bg-green-400 text-white font-bold border-none' 
                                : 'bg-white text-green-500 border-green-500 hover:bg-green-300 hover:text-white hover:font-bold'
                            }`}
                            onClick={() => handleProcessingChange('RESOLVED')}
                          >답변 완료</button>
                    <button 
                           className={`w-full p-3 rounded font-medium transition-colors border focus:ring-2 focus:ring-red-300 ${
                            selectedStatus === 'REJECTED' 
                              ? 'bg-red-400 text-white font-bold border-none' 
                              : 'bg-white text-red-500 border-red-500 hover:bg-red-300 hover:text-white hover:font-bold'
                          }`}
                          onClick={() => handleProcessingChange('REJECTED')}
                          >답변 거절</button>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-6">답변 작성</h3>
                  <textarea
                    className="w-full p-3 bg-gray-50 min-h-[200px] rounded border min-h-[100px] whitespace-pre-wrap"
                    placeholder="답변을 입력해주세요."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  <button 
                    className="bg-blue-main w-full mt-4 text-white font-semibold py-3 px-4 rounded hover:bg-blue-point transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleProcessComplete}
                    disabled={!selectedStatus}
                  >
                    답변 작성
                  </button>
                </>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">문의 상태</h3>
                  <div className="p-3 bg-gray-50 rounded border">
                    {selectedInquiry["문의 상태"]}
                  </div>
                </div>
              )}
              </div>
              
              
            </div>
            
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
