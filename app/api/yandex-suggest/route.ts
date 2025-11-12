import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text");

  if (!text) {
    return NextResponse.json({ error: "Missing 'text'" }, { status: 400 });
  }

  try {
    const url = `https://suggest-maps.yandex.ru/v1/suggest?text=${encodeURIComponent(
      text
    )}&types=country,province,locality&apikey=${
      process.env.NEXT_PUBLIC_YANDEX_MAP_SUGGEST_API
    }`;

    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
