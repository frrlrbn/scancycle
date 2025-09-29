import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { executeQuery } from '../../../../lib/database'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        try {
          console.log('Attempting to sign in user:', user.email);
          
          // Check if user exists
          const existingUser = await executeQuery(
            'SELECT * FROM users WHERE email = ?',
            [user.email]
          );

          if (existingUser.length === 0) {
            console.log('Creating new user');
            // Create new user
            await executeQuery(
              'INSERT INTO users (email, name, image, google_id, created_at) VALUES (?, ?, ?, ?, NOW())',
              [user.email, user.name, user.image, profile.sub]
            );
          } else {
            console.log('Updating existing user');
            // Update existing user
            await executeQuery(
              'UPDATE users SET name = ?, image = ?, last_login = NOW() WHERE email = ?',
              [user.name, user.image, user.email]
            );
          }
          console.log('User sign in successful');
          return true;
        } catch (error) {
          console.error('Error during sign in:', error);
          // Tetap allow sign in walaupun database error untuk development
          console.log('Allowing sign in despite database error for development');
          return true;
        }
      }
      return true;
    },
    async session({ session, token }) {
      try {
        const user = await executeQuery(
          'SELECT id, email, name, image FROM users WHERE email = ?',
          [session.user.email]
        );
        
        if (user.length > 0) {
          session.user.id = user[0].id;
        }
      } catch (error) {
        console.error('Error getting user session:', error);
        // Continue with session even if database fails
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt'
  },
})

export { handler as GET, handler as POST }