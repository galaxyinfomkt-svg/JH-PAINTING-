import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getRelatedPosts, blogPosts } from '../../data/blogPosts'
import { generatePageMetadata } from '@/lib/seo'
import BlogPostClient from './BlogPostClient'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return generatePageMetadata({
      title: 'Post Not Found | JH Painting Services Blog',
      description: 'The blog post you are looking for could not be found.',
      path: `/blog/${slug}`,
      noIndex: true,
    })
  }

  const base = generatePageMetadata({
    title: `${post.title} | Expert Tips from MA Painters`,
    description: `${post.excerpt} Get FREE painting quotes: (508) 690-8886`,
    path: `/blog/${post.slug}`,
    ogImage: post.image,
    ogImageAlt: post.title,
    ogType: 'article',
    keywords: post.tags.join(', '),
  })

  // Article-specific extras the helper does not cover: authors + publishedTime.
  // `type: 'article'` is repeated explicitly because TS loses the discriminator
  // when spreading an OpenGraph union (it widens the result to OpenGraphWebsite).
  return {
    ...base,
    authors: [{ name: post.author }],
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, post.category, 3)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: post.image,
        datePublished: post.date,
        dateModified: post.date,
        author: {
          '@type': 'Person',
          name: post.author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'JH Painting Services',
          logo: {
            '@type': 'ImageObject',
            url: 'https://storage.googleapis.com/msgsndr/0Def8kzJShLPuKrPk5Jw/media/696002676eabe616df3310e2.png',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://jhpaintingservices.com/blog/${post.slug}`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jhpaintingservices.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://jhpaintingservices.com/blog' },
          { '@type': 'ListItem', position: 3, name: post.title, item: `https://jhpaintingservices.com/blog/${post.slug}` },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPostClient post={post} relatedPosts={relatedPosts} />
    </>
  )
}
