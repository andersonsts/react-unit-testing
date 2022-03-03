import React from 'react'
import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import List from './components/List'

describe('List component', () => {
  it('should render list items',async () => {
    const { getByText } = render(<List initialItems={['Anderson', 'Diego', 'Pedro']} />)

    expect(getByText('Anderson')).toBeInTheDocument()
    expect(getByText('Diego')).toBeInTheDocument()
    expect(getByText('Pedro')).toBeInTheDocument()
  })

  it('should be able to add new item to the list', async () => {
    const screen = render(<List initialItems={['Anderson', 'Diego', 'Pedro']} />)

    screen.debug() // show html of element

    userEvent.type(screen.getByPlaceholderText(/new item/i), 'Novo')
    userEvent.click(screen.getByRole('button', { name: /adicionar/i }))

    screen.debug()

    expect(await screen.findByText('Novo')).toBeInTheDocument()
  })

  it('should be able to add new item to the list in another way', async () => {
    const screen = render(<List initialItems={['Anderson']} />)

    screen.debug() // show html of element

    userEvent.type(screen.getByPlaceholderText(/new item/i), 'Novo')
    userEvent.click(screen.getByRole('button', { name: /adicionar/i }))

    await waitFor(() => {
      expect(screen.getByText('Novo')).toBeInTheDocument()
    })

    screen.debug()
  })

  it('should remove item from list', async () => {
    const screen = render(<List initialItems={['Anderson', 'Diego', 'Pedro']} />)

    userEvent.click(screen.getAllByRole('button', { name: /remover/i })[0])

    // await waitForElementToBeRemoved(() => {
    //   return screen.getByText('Anderson')
    // })
    // it't the same...
    await waitFor(() => {
      expect(screen.queryByText('Anderson')).toBeInTheDocument()
    })
  })
})