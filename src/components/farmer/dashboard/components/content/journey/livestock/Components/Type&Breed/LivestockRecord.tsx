import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

type Livestock = {
  id: number;
  identification: string;
  sex: string;
  breed: string;
  purpose: string;
  birthWeight: string;
  dateOfBirth: string;
};

const livestockData: Livestock[] = [
  { id: 1, identification: 'Hannah', sex: 'Female', breed: 'Friesian', purpose: 'Milk', birthWeight: '30kg', dateOfBirth: '2024-02-10' },
  { id: 2, identification: 'Bella', sex: 'Female', breed: 'Jersey', purpose: 'Milk', birthWeight: '28kg', dateOfBirth: '2024-01-15' },
  { id: 3, identification: 'Daisy', sex: 'Female', breed: 'Holstein', purpose: 'Milk', birthWeight: '32kg', dateOfBirth: '2024-02-01' },
  { id: 4, identification: 'Molly', sex: 'Female', breed: 'Friesian', purpose: 'Milk', birthWeight: '29kg', dateOfBirth: '2024-01-20' },
  { id: 5, identification: 'Luna', sex: 'Female', breed: 'Jersey', purpose: 'Milk', birthWeight: '27kg', dateOfBirth: '2024-02-05' },
  { id: 6, identification: 'Ruby', sex: 'Female', breed: 'Holstein', purpose: 'Milk', birthWeight: '31kg', dateOfBirth: '2024-01-25' },
  { id: 7, identification: 'Willow', sex: 'Female', breed: 'Friesian', purpose: 'Milk', birthWeight: '30kg', dateOfBirth: '2024-02-15' },
  { id: 8, identification: 'Stella', sex: 'Female', breed: 'Jersey', purpose: 'Milk', birthWeight: '28kg', dateOfBirth: '2024-01-30' },
  { id: 9, identification: 'Nova', sex: 'Female', breed: 'Holstein', purpose: 'Milk', birthWeight: '33kg', dateOfBirth: '2024-02-20' },
  { id: 10, identification: 'Aurora', sex: 'Female', breed: 'Friesian', purpose: 'Milk', birthWeight: '29kg', dateOfBirth: '2024-02-25' },
];

const LivestockRecord: React.FC = () => {
  return (
    <>
      <div
        className="p-4 rounded-4"
        style={{
          background: '#FFF',
        }}
      >
        <div className="row mb-3 align-items-center">  
          <div className="col-md-6">
            <h3 className="h3-semibold" style={{ color: 'var(--Primary-Text, #333)' }}>My Cows Records</h3>
          </div>
          <div className="col-md-6 text-md-end">
            <button className="btn btn-success">+ Add Livestok</button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-light">
              <tr>
                <th>Livestock Identification</th>
                <th>Sex</th>
                <th>Breed</th>
                <th>Purpose</th>
                <th>Birth Weight</th>
                <th>Date of Birth</th>
                <th>Quality Score</th>
              </tr>
            </thead>
            <tbody>
              {livestockData.map((cow, index) => (
                <tr key={cow.id}>
                  <td>{index + 1}. {cow.identification}</td>
                  <td>{cow.sex}</td>
                  <td>{cow.breed}</td>
                  <td>{cow.purpose}</td>
                  <td>{cow.birthWeight}</td>
                  <td>{cow.dateOfBirth}</td>
                  <td>
                    <a href="#" className="text-success">View Score</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default LivestockRecord;