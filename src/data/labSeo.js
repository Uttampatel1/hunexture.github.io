// SEO entries for the interactive Lab (/lab and /lab/:slug). Merged into seoMeta.
import { getAllBlogPosts } from './blogData'

export const labStaticPages = {
  '/lab': {
    title: 'Interactive AI Lab | Visual Explainers for ML & Maths | Hunexture',
    description: 'Hands-on 3D visual explainers of the maths behind the AI we ship: vectors, matrices, loss functions, gradient descent, logistic regression and probability.',
    h1: 'Interactive AI lab',
  },
}

export const labDynamicPages = () => {
  const pages = {}
  getAllBlogPosts().forEach((p) => {
    pages[`/lab/${p.slug}`] = {
      title: `${p.title} | Interactive ${p.category} Lab | Hunexture`,
      description: p.description,
      h1: p.title,
      parent: { name: 'Lab', path: '/lab' },
      type: 'Article',
    }
  })
  return pages
}
