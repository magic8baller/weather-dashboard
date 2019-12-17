import React from 'react';
import styled, {keyframes} from 'styled-components';
import PropTypes from 'prop-types';

const FadeAnimation = keyframes`
    from {
        opacity: 0
    }
    to {
        opacity: 100
    }
`;

const Form = styled.form`
    animation: ${FadeAnimation} 2s linear;
    display: flex;
    flex-direction: column;
    font-size: 2rem;
`;

const Text = styled.span`
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

const Input = styled.input`
    all: unset;
    border-bottom: 2px solid #FFF;
    text-align: center;
`;

const StyledGreeting = ({value, handleChange, handleSubmit}) => (
	<Form onSubmit={handleSubmit}>
		<Text>
			Hello, What is your name?
        </Text>
		<Input value={value} onChange={handleChange} />
	</Form>
);

StyledGreeting.propTypes = {
	value: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired
};

export default StyledGreeting;