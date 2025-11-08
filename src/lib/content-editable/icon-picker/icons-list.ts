import dynamicIconImports from "lucide-react/dynamicIconImports";

export type IconName = keyof typeof dynamicIconImports;

export const iconsList = Object.keys(dynamicIconImports) as IconName[];

export const iconsCache: Record<IconName, any> = {} as Record<IconName, any>;
