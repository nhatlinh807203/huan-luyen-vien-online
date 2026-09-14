'use client';
import { JSX, useState } from "react";
import Link from "next/link";

type Role = "student" | "teacher";

interface NavItem {
  label: string;
  href: string;
  icon: JSX.Element;
}

interface HeaderProps {
  role: Role;
  userName?: string;
  isLoggedIn?: boolean;
  notificationCount?: number;
  loginHref?: string;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
}

/* ---------- icons (inline, no external deps) ---------- */

const Icon = {
  home: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M10 2 2 8.5V18h5.5v-5.5h5V18H18V8.5L10 2Z" />
    </svg>
  ),
  course: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M3 4.5A1.5 1.5 0 0 1 4.5 3h6A1.5 1.5 0 0 1 12 4.5v11A1.5 1.5 0 0 0 13.5 17h-9A1.5 1.5 0 0 1 3 15.5v-11Z" />
      <path d="M14 4h1.5A1.5 1.5 0 0 1 17 5.5v10a1.5 1.5 0 0 1-1.5 1.5H14V4Z" opacity=".55" />
    </svg>
  ),
  coach: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M10 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM4 16.2c0-3 2.7-5.2 6-5.2s6 2.2 6 5.2V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-.8Z" />
    </svg>
  ),
  progress: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M3 13.5 7 9l3 3 7-7v3l-7 7-3-3-4 4.5v-3Z" />
      <path d="M3 16.5h14v1.2H3z" />
    </svg>
  ),
  classroom: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M2.5 4A1.5 1.5 0 0 1 4 2.5h12A1.5 1.5 0 0 1 17.5 4v9A1.5 1.5 0 0 1 16 14.5H4A1.5 1.5 0 0 1 2.5 13V4Z" opacity=".55" />
      <path d="M7.5 16.5h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1 0-1.5Z" />
    </svg>
  ),
  students: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <circle cx="6.5" cy="6" r="2.5" />
      <circle cx="14" cy="7" r="2" opacity=".55" />
      <path d="M1.5 16.2c0-2.6 2.3-4.4 5-4.4s5 1.8 5 4.4v.3h-10v-.3Z" />
      <path d="M12.2 12.4c1.9.4 3.3 1.8 3.3 3.8v.3h-3v-1.6c0-.9-.2-1.7-.5-2.4Z" opacity=".55" />
    </svg>
  ),
  assignments: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M5 2.5h10A1.5 1.5 0 0 1 16.5 4v13a.5.5 0 0 1-.74.44L10 14.9l-5.76 2.55A.5.5 0 0 1 3.5 17V4A1.5 1.5 0 0 1 5 2.5Z" />
      <path d="M6.5 6.5h7M6.5 9.5h7" stroke="white" strokeWidth="1" opacity=".7" />
    </svg>
  ),
  reports: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M4 2.5h8l4 4V17a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 4 17v-14Z" opacity=".55" />
      <path d="M6.5 10.5h1.2v4H6.5zM9 8.5h1.2v6H9zM11.5 12h1.2v2.5h-1.2z" />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path d="M10 2a5 5 0 0 0-5 5v2.8L3.4 13.2c-.4.6 0 1.3.7 1.3h11.8c.7 0 1.1-.7.7-1.3L15 9.8V7a5 5 0 0 0-5-5Z" />
      <path d="M8 16.3a2 2 0 0 0 4 0H8Z" />
    </svg>
  ),
  chevron: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z" />
    </svg>
  ),
  menu: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  close: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

/* ---------- nav config per role ---------- */

const studentNav: NavItem[] = [
  { label: "Trang chủ", href: "#", icon: Icon.home },
  { label: "Khóa học", href: "#", icon: Icon.course },
  { label: "Huấn luyện viên", href: "#", icon: Icon.coach },
  { label: "Tiến độ", href: "#", icon: Icon.progress },
];

const teacherNav: NavItem[] = [
  { label: "Trang chủ", href: "#", icon: Icon.home },
  { label: "Lớp học", href: "#", icon: Icon.classroom },
  { label: "Học sinh", href: "#", icon: Icon.students },
  { label: "Bài tập", href: "#", icon: Icon.assignments },
  { label: "Báo cáo", href: "#", icon: Icon.reports },
];

const roleMeta: Record<Role, { label: string; accent: string; accentBg: string; accentText: string }> = {
  student: { label: "Học sinh", accent: "bg-sky-600", accentBg: "bg-sky-50", accentText: "text-sky-700" },
  teacher: { label: "Giáo viên", accent: "bg-teal-600", accentBg: "bg-teal-50", accentText: "text-teal-700" },
};

export default function Header({
  role,
  userName = role === "teacher" ? "Cô Lan" : "Minh Anh",
  isLoggedIn = false,
  notificationCount = role === "teacher" ? 5 : 2,
  loginHref = "/login",
  onLoginClick,
  onLogoutClick,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [active, setActive] = useState(0);

  const navItems = role === "teacher" ? teacherNav : studentNav;
  const meta = roleMeta[role];

  const initials = userName
    .split(" ")
    .map((w) => w[0])
    .slice(-2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-sky-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo + brand */}
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <img
              src="/images/logo.jpg"
              alt="Huấn Luyện Viên Online"
              className="w-9 h-9 rounded-xl object-cover ring-1 ring-sky-100 shadow-sm shadow-sky-200"
            />
            <span className="flex flex-col leading-tight">
              <span className="text-[15px] font-semibold text-slate-800">Huấn Luyện Viên Online</span>
              <span className={`text-[11px] font-medium ${meta.accentText}`}>
                Không gian dành cho {meta.label.toLowerCase()}
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActive(i)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                  active === i
                    ? `${meta.accentBg} ${meta.accentText}`
                    : "text-slate-600 hover:text-sky-700 hover:bg-sky-50"
                }`}
              >
                <span className={active === i ? meta.accentText : "text-slate-400"}>{item.icon}</span>
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right side (desktop) */}
          <div className="hidden lg:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <span
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${meta.accentBg} ${meta.accentText}`}
                >
                  {meta.label}
                </span>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setBellOpen((v) => !v)}
                    className="relative p-2 rounded-lg text-slate-500 hover:text-sky-700 hover:bg-sky-50 transition"
                    aria-label="Thông báo"
                  >
                    {Icon.bell}
                    {notificationCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-semibold flex items-center justify-center">
                        {notificationCount}
                      </span>
                    )}
                  </button>
                  {bellOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg border border-slate-100 shadow-lg shadow-slate-200/60 py-2">
                      <p className="px-4 pb-2 text-xs font-semibold text-slate-400">Thông báo mới</p>
                      {role === "teacher" ? (
                        <>
                          <p className="px-4 py-2 text-sm text-slate-600 hover:bg-sky-50">3 học sinh vừa nộp bài tập lớp 10A</p>
                          <p className="px-4 py-2 text-sm text-slate-600 hover:bg-sky-50">Buổi học "Ngữ pháp cơ bản" bắt đầu sau 30 phút</p>
                        </>
                      ) : (
                        <>
                          <p className="px-4 py-2 text-sm text-slate-600 hover:bg-sky-50">Huấn luyện viên đã chấm bài tập của bạn</p>
                          <p className="px-4 py-2 text-sm text-slate-600 hover:bg-sky-50">Buổi học tiếp theo bắt đầu sau 30 phút</p>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* User menu */}
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen((v) => !v)}
                    className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-slate-200 hover:bg-slate-50 transition"
                  >
                    <span className={`w-8 h-8 rounded-full ${meta.accent} text-white text-xs font-semibold flex items-center justify-center`}>
                      {initials || "U"}
                    </span>
                    <span className="text-sm font-medium text-slate-700">{userName}</span>
                    <span className={`text-slate-400 transition-transform ${menuOpen ? "rotate-180" : ""}`}>
                      {Icon.chevron}
                    </span>
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-slate-100 shadow-lg shadow-slate-200/60 py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-slate-600 hover:bg-sky-50 hover:text-sky-700">
                        Hồ sơ
                      </a>
                      {role === "teacher" ? (
                        <>
                          <a href="#" className="block px-4 py-2 text-sm text-slate-600 hover:bg-sky-50 hover:text-sky-700">
                            Quản lý lớp học
                          </a>
                          <a href="#" className="block px-4 py-2 text-sm text-slate-600 hover:bg-sky-50 hover:text-sky-700">
                            Quản lý học sinh
                          </a>
                        </>
                      ) : (
                        <a href="#" className="block px-4 py-2 text-sm text-slate-600 hover:bg-sky-50 hover:text-sky-700">
                          Lịch tập của tôi
                        </a>
                      )}
                      <a href="#" className="block px-4 py-2 text-sm text-slate-600 hover:bg-sky-50 hover:text-sky-700">
                        Cài đặt
                      </a>
                      <button
                        onClick={onLogoutClick}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                href={loginHref}
                onClick={onLoginClick}
                className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium transition shadow-sm shadow-sky-200"
              >
                Đăng nhập
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-sky-50"
            aria-label="Mở menu"
          >
            {mobileOpen ? Icon.close : Icon.menu}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-sky-100 bg-white px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1">
            {navItems.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  active === i ? `${meta.accentBg} ${meta.accentText}` : "text-slate-600 hover:text-sky-700 hover:bg-sky-50"
                }`}
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-3 pt-3 border-t border-slate-100">
            {isLoggedIn ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-8 h-8 rounded-full ${meta.accent} text-white text-xs font-semibold flex items-center justify-center`}>
                    {initials || "U"}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">{userName}</span>
                    <span className={`text-[11px] font-medium ${meta.accentText}`}>{meta.label}</span>
                  </div>
                </div>
                <button onClick={onLogoutClick} className="text-sm text-red-500 font-medium">
                  Đăng xuất
                </button>
              </div>
            ) : (
              <Link
                href={loginHref}
                onClick={onLoginClick}
                className="block w-full text-center py-2.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium transition"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}