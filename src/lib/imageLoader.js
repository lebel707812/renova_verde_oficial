// Custom image loader para build estático
export default function imageLoader({ src, width, quality }) {
  // Para imagens locais, retorna o src como está
  if (src.startsWith('/')) {
    return src;
  }
  
  // Para imagens externas, você pode implementar otimização aqui
  return src;
}

