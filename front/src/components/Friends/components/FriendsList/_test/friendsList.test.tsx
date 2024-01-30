import { render, screen } from '@testing-library/react';
import FriendsList from '..';
import { User } from '../../../../../types/user';
import { MockedProvider } from '@apollo/client/testing';
import { FC } from 'react';
import { REMOVE_FRIEND } from '../../../../../gql/UsersGql';

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
    request: {
      query: REMOVE_FRIEND,
      variables: {
        input: {
          userId: 'TEST_USER_ID',
          userIdToRemove: 'TEST_ID_1',
        },
      },
    },
    result: jest.fn(() => ({
      data: {
        removeFriend: {
          id: 'TEST_ID_1',
        },
      },
    })),
  },
];

interface TestWrapperProps {
  list: User[];
  refetchList: () => void;
}

const TestWrapper: FC<TestWrapperProps> = ({ list, refetchList }) => {
  return (
    <MockedProvider addTypename={false} mocks={mocks}>
      <FriendsList list={list} refetchList={refetchList} />
    </MockedProvider>
  );
};

describe('FriendsList', () => {
  describe('given a user with friends', () => {
    it('should render a list of user with remove icons', () => {
      render(<TestWrapper list={FRIENDS_LIST} refetchList={() => {}} />);
      for (const friend of FRIENDS_LIST) {
        expect(screen.getByText(friend.pseudo)).toBeInTheDocument();
      }
    });
  });

  describe('given a user without added friends', () => {
    it('should not display users', () => {
      const { queryByText } = render(
        <TestWrapper list={[]} refetchList={() => {}} />,
      );
      for (const friend of FRIENDS_LIST) {
        expect(queryByText(friend.pseudo)).toBeNull();
      }
    });
  });
});
