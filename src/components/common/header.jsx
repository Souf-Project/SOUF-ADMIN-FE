import { useLocation } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import SoufLogo from "../../assets/images/SouFLogo.svg";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { nickname } = useUserStore();
  const adminName = nickname || "관리자";
  const menus = [
    { label: "회원 관리", href: "/members" },
    { label: "게시글 관리", href: "/posts" },
    { label: "광고 문의&교체", href: "/advertisements" },
    { label: "신고", href: "/reports" },
    { label: "문의", href: "/inquiry" },
  ];

  return (
    <header className="w-full bg-white shadow">
      <div className="mx-auto flex items-center justify-between px-12 h-16">
        <div className="flex items-center gap-8">
          <img src={SoufLogo} alt="SouF Logo" className="w-20" onClick={() => navigate("/")} />
          
          <nav className="flex items-center gap-16">
            {menus.map((menu) => {
              const isActive = location.pathname === menu.href;

              return (
                <a
                key={menu.href}
                href={menu.href}
                className={`text-black text-lg font-semibold hover:text-blue-main transition-colors
                  ${isActive ? "text-blue-point font-extrabold" : ""}`}
              >
                {menu.label}
              </a>
              )
            })}
          </nav>
        </div>

        {/* 관리자 이름 */}
        <div className="bg-blue-main px-4 py-2 rounded font-semibold text-white">
          {`관리자 ${adminName}`}
        </div>
      </div>
    </header>
  );
}
