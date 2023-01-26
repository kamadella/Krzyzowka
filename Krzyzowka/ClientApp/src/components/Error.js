import React from 'react';
import PropTypes from 'prop-types';

const Error = (props) => {
	return (
	   <div>
		{props.status ? (
				<p> </p>
			):(
				<p style={{ color: "red"}}>{props.info}</p>
			)}
	   </div>
	);
};

Error.propTypes = {
	info: PropTypes.string,
	status: PropTypes.bool,
};
 
export default Error;