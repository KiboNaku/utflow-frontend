import React from 'react'
import { GoogleLogin } from 'react-google-login'


const CLIENT_ID = '879307292662-75ogu33tfvgqedodsagga1jni88ueub4.apps.googleusercontent.com'

class GoogleButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <GoogleLogin
                    render={renderProps => (
                        <button className='btn btn-lg btn-dark btn-block mt-2 font-weight-bold'
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}>{this.props.text}
                        </button>
                    )}
                    clientId={CLIENT_ID}
                    buttonText={this.props.text}
                    onSuccess={this.props.loginGoogle}
                    onFailure={(error) => this.props.handleLoginFailureGoogle(error)}
                    theme="dark"
                />
            </div>
        )
    }
}


export default GoogleButton