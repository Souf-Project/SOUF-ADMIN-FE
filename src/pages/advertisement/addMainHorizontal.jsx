import { useState } from "react";
import AdminLayout from "../../components/layout/adminLayout";
import Button from "../../components/common/button/button";
import SimpleInput from "../../components/common/input/simpleInput";
import DateRangePicker from "../../components/common/dateRangePicker";
import AddImage from "../../components/advertisements/addImage";

export default function AddMainHorizontal() {
  const [activeTab, setActiveTab] = useState("메인 가로형");

  //나중에 각 input 마다 name 추가할 수 있게해서 form 제출로 가기
  return (
    <AdminLayout title="광고 추가"
    showSearch={false}>
        <div className="flex flex-row gap-8">
            <form className="flex flex-col w-[50%] gap-3">
            <SimpleInput title="광고 제목" placeholder="광고 제목을 입력해주세요"/>
            <AddImage title="광고 이미지"/>
            <DateRangePicker title="광고 기간"/>
            <SimpleInput title="광고주" placeholder="광고주 정보를 입력해주세요"/>
            <button
                type="submit"
                className={`h-[52px] px-6 mt-8 whitespace-nowrap rounded-[10px] text-black text-xl font-semibold bg-[#FFC400] flex items-center justify-center`}>
                등록
            </button>
        </form>
        <section className="w-[45%] h-full">
            <div className="flex flex-col gap-2 w-full h-full">
            <label className="text-lg md:text-2xl font-semibold">미리보기</label>
            <div className="flex items-center justify-center border border-black bg-gray-100 w-full h-[600px] relative cursor-pointer">
            </div>
            </div>
        </section>
        </div>
        
    </AdminLayout>
  );
}

