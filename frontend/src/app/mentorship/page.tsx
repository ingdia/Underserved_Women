'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { FaUserCheck, FaCalendarAlt, FaHandsHelping } from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import './mentorship.css';
import heroImage from '../../../public/mentorship.jpg';
import Link from 'next/link'

const MentorshipPage = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        expertise: '',
        education: '',
        experience: '',
        message: '',
        cv: null as File | null,
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setForm({ ...form, cv: e.target.files[0] });
        } else {
            setForm({ ...form, cv: null });
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!form.cv) {
            toast.error('Please upload your CV to submit the application.');
            return;
        }

        setLoading(true);
        const toastId = toast.loading('Submitting your application...');


        const formData = new FormData();


        formData.append('name', form.name);
        formData.append('email', form.email);
        formData.append('phone', form.phone);
        formData.append('expertise', form.expertise);
        formData.append('education', form.education);
        formData.append('experience', form.experience);
        formData.append('message', form.message);


        formData.append('cv', form.cv);

        try {
            const response = await api.post('/api/auth/apply-mentor', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            toast.success(response.data.message || 'Application submitted successfully!', { id: toastId });


            setForm({
                name: '',
                email: '',
                phone: '',
                expertise: '',
                education: '',
                experience: '',
                message: '',
                cv: null,
            });

            const fileInput = document.querySelector('input[name="cv"]') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

        } catch (error: any) {
            const errorMessage =
                error.response?.data?.errors?.[0]?.message || 'Submission failed. Please try again.';
            toast.error(errorMessage, { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="mentorship-page">

            <section className="hero">
                <Image src={heroImage} alt="Mentorship" className="hero-img" priority />
                <div className="hero-overlay">
                    <div className="hero-text">
                        <h1>
                            Find Your <span className="highlight">Mentor</span>
                        </h1>
                        <p>
                            Connect with successful women entrepreneurs who understand your journey. Get personalized guidance, support, and advice to help you grow your business.
                        </p>
                        <div className="hero-buttons">
                            <Link href="/register">
                                <button className="btn-primary"> Book a Session</button>
                            </Link>
                            <button className="btn-outline" onClick={() => document.getElementById('become-mentor-form')?.scrollIntoView({ behavior: 'smooth' })}>
                                Become a Mentor
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="how-it-works">
                <h2>How Mentorship Works</h2>
                <div className="cards">
                    <div className="card">
                        <FaUserCheck className="card-icon" />
                        <h3>Choose Your Mentor</h3>
                        <p>Browse our network of experienced women entrepreneurs and select a mentor whose expertise matches your needs.</p>
                    </div>
                    <div className="card">
                        <FaCalendarAlt className="card-icon" />
                        <h3>Schedule Sessions</h3>
                        <p>Book one-on-one sessions at times that work for both you and your mentor. Sessions are conducted via video call.</p>
                    </div>
                    <div className="card">
                        <FaHandsHelping className="card-icon" />
                        <h3>Get Guidance</h3>
                        <p>Receive personalized advice, feedback on your business plans, and ongoing support to help you succeed.</p>
                    </div>
                </div>
            </section>

            <section className="why-mentorship">
                <h2>Why Choose Our Mentorship Program?</h2>
                <div className="why-columns">
                    <div className="why-column">
                        <ul>
                            <li><CheckCircle /> <strong style={{ fontSize: '1rem' }}>Completely Free:</strong> All sessions are free as part of our commitment to support.</li>
                            <li><CheckCircle /> <strong style={{ fontSize: '1rem' }}>Experienced Mentors:</strong> Real-world experts across industries.</li>
                            <li><CheckCircle /> <strong style={{ fontSize: '1rem' }}>Flexible Scheduling:</strong> Sessions available evenings and weekends.</li>
                        </ul>
                    </div>
                    <div className="why-column">
                        <ul>
                            <li><CheckCircle /> <strong style={{ fontSize: '1rem' }}>Personalized Guidance:</strong> Tailored advice for your business challenges.</li>
                            <li><CheckCircle /> <strong style={{ fontSize: '1rem' }}>Ongoing Support:</strong> Build long-term mentor relationships.</li>
                            <li><CheckCircle /> <strong style={{ fontSize: '1rem' }}>Network Access:</strong> Connect with a strong women-led business community.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="book-session-form-section" id="become-mentor-form">
                <h2>Request to Become a Mentor</h2>
                <form className="session-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name *"
                            required
                            value={form.name}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address *"
                            required
                            value={form.email}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number *"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        disabled={loading}
                    />

                    <input
                        type="text"
                        name="expertise"
                        placeholder="Your Field of Expertise *"
                        required
                        value={form.expertise}
                        onChange={handleChange}
                        disabled={loading}
                    />

                    <input
                        type="text"
                        name="education"
                        placeholder="Educational Background *"
                        required
                        value={form.education}
                        onChange={handleChange}
                        disabled={loading}
                    />

                    <textarea
                        name="experience"
                        placeholder="Work Experience *"
                        rows={3}
                        required
                        value={form.experience}
                        onChange={handleChange}
                        disabled={loading}
                    ></textarea>

                    <textarea
                        name="message"
                        placeholder="Tell us why you want to be a mentor *"
                        rows={4}
                        required
                        value={form.message}
                        onChange={handleChange}
                        disabled={loading}
                    ></textarea>


                    <input
                        type="file"
                        name="cv"
                        required
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        disabled={loading}
                    />

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Request'}
                    </button>
                </form>
            </section>
        </main>
    );
};

export default MentorshipPage;