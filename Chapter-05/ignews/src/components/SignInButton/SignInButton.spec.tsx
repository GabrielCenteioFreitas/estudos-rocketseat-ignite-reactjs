import { render, screen } from "@testing-library/react";
import { createMock } from 'ts-jest-mock'
import { useSession } from "next-auth/react";
import { SignInButton } from ".";

jest.mock('next-auth/react')

describe('SignInButton component', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = createMock(useSession)

    useSessionMocked.mockReturnValueOnce([null, false] as any)

    render(
      <SignInButton />
    )

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
  })
  
  it('renders correctly when user is authenticated', () => {
    const useSessionMocked = createMock(useSession)

    useSessionMocked.mockReturnValueOnce(
      {
        data: {
          user: {
            name: 'John Doe',
            email: 'john.doe@example.com'
          },
          expires: 'fake-expires'
        },
        status: 'authenticated'
      } as any)

    render(
      <SignInButton />
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})
