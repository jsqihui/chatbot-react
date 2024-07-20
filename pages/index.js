import Head from "next/head";
import Chatbox from "../components/Chatbox";

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Chatbox</title>
      </Head>
      <main className="flex justify-center items-center h-screen bg-base-200">
        <Chatbox />
      </main>
    </div>
  );
}
