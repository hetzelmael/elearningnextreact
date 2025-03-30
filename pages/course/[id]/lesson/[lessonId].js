import { useRouter } from "next/router";
import { useAuth } from "../../../../context/AuthContext";
import { useEffect, useState } from "react";
import supabase from "../../../../lib/supabaseClient";
import styles from "@/styles/lesson.module.css";

const LessonDetail = ({ lesson, courseId }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Rediriger vers la page de connexion si non connecté
    } else {
      // Vérifier si la leçon est terminée pour cet utilisateur et ce cours
      const fetchCompletionStatus = async () => {
        const { data, error } = await supabase
          .from("progression")
          .select("is_completed")
          .eq("user_id", user.id)
          .eq("lesson_id", lesson.id)
          .eq("course_id", courseId)
          .single();

        if (data) {
          setIsCompleted(data.is_completed);
        }
      };

      fetchCompletionStatus();
    }
  }, [user, lesson.id, courseId, router]);

  const handleCompleteLesson = async () => {
    const { error } = await supabase.from("progression").upsert({
      user_id: user.id,
      lesson_id: lesson.id,
      course_id: courseId,
      is_completed: true,
    });

    if (error) {
      console.error(
        "Erreur lors de la mise à jour de la leçon :",
        error.message
      );
    } else {
      setIsCompleted(true); // Mettre à jour l'état local
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
        <p className={styles.completedMessage}>Leçon terminée !</p>
      )}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { lessonId, id: courseId } = params;

  const { data: lesson, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", lessonId)
    .single();

  if (error || !lesson) {
    return { notFound: true };
  }

  return { props: { lesson, courseId } };
}

export default LessonDetail;
