"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // लोडिंग स्टेट
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault(); // पेज रिफ्रेश रोकें
    setLoading(true);

    try {
      const res = await fetch("/api/login_authentication", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        alert("ईमेल या पासवर्ड गलत है।");
      }
    } catch (error) {
      console.error("नेटवर्क एरर:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}> {/* फॉर्म टैग का उपयोग करें */}
        <input
          type="email"
          required // ब्राउज़र लेवल वैलिडेशन
          placeholder="Email"
          value={email} // Controlled input
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />
        <button type="submit" disabled={loading}>
          {loading ? "प्रतीक्षा करें..." : "लॉगिन करें"}
        </button>
      </form>
    </div>
  );
}