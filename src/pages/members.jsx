import { useEffect, useState } from "react";
import { getMember, patchMemberStatus } from "../api/member";
import AdminLayout from "../components/layout/adminLayout";
import Table from "../components/common/table";
import Pagination from "../components/common/pagination";

export default function Members() {
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [typeFilterDate, setTypeFilterDate] = useState("student");
  const [typeFilterCount, setTypeFilterCount] = useState("5");
  const [typeFilterStatus, setTypeFilterStatus] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationData,setPaginationData] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const pageSize = 10;
  const columns = [
  { key: "타입", value: "타입" },
  { key: "이름", value: "이름" },
  { key: "닉네임", value: "닉네임" },
  { key: "이메일", value: "이메일" },
  { key: "관리", value: "관리" },
  { key: "처리상태", value: "처리 상태" },
];

const getMemberData = async () => {
  try {
    const params = {
      page: currentPage, 
      size: pageSize,
    };

    if (typeFilter !== "ALL") {
      params.memberType = typeFilter === "STUDENT" ? "STUDENT" : 
                          typeFilter === "MEMBER" ? "MEMBER" : 
                          typeFilter === "ADMIN" ? "ADMIN" : 
                          typeFilter === "CLUB" ? "CLUB" : typeFilter;
    }
    if (typeFilterStatus && typeFilterStatus !== "ALL") {
      params.approvedStatus = typeFilterStatus;
    }
    
    const response = await getMember(params);
    // console.log(response);
    if (response && response.data && response.data.result) {
      // console.log("API 응답 데이터:", response.data.result.content);
      const memberData = response.data.result.content.map(member => {
        const processedMember = {
          타입: member.roleType === "STUDENT" ? "학생" : member.roleType === "ADMIN" ? "관리자" : member.roleType === "CLUB" ? "동아리" : "기업",
          이름: member.username,
          닉네임: member.nickname,
          이메일: member.email,
          관리: member.isDeleted ? "탈퇴" : "활성",
          처리상태: member.approvedStatus === "PENDING" ? "대기" : 
                            member.approvedStatus === "APPROVED" ? "승인" : 
                            member.approvedStatus === "REJECTED" ? "거절" : member.approvedStatus || "미설정",
          // 원본 데이터 저장
          memberId: member.memberId,
          originalData: member,
        };
        
        // console.log("변환된 회원 데이터:", processedMember);
        return processedMember;
      });
      
      // console.log("전체 memberData:", memberData);
      setPaginationData(memberData);

      const totalElements = response.data.result.totalElements || memberData.length;
      setTotalPages(Math.ceil(totalElements / pageSize));
    }
  } catch (error) {
    console.error("회원 데이터 조회 실패:", error);
    setPaginationData([]);
    setTotalPages(1);
  }
}

useEffect(() => {
  getMemberData();
}, [currentPage, typeFilter, typeFilterStatus]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFilterChange = (value) => { 
    setTypeFilter(value);
    setCurrentPage(0);
  };
  
  const handleFilterCountChange = (value) => {
    setTypeFilterCount(value);
    setCurrentPage(0);
  };

  const handleFilterDateChange = (value) => {
    setTypeFilterDate(value);
  };

  const handleSearchChange = (value) => {
    console.log("검색어:", value);
  };
  const handleFilterStatusChange = (value) => {
    setTypeFilterStatus(value);
    setCurrentPage(0);
  };

  const handleRowClick = (member, originalData) => {
    // originalData가 있으면 사용, 없으면 member 자체 사용
    setSelectedMember(originalData || member);
    setShowModal(true);
    setSelectedStatus(null);
    setRejectReason("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMember(null);
    setSelectedStatus(null);
    setRejectReason("");
  };

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
    if (newStatus !== 'REJECTED') {
      setRejectReason("");
    }
  };

  const handleProcessComplete = async () => {
    if (!selectedStatus || !selectedMember) {
      alert('처리 상태를 선택해주세요.');
      return;
    }

    // 거절일 경우 사유 체크
    if (selectedStatus === 'REJECTED' && !rejectReason.trim()) {
      alert('거절 사유를 입력해주세요.');
      return;
    }

    try {
      const requestBody = {
        reason: rejectReason || "",
        originalUrl: "",
      };

      const response = await patchMemberStatus({ 
        memberId: selectedMember.memberId, 
        approvedStatus: selectedStatus,
        requestBody: requestBody,
      });

      alert('처리 상태가 변경되었습니다.');
      
      handleCloseModal();
      getMemberData();
    } catch (error) {
      console.error('처리 상태 변경 실패:', error);
      alert('처리 상태 변경에 실패했습니다.');
    }
  };


  return (
    <AdminLayout
      title="회원 관리"
      filters={[
        {
          label: "타입",
          value: typeFilter,
          options: [
            { label: "전체", value: "ALL" },
            { label: "학생", value: "STUDENT" },
            { label: "기업", value: "MEMBER" },
            { label: "관리자", value: "ADMIN" },
            { label: "동아리", value: "CLUB" },
          ],
          onFilterChange : handleFilterChange
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
          label: "처리 상태",
          value: typeFilterStatus,
          options: [
            { label: "전체", value: "ALL" },
            { label: "대기", value: "PENDING" },
            { label: "승인", value: "APPROVED" },
            { label: "거절", value: "REJECTED" },
          ],
          onFilterChange: handleFilterStatusChange,
        }
      ]}
      onFilterChange={handleFilterChange}
      searchPlaceholder="이름 또는 닉네임을 검색하세요"
      onSearchChange={handleSearchChange}
    >
      <div className="bg-white min-h-[550px] flex flex-col justify-between mx-4">
      <Table columns={columns} data={paginationData} onRowClick={handleRowClick} />
      <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
      </div>

      {/* 회원 처리 모달 */}
      {showModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={handleCloseModal}>
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">회원 처리</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                <div className="p-3 bg-gray-50 rounded border">{selectedMember.이름}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">닉네임</label>
                <div className="p-3 bg-gray-50 rounded border">{selectedMember.닉네임}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                <div className="p-3 bg-gray-50 rounded border">{selectedMember.이메일}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">타입</label>
                <div className="p-3 bg-gray-50 rounded border">{selectedMember.타입}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">현재 상태</label>
                <div className="p-3 bg-gray-50 rounded border">{selectedMember.처리상태}</div>
              </div>
              
              <div className="pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">처리 상태 변경</label>
                <div className="flex flex-col gap-2">
                 
                  <button 
                    className={`w-full p-3 rounded font-medium transition-colors border focus:ring-2 focus:ring-green-300 ${
                      selectedStatus === 'APPROVED' 
                        ? 'bg-green-400 text-white font-bold border-none' 
                        : 'bg-white text-green-500 border-green-500 hover:bg-green-300 hover:text-white hover:font-bold'
                    }`}
                    onClick={() => handleStatusChange('APPROVED')}
                  >
                    승인
                  </button>
                  <button 
                    className={`w-full p-3 rounded font-medium transition-colors border focus:ring-2 focus:ring-red-300 ${
                      selectedStatus === 'REJECTED' 
                        ? 'bg-red-400 text-white font-bold border-none' 
                        : 'bg-white text-red-500 border-red-500 hover:bg-red-300 hover:text-white hover:font-bold'
                    }`}
                    onClick={() => handleStatusChange('REJECTED')}
                  >
                    거절
                  </button>
                </div>
                
                {/* 거절 선택 시 사유 입력 필드 */}
                {selectedStatus === 'REJECTED' && (
                  <div className="pt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">거절 사유</label>
                    <textarea
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="거절 사유를 입력하세요"
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-300 focus:border-transparent resize-none"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 pt-4">
                <button 
                  className="flex-1 bg-blue-main text-white font-semibold py-3 px-4 rounded hover:bg-blue-point transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleProcessComplete}
                  disabled={!selectedStatus || (selectedStatus === 'REJECTED' && !rejectReason.trim())}
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
      )}
        
     
    </AdminLayout>
  );
}
