import Home, { getStaticProps } from '@/pages'
import { stripe } from '../../services/stripe'
import { render, screen } from '@testing-library/react'
import { createMock } from 'ts-jest-mock'

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})
jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        push: jest.fn()
      }
    }
  }
})
jest.mock('@/services/stripe', () => {
  return {
    stripe: {
      prices: {
        retrieve: jest.fn()
      }
    }
  }
})

describe('Home page', () => {
  it('renders correclty', () => {    
    render(
      <Home product={ {
          priceId: 'fake-price-id',
          amount: 'R$10,00'
        } }
      />
    )

    expect(screen.getByText("for R$10,00 month")).toBeInTheDocument()
  })

  it('loads initial data', async () => {
    const retrieveStripePricesMocked = createMock(stripe.prices.retrieve)

    retrieveStripePricesMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000,
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10.00'
          }
        }
      })
    )
  })
})