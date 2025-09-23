"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import ContentEditable from "@/lib/content-editable/content-editable";

import _ from "lodash";

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const { t, setT, language } = useLanguage();

  console.log({ "app data": t, language });

  return (
    <ContentEditable
      imageChangeHandler={URL.createObjectURL}
      changeHandler={(path, value) => {
        setT((prev: any) => _.set(structuredClone(prev), path, value));
      }}
    >
      <Navigation navigation={t?.navigation || {}} />
      <main>{children}</main>
      <Footer footer={t?.footer || {}} contact={t?.contact || {}} />
    </ContentEditable>
  );
}
