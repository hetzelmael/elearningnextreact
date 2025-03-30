import { useRouter } from "next/router";
import { useAuth } from "../../../../context/AuthContext";
import { useEffect, useState } from "react";
import supabase from "../../../../lib/supabaseClient";
import styles from "@/styles/lesson.module.css";

const LessonDetail = ({ lesson }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(lesson.is_completed);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleCompleteLesson = async () => {
    const { error } = await supabase
      .from("lessons")
      .update({ is_completed: true })
      .eq("id", lesson.id);

    if (error) {
      console.error(
        "Erreur lors de la mise à jour de la leçon :",
        error.message
      );
    } else {
      setIsCompleted(true);
    }
  };

  if (!user) {
    return <p>Redirection vers la page de connexion...</p>;
  }

  return (
    <div className={styles.page}>
      <button className={styles.backButton} onClick={() => router.back()}>
        Retour
      </button>
      <h1 className={styles.title}>{lesson.title}</h1>
      <div className={styles.content}>{lesson.content}</div>
      {!isCompleted ? (
        <button
          className={styles.completeButton}
          onClick={handleCompleteLesson}
        >
          Marquer comme terminé
        </button>
      ) : (
        <p className={styles.completedBadge}>Leçon terminée !</p>
      )}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { lessonId } = params;

  const { data: lesson, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", lessonId)
    .single();

  if (error || !lesson) {
    return { notFound: true };
  }

  return { props: { lesson } };
}

export default LessonDetail;
