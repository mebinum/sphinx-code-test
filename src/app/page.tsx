'use client'
import Image from "next/image";
import React, { useState } from 'react';
import Header from "./components/header";
import Table from "./components/table";

export default function Home() {

  return (
    <>
    <Header />
    <main className="min-h-full">
      <div className="bg-gray-100 pt-5">

        <div className="mx-auto bg-white-400 max-w-7xl sm:px-6 lg:px-8 relative h-full overflow-auto rounded-xl border border-dashed">
          <Table title="Assay Plates" description="A list of all your experimental assay plates" />
        </div>

      </div>
    </main>
    </>
  );
}
