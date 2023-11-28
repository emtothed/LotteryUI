import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
//import ManualHeader from "../../components/ManualHeader";
import Header from "../../components/Header";
import LotteryEntrance from "../../components/LotteryEntrance";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={` min-h-screen flex-col justify-between p-24 ${inter.className}`}
    >
      <Head>
        <title>Lottery</title>
        <meta name="description" content="Our lottery" />
        <link rel="icon" href="/favicon.ico/" />
      </Head>
      Lottery
      <Header />
      <LotteryEntrance />
    </main>
  );
}
