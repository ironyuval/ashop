import "./About.css";

function About(props) {
  return (
    <div className="container about m-auto overflow-auto">
      <h1>About This Project</h1>
      <p>An online comic eshop, created as MERN Stack development project.</p>
      <p>
        use our quick and advanced searches to Browse over our products api
        database
      </p>
      <h3>User Roles</h3>
      <table>
        <thead>
          <td>Role</td>
          <td>Watch</td>
          <td>Wishlist</td>
          <td>Cart</td>
          <td>Update Profile</td>
          <td>C.r.u.d Product</td>
        </thead>
        <tbody>
          <tr>
            <td>Non-Registered</td>
            <td>&#9989;</td>
            <td>&#9940;</td>
            <td>&#9940;</td>
            <td>&#9940;</td>
            <td>&#9940;</td>
          </tr>
          <tr>
            <td>Registered</td>
            <td>&#9989;</td>
            <td>&#9989;</td>
            <td>&#9989;</td>
            <td>&#9989;</td>
            <td>&#9940;</td>
          </tr>
          <tr>
            <td>Admin</td>
            <td>&#9989;</td>
            <td>&#9989;</td>
            <td>&#9989;</td>
            <td>&#9989;</td>
            <td>&#9989;</td>
          </tr>
        </tbody>
      </table>

      <br />
      <h3>Frontend</h3>
      <p>Create React App as frontend ui library</p>
      <p>Bootstrap as styling library</p>
      <p>ReduxJS Toolkit as react global state management</p>
      <p>Axios as api service</p>
      <p>Joi as validation package</p>
      <br />
      <h3>Backend</h3>
      <p>NodeJs as server environment</p>
      <p>ExpressJS as REST API framework</p>
      <p>MongoDB Cloud as database server</p>
      <p>mongoose as JS MongoDB driver</p>
    </div>
  );
}

export default About;
