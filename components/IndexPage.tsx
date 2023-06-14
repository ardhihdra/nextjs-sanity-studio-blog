import { PortableText } from '@portabletext/react'
import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import HeroPost from 'components/HeroPost'
import IndexPageHead from 'components/IndexPageHead'
import IntroTemplate from 'intro-template'
import * as demo from 'lib/demo.data'
import { urlForImage } from 'lib/sanity.image'
// import MoreStories from 'components/MoreStories'
import type { Post, Settings } from 'lib/sanity.queries'
import Image from 'next/image'
import Link from 'next/link'
import { IoLogoInstagram, IoLogoTwitter } from 'react-icons/io'
import { MdOutlineMail } from 'react-icons/md'

import { CoverImageFull } from './CoverImage'
export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  posts: Post[]
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, posts, settings } = props
  const [heroPost, ...morePosts] = posts || []
  const {
    title = demo.title,
    profileImage,
    description = demo.description,
  } = settings || {}

  return (
    <>
      <IndexPageHead settings={settings} />
      <Layout preview={preview} loading={loading}>
        <Container>
          <BlogHeader
            title={title}
            description={description}
            level={3}
            profileImage={profileImage || '/next.svg'}
          />
          {/* {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.mainImage}
              date={heroPost.publishedAt}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
          <div>
            <Home
              title={title}
              description={description}
              heroPost={heroPost}
              morePosts={morePosts}
              profileImage={profileImage || '/next.svg'}
            />
          </div>
        </Container>
        {/* <IntroTemplate /> */}
      </Layout>
    </>
  )
}

interface HeaderProps {
  title?: string
  description?: any[]
  heroPost?: Post
  morePosts?: Post[]
}

function Home({ title, description, heroPost, morePosts, profileImage }) {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-12 pt-24 sm:p-24">
        <div className="w-full sm:w-3/4">
          <div className="grid h-[40rem] w-full gap-4 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-2">
            <PreviewCard
              className="relative rounded-xl sm:row-span-2"
              title={heroPost?.title}
              description={heroPost?.excerpt}
              image={heroPost?.mainImage}
              slug={heroPost?.slug}
            />
            {morePosts[0] ? (
              <PreviewCard
                className="relative rounded-xl sm:col-span-2"
                title={morePosts[0]?.title}
                description={morePosts[0]?.excerpt}
                image={morePosts[0]?.mainImage}
                slug={morePosts[0]?.slug}
              />
            ) : (
              <div className="relative rounded-xl bg-stone-200 sm:col-span-2"></div>
            )}
            {morePosts[1] ? (
              <PreviewCard
                className="relative rounded-xl sm:col-span-2"
                title={morePosts[1]?.title}
                description={morePosts[1]?.excerpt}
                image={morePosts[1]?.mainImage}
                slug={morePosts[1]?.slug}
              />
            ) : (
              <div className="relative rounded-xl bg-stone-200 sm:col-span-2"></div>
            )}
          </div>
          <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-violet-100 px-32 py-24 drop-shadow">
            <Image
              className="h-48 w-48 rounded-full bg-violet-500 bg-auto bg-no-repeat"
              src={
                profileImage
                  ? urlForImage(profileImage).height(225).width(225).url()
                  : '/next.svg'
              }
              alt="profile"
              width="225"
              height="225"
            />
            <h2 className="font-bold">{title}</h2>
            <PortableText value={description} />
            {/* <p className="text-xl text-center">
              Apoy Sarapoy adalah seorang pencerita di social media, buku, film layar lebar, dan hal-hal di antaranya.
            </p> */}
            {/* <p className="text-xl text-center">Dalam website resmi ini, kamu bisa membaca produk digital yang dikeluarkan oleh Apoy.</p> */}
            <div className="mt-4 flex gap-8">
              <div>
                <MdOutlineMail size="44" />
              </div>
              <div>
                <IoLogoInstagram size="44" />
              </div>
              <div>
                <IoLogoTwitter size="44" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

interface PreviewCardProps {
  className?: string
  title?: string
  description?: any[]
  image?: any
  slug?: string
}

function PreviewCard({
  className,
  title,
  description,
  image,
  slug,
}: PreviewCardProps) {
  return (
    <div className={className}>
      {/* <Image src={src} className="absolute rounded-xl object-fill h-full w-full z-0" alt="banner" width="100" height="640"/> */}

      <div className="absolute z-0 h-full w-full rounded-xl object-fill">
        <CoverImageFull slug={slug} title={title} image={image} priority />
      </div>
      <div className="absolute bottom-0 w-full rounded-bl-xl rounded-br-xl bg-stone-400/20 p-4 text-white">
        <Link
          className="group rounded-lg border border-transparent px-5 py-4"
          target="_blank"
          rel="noopener noreferrer"
          href={`/posts/${slug}` || '/'}
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            {title}{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{description}</p>
        </Link>
      </div>
    </div>
  )
}
