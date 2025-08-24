import { useState } from "react";
import AdminLayout from "../../components/layout/adminLayout";
import Tabs from "../../components/common/tab/tabs";
import ImageReplace from "../../components/advertisements/imageReplace";
import SouFLogo from "../../assets/images/SouFLogo.svg";
import MainHorizontal from "../../components/advertisements/mainHorizontal";

const tabComponents = {
  "메인 가로형": (
    <MainHorizontal/>
  ),
  "메인 스프 추천 공고": <div>여기에 스프 추천 공고 UI</div>,
  "메인 공모전": <div>여기에 공모전 관련 UI</div>,
  "공고문 모아보기": <div>여기에 공고문 리스트 UI</div>,
};

export default function Advertisements() {
  const [activeTab, setActiveTab] = useState("메인 가로형");

  return (
    <AdminLayout title="광고 문의 & 교체">
      <Tabs 
        tabs={Object.keys(tabComponents)} 
        activeTab={activeTab} 
        onChange={setActiveTab} 
      />
      <div className="mt-4">
        {tabComponents[activeTab]}
      </div>
    </AdminLayout>
  );
}
