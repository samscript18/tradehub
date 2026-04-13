import React from "react";

interface Props {
	name?: string;
	isTable?: boolean;
	colSpan?: number;
}

const DotLoader = (props: Props) => {
	const loaderClass = `${props.name ? "dot-loader-2" : "dot-loader"} inline-block`;

	if (props.isTable) {
		return (
			<tr>
				<td colSpan={props.colSpan ?? 1} className="py-6 text-center">
					<div className={loaderClass} />
				</td>
			</tr>
		);
	} else {
		return <div className={loaderClass} />;
	}
};

export default DotLoader;
