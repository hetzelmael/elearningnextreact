import React from "react";
import Link from "next/link";
import styles from "@/styles/CourseCard.module.css";

const CourseCard = ({ course }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img
          src={course.image}
          alt={course.title}
          width="200"
          height="100"
          className={styles.image}
        />
      </div>
      <h2 className={styles.cardTitle}>{course.title}</h2>
      <p className={styles.cardDescription}>{course.description}</p>
      <Link
        href={`/course/${course.id}/courseDetails`}
        className={styles.cardLink}
      >
        Voir les détails
      </Link>
    </div>
  );
};

export default CourseCard;
