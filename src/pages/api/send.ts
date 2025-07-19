// src/pages/api/contact.ts
//console.log('RESEND_API_KEY:', import.meta.env.RESEND_API_KEY);
//console.log('EMAIL TO:', import.meta.env.TO_EMAIL);
export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);
 
export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;
    const email = formData.get('email') as string;
    const comments = formData.get('comments') as string;

    // Basic validation
    if (!name || !email || !comments) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Name, email, and comments are required fields.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Please enter a valid email address.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Send email
    await resend.emails.send({
      //from: 'Website Inquire <website@leosroofingremodeling.com>',
      from: 'Your Website <onboarding@resend.dev>',
      to: import.meta.env.TO_EMAIL,
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Property Address:</strong> ${address || 'Not provided'}</p>
        <p><strong>Comments:</strong> ${comments}</p>
      `,
    });

    console.log('Form submission:', { name, email, phone, address, comments });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for your inquiry! We will get back to you soon.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error processing form:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'An error occurred while processing your request. Please try again.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
