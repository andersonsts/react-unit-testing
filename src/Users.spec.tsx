import React from 'react'
import { mocked } from 'jest-mock'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import getUsers from './services/users'
import Users from './components/Users'

jest.mock('./services/users')

const mockReject = () => {
  const mockedFn = mocked(getUsers)
  mockedFn.mockRejectedValueOnce('some error')
}

const errorMsg = async () => await screen.findByText('Error :/')

describe('Users component', () => {
  it('should render name and username', async () => {
    const mockedFn = mocked(getUsers)
    mockedFn.mockResolvedValueOnce([{ id: 1, name: 'pedro', username: 'sousa' }])

    render(<Users />)

    expect(await screen.findByText('pedro')).toBeInTheDocument()
    expect(await screen.findByText('sousa')).toBeInTheDocument()
  })

  it('should render error message if has errors in call', async () => {
    mockReject()

    render(<Users />)
    
    expect(await errorMsg()).toBeInTheDocument()
  })

  it('should hide error container when it was clicked', async () => {
    mockReject()

    render(<Users />)

    userEvent.click(await errorMsg())
    
    expect(screen.queryByText('Error :/')).not.toBeInTheDocument()
  })
})