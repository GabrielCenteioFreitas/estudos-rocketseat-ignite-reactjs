import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { Async } from '.'

test('it renders correctly', async () => {
  render(<Async />)

  expect(screen.getByText('Hello World')).toBeInTheDocument()

  // expect(await screen.findByText('Button')).toBeInTheDocument()
  // ou
  await waitFor(() => {
    return expect(screen.getByText('Button')).toBeInTheDocument()
  })
  // ou
  // await waitForElementToBeRemoved(screen.queryByText('Button'))
})