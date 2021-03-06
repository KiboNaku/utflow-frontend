import React, { Component } from 'react'
import VerifyEmailComponent from './_components/VerifyEmailComponent'
import { sendConfirmEmail } from './_utils/UserFunctions'
import { withRouter } from 'react-router-dom'
import './popups.css'

class VerifyEmail extends Component {

    constructor() {
        super()
        this.state = {
            loading: 0,
        }
        this.timeout = this.timeout.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillUnmount() {
        if (this.state.loading > 0) clearTimeout(this.id)
    }

    timeout(){
        this.id = setTimeout(() => {

            if(this.state.loading > 0){
                this.setState(prevState => ({ loading: prevState.loading-1 }))
                this.timeout()
            }
        }, 1000)
    }

    onSubmit(e) {

        e.preventDefault()
        this.setState({ loading: 30 })

        this.timeout()

        sendConfirmEmail()
    }

    render() {

        return (
            <VerifyEmailComponent onSubmit={this.onSubmit} data={this.state} />
        )
    }
}

export default withRouter(VerifyEmail)