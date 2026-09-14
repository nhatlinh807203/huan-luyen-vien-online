
// 'use client';

// import { useState, FormEvent } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [remember, setRemember] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const result = await signIn("credentials", {
//         email,
//         password,
//         redirect: false,
//       });

//       if (result?.error) {
//         setError("Email hoặc mật khẩu không đúng");
//         setLoading(false);
//         return;
//       }

//       // Đăng nhập thành công
//       router.push("/dashboard");
//       router.refresh();
//     } catch (err) {
//       setError("Có lỗi xảy ra, vui lòng thử lại");
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = () => {
//     signIn("google", { callbackUrl: "/dashboard" });
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
//           <a href="/" className="flex items-center gap-2.5">
//             <img
//               src="/images/logo.jpg"
//               alt="Huấn Luyện Viên Online"
//               className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/40"
//             />
//             <span className="text-lg font-semibold">Huấn Luyện Viên Online</span>
//           </a>

//           <div className="max-w-sm">
//             <h1 className="text-3xl font-semibold leading-snug">
//               Đồng hành cùng huấn luyện viên, đi đúng lộ trình của riêng bạn.
//             </h1>
//             <p className="mt-4 text-sm text-sky-100">
//               Theo dõi tiến độ, nhận phản hồi và quản lý lớp học chỉ trong một nơi.
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
//           {/* Mobile logo */}
//           <a href="/" className="lg:hidden flex items-center gap-2.5 mb-8">
//             <img
//               src="/images/logo.jpg"
//               alt="Huấn Luyện Viên Online"
//               className="w-9 h-9 rounded-xl object-cover ring-1 ring-sky-100"
//             />
//             <span className="text-[15px] font-semibold text-slate-800">Huấn Luyện Viên Online</span>
//           </a>

//           <h2 className="text-2xl font-semibold text-slate-800">Đăng nhập</h2>
//           <p className="mt-1.5 text-sm text-slate-500">Chào mừng bạn quay lại.</p>

//           {/* Error message */}
//           {error && (
//             <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
//               <div className="flex items-center justify-between mb-1.5">
//                 <label htmlFor="password" className="block text-sm font-medium text-slate-700">
//                   Mật khẩu
//                 </label>
//                 <a href="#" className="text-xs font-medium text-sky-600 hover:underline">
//                   Quên mật khẩu?
//                 </a>
//               </div>
//               <div className="relative">
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((v) => !v)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                   aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
//                 >
//                   {showPassword ? (
//                     <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
//                       <path d="M3.3 3.3a.75.75 0 0 1 1.06 0l12.3 12.3a.75.75 0 1 1-1.06 1.06l-1.7-1.7A9.9 9.9 0 0 1 10 16.5C5.5 16.5 2.2 13 1 10c.5-1.3 1.4-2.6 2.6-3.7L2.3 4.9a.75.75 0 0 1 1-1.6ZM10 6.5c-.6 0-1.2.1-1.7.4l1.9 1.9a2 2 0 0 1-1.9-1.9c.5-.3 1.1-.4 1.7-.4Z" />
//                       <path d="M13.9 10.7a4 4 0 0 0-4.6-4.6l1.4 1.4a2.5 2.5 0 0 1 1.9 1.9l1.3 1.3ZM17.9 10c-.4-1-1.1-2-1.9-2.8l-1.1 1.1c.5.5 1 1.1 1.4 1.7-1.3 3-4.6 5-6.3 5-.5 0-1-.1-1.5-.2l-1.2 1.2c.9.3 1.8.5 2.7.5C13.5 16.5 16.8 13 17.9 10Z" />
//                     </svg>
//                   ) : (
//                     <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
//                       <path d="M10 4.5C5.5 4.5 2.2 8 1 10c1.2 2 4.5 5.5 9 5.5s7.8-3.5 9-5.5c-1.2-2-4.5-5.5-9-5.5Zm0 9a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//             </div>

//             <label className="flex items-center gap-2 text-sm text-slate-600">
//               <input
//                 type="checkbox"
//                 checked={remember}
//                 onChange={(e) => setRemember(e.target.checked)}
//                 className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
//               />
//               Ghi nhớ đăng nhập
//             </label>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-2.5 rounded-lg text-white text-sm font-medium transition shadow-sm bg-sky-600 hover:bg-sky-700 disabled:opacity-60 disabled:cursor-not-allowed"
//             >
//               {loading ? "Đang đăng nhập..." : "Đăng nhập"}
//             </button>
//           </form>

//           <div className="my-6 flex items-center gap-3">
//             <div className="h-px flex-1 bg-slate-100" />
//             <span className="text-xs text-slate-400">Hoặc</span>
//             <div className="h-px flex-1 bg-slate-100" />
//           </div>

//           <button
//             type="button"
//             onClick={handleGoogleLogin}
//             className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
//           >
//             <svg viewBox="0 0 20 20" className="w-4 h-4">
//               <path fill="#4285F4" d="M19.6 10.2c0-.7-.06-1.4-.18-2H10v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3Z" />
//               <path fill="#34A853" d="M10 20c2.7 0 5-.9 6.6-2.5l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H1.1v2.6A10 10 0 0 0 10 20Z" />
//               <path fill="#FBBC05" d="M4.4 11.9a6 6 0 0 1 0-3.8V5.5H1.1a10 10 0 0 0 0 9l3.3-2.6Z" />
//               <path fill="#EA4335" d="M10 3.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8C14.9 1 12.7 0 10 0 6.1 0 2.7 2.2 1.1 5.5l3.3 2.6C5.2 5.8 7.4 3.9 10 3.9Z" />
//             </svg>
//             Tiếp tục với Google
//           </button>

//           <p className="mt-8 text-center text-sm text-slate-500">
//             Chưa có tài khoản?{" "}
//             <a href="/register" className="font-medium text-sky-600 hover:underline">
//               Đăng ký ngay
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email hoặc mật khẩu không đúng");
        setLoading(false);
        return;
      }

      // Đăng nhập thành công
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError("Có lỗi xảy ra, vui lòng thử lại");
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    signIn("google", { callbackUrl: "/dashboard" });
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
          <a href="/" className="flex items-center gap-2.5">
            <img
              src="/images/logo.jpg"
              alt="Huấn Luyện Viên Online"
              className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/40"
            />
            <span className="text-lg font-semibold">Huấn Luyện Viên Online</span>
          </a>

          <div className="max-w-sm">
            <h1 className="text-3xl font-semibold leading-snug">
              Đồng hành cùng huấn luyện viên, đi đúng lộ trình của riêng bạn.
            </h1>
            <p className="mt-4 text-sm text-sky-100">
              Theo dõi tiến độ, nhận phản hồi và quản lý lớp học chỉ trong một nơi.
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
          {/* Mobile logo */}
          <a href="/" className="lg:hidden flex items-center gap-2.5 mb-8">
            <img
              src="/images/logo.jpg"
              alt="Huấn Luyện Viên Online"
              className="w-9 h-9 rounded-xl object-cover ring-1 ring-sky-100"
            />
            <span className="text-[15px] font-semibold text-slate-800">Huấn Luyện Viên Online</span>
          </a>

          <h2 className="text-2xl font-semibold text-slate-800">Đăng nhập</h2>
          <p className="mt-1.5 text-sm text-slate-500">Chào mừng bạn quay lại.</p>

          {/* Error message */}
          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                disabled={loading || googleLoading}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Mật khẩu
                </label>
                <a href="#" className="text-xs font-medium text-sky-600 hover:underline">
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading || googleLoading}
                  className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition disabled:opacity-60 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M3.3 3.3a.75.75 0 0 1 1.06 0l12.3 12.3a.75.75 0 1 1-1.06 1.06l-1.7-1.7A9.9 9.9 0 0 1 10 16.5C5.5 16.5 2.2 13 1 10c.5-1.3 1.4-2.6 2.6-3.7L2.3 4.9a.75.75 0 0 1 1-1.6ZM10 6.5c-.6 0-1.2.1-1.7.4l1.9 1.9a2 2 0 0 1-1.9-1.9c.5-.3 1.1-.4 1.7-.4Z" />
                      <path d="M13.9 10.7a4 4 0 0 0-4.6-4.6l1.4 1.4a2.5 2.5 0 0 1 1.9 1.9l1.3 1.3ZM17.9 10c-.4-1-1.1-2-1.9-2.8l-1.1 1.1c.5.5 1 1.1 1.4 1.7-1.3 3-4.6 5-6.3 5-.5 0-1-.1-1.5-.2l-1.2 1.2c.9.3 1.8.5 2.7.5C13.5 16.5 16.8 13 17.9 10Z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M10 4.5C5.5 4.5 2.2 8 1 10c1.2 2 4.5 5.5 9 5.5s7.8-3.5 9-5.5c-1.2-2-4.5-5.5-9-5.5Zm0 9a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              />
              Ghi nhớ đăng nhập
            </label>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full py-2.5 rounded-lg text-white text-sm font-medium transition shadow-sm bg-sky-600 hover:bg-sky-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-100" />
            <span className="text-xs text-slate-400">Hoặc</span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading || googleLoading}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <svg viewBox="0 0 20 20" className="w-4 h-4">
              <path fill="#4285F4" d="M19.6 10.2c0-.7-.06-1.4-.18-2H10v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3Z" />
              <path fill="#34A853" d="M10 20c2.7 0 5-.9 6.6-2.5l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H1.1v2.6A10 10 0 0 0 10 20Z" />
              <path fill="#FBBC05" d="M4.4 11.9a6 6 0 0 1 0-3.8V5.5H1.1a10 10 0 0 0 0 9l3.3-2.6Z" />
              <path fill="#EA4335" d="M10 3.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8C14.9 1 12.7 0 10 0 6.1 0 2.7 2.2 1.1 5.5l3.3 2.6C5.2 5.8 7.4 3.9 10 3.9Z" />
            </svg>
            {googleLoading ? "Đang chuyển hướng..." : "Tiếp tục với Google"}
          </button>

          <p className="mt-8 text-center text-sm text-slate-500">
            Chưa có tài khoản?{" "}
            <a href="/register" className="font-medium text-sky-600 hover:underline">
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}