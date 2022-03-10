import '@testing-library/jest-dom/extend-expect'
import { renderHook } from '@testing-library/react-hooks'
import useFetch from './useFetch'
import fetchMock from '../utils/fetchMock'

// global.fetch = jest.fn().mockImplementation(fetchMock)
global.fetch = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue([{ title: 'title1' }])
})

test('should increment counter', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useFetch())

  expect(result.current.tasks).toEqual([])
  await waitForNextUpdate()
  expect(result.current.tasks).toEqual(['title1'])
})