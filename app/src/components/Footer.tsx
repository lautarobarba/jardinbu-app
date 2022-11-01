
export const Footer = () => {
	const date: Date = new Date();
	const year: string = date.getFullYear().toString();

	return (
		<footer id='footer'>
			<div className="container d-fex justify-content-center my-2">
				<p className="text-center">{year} - Jardín Botánico Ushuaia</p>
			</div>
		</footer>
	);
}

