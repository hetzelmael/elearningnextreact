import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import CourseCard from "../components/CourseCard";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import supabase from "../lib/supabaseClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function getServerSideProps() {
  const { data: courses, error } = await supabase.from("courses").select("*");

  if (error) {
    console.error(error);
    return { props: { courses: [] } };
  }

  return { props: { courses } };
}

export default function Home({ courses }) {
  return (
    <>
      <Head>
        <title>Plateforme de Formation E-Learning</title>
        <meta name="description" content="Liste des cours disponibles" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>
          <h1>Liste des cours disponibles</h1>
          <div>
            {courses && courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <p>Aucun cours disponible pour le moment.</p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
