import AuthLayout from "../components/layout/authLayout";
import Input from "../components/common/input/input";
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
    <AuthLayout title="로그인">
      <form
        className="w-full max-w-lg bg-white p-6 lg:p-8 border rounded-xl shadow flex flex-col gap-6"
        onSubmit={handleLoginClick}
      >
        <Input
          title="이메일"
          placeholder="Souf@souf.com"
          onChange={(e) => {
            setEmail(e.target.value);
            setShowError(false);
          }}
          essentialText="이메일을 입력해주세요"
          disapproveText="이메일을 입력해주세요"
        />
        <Input
          title="비밀번호"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
            setShowError(false);
          }}
          essentialText="비밀번호를 입력해주세요"
          disapproveText="비밀번호를 입력해주세요"
        />
        {showError && (
          <div className="mt-2 text-red-essential text-center">
            아이디 또는 비밀번호가 일치하지 않습니다.
          </div>
        )}
        <div className="flex justify-end text-[#767676] text-md sm:text-xl">
          <button
            type="button"
            className="bg-white underline underline-offset-4 decoration-gray-300 p-0"
            onClick={() => navigate("/pwdFind")}
          >
            비밀번호 재설정
          </button>
        </div>
        <div className="flex justify-center">
          <Button btnText="로그인" width="w-1/2" />
        </div>
      </form>
    </AuthLayout>
  );
}