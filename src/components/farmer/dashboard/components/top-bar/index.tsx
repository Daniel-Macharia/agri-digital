

// This component assumes you have Font Awesome included in your project for icons.
// It also uses a placeholder for the user avatar from i.pravatar.cc.

export default function TopBar({ toggleSidebar }: { toggleSidebar: () => void }) {
    return (
        <header
            className="d-flex align-items-center justify-content-between w-100 position-sticky top-0 px-5  py-4"
            style={{ zIndex: 1020, backgroundColor: '#ECECEC' }}
        >
            {/* Left Side: Welcome message and Farm selector */}
            <div className="d-flex align-items-center">
                {/* Mobile menu toggle */}
                <button
                    className="btn btn-link text-dark d-lg-none me-2 p-0"
                    type="button"
                    aria-label="Toggle sidebar"
                    onClick={toggleSidebar}
                >
                    <i className="fas fa-bars fa-fw fs-4"></i>
                </button>
                
                {/* Welcome Text */}
                <div className="d-none d-lg-block">
                    <h4 className="fw-bold mb-0">Welcome, John Doe</h4>
                    <div className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
                        <span className="text-muted me-1">Mugutha Farm, Ruiru</span>
                        <i className="fas fa-chevron-down small text-muted"></i>
                    </div>
                </div>
            </div>

            {/* Right Side: Search, Notifications, Profile */}
            <div
                className="d-flex align-items-center rounded-pill px-3 py-1"
                style={{ backgroundColor: '#fff' }}
            >
                {/* Search Input */}
                <div className="d-flex align-items-center">
                    <i className="fas fa-search text-muted me-2"></i>
                    <input
                        type="text"
                        placeholder="Search"
                        className="form-control border-0 bg-transparent p-0 d-none d-md-inline-block"
                        style={{ boxShadow: 'none', width: '200px', backgroundColor: '#ECECEC' }}
                        aria-label="Search"
                    />
                </div>

                {/* Notification Icon */}
                <div className="position-relative mx-3" style={{ cursor: 'pointer' }}>
                    <i className="fas fa-bell fs-5 text-muted"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6em', border: '2px solid white' }}>
                        1
                        <span className="visually-hidden">new notifications</span>
                    </span>
                </div>

                {/* Profile */}
                <div className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
                    <img
                        src="https://i.pravatar.cc/40?img=1" // Placeholder for user avatar
                        alt="User Avatar"
                        className="rounded-circle"
                        style={{ width: '32px', height: '32px' }}
                    />
                    <i className="fas fa-chevron-down small text-muted ms-2"></i>
                </div>
            </div>
        </header>
    );
}
