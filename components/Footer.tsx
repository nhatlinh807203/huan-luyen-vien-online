interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  columns?: FooterColumn[];
}

/* ---------- icons ---------- */

const SocialIcon = {
  facebook: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M12 5.5h1.5V3.1C13.2 3.05 12.3 3 11.3 3 9 3 7.5 4.4 7.5 7v2.1H5v2.7h2.5V17h2.8v-5.2h2.3l.4-2.7h-2.7V7.3c0-.8.2-1.3 1.2-1.3Z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M17.5 6.2a2 2 0 0 0-1.4-1.4C14.7 4.5 10 4.5 10 4.5s-4.7 0-6.1.3a2 2 0 0 0-1.4 1.4C2.2 7.6 2.2 10 2.2 10s0 2.4.3 3.8a2 2 0 0 0 1.4 1.4c1.4.3 6.1.3 6.1.3s4.7 0 6.1-.3a2 2 0 0 0 1.4-1.4c.3-1.4.3-3.8.3-3.8s0-2.4-.3-3.8ZM8.2 12.6V7.4L12.8 10l-4.6 2.6Z" />
    </svg>
  ),
  zalo: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M10 2.5A7.5 7.5 0 0 0 3.8 14.4L3 17.5l3.3-.9A7.5 7.5 0 1 0 10 2.5Zm-3.1 6h1.3v4.4H6.9V8.5Zm2.6 0h3.7v1.1h-2.4l2.4 2.2v1.1h-3.8v-1.1h2.5l-2.4-2.2V8.5Z" />
    </svg>
  ),
};

const defaultColumns: FooterColumn[] = [
  {
    title: "Về chúng tôi",
    links: [
      { label: "Giới thiệu", href: "#" },
      { label: "Đội ngũ huấn luyện viên", href: "#" },
      { label: "Tuyển dụng", href: "#" },
    ],
  },
  {
    title: "Khóa học",
    links: [
      { label: "Tất cả khóa học", href: "#" },
      { label: "Lộ trình học", href: "#" },
      { label: "Học thử miễn phí", href: "#" },
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      { label: "Câu hỏi thường gặp", href: "#" },
      { label: "Hướng dẫn sử dụng", href: "#" },
      { label: "Chính sách hoàn tiền", href: "#" },
    ],
  },
];

export default function Footer({ columns = defaultColumns }: FooterProps) {
  return (
    <footer className="w-full bg-white border-t border-sky-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2.5">
              <img
                src="/images/logo.jpg"
                alt="Huấn Luyện Viên Online"
                className="w-9 h-9 rounded-xl object-cover ring-1 ring-sky-100"
              />
              <span className="text-[15px] font-semibold text-slate-800">Huấn Luyện Viên Online</span>
            </a>
            <p className="mt-3 text-sm text-slate-500 max-w-xs">
              Kết nối học sinh với huấn luyện viên phù hợp, học tập theo lộ trình
              riêng và theo dõi tiến độ mỗi ngày.
            </p>

            <div className="mt-5 flex items-center gap-2">
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center hover:bg-sky-600 hover:text-white transition"
              >
                {SocialIcon.facebook}
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center hover:bg-sky-600 hover:text-white transition"
              >
                {SocialIcon.youtube}
              </a>
              <a
                href="#"
                aria-label="Zalo"
                className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center hover:bg-sky-600 hover:text-white transition"
              >
                {SocialIcon.zalo}
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-slate-800">{col.title}</h3>
              <ul className="mt-3.5 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-sky-700 transition"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Liên hệ</h3>
            <ul className="mt-3.5 space-y-2.5 text-sm text-slate-500">
              <li>hotro@hlvonline.vn</li>
              <li>1900 6868</li>
              <li>Biên Hòa, Đồng Nai</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-sky-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Huấn Luyện Viên Online. Đã đăng ký bản quyền.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-slate-400 hover:text-sky-700 transition">
              Điều khoản
            </a>
            <a href="#" className="text-xs text-slate-400 hover:text-sky-700 transition">
              Bảo mật
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}