import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',

      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'my-project',

      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
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
          username: credentials.email,
          password: credentials.password
        }
        console.log(payload)

        const res = await fetch('https://www.mecallapi.com/api/login', {
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
          return data.user
        }

        return null
      }
    })
  ],
  secret: 'LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=',

  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      console.log('user=>', user)
      if (account) {
        token.accessToken = account.access_token
        token.user = user
      }

      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      session.user = token.user

      return session
    }
  },
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '', // Hex color code #33FF5D
    logo: '/vercel.svg' // Absolute URL to image
  },

  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development'
})
