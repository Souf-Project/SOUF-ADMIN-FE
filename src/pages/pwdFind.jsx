import AuthLayout from "../components/layout/authLayout";
import Input from "../components/common/input/input";
import Button from "../components/common/button/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ButtonInput from "../components/common/input/buttonInput";

export default function PwdFind() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleLoginClick = () => {  };



   return (
    <AuthLayout title="비밀번호 재설정">
      <form
        className="w-full max-w-lg bg-white p-6 lg:p-8 border rounded-xl shadow flex flex-col gap-6"
        onSubmit={handleLoginClick}
      >
        <ButtonInput
            title="이메일"
            placeholder="Souf@souf.com"
            btnText="인증 요청"
        />
        <ButtonInput
            title="인증번호 확인"
            placeholder="123456"
            btnText="인증 확인"
        />
        <Input
          title="새 비밀번호"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
            setShowError(false);
          }}
          essentialText="새 비밀번호를 입력해주세요"
          disapproveText="새 비밀번호를 입력해주세요"
          subtitle="영문자, 숫자, 특수문자(@,$,!,%,*,#,?,&) 포함 / 8자~20자"
        />
        <Input
          title="새 비밀번호 확인"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
            setShowError(false);
          }}
          essentialText="새 비밀번호를 재입력해주세요"
          disapproveText="새 비밀번호를 재입력해주세요"
        />
        {showError && (
          <div className="mt-2 text-red-essential text-center">
            아이디 또는 비밀번호가 일치하지 않습니다.
          </div>
        )}
        <div className="flex justify-center">
          <Button btnText="변경 완료" width="w-1/2" />
        </div>
      </form>
    </AuthLayout>
  );
}