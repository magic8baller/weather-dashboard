import React, {Component} from 'react'

export default class EditableTextArea extends Component {

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
			<pre
				onDoubleClick={() => {
					this.setState({isEditing: true})
				}}
			>
				{children}
			</pre>
		)
	}
}
