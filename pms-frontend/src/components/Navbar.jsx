import { useNavigate,Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault(); // Prevent default behavior if wrapped around a form element
    localStorage.removeItem("user_id"); // Clear the user ID from localStorage
    localStorage.removeItem("user_role"); // Clear the user role from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Project Management System</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/dashboard" className="hover:text-blue-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/projects" className="hover:text-blue-200">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/tasks" className="hover:text-blue-200">
              Tasks
            </Link>
          </li>
          <li>
            <Link to="/team" className="hover:text-blue-200">
              Team
            </Link>
          </li>
          <li>
            <Link to="/clients" className="hover:text-blue-200">
              Clients
            </Link>
          </li>
        </ul>
        <button onClick={handleLogout} className="hover:text-blue-200">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
