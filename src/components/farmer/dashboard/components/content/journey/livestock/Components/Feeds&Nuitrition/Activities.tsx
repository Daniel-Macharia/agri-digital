import React, { useState } from "react";

const demoActivities = [
  {
    id: 1,
    type: "Waste Disposal",
    date: "2025/12/03",
    time: "8:00am",
    description: "Lorem Ipsum",
    done: false,
  },
  {
    id: 2,
    type: "Check Ventilation System",
    date: "",
    time: "",
    description: "Lorem Ipsum",
    done: true,
  },
];

const Activities = () => {
  const [activities, setActivities] = useState(demoActivities);
  const [form, setForm] = useState({
    type: "",
    date: "",
    time: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.type || !form.date || !form.time) return;
    setActivities([
      ...activities,
      {
        id: Date.now(),
        type: form.type,
        date: form.date,
        time: form.time,
        description: form.description,
        done: false,
      },
    ]);
    setForm({ type: "", date: "", time: "", description: "" });
  };

  const handleToggleDone = (id) => {
    setActivities(
      activities.map((a) => (a.id === id ? { ...a, done: !a.done } : a))
    );
  };

  return (
    <div className="container-fluid py-4">
      <div className="row g-4">
        {/* Left: Add New Activity */}
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body p-3 p-md-4">
              <h3 className="mb-4">Add New Activity</h3>
              <form onSubmit={handleAdd}>
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">Activity Type</label>
                  <input
                    id="type"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    placeholder="Enter activity type"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Date</label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="time" className="form-label">Time</label>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    value={form.time}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Enter description"
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-success fw-semibold">
                  Add Activity
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right: Upcoming Activities */}
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-3 p-md-4">
              <h3 className="mb-4">Upcoming Activities</h3>
              <div className="d-flex flex-column gap-3">
                {activities.map((a) => (
                  <div
                    key={a.id}
                    className={`card border ${a.done ? "border-success border-2" : "border-light"} shadow-sm`}
                  >
                    <div className="card-body d-flex align-items-start gap-3">
                      <input
                        type="checkbox"
                        checked={a.done}
                        onChange={() => handleToggleDone(a.id)}
                        className="mt-1"
                        style={{ accentColor: "#4B7304" }}
                      />
                      <div className="flex-grow-1">
                        <div className="fw-semibold">{a.type}</div>
                        <div
                          className={`fw-medium ${a.done ? "text-success" : "text-primary"}`}
                          style={{ fontSize: "0.875rem", margin: "4px 0" }}
                        >
                          {a.done ? (
                            "Done"
                          ) : (
                            <>
                              {a.date && (
                                <span className="text-decoration-underline cursor-pointer">{a.date}</span>
                              )}
                              {a.time && <span> {a.time}</span>}
                            </>
                          )}
                        </div>
                        <div className="text-muted" style={{ fontSize: "0.875rem" }}>
                          {a.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;