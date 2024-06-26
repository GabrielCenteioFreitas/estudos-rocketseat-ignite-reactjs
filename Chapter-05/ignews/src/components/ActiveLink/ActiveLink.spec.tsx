import { render, screen } from "@testing-library/react";
import { ActiveLink } from ".";

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

describe('ActiveLink component', () => {
  it('renders correctly', () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        Home
      </ActiveLink>
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('adds active class if the link is currently active', () => {
   render(
      <ActiveLink href="/" activeClassName="active">
        Home
      </ActiveLink>
    )

    expect(screen.getByText('Home')).toHaveClass('active')
  })
})
