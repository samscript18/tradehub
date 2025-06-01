import React from 'react';

interface Props {
	name?: string;
}

const DotLoader = (props: Props) => {
	return <span className={`${props.name ? 'dot-loader-2' : 'dot-loader'} inline-block`} />;
};

export default DotLoader;
