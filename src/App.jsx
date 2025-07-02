import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
function App() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Tabs defaultValue="modules" className="">
        <TabsList>
          <TabsTrigger value="modules">modules</TabsTrigger>
          <TabsTrigger value="organization">organization</TabsTrigger>
          <TabsTrigger value="risktype">risktype</TabsTrigger>
        </TabsList>
        <TabsContent value="modules">Modules</TabsContent>
        <TabsContent value="organization">organization</TabsContent>
        <TabsContent value="risktype">risktype</TabsContent>
      </Tabs>
    </div>
  )
}

export default App
