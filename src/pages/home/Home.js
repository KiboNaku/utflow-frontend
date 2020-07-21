import React, { Component } from 'react'
import SearchBar from './../_utils/SearchBar'
import './Home.css'

class Home extends Component {
    render() {
        return (
            <div>
                <main className="home-page">
                    <div className="main-sub home-sub">
                        <div className="container text-center">
                            <div>
                                <h1 className="home-main-txt">What starts here</h1>
                                <h1 className="home-main-txt">changes your course schedule</h1>
                            </div>

                            <br />

                            <div className="search-wrapper-lg container">
                                <SearchBar />
                            </div>
                        </div>
                    </div>
                </main>

                <figcaption className="figure-caption text-right clear-top px-3 py-3">Photo by Joel Filipe on Unsplash</figcaption>
            </div >
        )
    }
}

export default Home