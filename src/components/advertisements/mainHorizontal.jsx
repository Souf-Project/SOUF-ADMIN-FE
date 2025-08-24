import { useState } from "react";
import MainHorizontalBlock from "./mainHorizontalBlock";
export default function MainHorizontal() {
  const [preview, setPreview] = useState(null);

  const mockData = [
  {
    title: "2025년 상반기 공모전 안내",
    period: "2025-03-01 ~ 2025-03-31",
    registration: "온라인 접수",
  },
  {
    title: "스타트업 아이디어 경진대회",
    period: "2025-04-10 ~ 2025-05-15",
    registration: "이메일 제출",
  },
  {
    title: "청년 인턴십 지원 프로그램",
    period: "2025-06-01 ~ 2025-06-30",
    registration: "현장 접수",
  },
];



  return (
    <div className="flex flex-col items-start gap-4">
        {mockData.map((data) => (
            <MainHorizontalBlock
            key={data.title}
            title={data.title}
            period={data.period}
            registration={data.registration}/>
        ))}
        <section className="w-full bg-white text-center py-4 font-semibold text-lg">
            + 광고 추가
        </section>
    </div>
  );
}