"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login_authentication", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // 🔹 1. Pehle data ko parse karein
      const result = await res.json();

      // 🔹 2. Console mein check karein ki kya mil raha hai
      console.log("API Response:", result);

      if (res.ok && result.success) {
        alert("लॉगिन सफल! अब रिडाइरेक्ट कर रहे हैं...");
        
        // 🔹 3. Router.push ke bajaye iska use karein (Best for Login)
        window.location.href = "/admin"; 
      } else {
        // Backend se aane wala error message dikhayein
        alert(result.message || result.error || "Login fail ho gaya");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("सर्वर से कनेक्शन नहीं हो पाया");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, background: '#050505', color: '#00ff41', minHeight: '100vh' }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '300px' }}>
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', background: '#111', border: '1px solid #00ff41', color: '#fff' }}
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', background: '#111', border: '1px solid #00ff41', color: '#fff' }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '10px', cursor: 'pointer', background: '#00ff41', color: '#000', fontWeight: 'bold' }}
        >
          {loading ? "प्रतीक्षा करें..." : "लॉगिन करें"}
        </button>
      </form>
    </div>
  );
}