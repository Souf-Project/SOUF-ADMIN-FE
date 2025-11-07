import { useLocation } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import SoufLogo from "../../assets/images/SouFLogo.svg";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { nickname, memberId, clearUser } = useUserStore();
  const adminName = nickname || "관리자";
  const isLoggedIn = memberId !== null && memberId !== undefined;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menus = [
    { label: "회원 관리", href: "/members" },
    { label: "게시글 관리", href: "/posts" },
    { label: "광고 문의&교체", href: "/advertisements" },
    { label: "신고", href: "/reports" },
    { label: "문의", href: "/inquiry" },
  ];

  const handleMenuClick = (e, href) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('로그인 후 이용가능합니다!');
      return;
    }
    navigate(href);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    clearUser();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('memberId');
    localStorage.removeItem('nickname');
    localStorage.removeItem('roleType');
    setIsDropdownOpen(false);

    alert('로그아웃 되었습니다!');
    navigate('/');
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="w-full bg-white shadow-md">
      <div className="mx-auto flex items-center justify-between px-12 h-16">
        <div className="flex items-center gap-8">
          <img src={SoufLogo} alt="SouF Logo" className="w-20" />
          
          <nav className="flex items-center gap-16">
            {menus.map((menu) => {
              const isActive = location.pathname === menu.href;

              return (
                <a
                key={menu.href}
                href={menu.href}
                onClick={(e) => handleMenuClick(e, menu.href)}
                className={`text-black text-lg font-semibold hover:text-blue-main transition-colors cursor-pointer
                  ${isActive ? "text-blue-point font-extrabold" : ""}`}
              >
                {menu.label}
              </a>
              )
            })}
          </nav>
        </div>
        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            <div 
              className="bg-blue-main px-4 py-2 rounded font-semibold text-white cursor-pointer hover:bg-blue-point transition-colors"
              onClick={handleDropdownToggle}
            >
              {`관리자 ${adminName}`}
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="bg-blue-main px-4 py-2 rounded font-semibold text-white">
            로그인
          </button>
        )}
      </div>
    </header>
  );
}
