import dynamic from "next/dynamic";
import { memo, useMemo } from "react";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = useMemo(
    () => dynamic(dynamicIconImports[name], { ssr: false }),
    [name]
  );

  return <LucideIcon {...props} />;
};

export default memo(Icon);
