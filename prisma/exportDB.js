const { exec } = require('child_process')
const fs = require('fs')

// Escape caracteres especiais na senha (! → %21)
const DB_URL = "postgresql://postgres:637664Asdf%21c@db.xwuqniarzbttiktlqapj.supabase.co:5432/postgres"

// Consulta SQL que será executada
const query = `
  SELECT * FROM "Article";
  SELECT * FROM "Comment";
  SELECT * FROM "User";
`

// 1. Salva a query em um arquivo temporário
fs.writeFileSync('temp_query.sql', query)

// 2. Executa a exportação via Prisma
exec(`npx prisma db execute --url "${DB_URL}" --file ./temp_query.sql`, 
  (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Erro:', error.message)
      return
    }
    
    // 3. Salva o resultado
    fs.writeFileSync('backup_export.sql', stdout)
    console.log('✅ Backup criado: backup_export.sql')
    
    // 4. Limpa o arquivo temporário
    fs.unlinkSync('temp_query.sql')
})