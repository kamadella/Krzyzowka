import React from 'react';

const Error = (props) => {
	return (
	   <div>
		{props.status ? (
				<p style={{ color: "green"}}>{props.info}</p>
			):(
				<p style={{ color: "red"}}>{props.info}</p>
			)}
	   </div>
	);
};
 
export default Error;