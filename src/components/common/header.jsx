import { useLocation } from "react-router-dom";

export default function Header() {
  const location =useLocation();
    const adminName = "태쿠자";
  const menus = [
    { label: "회원 관리", href: "/members" },
    { label: "게시글 관리", href: "/posts" },
    { label: "광고 문의&교체", href: "/advertisements" },
    { label: "신고", href: "/reports" },
  ];

  return (
    <header className="w-full bg-white shadow">
      <div className="mx-auto flex items-center justify-between px-12 h-16">
        <div className="flex items-center gap-8">
          <a className="text-black text-3xl font-bold mr-16 hover:text-black"
          href="/">SouF</a>
          
          <nav className="flex items-center gap-16">
            {menus.map((menu) => {
              const isActive = location.pathname === menu.href;

              return (
                <a
                key={menu.href}
                href={menu.href}
                className={`text-black text-lg font-semibold hover:text-[#FFC400] transition-colors
                  ${isActive ? "text-[#FFC400] font-extrabold" : ""}`}
              >
                {menu.label}
              </a>
              )
            })}
          </nav>
        </div>

        {/* 관리자 이름 */}
        <div className="bg-yellow-main px-4 py-2 rounded font-semibold">
          {`관리자 ${adminName}`}
        </div>
      </div>
    </header>
  );
}
