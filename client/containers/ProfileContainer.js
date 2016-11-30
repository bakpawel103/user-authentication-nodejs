import React, {
	Component,
	PropTypes
} from 'react'
import {
	connect
} from 'react-redux'
import {
	bindActionCreators
} from 'redux'
import {
	hashHistory
} from 'react-router'
import CircularProgress from 'material-ui/CircularProgress';
import {
	requestCurrentUser,
	requestUpdateUser
} from '../actions'
import ErrorContent from '../components/ErrorContent'
import Profile from '../components/Profile'


class ProfileContainer extends Component {

	componentDidMount() {
		const token = localStorage.getItem('token')
		if (!token) hashHistory.push('/login')
		else this.props.requestCurrentUser(token)
	}


	handleUpdateUser(displayName, uid, username) {
		const token = localStorage.getItem('token')
		const {
			user
		} = this.props
		user.displayName = displayName
		user.uid = uid
		user.username = username
		this.props.requestUpdateUser(token, user)
	}

	render() {
		const {
			user
		} = this.props
		const self = this
		const renderStatus = {
			loading: function() {
				return (<div className="text-center">
							 <CircularProgress size={160} thickness={7} />
						</div>)
			},
			error: function() {
				return <ErrorContent message={user.error.message} />
			},
			success: function() {
				return (
					<Profile displayName={user.displayName} role={user.role} uid={user.uid} username={user.username} handleUpdateUser={self.handleUpdateUser.bind(self)} />
				)
			}
		}
		if (renderStatus.hasOwnProperty(user.status)) return renderStatus[user.status]()
		return (<div></div>)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		requestCurrentUser,
		requestUpdateUser
	}, dispatch)
}

ProfileContainer.propTypes = {
	requestCurrentUser: PropTypes.func,
	requestUpdateUser: PropTypes.func,
	user: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)