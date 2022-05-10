import groq from 'groq';
import Tag from '../../components/Tag';
import {getClient} from "../../lib/sanity-server";
import {PortableText} from "@portabletext/react";
import {urlFor} from "../../lib/sanity";
import Map from '../../components/Map';

const PostComponents = {
  types: {
    image: ({value}) => {
      return (
        <img src={urlFor(value)} alt={value.alt || ''} className='post-image'/>
      )
    }
  }
}

export default function Post({post}) {
  console.log(post);
  return (
    <div>
      {post && <article>
        <h1>{post.title}</h1>
        <hr/>
        <div>
          {post.categories.length > 0 && post.categories.map(category => (
            <Tag key={category._id} title={category.title}/>
          ))}
        </div>

        <PortableText value={post.body} components={PostComponents}/>

        <hr/>

        <div>
          <div>
            <img src={urlFor(post.authorImage).url()} alt=""/>
            <h3>Author: <strong>{post.username}</strong></h3>
            <p>About author</p>
            <PortableText value={post.about} components={PostComponents}/>
          </div>
          <div>

          </div>
          <div>
            <Map longitud={post.postedAt.lat} latitude={post.postedAt.lat}/>
          </div>
        </div>

      </article>}
    </div>
  )
}

const query = groq`
  *[_type == "post" && slug.current == $slug][0] {
    title,
    "username": author->name,
    "about": author->bio,
    "categories": categories[]->{_id, title},
    "authorImage": author->image,
    body,
    publishedAt,
    mainImage,
    postedAt
  }
`

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: false,
  }
}

export async function getStaticProps({params, preview = false}) {
  const post = await getClient(preview).fetch(query, {slug: params.slug})

  return {
    props: {
      post,
    }
  }
}
