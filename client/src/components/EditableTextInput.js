import React, {Component} from 'react'

export default class EditableTextInput extends Component {

	state = {isEditing: false}
	render () {
		const {children, onChange} = this.props

		if (isEditing) {
			return (
				<input
					className='editing'
					autofocus
					onBlur={() => {
						this.setState({isEditing: false})
					}}
					onChange={onChange}
					defaultValue={children}
				/>
			)
		}
		return (
			<span
			onDoubleClick={() => {
				this.setState({isEditing: true})
			}}
			>
				{children}
			</span>
		)
	}
}
