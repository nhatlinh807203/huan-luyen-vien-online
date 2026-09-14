import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    // Kiểm tra dữ liệu đầu vào
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Vui lòng điền đầy đủ thông tin" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Mật khẩu phải có ít nhất 6 ký tự" },
        { status: 400 }
      );
    }

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email đã được sử dụng" },
        { status: 400 }
      );
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 12);

    // Tạo user mới
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: role || "student",
      },
    });

    return NextResponse.json(
      {
        message: "Đăng ký thành công",
        userId: user.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { message: "Lỗi server, vui lòng thử lại" },
      { status: 500 }
    );
  }
}