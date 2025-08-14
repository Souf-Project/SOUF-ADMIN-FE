import Input from "../components/common/input/input";
import SoufLogo from "../assets/images/SouFLogo.svg";
import Button from "../components/common/button/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);


  const handleLoginClick = () => {  };



  return (
    <>
    <div className="w-screen h-screen h-full flex flex-col lg:flex-row bg-yellow-main">
      {/* PC 버전 스프 설명 */}
      <div className="hidden lg:flex lg:w-1/2 h-full my-auto bg-[#FFE681] flex-col px-16 justify-center items-center">
        <p className="text-center text-5xl font-bold leading-relaxed text-gray-800 mb-10">
          관리자 페이지
          <img src={SoufLogo} alt="SouF Logo" className="mx-auto mt-4"/>
          <span className="text-3xl">SouF | 대학생 외주 & 공모전</span>
        </p>
      </div>
      {/* 모바일 버전 스프 설명 */}
      <div className="lg:hidden flex justify-center items-center mt-24 mb-24 sm:mb-2">
          <img src={SoufLogo} alt="SouF Logo" className="w-20"/>
          <span className="w-[2px] h-20 bg-black mx-4"></span>
          <p className="text-xl font-bold leading-relaxed text-gray-800">
            관리자 페이지
            <br />
            대학생 외주 & 공모전
          </p>
         
        </div>
        <div className="w-full lg:w-1/2 lg:bg-white flex flex-col justify-center items-center px-4 sm:h-full">
          <div className="text-3xl lg:text-5xl font-bold mb-10">로그인</div>
            <form className="w-full max-w-lg bg-white p-6 lg:p-8 border rounded-xl shadow flex flex-col gap-4"
            onSubmit={handleLoginClick}>
              <Input
                title="이메일"
                placeholder="Souf@souf.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setShowError(false);
                }}
                essentialText="이메일을 입력해주세요"
                disapproveText="이메일을 입력해주세요"/>
              <Input
                title="비밀번호"
                type="password"
                placeholder=""
                onChange={(e) => {
                  setPassword(e.target.value);
                  setShowError(false);
                }}
                essentialText="비밀번호를 입력해주세요"
                disapproveText="비밀번호를 입력해주세요"
              />
              {showError && (
                <div className="mt-2 text-red-essential text-center">아이디 또는 비밀번호가 일치하지 않습니다.</div>
              )}
              <div className="flex justify-between text-[#767676] text-xl font-reagular">
                <button type="button" 
                  className="bg-white underline underline-offset-4 decoration-gray-300 p-0"
                  onClick={() => navigate("/join")}>
                  회원가입</button>

                <button type="button"
                  className="bg-white underline underline-offset-4 decoration-gray-300 p-0"
                  onClick={() => navigate("/pwdFind")}>
                  비밀번호 재설정
                </button>
              </div>
              <div className="flex justify-center">
                <Button btnText="로그인" width="w-1/2"/>
              </div>
        </form>     
      </div>
    </div>
    </>
  );
}