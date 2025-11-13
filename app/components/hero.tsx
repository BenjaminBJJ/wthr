"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-linear-to-b from-sky-100 to-blue-300 dark:from-slate-900 dark:to-sky-800 py-24">
      <Image
        src="/weather/animated/cloudy.svg"
        alt="Облака"
        fill
        className="object-cover opacity-30 pointer-events-none"
        priority
      />
      <div className="relative z-10 max-w-3xl px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-sky-900 dark:text-sky-50">
          Точная погода в{" "}
          <span className="text-sky-500 dark:text-sky-300">твоём городе</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-sky-800 dark:text-sky-100/80">
          Узнайте о текущей погоде, прогнозе и важной информации рядом с вами
        </p>

        <div className="mt-10">
          <Link
            href={"/weather"}
            className="bg-sky-600 p-3 hover:bg-sky-700 text-white rounded-full shadow-lg"
          >
            Проверить погоду
          </Link>
        </div>
      </div>
    </section>
  );
}
