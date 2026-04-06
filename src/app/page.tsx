import Image from "next/image";

export default function Home() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center"
      style={{ backgroundColor: "white", color: "black" }}
    >
      <main className="flex flex-col items-center justify-center p-8 gap-4">
        <h1 className="text-2xl font-bold">Logo Testing (Should be below)</h1>
        <img
          src="/logo.svg"
          alt="Sanoob Logo"
          style={{ maxWidth: "400px", width: "100%", height: "auto", border: "2px solid red" }}
        />
        <p>If you see this text but not the logo, the SVG is failing to load.</p>
      </main>
    </div>
  );
}
