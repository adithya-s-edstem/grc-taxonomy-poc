import { TabsContent } from "./components/ui/tabs";
import { Forms } from "./Forms";

export const getModuleContent = (module) => {
  return (
    <TabsContent value={module.moduleId}>
      {/* {JSON.stringify(module.forms)} */}
      <Forms form={module.forms} />
    </TabsContent>
  );
};
