import { fireEvent, render, screen } from "@testing-library/react";
import { createMock } from "ts-jest-mock";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SubscribeButton } from ".";

jest.mock('next-auth/react');
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn()
  })),
}));

describe('SubscribeButton component', () => {
  it('renders correctly', () => {
    const useSessionMocked = createMock(useSession)

    useSessionMocked.mockReturnValueOnce([null, false] as any)
    
    render(<SubscribeButton />)

    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })

  it('redirects user to sign in when not authenticated', () => {
    const signInMocked = createMock(signIn)
    const useSessionMocked = createMock(useSession)

    useSessionMocked.mockReturnValueOnce([null, false] as any)

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now')

    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  })

  it('redirects to posts when user already has a subscription', () => {
    const useRouterMocked = createMock(useRouter)
    const useSessionMocked = createMock(useSession)
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce(
      {
        data: {
          user: {
            name: 'John Doe',
            email: 'john.doe@example.com'
          },
          activeSubscription: 'fake-active-subscription',
          expires: 'fake-expires'
        },
        status: 'authenticated'
      } as any)

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any)

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now')

    fireEvent.click(subscribeButton)

    expect(pushMock).toHaveBeenCalledWith('/posts')
  })
})
