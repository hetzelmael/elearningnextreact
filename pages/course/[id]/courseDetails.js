import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import supabase from "../../../lib/supabaseClient";
import styles from "@/styles/Course.module.css";
import { useEffect, useState } from "react";

const CourseDetail = ({ course, lessons }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    if (user) {
      // Récupérer les leçons terminées pour cet utilisateur et ce cours
      const fetchCompletedLessons = async () => {
        const { data, error } = await supabase
          .from("progression")
          .select("lesson_id")
          .eq("user_id", user.id)
          .eq("course_id", course.id)
          .eq("is_completed", true);

        if (data) {
          setCompletedLessons(data.map((item) => item.lesson_id));
        }
      };

      fetchCompletedLessons();
    }
  }, [user, course.id]);

  const progress = (completedLessons.length / lessons.length) * 100;

  if (!course || !lessons) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{course.title}</title>
        <meta name="description" content={course.description} />
      </Head>
      <div className={styles.page}>
        <main className={styles.main}>
          <button onClick={() => router.back()} className={styles.backButton}>
            Retour
          </button>
          <h1 className={styles.title}>{course.title}</h1>
          <img src={course.image} alt={course.title} className={styles.image} />
          <p className={styles.description}>{course.description}</p>
          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <h2 className={styles.subtitle}>Leçons</h2>
          <ul className={styles.list}>
            {lessons.map((lesson) => (
              <li key={lesson.id} className={styles.listItem}>
                <Link
                  href={`/course/${course.id}/lesson/${lesson.id}`}
                  className={styles.link}
                >
                  {lesson.title}
                </Link>
                {completedLessons.includes(lesson.id) && (
                  <span className={styles.completedBadge}>Terminé</span>
                )}
              </li>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { id } = params;

  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (courseError) {
    console.error(courseError);
    return { props: { course: null, lessons: [] } };
  }

  const { data: lessons, error: lessonsError } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", id);

  if (lessonsError) {
    console.error(lessonsError);
    return { props: { course, lessons: [] } };
  }

  return { props: { course, lessons } };
}

export default CourseDetail;
