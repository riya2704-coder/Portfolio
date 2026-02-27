import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

// ── Animated Section wrapper ──────────────────────────────────────────────────
function AnimatedSection({ children, className }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Contact() {
    const [copied, setCopied] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle | sending | success | error
    const formRef = useRef(null);

    // Copy email to clipboard
    const handleCopy = () => {
        navigator.clipboard.writeText("shinderiya2704@gmail.com").then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    // Handle input change
    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Send via EmailJS (free tier — set your own serviceId / templateId / publicKey)
    const handleSubmit = async () => {
        const { name, email, subject, message } = formData;
        if (!name || !email || !subject || !message) {
            alert("Please fill in all fields.");
            return;
        }

        setStatus("sending");

        try {
            // ── EmailJS REST API ──────────────────────────────────────────────────
            // Replace the three values below with your own from https://emailjs.com
            const SERVICE_ID = "service_691fi7h";   // e.g. "service_abc123"
            const TEMPLATE_ID = "template_5u5fh6d";  // e.g. "template_xyz789"
            const PUBLIC_KEY = "qNVBdZPicVZeUHBVc";   // e.g. "user_XXXXXXXXXXXXXXX"

            const payload = {
                service_id: SERVICE_ID,
                template_id: TEMPLATE_ID,
                user_id: PUBLIC_KEY,
                    template_params: {
                        name: name,
                        email: email,
                        subject: subject,
                        message: message,         
                        to_email: "shinderiya2704@gmail.com",}
                };
        

            const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", subject: "", message: "" });
                setTimeout(() => setStatus("idle"), 4000);
            } else {
                throw new Error("EmailJS error");
            }
        } catch (err) {
            console.error(err);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 4000);
        }
    };

    // ── Info cards ──────────────────────────────────────────────────────────────
    const infoItems = [
        { icon: "📧", label: "Email", value: "shinderiya2704@gmail.com", action: handleCopy },
        { icon: "📍", label: "Location", value: "Panvel, Mumbai" },
        {
            icon: "💼", label: "LinkedIn", value: "linkedin.com/in/riya-shinde-a94b5139a",
            link: "https://www.linkedin.com/in/riya-shinde-a94b5139a?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B2L9ZXSf1RIO0JYqr3PeCMg%3D%3D"
        },
        {
            icon: "🐙", label: "GitHub", value: "github.com/riya2704-coder",
            link: "https://github.com/riya2704-coder"
        },
    ];

    const inputBase = {
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "#fff",
        outline: "none",
        borderRadius: "12px",
        padding: "12px 16px",
        fontSize: "14px",
        width: "100%",
        fontFamily: "inherit",
        transition: "border-color 0.2s, background 0.2s",
    };

    const focusStyle = {
        borderColor: "rgba(0,245,160,0.4)",
        background: "rgba(0,245,160,0.04)",
    };

    // ── Render ──────────────────────────────────────────────────────────────────
    return (
        <section
            id="contact"
            style={{
                background: "#0a0a0f",
                padding: "100px 0",
                fontFamily: "'DM Sans', sans-serif",
                color: "#fff",
                minHeight: "100vh",
            }}
        >
            {/* Google Font */}
            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');`}</style>

            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
                <AnimatedSection>
                    {/* Header */}
                    <div style={{ textAlign: "center", marginBottom: 64 }}>
                        <span
                            style={{
                                display: "inline-block",
                                background: "linear-gradient(135deg,#00F5A0,#00D9F5)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                fontSize: 13,
                                fontWeight: 700,
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                marginBottom: 12,
                            }}
                        >
                            Get In Touch
                        </span>
                        <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, margin: "0 0 16px" }}>
                            Let's Build Together
                        </h2>
                        <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
                            Whether you need a complete web app, API integration, or frontend development — I'm here to help.
                            Let's build something amazing.
                        </p>
                    </div>

                    {/* Grid */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                            gap: 32,
                        }}
                    >
                        {/* ── LEFT — Info cards ─────────────────────────────────────────── */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {infoItems.map((item) => (
                                <motion.div
                                    key={item.label}
                                    whileHover={{ scale: 1.02, borderColor: "rgba(0,245,160,0.3)" }}
                                    style={{
                                        background: "rgba(255,255,255,0.03)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        borderRadius: 16,
                                        padding: "20px 24px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 16,
                                        cursor: item.action || item.link ? "pointer" : "default",
                                        transition: "border-color 0.2s",
                                    }}
                                    onClick={() => {
                                        if (item.action) item.action();
                                        else if (item.link) window.open(item.link, "_blank");
                                    }}
                                >
                                    <span style={{ fontSize: 24 }}>{item.icon}</span>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                                            {item.label}
                                        </p>
                                        <p style={{ margin: "4px 0 0", fontSize: 14, color: "#fff", wordBreak: "break-all" }}>
                                            {item.value}
                                        </p>
                                    </div>

                                    {/* Copy badge */}
                                    {item.action && (
                                        <AnimatePresence>
                                            {copied ? (
                                                <motion.span
                                                    key="copied"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    style={{
                                                        background: "linear-gradient(135deg,#00F5A0,#00D9F5)",
                                                        color: "#000",
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                        padding: "4px 10px",
                                                        borderRadius: 20,
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    Copied!
                                                </motion.span>
                                            ) : (
                                                <motion.span
                                                    key="copy"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    style={{ fontSize: 16, color: "rgba(255,255,255,0.3)" }}
                                                >
                                                    📋
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* ── RIGHT — Contact form ──────────────────────────────────────── */}
                        <motion.div
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: 20,
                                padding: 32,
                            }}
                        >
                            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                {/* Text fields */}
                                {[
                                    { label: "Your Name", name: "name", placeholder: "Aapka naam likhein", type: "text" },
                                    { label: "Email Address", name: "email", placeholder: "email@example.com", type: "email" },
                                    { label: "Subject", name: "subject", placeholder: "Project ke baare mein", type: "text" },
                                ].map((field) => (
                                    <div key={field.name}>
                                        <label style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 8, fontWeight: 500 }}>
                                            {field.label}
                                        </label>
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            placeholder={field.placeholder}
                                            style={inputBase}
                                            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                                            onBlur={(e) => {
                                                e.target.style.borderColor = "rgba(255,255,255,0.08)";
                                                e.target.style.background = "rgba(255,255,255,0.04)";
                                            }}
                                        />
                                    </div>
                                ))}

                                {/* Textarea */}
                                <div>
                                    <label style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 8, fontWeight: 500 }}>
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Apna message likhein..."
                                        rows={5}
                                        style={{ ...inputBase, resize: "vertical" }}
                                        onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = "rgba(255,255,255,0.08)";
                                            e.target.style.background = "rgba(255,255,255,0.04)";
                                        }}
                                    />
                                </div>

                                {/* Submit */}
                                <motion.button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={status === "sending"}
                                    style={{
                                        width: "100%",
                                        padding: "14px",
                                        borderRadius: 12,
                                        fontWeight: 700,
                                        color: "#000",
                                        fontSize: 14,
                                        border: "none",
                                        cursor: status === "sending" ? "not-allowed" : "pointer",
                                        background:
                                            status === "success"
                                                ? "linear-gradient(135deg,#00F5A0,#00e676)"
                                                : status === "error"
                                                    ? "linear-gradient(135deg,#ff4d6d,#ff8fa3)"
                                                    : "linear-gradient(135deg,#00F5A0,#00D9F5)",
                                        opacity: status === "sending" ? 0.7 : 1,
                                        transition: "background 0.3s, opacity 0.2s",
                                    }}
                                    whileHover={status === "idle" ? { scale: 1.02, boxShadow: "0 0 32px rgba(0,245,160,0.35)" } : {}}
                                    whileTap={status === "idle" ? { scale: 0.98 } : {}}
                                >
                                    {status === "sending" && "Sending... ⏳"}
                                    {status === "success" && "Message Sent! ✅"}
                                    {status === "error" && "Failed — Try Again ❌"}
                                    {status === "idle" && "Send Message 🚀"}
                                </motion.button>

                               
                            </div>
                        </motion.div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}