import dynamicIconImports from "lucide-react/dynamicIconImports";

const isIconNameValid = (iconName: string) => Reflect.has(dynamicIconImports, iconName);

export default isIconNameValid;