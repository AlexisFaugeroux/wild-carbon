import { MockedProvider } from '@apollo/client/testing';
import { FC } from 'react';
import { GET_USER } from '../../../gql/UserGql';
import { User } from '../../../types/user';
import FriendsCard from '..';
import { act, render, screen } from '@testing-library/react';

const FRIENDS_LIST: User[] = [
  {
    id: 'TEST_ID_1',
    pseudo: 'TEST_PSEUDO_1',
    email: 'TEST_EMAIL_1',
    password: 'TEST_PASSWORD_1',
    users: [],
  },
  {
    id: 'TEST_ID_2',
    pseudo: 'TEST_PSEUDO_2',
    email: 'TEST_EMAIL_2',
    password: 'TEST_PASSWORD_2',
    users: [],
  },
];

const mocks = [
  {
    delay: 30,
    request: {
      query: GET_USER,
      variables: {
        input: {
          userId: 'TEST_USER_ID',
        },
      },
    },
    result: jest.fn(() => ({
      data: {
        userData: {
          id: 'TEST_USER_ID',
          users: FRIENDS_LIST,
        },
      },
    })),
  },
];

const TestWrapper: FC = () => (
  <MockedProvider addTypename={false} mocks={mocks}>
    <FriendsCard />
  </MockedProvider>
);

describe('Friends', () => {
  describe('given a user with friends', () => {
    it('should load friends', () => {
      render(<TestWrapper />);
      act(async () => {
        expect(await screen.findByTestId('loading')).toBeInTheDocument();
      });

      act(async () => {
        expect(await screen.findByTestId('friendsList')).toBeInTheDocument();
      });
    });
  });

  describe('given the service is down', () => {
    const errorMock = [
      {
        delay: 30,
        request: {
          query: GET_USER,
          variables: {
            id: 'TEST_USER_ID',
          },
        },
        error: new Error('An error occured'),
      },
    ];

    const TestWrapperError: FC = () => (
      <MockedProvider addTypename={false} mocks={errorMock}>
        <FriendsCard />
      </MockedProvider>
    );

    it('should display an error message', () => {
      render(<TestWrapperError />);
      act(async () => {
        expect(await screen.findByTestId('loading')).toBeInTheDocument();
      });

      act(async () => {
        expect(
          await screen.findByText('Something broke !'),
        ).toBeInTheDocument();
      });
    });
  });
});
