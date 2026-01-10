import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getRelatedPosts, blogPosts } from '../../data/blogPosts'
import BlogPostClient from './BlogPostClient'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found | JH Painting Services Blog',
    }
  }

  return {
    title: `${post.title} | JH Painting Services Blog`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
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

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(params.slug, post.category, 3)

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />
}
