import Navbar from "@/components/Navbar";
import HomePage from "@/components/HomePage";
import Chatbot from "@/components/Chatbot";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen" style={{ background: "#faf9f3" }}>
        <HomePage />
      </main>
      <Chatbot />
    </>
  );
}
