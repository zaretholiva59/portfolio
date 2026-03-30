/**
 * PDFs estáticos en `public/`.
 * Nota: `BASE_URL` permite funcionar en GitHub Pages (subpath).
 */
const BASE_URL = import.meta.env.BASE_URL || '/'

/** Coloca el archivo en `public/assets/docs/Certificado Zareth.pdf` */
export const CERTIFICADO_LABORAL_EL_URL =
  `${BASE_URL}assets/docs/Certificado%20Zareth.pdf`
