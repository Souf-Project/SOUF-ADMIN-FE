// src/components/auth/AuthDescription.jsx
import { useMediaQuery } from 'react-responsive';
import SoufLogo from '../../assets/images/SouFLogo.svg';

export default function AuthDescription() {
  const isMobile = useMediaQuery({ maxWidth: 1024 }); // lg 기준

  if (isMobile) {
    // 모바일 버전
    return (
      <div className="flex justify-center items-center mt-24 mb-24 sm:mb-2">
        <img src={SoufLogo} alt="SouF Logo" className="w-20" />
        <span className="w-[2px] h-20 bg-black mx-4"></span>
        <p className="text-xl font-bold leading-relaxed text-gray-800">
          관리자 페이지
          <br />
          대학생 외주 & 공모전
        </p>
      </div>
    );
  }

  // PC 버전
  return (
    <div className="hidden lg:flex lg:w-1/2 h-full my-auto bg-[#FFE681] flex-col px-16 justify-center items-center">
      <p className="text-center text-5xl font-bold leading-relaxed text-gray-800 mb-10">
        관리자 페이지
        <img src={SoufLogo} alt="SouF Logo" className="mx-auto mt-4" />
        <span className="text-3xl">SouF | 대학생 외주 & 공모전</span>
      </p>
    </div>
  );
}
