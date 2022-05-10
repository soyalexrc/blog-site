import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import { getClient } from "../lib/sanity-server";
import groq from 'groq';
import Card from "../components/Card";

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div>
      <Head>
        <title>Hello!, welcome to my blog!</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <div>
        {posts.map(post => (
          <Link key={post._id} href="/posts/[slug]" as={`/posts/${post.slug.current}`}  passHref >
            <Card post={post} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps({ preview = false}) {
  const posts = await getClient(preview).fetch(groq`
    *[_type == "post" && publishedAt < now()] | order(publishedAt desc) {
      _id,
      title,
      "username": author->name,
      "categories": categories[]->{title, _id},
      "authorImage": author->image,
      body,
      slug,
      postedAt,
      mainImage,
      publishedAt
    }
  `)
  return {
    props: {
      posts,
    }
  }
}

