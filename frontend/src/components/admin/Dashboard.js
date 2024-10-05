import Sidebar from "./Sidebar";

export default function Dashboard() {
    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar/>
            </div>
            <div className="col-12 col-md-10">
                <h2>Dashboard</h2>
            </div>
        </div>
    );
}
