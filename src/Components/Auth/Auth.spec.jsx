import React from 'react'
import Auth from './index'
import { waitFor } from '@testing-library/react'
import {render, act} from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../store'




describe('Auth', () => {
    const user = {
        email: 'jestTest@test.com',
        password: 'jestTestPassword'
    }

    const props = {
        send: jest.fn(),
        isRegistered: true
    }

    it('Submit', async () => {

        // eslint-disable-next-line testing-library/render-result-naming-convention
        const component = render(<Provider store={store}><Auth {...props} /></Provider>)
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const emailInput = component.getByLabelText("Email")
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const passwordInput = component.getByLabelText("Password")
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const sendButton = component.getByDisplayValue('Log in')

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async() => {
            userEvent.type(emailInput, user.email)
            userEvent.type(passwordInput, user.password)
            userEvent.click(sendButton)
        })

        await waitFor(() => expect(props.send.mock.calls[0][0]).toEqual({
            email: user.email,
            name: '',
            password: user.password
        }))
    })
})