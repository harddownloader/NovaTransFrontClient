import { validateEmail } from './email'

describe('email validation', () => {
  test('simple email', () => {
    expect(validateEmail('googler@gmail.com')).toBe(true)
  })
})

