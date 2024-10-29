import Page from "@/components/page";
import Card from "../components/card";

function App() {
  return (
    <>
      <Page title="Dashboard">
        <h2 className="text-xl font-semibold">Recent Posts</h2>
        <div className="mt-1 flex gap-2 overflow-x-auto rounded-md py-2 scrollbar">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>

        <h2 className="mt-8 text-xl font-semibold">Upcoming Events</h2>
        <div className="mt-1 flex gap-2 overflow-x-auto rounded-md py-2">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>

        <h2 className="mt-8 text-xl font-semibold">Suggested Groups</h2>
        <div className="mt-1 flex gap-2 overflow-x-auto rounded-md py-2">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </Page>
    </>
  );
}

export default App;
