import { useEffect, useState } from "react";
import AdminLayout from "../components/layout/adminLayout";
import Table from "../components/common/table";
import Pagination from "../components/common/pagination";
import { getPost } from "../api/post";

export default function Posts() {
  const [typeFilter, setTypeFilter] = useState("RECRUIT");
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

  const getPostData = async () => {
    try {
      const params = {
        page: currentPage, 
        size: pageSize,
        postType: typeFilter,
      };
      
      const response = await getPost(params);
      console.log("API 응답 데이터:", response);

      if (response && response.result && response.result.content) {
        console.log("API 응답 데이터:", response.result.content);
        const postData = response.result.content.map(post => ({
          타입: post.postType === "RECRUIT" ? "공고문" : "피드",
          작성자: post.writer,
          제목: post.title,
          작성일: post.createdDate,
          관리: ">"
        }));
        
        setPaginationData(postData);

        const totalPages = response.result.page?.totalPages || 1;

        setTotalPages(totalPages);
      }
    } catch (error) {
      console.error("게시글 데이터 조회 실패:", error);
     
    }
  }

  useEffect(() => {
    getPostData();
  }, [currentPage, typeFilter]);

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


  return (
    <AdminLayout
      title="게시글 관리"
      filters={[
        {
          label: "타입",
          value: typeFilter,
          options: [
            { label: "공고문", value: "RECRUIT" },
            { label: "피드", value: "FEED" },
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
