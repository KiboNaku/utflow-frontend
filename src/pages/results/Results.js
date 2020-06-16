import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import ResultsComponent from './_components/ResultsComponent'
import { populateResults } from './_utils/ResultsFunctions'
import { getMajor } from './../popups/_utils/UserFunctions'

import "./Results.css"


class Results extends Component {

	constructor() {

		super();

		this.state = {

			tabIndex: 0,

			depts: [],

			courses: {
				loaded: false,
				data: [],
				sort: {
					sortBy: 'courseNum',
					sortDir: 'down',
				},
				filter: {
					depts: [],
					mApp: 0,
					mNum: 0,
					sem: "all"
				}
			},

			profs: {
				loaded: false,
				data: [],
				sort: {
					sortBy: 'courseNum',
					sortDir: 'down',
				},
				filter: {
					depts: [],
					mApp: 0,
					mNum: 0,
					sem: "all"
				}
			},
		}

		this.handleSortChange = this.handleSortChange.bind(this)
		this.handleTabChange = this.handleTabChange.bind(this)
		this.handleFilterChange = this.handleFilterChange.bind(this)
	}

	componentDidMount() {

		// fetch departments

		getMajor().then(res => {
			if (res.error) {
				alert(res.error)
			} else {
				let data = res.majors
				let list = new Array()
				for (const i in data) {
					list.push({
						value: data[i]['name'],
						label: data[i]['name']
					})
				}
				this.setState({ depts: list })
			}
		})

		// fetch search results

		const search = {
			searchValue: this.props.location.state.searchValue
		}

		populateResults(search).then(res => {
			this.parseResValues(res)
		})
	}

	componentDidUpdate(prevProps) {

		if (prevProps.location.search != this.props.location.search) {

			const search = {
				searchValue: this.props.location.state.searchValue
			}

			this.setState(prevState => ({
				courses: {
					...prevState.courses,
					loaded: false
				},
				profs: {
					...prevState.profs,
					loaded: false
				}
			}))

			populateResults(search).then(res => {
				this.parseResValues(res)
			})

		}

	}

	parseResValues = (res) => {

		this.setState(prevState => (

			{
				courses: {
					...prevState.courses,
					loaded: true,
					data: res.courses === "empty" ? null : res.courses
				},
				profs: {
					...prevState.profs,
					loaded: true,
					data: res.profs === "empty" ? null : res.profs
				}
			}
		))
	}

	handleTabChange(event, newValue) {
		this.setState({ tabIndex: newValue })
	}

	handleSortChange(sortByName) {

		//TODO: update variable names
		const { tabIndex } = this.state

		if (tabIndex == 0) {
			const { sortDir, sortBy } = this.state.courses.sort;
			let nextSort;

			if (sortBy !== sortByName) nextSort = 'down';
			else if (sortDir === 'down') nextSort = 'up';
			else if (sortDir === 'up') nextSort = 'down';

			this.setState(prevState => ({
				courses: {
					...prevState.courses,
					sort: {

						sortBy: sortByName,
						sortDir: nextSort
					}
				}
			}))
		} else if (tabIndex == 1) {
			const { sortDir, sortBy } = this.state.profs.sort;
			let nextSort;

			if (sortBy !== sortByName) nextSort = 'down';
			else if (sortDir === 'down') nextSort = 'up';
			else if (sortDir === 'up') nextSort = 'down';

			this.setState(prevState => ({
				profs: {
					...prevState.profs,
					sort: {

						sortBy: sortByName,
						sortDir: nextSort
					}
				}
			}))
		}
	}

	handleFilterChange(depts = null, mApp = -1, mNum = -1, sem = null) {

		if (this.state.tabIndex == 0) {
			this.setState((prevState) => {

				let filter = prevState.courses.filter
				return {
					courses: {
						...prevState.courses,

						filter: {
							depts: depts == null ? filter.depts : depts,
							mApp: mApp < 0 ? filter.mApp : mApp,
							mNum: mNum < 0 ? filter.mNum : mNum,
							sem: sem == null ? filter.sem : sem
						}
					}
				}
			})
		} else if (this.state.tabIndex == 1) {
			this.setState((prevState) => {

				let filter = prevState.profs.filter
				return {
					profs: {
						...prevState.profs,

						filter: {
							depts: depts == null ? filter.depts : depts,
							mApp: mApp < 0 ? filter.mApp : mApp,
							mNum: mNum < 0 ? filter.mNum : mNum,
							sem: sem == null ? filter.sem : sem
						}
					}
				}
			})
		}
	}

	render() {
		return (<ResultsComponent

			{...this.state}

			handleTabChange={this.handleTabChange}
			handleFilterChange={this.handleFilterChange}
			handleSortChange={this.handleSortChange}

			match={this.props.match}
			search={this.props.location.state.searchValue} />)
	}
}

export default withRouter(Results);