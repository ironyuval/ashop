/* name;
description;
price;
ratings;
images;
category;
createdBy;
createAt; */
function Admin(props) {
  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', height: '100%', border: '2px solid black',
      }}
    >

      <div className="mb-3">
        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
      </div>
      <div className="mb-3">
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" />
      </div>
      <div className="mb-3">
        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
      </div>
    </div>
  );
}

export default Admin;
