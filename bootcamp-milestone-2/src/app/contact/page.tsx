"use client";
import Link from "next/link";
import style from "./contact.module.css";
import { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);
  const publicKey = "D-3Qohfjd3wVIZ-Wl";

  useEffect(() => emailjs.init(publicKey), []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const serviceId = "nguyen_sean_website";
    const templateId = "website_contact_template";

    try {
      setLoading(true);
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: nameRef.current?.value,
          email: emailRef.current?.value,
          message: messageRef.current?.value,
        },
        publicKey
      );
      alert("Email successfully sent!");
    } catch (error) {
      console.error("Problem with email: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <main className={style.page}>
        <h1 className={style.pageTitle}>Contact</h1>
        <div className={style.pageContent}>
          <form className={style.contactForm} onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              ref={nameRef}
              placeholder="Name"
              required
            />
            <br />
            <label className="all" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              ref={emailRef}
              placeholder="Email"
              required
            />
            <br />
            <label className="all" htmlFor="message">
              Message
            </label>
            <textarea
              className="all"
              id="message"
              name="message"
              ref={messageRef}
              placeholder="Message"
              required
            ></textarea>
            <br />
            <button className="submitButton" type="submit" disabled={loading}>
              Submit
            </button>
          </form>
          <div className={style.links}>
            {/* <p>Email: snguy212@calpoly.edu</p> */}
            <div className={style.linksButtons}>
              <Link href="https://www.linkedin.com/in/seanmnguyen/" target="_blank">
                LinkedIn
              </Link>
            </div>
            <div className={style.linksButtons}>
              <Link href="https://github.com/seanmnguyen" target="_blank">GitHub</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
