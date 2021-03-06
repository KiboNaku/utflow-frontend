import React from 'react'
import { withRouter } from 'react-router-dom'
import './SearchBar.css'

class SearchBar extends React.Component {

    constructor(props) {
        super(props)
        this.searchValue = ""
        this.state = { searchValue: props.searchValue }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleKeyPress(e) {

        this.searchValue = e.target.value
        if (e.key === 'Enter') {
            this.props.history.push({
                pathname: "/results",
                search: `?search=${e.target.value}`,
                state: { searchValue: e.target.value, page: 0 }
            })
        }
    }

    handleChange(e) {
        this.setState({ searchValue: e.target.value })
    }

    handleSubmit(e) {

        this.props.history.push({
            pathname: "/results",
            search: `?search=${this.state.searchValue}`,
            state: { searchValue: this.state.searchValue, page: 0 }
        })

        e.preventDefault()
    }

    render() {

        return (
            <form className="form-inline form-search" onSubmit={this.handleSubmit}>
                <div className="container searchbar-outline">
                    <div className="d-flex justify-content-center searchbar-wrapper">
                        <div className="searchbar">
                            <input
                                className="search-input"
                                type="text"
                                onChange={this.handleChange}
                                name="searchValue"
                                onKeyPress={this.handleKeyPress}
                                value={this.state.searchValue}
                                placeholder="Search for courses or professors" />

                            <button type="submit" className="search-icon">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }

}

export default withRouter(SearchBar)