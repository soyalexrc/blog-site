import {urlFor} from "../lib/sanity";
import Tag from "./Tag";
import {forwardRef} from "react";

const Card = forwardRef(({onClick, href, post}, ref) => {
  return (
    <div href={href} onClick={onClick} ref={ref}>
      <h2>{post.title}</h2>
      <p>Published on: {new Date(post.publishedAt).toDateString()}</p>

      <img src={urlFor(post.mainImage).url()} alt=""/>
      <hr/>

      <div>
        <p>Posted by: {post.username}</p>
        <img src={urlFor(post.authorImage).url()} alt=""/>
      </div>

      <div>
        {post.categories.map(category => (
          <Tag key={category._id}  title={category.title}/>
        ))}
      </div>
    </div>

  )
})

Card.displayName = "Card";

export default Card;
