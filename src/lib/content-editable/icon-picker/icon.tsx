import dynamic from "next/dynamic";
import { memo, useMemo } from "react";
import { LucideProps, Loader2Icon } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import "./styles.css";
import { iconsCache } from "./icons-list";
interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = useMemo(() => {
    if (iconsCache[name]) return iconsCache[name];

    if(!dynamicIconImports[name]) throw new Error(`Icon "${name}" does not exist in lucide-react library.`);

    const result = dynamic(dynamicIconImports[name], {
      ssr: false,
      loading: () => <Loader2Icon className="animate-spin-slow" />,
    });

    iconsCache[name] = result;
    return result;
  }, [name]);


  return <LucideIcon {...props} />;
};

export default memo(Icon);
