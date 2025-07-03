import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Forms } from "./Forms";

export const Modules = ({ modules }) => {
  console.log(modules);
  return (
    <Tabs defaultValue="" className="">
      <TabsList>
        {modules.map((m) => (
          <TabsTrigger value={m.moduleId}>{m.name}</TabsTrigger>
        ))}
      </TabsList>
      {modules.map((m) => (
        <TabsContent value={m.moduleId}>
          {m.forms.map((n) => (
            <Forms form={n} />
          ))}
        </TabsContent>
      ))}
    </Tabs>
  );
};
