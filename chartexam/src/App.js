import "./App.css";
import { useState, useEffect } from "react";
import { CChart } from "@coreui/react-chartjs";
import zoomPlugin from "chartjs-plugin-zoom";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]); //(18)to show data using map

  const handleForm = (e) => {
    //console.log(e.target.value, e.target.name);

    setForm({
      ...form, // (2) this form variable is we are going to send to the server
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value, //username gets overriden by password. hence use ...form above
    });
  };

  const handleSubmit = async (e) => {
    // (3)we have to call API in this handleSubmit button

    e.preventDefault(); //this method prevents default behaviour of submit button. console wr input value blink howun nighun jane

    const response = await fetch("http://localhost:8080/mylivecharts", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      body: JSON.stringify(form), //the JSON data is being processed
      headers: {
        "Content-Type": "application/json", //its called MIME type
      }, // headers provide additional information about data
    }); //(5)again here after creating API in express
    // fetch is a async operation hence add await keyword to it. and add async to handlesubmit

    const data = await response.json(); // (7) data we got from fetch is being processed before render.

    console.log(data); //(4) now goand create API in express. (another vscode)
  };

  //(15) one more fetch method in order to get the data

  const getUsers = async () => {
    const response = await fetch("http://localhost:8080/mylivechart", {
      method: "GET",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data = await response.json();
    console.log("data");
    console.log(data);

    setUsers(data); //(19)
    getUsers();
    console.log("Users");
    console.log(users);
  };

  //(16) to call above getUsers function, we need useEffect hook

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <div
        className="card collector"
        style={{ width: "18rem;", textAlign: "center" }}
      >
        <div className="card-body">
          <h5 className="card-title">Enter Data</h5>
          <br />
          <form onSubmit={handleSubmit} name="form">
            <div className="form-group">
              <label>Country Name</label>
              <input
                type="text"
                className="form-control"
                name="country"
                placeholder="Enter Country Name"
                onChange={handleForm}
              />
            </div>
            <br />
            <div className="form-group">
              <label for="exampleInputPassword1">Median Age</label>
              <input
                type="text"
                className="form-control"
                name="median_age"
                placeholder="Enter Median Age"
                onChange={handleForm}
              />
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* <p>{JSON.stringify(form)}</p> (1)just to check ouput */}
      {/*(17)now putting data into map to show data*/}

      {/* <table class="table table-striped" border={1}>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {user.country},{user.median_age}
              </td>
            </tr>
          ))}
        </table> */}

      <h2 className="collector">Bar Chart</h2>
      <div style={{ objectFit: "cover" }}>
        <CChart
          type="bar"
          data={{
            labels: users.map((data) => data.country),
            datasets: [
              {
                label: "Median Age",
                backgroundColor: "#f87979",
                data: users.map((data) => data.median_age),
              },
            ],
          }}
          labels="months"
          options={{
            plugins: {
              zoom: {
                zoom: {
                  wheel: {
                    enabled: true,
                  },
                  pinch: {
                    enabled: true,
                  },
                  mode: "xy",
                },
              },
            },
            scales: {
              x: {
                grid: {},
                ticks: {},
              },
              y: {
                grid: {},
                ticks: {},
              },
            },
          }}
        />
      </div>
      <hr />
      <h2 className="collector">Line Chart</h2>
      <div style={{ objectFit: "cover" }}>
        <CChart
          type="line"
          data={{
            labels: users.map((data) => data.country),
            datasets: [
              {
                label: "Median Age",
                backgroundColor: "#f87979",
                data: users.map((data) => data.median_age),
              },
            ],
          }}
          labels="months"
          options={{
            plugins: {
              zoom: {
                zoom: {
                  wheel: {
                    enabled: true,
                  },
                  pinch: {
                    enabled: true,
                  },
                  mode: "xy",
                },
              },
            },
            scales: {
              x: {
                grid: {},
                ticks: {},
              },
              y: {
                grid: {},
                ticks: {},
              },
            },
          }}
        />
      </div>
      <hr />
      <h2 className="collector">Pie Chart</h2>
      <div style={{ objectFit: "cover" }}>
        <CChart
          type="pie"
          data={{
            labels: users.map((data) => data.country),
            datasets: [
              {
                label: "Median Age",
                backgroundColor: "#f87979",
                data: users.map((data) => data.median_age),
              },
            ],
          }}
          labels="months"
          options={{
            plugins: {
              zoom: {
                zoom: {
                  wheel: {
                    enabled: true,
                  },
                  pinch: {
                    enabled: true,
                  },
                  mode: "xy",
                },
              },
            },
            scales: {
              x: {
                grid: {},
                ticks: {},
              },
              y: {
                grid: {},
                ticks: {},
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;
