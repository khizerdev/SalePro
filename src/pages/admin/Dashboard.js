import Sidebar from "components/sidebar/sidebar";

const Dashboard = () => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-card text-card-foreground rounded-xl border shadow">
          <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <h3 className="text-sm font-medium tracking-tight">
              Total Revenue
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="text-muted-foreground h-4 w-4"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-muted-foreground text-xs">
              +20.1% from last month
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
