import { Query, Resolver } from 'type-graphql';
import Stripe from 'stripe';
import DonationResponse from '../helpers/DonationResponse';
import { isArray } from 'class-validator';
import * as dotenv from 'dotenv';
dotenv.config();

if (!process.env.STRIPE_KEY) {
  console.log('STRIPE_KEY is not set in .env');
  process.exit();
}

const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: '2023-08-16',
});

@Resolver()
class DonationResolver {
  @Query(() => DonationResponse)
  async getDonationsAmount(): Promise<DonationResponse> {
    try {
      const donations = await stripe.paymentIntents.list();
      if (isArray(donations?.data)) {
        const totalAmount = donations.data.reduce(
          (acc, currentElt) => acc + currentElt.amount,
          0,
        );
        const response: DonationResponse = { amount: totalAmount / 100 };
        return response;
      } else {
        throw new Error('data fetching failed');
      }
    } catch (err) {
      console.log('Stripe error: ', err);
      throw err;
    }
  }
}

export default DonationResolver;
