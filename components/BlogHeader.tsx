import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'

import styles from './BlogHeader.module.css'
import { urlForImage } from 'lib/sanity.image'

export default function BlogHeader({
  title,
  description,
  profileImage,
  level,
}: {
  title: string
  description?: any[]
  profileImage?: any
  level: 1 | 2 | 3
}) {
  switch (level) {
    case 1:
      return (
        <header className="mb-10 mt-16 flex flex-col items-center md:mb-12 md:flex-row md:justify-between">
          <h1 className="text-6xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl">
            {title}
          </h1>
          <h4
            className={`mt-5 text-center text-lg md:pl-8 md:text-left ${styles.portableText}`}
          >
            <PortableText value={description} />
          </h4>
        </header>
      )

    case 2:
      return (
        <header>
          <h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
            <Link href="/" className="hover:underline">
              {title}
            </Link>
          </h2>
        </header>
      )

    case 3:
      return (
        <header className="fixed z-10 min-w-full bg-white/90 ">
          <div className="mx-auto sm:w-3/4 pr-40">
            <div className="flex items-center justify-between px-12 py-3">
              <div className="flex items-center">
                <Image
                  className="h-12 w-12 rounded-full bg-violet-500 bg-auto bg-center bg-no-repeat p-1"
                  src={profileImage ? urlForImage(profileImage).height(120).width(120).url(): '/next.svg'}
                  alt="profile"
                  width="120"
                  height="120"
                />
                <h1 className="ml-4 text-lg font-bold text-violet-500">
                  {title}
                </h1>
              </div>
              <button className="rounded-lg bg-violet-500 px-4 py-2 text-white">
                Login
              </button>
            </div>
          </div>
        </header>
      )
    default:
      throw new Error(
        `Invalid level: ${
          JSON.stringify(level) || typeof level
        }, only 1 or 2 are allowed`
      )
  }
}
