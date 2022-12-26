import React from 'react'
import Auth from './index'
import { waitFor } from '@testing-library/react'
import {render, act} from "@testing-library/react"
import userEvent from '@testing-library/user-event'



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

        const component = render(<Auth {...props} />)
        const emailInput = component.getByLabelText("Email")
        const passwordInput = component.getByLabelText("Password")
        const sendButton = component.getByDisplayValue('Войти')

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

        // await waitFor(() => expect(send).toHaveBeenCalledWith({
        //     email: user.email,
        //     name: '',
        //     password: user.password
        // }))

        // console.log(send.mock.calls[0][0])
    })
})