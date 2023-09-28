import { Query, Resolver } from 'type-graphql';
import Stripe from 'stripe';
import DonationResponse from '../helpers/DonationResponse';
import { isArray } from 'class-validator';
import * as dotenv from 'dotenv';
dotenv.config();

let stripe_key = process.env.STRIPE_KEY;
if (!stripe_key) {
  console.log(
    'STRIPE_KEY is not set in .env, using public key but this will not work',
  );
  stripe_key =
    'pk_test_51NuvMzJEwVqT2uVtTQuXUu4rsfkBIykgkpaGpKMpS4B48aU8ZRHuwGzt6XMm6PKgYPFPOhjWQahYhvgPJVt7KI2b004Akj68f9';
}

const stripe = new Stripe(stripe_key, {
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
