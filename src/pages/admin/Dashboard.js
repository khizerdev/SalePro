import Section from "components/section/section";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

const Dashboard = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <Section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-card text-card-foreground rounded-xl border shadow">
            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <h3 className="text-sm font-medium tracking-tight">
                Total Users
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{props.totalUsersLength}</div>
              <p className="text-muted-foreground text-xs">
                +20.1% from last month
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    totalUsersLength: state.users.users.length,
  };
};

export default connect(mapStateToProps)(Dashboard);
