const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const email = 'admin@renovaverdehub.com';
    const password = 'admin123';
    
    // Verificar se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      console.log('Usuário administrador já existe!');
      return;
    }
    
    // Criar hash da senha
    const passwordHash = await bcrypt.hash(password, 12);
    
    // Criar usuário
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash
      }
    });
    
    console.log('Usuário administrador criado com sucesso!');
    console.log('Email:', email);
    console.log('Senha:', password);
    console.log('ID:', user.id);
    
  } catch (error) {
    console.error('Erro ao criar usuário administrador:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();

