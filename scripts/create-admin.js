const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcryptjs");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing Supabase URL or Service Role Key");
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
  },
});

async function createAdmin() {
  try {
    const email = "admin@renovaverdehub.com";
    const password = "admin123";

    // Verificar se o usuário já existe
    const { data: existingUser, error: existingError } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (existingError && existingError.code !== "PGRST116") {
      // PGRST116 means no rows found
      console.error("Error checking existing user:", existingError);
      throw existingError;
    }

    if (existingUser) {
      console.log("Usuário administrador já existe!");
      return;
    }

    // Criar hash da senha
    const passwordHash = await bcrypt.hash(password, 12);

    // Criar usuário
    const { data: user, error: createUserError } = await supabaseAdmin
      .from("users")
      .insert([
        {
          email,
          passwordHash,
        },
      ])
      .select();

    if (createUserError) {
      console.error("Error creating user:", createUserError);
      throw createUserError;
    }

    console.log("Usuário administrador criado com sucesso!");
    console.log("Email:", email);
    console.log("Senha:", password);
    console.log("ID:", user[0].id);
  } catch (error) {
    console.error("Erro ao criar usuário administrador:", error);
  }
}

createAdmin();


