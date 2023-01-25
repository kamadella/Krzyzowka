import React from 'react';

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
 
export default Error;