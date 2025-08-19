import { useState } from "react";
import AdminLayout from "../components/layout/adminLayout";
import Table from "../components/common/table";
import Tabs from "../components/common/tab/tabs";
import ImageReplace from "../components/advertisements/imageReplace";
import SouFLogo from "../assets/images/SouFLogo.svg";
//import SoufLogo from '../../assets/images/SouFLogo.svg';

export default function Advertisements() {

    const tabs = [
        {label:"메인 가로형"},
        {label:"메인 스프 추천 공고"},
        {label:"메인 공모전"},
        {label:"공고문 모아보기"},
    ]
    const columns = [
        { key: "신고자", value: "신고자" },
        { key: "접수일", value: "접수일" },
        { key: "사유", value: "사유" },
        { key: "작성자", value: "작성자" },
        { key: "상세", value: "상세" },
    ];
  const data = [
  { 신고자: "학생", 접수일: "정유진",사유: "맛집탐험가", 작성자: "맛집탐험가@mail.com", 상세: ">" },
  { 신고자: "학생", 접수일: "최우진",사유: "책벌레", 작성자: "책벌레@example.com", 상세: ">" },
  { 신고자: "학생", 접수일: "정유진",사유: "코딩왕", 작성자: "코딩왕@mail.com", 상세: ">" },
  { 신고자: "학생", 접수일: "박서연",사유: "맛집탐험가", 작성자: "맛집탐험가@demo.net", 상세: ">" },
  { 신고자: "학생", 접수일: "최우진",사유: "코딩왕", 작성자: "코딩왕@mail.com", 상세: ">" },
  { 신고자: "학생", 접수일: "한지민",사유: "블루스카이", 작성자: "블루스카이@mail.com", 상세: ">" },
  { 신고자: "학생", 접수일: "이민수",사유: "행복바이러스", 작성자: "행복바이러스@test.org", 상세: ">" },
  { 신고자: "기업", 접수일: "정유진",사유: "행복바이러스", 작성자: "행복바이러스@mail.com", 상세: ">" },
  { 신고자: "학생", 접수일: "박서연",사유: "고양이집사", 작성자: "고양이집사@test.org", 상세: ">" },
  { 신고자: "학생", 접수일: "한지민",사유: "블루스카이", 작성자: "블루스카이@demo.net", 상세: ">" }
]



  const handleSearchChange = (value) => {
    console.log("검색어:", value);
  };

  return (
    <AdminLayout
      title="광고 문의 & 교체"
    >
        <>
        <Tabs tab={tabs}/>
        <ImageReplace 
        title="메인 가로형1" 
        width={700} 
        height={400} 
        defaultImage={SouFLogo} 
        />

      </>
    </AdminLayout>
  );
}