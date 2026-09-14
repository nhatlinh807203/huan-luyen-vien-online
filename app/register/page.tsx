// 'use client';
// import { useState, FormEvent } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// interface RegisterPageProps {
//   redirectTo?: string;
//   loginHref?: string;
// }

// export default function RegisterPage({
//   redirectTo = "/student/dashboard",
//   loginHref = "/login",
// }: RegisterPageProps) {
//   const router = useRouter();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     if (password !== confirmPassword) {
//       setError("Mật khẩu nhập lại không khớp.");
//       return;
//     }
//     if (password.length < 6) {
//       setError("Mật khẩu phải có ít nhất 6 ký tự.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });
//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Đăng ký thất bại. Vui lòng thử lại.");
//         return;
//       }

//       router.push(redirectTo);
//       router.refresh();
//     } catch {
//       setError("Không thể kết nối tới máy chủ. Vui lòng thử lại.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full flex bg-white">
//       {/* Left brand panel */}
//       <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-sky-600 to-sky-800">
//         <div className="absolute inset-0 opacity-20">
//           {[...Array(6)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute h-[2px] bg-white rounded-full"
//               style={{
//                 top: `${12 + i * 15}%`,
//                 left: "-10%",
//                 width: "120%",
//                 transform: `rotate(${-8 + i * 0.6}deg)`,
//               }}
//             />
//           ))}
//         </div>

//         <div className="relative z-10 flex flex-col justify-between p-12 text-white">
//           <a href="#" className="flex items-center gap-2.5">
//             <img
//               src="/images/logo.jpg"
//               alt="Huấn Luyện Viên Online"
//               className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/40"
//             />
//             <span className="text-lg font-semibold">Huấn Luyện Viên Online</span>
//           </a>

//           <div className="max-w-sm">
//             <h1 className="text-3xl font-semibold leading-snug">
//               Bắt đầu hành trình cùng huấn luyện viên phù hợp với bạn.
//             </h1>
//             <p className="mt-4 text-sm text-sky-100">
//               Tạo tài khoản học sinh miễn phí và chọn huấn luyện viên phù hợp với mục tiêu của bạn.
//             </p>
//           </div>

//           <div className="flex items-center gap-6 text-sm text-sky-100">
//             <div>
//               <p className="text-2xl font-semibold text-white">2.4k+</p>
//               <p>Học sinh đang học</p>
//             </div>
//             <div className="w-px h-8 bg-white/20" />
//             <div>
//               <p className="text-2xl font-semibold text-white">180+</p>
//               <p>Huấn luyện viên</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right form panel */}
//       <div className="flex-1 flex items-center justify-center px-6 py-12">
//         <div className="w-full max-w-sm">
//           <a href="#" className="lg:hidden flex items-center gap-2.5 mb-8">
//             <img
//               src="/images/logo.jpg"
//               alt="Huấn Luyện Viên Online"
//               className="w-9 h-9 rounded-xl object-cover ring-1 ring-sky-100"
//             />
//             <span className="text-[15px] font-semibold text-slate-800">Huấn Luyện Viên Online</span>
//           </a>

//           <h2 className="text-2xl font-semibold text-slate-800">Tạo tài khoản học sinh</h2>
//           <p className="mt-1.5 text-sm text-slate-500">Chỉ mất một phút để bắt đầu.</p>

//           <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
//                 Họ và tên
//               </label>
//               <input
//                 id="name"
//                 type="text"
//                 required
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Nguyễn Văn A"
//                 className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
//               />
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="ban@vidu.com"
//                 className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
//                 Mật khẩu
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Tối thiểu 6 ký tự"
//                 className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
//               />
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1.5">
//                 Nhập lại mật khẩu
//               </label>
//               <input
//                 id="confirmPassword"
//                 type="password"
//                 required
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 placeholder="••••••••"
//                 className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
//               />
//             </div>

//             {error && (
//               <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-3.5 py-2.5">
//                 {error}
//               </p>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-2.5 rounded-lg text-white text-sm font-medium transition shadow-sm disabled:opacity-60 bg-sky-600 hover:bg-sky-700"
//             >
//               {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
//             </button>
//           </form>

//           <p className="mt-4 text-xs text-slate-400 bg-slate-50 border border-slate-100 rounded-lg px-3.5 py-2.5">
//             Bạn là huấn luyện viên? Tài khoản giáo viên do quản trị viên cấp — vui lòng liên hệ{" "}
//             <a href="mailto:hotro@hlvonline.vn" className="text-sky-600 hover:underline">
//               hotro@hlvonline.vn
//             </a>{" "}
//             để được tạo tài khoản.
//           </p>

//           <p className="mt-6 text-center text-sm text-slate-500">
//             Đã có tài khoản?{" "}
//             <Link href={loginHref} className="font-medium text-sky-600 hover:underline">
//               Đăng nhập
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

interface RegisterPageProps {
  redirectTo?: string;
  loginHref?: string;
}

export default function RegisterPage({
  redirectTo = "/student/dashboard",
  loginHref = "/login",
}: RegisterPageProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Mật khẩu nhập lại không khớp.");
      return;
    }
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    setLoading(true);
    try {
      // 1. Đăng ký tài khoản
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Đăng ký thất bại. Vui lòng thử lại.");
        return;
      }

      // 2. Tự động đăng nhập sau khi đăng ký thành công
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        // Đăng ký thành công nhưng đăng nhập lỗi → chuyển về trang login
        router.push(loginHref);
        return;
      }

      // 3. Đăng nhập thành công → vào dashboard
      router.push(redirectTo);
      router.refresh();
    } catch {
      setError("Không thể kết nối tới máy chủ. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-sky-600 to-sky-800">
        <div className="absolute inset-0 opacity-20">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute h-[2px] bg-white rounded-full"
              style={{
                top: `${12 + i * 15}%`,
                left: "-10%",
                width: "120%",
                transform: `rotate(${-8 + i * 0.6}deg)`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <Link href="/" className="flex items-center gap-2.5">
            <img
              src="/images/logo.jpg"
              alt="Huấn Luyện Viên Online"
              className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/40"
            />
            <span className="text-lg font-semibold">Huấn Luyện Viên Online</span>
          </Link>

          <div className="max-w-sm">
            <h1 className="text-3xl font-semibold leading-snug">
              Bắt đầu hành trình cùng huấn luyện viên phù hợp với bạn.
            </h1>
            <p className="mt-4 text-sm text-sky-100">
              Tạo tài khoản học sinh miễn phí và chọn huấn luyện viên phù hợp với mục tiêu của bạn.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm text-sky-100">
            <div>
              <p className="text-2xl font-semibold text-white">2.4k+</p>
              <p>Học sinh đang học</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <p className="text-2xl font-semibold text-white">180+</p>
              <p>Huấn luyện viên</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link href="/" className="lg:hidden flex items-center gap-2.5 mb-8">
            <img
              src="/images/logo.jpg"
              alt="Huấn Luyện Viên Online"
              className="w-9 h-9 rounded-xl object-cover ring-1 ring-sky-100"
            />
            <span className="text-[15px] font-semibold text-slate-800">Huấn Luyện Viên Online</span>
          </Link>

          <h2 className="text-2xl font-semibold text-slate-800">Tạo tài khoản học sinh</h2>
          <p className="mt-1.5 text-sm text-slate-500">Chỉ mất một phút để bắt đầu.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                Họ và tên
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ban@vidu.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tối thiểu 6 ký tự"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1.5">
                Nhập lại mật khẩu
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-3.5 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg text-white text-sm font-medium transition shadow-sm disabled:opacity-60 bg-sky-600 hover:bg-sky-700"
            >
              {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
            </button>
          </form>

          <p className="mt-4 text-xs text-slate-400 bg-slate-50 border border-slate-100 rounded-lg px-3.5 py-2.5">
            Bạn là huấn luyện viên? Tài khoản giáo viên do quản trị viên cấp — vui lòng liên hệ{" "}
            <a href="mailto:hotro@hlvonline.vn" className="text-sky-600 hover:underline">
              hotro@hlvonline.vn
            </a>{" "}
            để được tạo tài khoản.
          </p>

          <p className="mt-6 text-center text-sm text-slate-500">
            Đã có tài khoản?{" "}
            <Link href={loginHref} className="font-medium text-sky-600 hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}