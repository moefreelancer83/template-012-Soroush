"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef } from "react";
import ContentEditable from "@/lib/content-editable";

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();

  return (
    <ContentEditable
      onChange={(path, value) => {
        console.log({ path, value });
      }}
    >
      <Navigation navigation={t?.navigation || {}} />
      <main>{children}</main>
      <Footer footer={t?.footer || {}} contact={t?.contact || {}} />
    </ContentEditable>
  );
}
