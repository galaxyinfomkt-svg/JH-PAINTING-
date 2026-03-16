import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getRelatedPosts, blogPosts } from '../../data/blogPosts'
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
    return {
      title: 'Post Not Found | JH Painting Services Blog',
    }
  }

  return {
    title: `${post.title} | Expert Tips from MA Painters`,
    description: `${post.excerpt} Get FREE painting quotes: (508) 690-8886`,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: `${post.title} | JH Painting MA`,
      description: `${post.excerpt} Call for FREE estimate!`,
      url: `https://jhpaintingservices.com/blog/${post.slug}`,
      siteName: 'JH Painting Services',
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: `https://jhpaintingservices.com/blog/${post.slug}`,
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
