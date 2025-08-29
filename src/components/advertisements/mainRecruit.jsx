import { useState } from "react";
import MainHorizontalBlock from "./mainHorizontalBlock";
import { useNavigate } from "react-router-dom";
import MainRecruitBlock from "./mainRecruitBlock";
export default function MainRecruit() {
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const dummyRecruitData = [
    {
    title: "제1회 대학생 창의 아이디어 공모전",
    host: "한국대학교",
    prize: "총상금 500만원",
    target: "대학생 및 일반인",
    content:
      "창의적인 아이디어와 혁신적인 사고를 바탕으로 다양한 프로젝트를 모집합니다. 자유로운 주제 선택이 가능하며, 우수한 작품은 사업화 지원 기회도 제공됩니다.",
    imageUrl: "https://via.placeholder.com/400x500?text=공모전1",
  },
  {
    title: "글로벌 스타트업 경진대회",
    host: "서울창업진흥원",
    prize: "총상금 1억원 및 해외 진출 지원",
    target: "예비 창업가, 스타트업 팀",
    content:
      "혁신적인 스타트업 아이디어를 보유한 팀을 대상으로 하는 글로벌 경진대회입니다. 참가자들은 네트워킹, 멘토링, 투자 유치의 기회를 얻을 수 있습니다.",
    imageUrl: "https://via.placeholder.com/400x500?text=공모전2",
  }
  ];

    const data2 = [
    {
    title: "제1회 대학생 창의 아이디어 공모전",
    host: "한국대학교",
    prize: "총상금 500만원",
    target: "대학생 및 일반인",
    content:
      "창의적인 아이디어와 혁신적인 사고를 바탕으로 다양한 프로젝트를 모집합니다. 자유로운 주제 선택이 가능하며, 우수한 작품은 사업화 지원 기회도 제공됩니다.",
    imageUrl: "https://via.placeholder.com/400x500?text=공모전1",
  },
  {
    title: "글로벌 스타트업 경진대회",
    host: "서울창업진흥원",
    prize: "총상금 1억원 및 해외 진출 지원",
    target: "예비 창업가, 스타트업 팀",
    content:
      "혁신적인 스타트업 아이디어를 보유한 팀을 대상으로 하는 글로벌 경진대회입니다. 참가자들은 네트워킹, 멘토링, 투자 유치의 기회를 얻을 수 있습니다.",
    imageUrl: "https://via.placeholder.com/400x500?text=공모전2",
  },    {
    title: "제1회 대학생 창의 아이디어 공모전",
    host: "한국대학교",
    prize: "총상금 500만원",
    target: "대학생 및 일반인",
    content:
      "창의적인 아이디어와 혁신적인 사고를 바탕으로 다양한 프로젝트를 모집합니다. 자유로운 주제 선택이 가능하며, 우수한 작품은 사업화 지원 기회도 제공됩니다.",
    imageUrl: "https://via.placeholder.com/400x500?text=공모전1",
  },
  {
    title: "글로벌 스타트업 경진대회",
    host: "서울창업진흥원",
    prize: "총상금 1억원 및 해외 진출 지원",
    target: "예비 창업가, 스타트업 팀",
    content:
      "혁신적인 스타트업 아이디어를 보유한 팀을 대상으로 하는 글로벌 경진대회입니다. 참가자들은 네트워킹, 멘토링, 투자 유치의 기회를 얻을 수 있습니다.",
    imageUrl: "https://via.placeholder.com/400x500?text=공모전2",
  }
  ]


  return (
    <div className="flex flex-col items-start gap-12">
        <section className="flex flex-col ">
            <h2 className="text-lg md:text-2xl font-semibold mb-2">메인 공모전 - 큰 사이즈</h2>
            <div className="flex flex-row gap-4">
                 {dummyRecruitData.map((data) => (
                <MainRecruitBlock title={data.title}
                host={data.host}
                prize={data.prize}
                target={data.target}
                content={data.content}
                imageUrl={data.imageUrl}/>
            ))}
            </div>
        </section>
        <section className="flex flex-col ">
            <h2 className="text-lg md:text-2xl font-semibold mb-2">메인 공모전 - 작은 사이즈</h2>
            <div className="grid grid-cols-2 gap-4">
                 {data2.map((data) => (
                <MainRecruitBlock title={data.title}
                host={data.host}
                prize={data.prize}
                target={data.target}
                content={data.content}
                imageUrl={data.imageUrl}/>
            ))}
            </div>
        </section>
    </div>
  );
}