import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import styles from "@/styles/Header.module.css";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          E-Learning
        </Link>
        <div>
          {user ? (
            <>
              <span className={styles.user}>Bienvenue, {user.email}</span>
              <button onClick={logout} className={styles.logoutButton}>
                Déconnexion
              </button>
            </>
          ) : (
            <Link href="/login" className={styles.loginButton}>
              Se connecter
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
