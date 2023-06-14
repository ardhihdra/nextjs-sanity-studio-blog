import { groq } from 'next-sanity'

const postFields = groq`
  _id,
  title,
  publishedAt,
  date,
  excerpt,
  coverImage,
  mainImage,
  "slug": slug.current,
  "author": author->{name, picture, image},
`

export const settingsQuery = groq`*[_type == "settings"][0]`

export const indexQuery = groq`
*[_type == "post"] | order(publishedAt desc, _updatedAt desc) {
  ${postFields}
}`

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    body,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(publishedAt desc, _updatedAt desc) [0...2] {
    body,
    ${postFields}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

export interface Author {
  name?: string
  picture?: any
  image?: any
  bio?: string
}

export interface Post {
  _id: string
  title?: string
  coverImage?: any
  mainImage?: any
  date?: string
  publishedAt?: string
  excerpt?: string
  author?: Author
  slug?: string
  content?: any
  body?: any
}

export interface Settings {
  title?: string
  description?: any[]
  profileImage?: any
  ogImage?: {
    title?: string
  }
}
