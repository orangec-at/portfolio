import { Bungee, Raleway, Space_Grotesk } from 'next/font/google'

const raleway = Raleway({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
})
const bungee = Bungee({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bungee',
})

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export { raleway, bungee, space_grotesk }
