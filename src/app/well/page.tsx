
import React, { useState } from 'react';
import Header from "../components/header";
import WellPlate from "../components/plate";

export default function Well() {

  return (
    <>
    <Header />
    <main className="min-h-full p-10">
          <WellPlate dimension='96' />

    </main>
    </>
  );
}