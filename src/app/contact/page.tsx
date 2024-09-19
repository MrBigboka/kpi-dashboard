"use client";

import React from "react";
import ContactTab from "./ContactTab";
import Sidebar from "../home/Sidebar";

const ContactPage = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-grow justify-center items-center p-8">
        <div className="w-full max-w-3xl">
          <ContactTab />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
