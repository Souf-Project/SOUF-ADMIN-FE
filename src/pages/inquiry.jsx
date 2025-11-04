import { getInquiry } from "../api/inquiry";
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


  const columns = [
    { key: "문의 제목", value: "문의 제목" },
    { key: "문의 내용", value: "문의 내용" },
    { key: "문의 상태", value: "문의 상태" },
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
    console.log(response);
    if (response && response.data && response.data.result) {
      console.log("API 응답 데이터:", response.data.result.content);
      
      // const inquiryData = response.data.result.content.map(inquiry => ({
      //   "문의 제목": inquiry.title,
      //   "문의 내용": inquiry.content,
      //   "문의 작성일": inquiry.createdAt,
      //   "문의 상태": inquiry.status === "PENDING" ? "답변 대기" : 
      //               inquiry.status === "RESOLVED" ? "답변 완료" : 
      //               inquiry.status === "REJECTED" ? "답변 거절" : inquiry.status
      // }));
      
      setPaginationData(inquiryData);

      const totalElements = response.data.result.totalElements || inquiryData.length;
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
        <Table columns={columns} data={paginationData} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </AdminLayout>
  );
}
