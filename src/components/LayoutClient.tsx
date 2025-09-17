"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import ContentEditable from "@/lib/content-editable/content-editable";

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();

  return (
    <ContentEditable
      imageChangeHandler={URL.createObjectURL}
      changeHandler={(path, value) => {
        console.log({ path, value });
        // _.set(t, path, value)
      }}
    >
      <Navigation navigation={t?.navigation || {}} />
      <main>{children}</main>
      <Footer footer={t?.footer || {}} contact={t?.contact || {}} />
    </ContentEditable>
  );
}
