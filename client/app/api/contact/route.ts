import { ContactSubmissionEmailTemplate } from '@/lib/templates';
import { transporter } from '@/lib/config/email.config';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const { name, email, message } = await req.json();

	if (!name || !email || !message) {
		return NextResponse.json({ message: 'All fields are required.' });
	}

	try {
		const mailOptions = {
			from: `${email}`,
			to: 'support@iabcodesltd.com',
			subject: 'Contact Form Submission',
			html: ContactSubmissionEmailTemplate({ name, email, message }),
		};

		await (await transporter()).sendMail(mailOptions);
		return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
	} catch (error) {
		console.error('Error sending email:', error);
		return NextResponse.json(
			{ message: 'Failed to send email. Please try again later.' },
			{ status: 500 }
		);
	}
}
