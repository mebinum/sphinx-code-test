"use client";
import Image from "next/image";
import React, { useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Table from "./components/table";

export default function Home() {
  return (
    <>
      <Header />
      <main className="block h-screen">
        <div className="bg-gray-100 pt-5 h-[85vh]">
          <div className="mx-auto bg-white-400 max-w-7xl sm:px-6 lg:px-8 relative h-full overflow-auto rounded-xl border border-dashed">
            <Table
              title="Assay Plates"
              description="A list of all your experimental assay plates"
            />
          </div>
        </div>
      <Footer />
      </main>
    </>
  );
}
