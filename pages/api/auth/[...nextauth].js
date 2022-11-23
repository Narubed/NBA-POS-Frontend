import dayjs from 'dayjs'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'my-project',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'jsmith@example.com'
        },
        password: { label: 'Password', type: 'password' },
        tenantKey: {
          label: 'Tenant Key',
          type: 'text'
        }
      },
      async authorize(credentials, req) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
          date: dayjs(Date.now()).format()
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_POS_BACKEND}/signin`, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
            tenant: credentials.tenantKey,
            'Accept-Language': 'en-US'
          }
        })
        const data = await res.json()
        if (data.status == 'ok') {
          if (data.user.status === false) {
            return null
          } else {
            return data.user
          }
        }

        return null
      }
    })
  ],
  secret: 'LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=',
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60 * 1 // 1 day
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  pages: {
    signIn: '/signin'
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token
        token.user = user
      }

      return token
    },
    async session({ session, token, user, maxAge }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      session.user = token.user

      return session
    }
  },

  theme: {
    colorScheme: 'dark', // "auto" | "dark" | "light"
    brandColor: '', // Hex color code #33FF5D
    logo: '/vercel.svg' // Absolute URL to image
  },

  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development'
})
