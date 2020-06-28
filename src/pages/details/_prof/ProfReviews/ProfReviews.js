import React from 'react';
import Select from 'react-select'
import ProfReviewEntry from './ProfReviewEntry';
import { reviewFeedback } from '../ProfFunctions'
import jwt_decode from 'jwt-decode'
import './ProfReviews.css'

class ProfReviews extends React.Component {
	constructor(props) {
		super(props)

		let coursesFiltered = [
			"EE 302",
			"EE 306",
			"EE 460N"
		]

		const updatedReviews = props.profReviews.slice().sort((a, b) => b.date - a.date)

		this.state = {
			profReviews: props.profReviews,
			reviewsFiltered: updatedReviews,
			courses: coursesFiltered,
			sortBy: "most-recent"
		}

		this.handleLike = this.handleLike.bind(this)
		this.handleDislike = this.handleDislike.bind(this)
		this.handleSortChange = this.handleSortChange.bind(this)
		this.handleCourseChange = this.handleCourseChange.bind(this)
	}

	handleLike(key) {
		const token = localStorage.usertoken
		const decoded = jwt_decode(token)

		let feedback = {
			like: true,
			userEmail: decoded.identity.email,
			reviewId: key
		}

		this.setState(prevState => {
			const updatedReviews = prevState.profReviews.map(profReview => {
				let dislike = profReview.dislikePressed
				let dislikeNum = profReview.numDisliked
				let likeNum = profReview.numLiked
				let like = profReview.likePressed
				if (key === profReview.key) {
					if (dislike) {
						dislike = false
						dislikeNum = dislikeNum - 1
						like = true
						likeNum = likeNum + 1
					} else {
						if (like) {
							like = false
							likeNum = likeNum - 1
						} else {
							like = true
							likeNum = likeNum + 1
						}
					}
				}
				return {
					...profReview,
					numLiked: likeNum,
					numDisliked: dislikeNum,
					likePressed: like,
					dislikePressed: dislike,
					date: profReview.date
				}
			}
			)
			return {
				profReviews: updatedReviews
			}
		}
		)

		reviewFeedback(feedback).then(res => {
			if (res.error) {
				alert(res.error)
			}
		})

	}

	handleDislike(key) {

		const token = localStorage.usertoken
		const decoded = jwt_decode(token)

		let feedback = {
			like: false,
			userEmail: decoded.identity.email,
			reviewId: key
		}
		this.setState(prevState => {
			const updatedReviews = prevState.profReviews.map(profReview => {
				let dislike = profReview.dislikePressed
				let dislikeNum = profReview.numDisliked
				let likeNum = profReview.numLiked
				let like = profReview.likePressed
				if (key === profReview.key) {
					if (like) {
						like = false
						likeNum = likeNum - 1
						dislike = true
						dislikeNum = dislikeNum + 1
					} else {
						if (dislike) {
							dislike = false
							dislikeNum = dislikeNum - 1
						} else {
							dislike = true
							dislikeNum = dislikeNum + 1
						}
					}
				}
				return {
					...profReview,
					numLiked: likeNum,
					numDisliked: dislikeNum,
					likePressed: like,
					dislikePressed: dislike,
					date: profReview.date
				}
			}
			)
			return {
				profReviews: updatedReviews
			}
		}
		)
		reviewFeedback(feedback).then(res => {
			if (res.error) {
				alert(res.error)
			}
		})
	}

	handleSortChange(value){
		if(value.value === "most-recent"){
			console.log("most-recent")
			const updatedReviews = this.state.reviewsFiltered.slice().sort((a, b) => b.date - a.date)
			this.setState({reviewsFiltered: updatedReviews, sortBy: value.value})
		}else if(value.value === "most-helpful"){
			const updatedReviews = this.state.reviewsFiltered.slice().sort((a, b) => b.numLiked - a.numLiked)
			this.setState({reviewsFiltered: updatedReviews, sortBy: value.value})
		}
	}

	handleCourseChange(values){
		
		let updatedReviews = []
		if(values.length == 0){
			updatedReviews = this.state.profReviews
		}else{
			let courses = []
			for(let i = 0; i < values.length; i++){
				courses.push(values[i])
			}
			this.state.profReviews.map(review => {
				if(courses.includes(review.courseName)){
					updatedReviews.push(review)
				}
			})
		}

		if(this.state.sortBy === "most-recent"){
			updatedReviews = updatedReviews.slice().sort((a, b) => b.date - a.date)
			this.setState({reviewsFiltered: updatedReviews, sortBy: "most-recent"})
		}else if(this.state.sortBy === "most-helpful"){
			updatedReviews = updatedReviews.slice().sort((a, b) => b.numLiked - a.numLiked)
			this.setState({reviewsFiltered: updatedReviews, sortBy: "most-helpful"})
		}
	}

	render() {
		const profReviewList = this.state.reviewsFiltered.map(review => {
			return (
				<ProfReviewEntry
					review={review}
					handleLike={this.handleLike}
					handleDislike={this.handleDislike}
				/>
			)
		})

		let noReviews = (
			<h5> No reviews yet for this professor </h5>
		)

		let reviews = (
			<div className="list-group review-list">
				{profReviewList}
			</div>
		)

		let sortOptions = [
			{
				value: "most-recent",
				label: "Most Recent"
			},
			{
				value: "most-helpful",
				label: "Most Helpful"
			}
		]

		let sort = (
			<div className="review-sort">
				<label className="float-left font-weight-bold">Sort by: </label>
				<Select
					// add deptList, handleDeptChange
					className="basic-multi-select my-3 clear-both"
					classNamePrefix="select"
					name="review-sort"
					options={sortOptions}
					onChange={this.handleSortChange}
					value={sortOptions.filter(val => {
						for(let i=0; i<sortOptions.length; i++){
							if(val.value === this.state.sortBy) return true;
						}
						return false
					})}
					autosize={true}
				/>
			</div>

		)

		let courseOptions = [
			{
				value: "EE 302",
				label: "EE 302"
			},
			{
				value: "EE 460N",
				label: "EE 460N"
			},
			{
				value: "EE 306",
				label: "EE 306"
			}
		]

		let courseFilter = (
			<div className="review-sort">
				<label className="float-left font-weight-bold">Filter by course: </label>
				<Select
					// add deptList, handleDeptChange
					className="basic-multi-select my-3 clear-both"
					classNamePrefix="select"
					name="review-sort"
					options={courseOptions}
					onChange={(objs) => {
						let values = [];

						if (objs != null) {
							for (let i = 0; i < objs.length; i++) {
								values[i] = objs[i].value
							}
						}

						this.handleCourseChange(values)
					}}
					placeholder="Select"
					isClearable={true}
					isSearchable={true}
					isMulti
				/>
			</div>

		)

		return (
			<div className="profReviews">
				<div className="card prof-card">
					<div className="card-header prof-header" >
						<h4> Reviews ({this.state.reviewsFiltered.length}) </h4>
					</div>
					<div className="card-body">
						<div className="review-filters">
							{sort}
							{courseFilter}
						</div>
						{this.state.profReviews.length > 0 ? reviews : noReviews}
					</div>
				</div>
			</div>

		)
	}

}

export default ProfReviews;