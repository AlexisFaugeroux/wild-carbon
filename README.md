# Balance ton carbone

C O 2là du réel ce projet

## Getting started

1. Clone the repo
2. run `docker-compose up --build`
3. `localhost:3000` for web-app
4. `localhost:4000/graphql` for studio apollo
5. `localhost:8080` for adminer
6. run `npm i` in `/back` & `front` if dev

## Troubleshooting

### My backend crashed !

- Check your .env in `/`, you should have postgres user, password, db, host, port and stripe_key

### I want to simulate a donation

- When on the Stripe Checkout page, use `4242 4242 4242 4242` for credit card number. Fill the rest with anything (Exp. date must be a valid date).
- For now, refresh the web-app page to see the amount updated

