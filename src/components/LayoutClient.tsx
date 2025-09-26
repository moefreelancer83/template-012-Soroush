"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import ContentEditable, {
  ChangeHandler,
} from "@/lib/content-editable/content-editable";

import _ from "lodash";
import { useCallback, useEffect } from "react";

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const { t, setT, language, templateData } = useLanguage();

  useEffect(() => {
    console.log({ "app data": templateData });
  }, [templateData]);

  const changeHandler = useCallback<ChangeHandler>(
    (path, value) => {
      setT((prev: any) => _.set(structuredClone(prev), path, value));
    },
    [setT]
  );

  return (
    <ContentEditable
      imageChangeHandler={URL.createObjectURL}
      changeHandler={changeHandler}
    >
      <Navigation navigation={t?.navigation || {}} />
      <main onClick={() => console.log("lang in click", language)}>
        {children}
      </main>
      <Footer footer={t?.footer || {}} contact={t?.contact || {}} />
    </ContentEditable>
  );
}
