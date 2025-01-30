const Login = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <h3 className="text-center mb-4">Sign In</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <small>
            Don't have an account? <a href="#">Sign up</a>
          </small>
        </div>
      </div>
    </div>
  );
};
export default Login;
