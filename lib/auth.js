import supabase from "./supabaseClient";
export const signupUser = async (email, password, role = "user") => {
  try {
    const { data, error } = await supabase.from("users").insert([
      {
        email,
        password,
        role,
      },
    ]);

    if (error) {
      return { error: "Erreur lors de la création du compte." };
    }

    return { user: data[0] };
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error.message);
    return { error: "Erreur interne du serveur." };
  }
};
export const loginUser = async (email, password) => {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return { error: "Utilisateur non trouvé." };
    }
    if (user.password !== password) {
      return { error: "Mot de passe incorrect." };
    }

    return { user };
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.message);
    return { error: "Erreur interne du serveur." };
  }
};
