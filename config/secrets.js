module.exports = {

  db: process.env.MONGODB_URL || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/stripe-membership',

  sessionSecret: process.env.SESSION_SECRET || 'elcinawillalwaysberemembered',

  mailgun: {
    user: process.env.MAILGUN_USER || 'postmaster@sandbox67e7a965dada48e29c81d1e9fbdedab2.mailgun.org',
    password: process.env.MAILGUN_PASSWORD || '11c24fbf66106e99a24e3c174d9a6032'
  },

  stripeOptions: {
    apiKey: process.env.STRIPE_KEY || 'sk_test_kaVJ6FqJRCkecspVho9K7u3q',
    stripePubKey: process.env.STRIPE_PUB_KEY || 'pk_test_XdVDGxpniL8niWpo2N8pp5E5',
    defaultPlan: 'free',
    plans: ['free', 'silver', 'gold', 'platinum'],
    planData: {
      'free': {
        name: 'Free',
        price: 0
      },
      'silver': {
        name: 'Silver',
        price: 9
      },
      'gold': {
        name: 'Gold',
        price: 19
      },
      'platinum': {
        name: 'Platinum',
        price: 29
      }
    }
  },

  googleAnalytics: process.env.GOOGLE_ANALYTICS || ''
};
