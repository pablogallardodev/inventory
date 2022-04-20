import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { FcDatabase, FcCalculator, FcInspection } from "react-icons/fc";
import firebase from "firebase";
import "firebase/firestore";

import Sidebar from '../components/Sidebar'
import "../css/dashboard.css";

const Dashboard = ({ mode, setMode }) => {

  const [products, setProducts ] = useState([]);
  const [ labels, setLabels ] = useState([]);
  const [ stocks, setStocks ] = useState([]);
  const [ costs, setCosts ] = useState([]);
  const [ pending, setPending ] = useState([]);
  const colors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ];

  useEffect(() => {
      async function getData() {
          const db = firebase.firestore();
          const newP = []
          const newL = []
          const newS = []
          const newC = []
          const newPe = []

          await db.collection("products").get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  let p = {
                      id: doc.id,
                      data: doc.data()
                  };
                  newP.push(p);
                  newL.push(p.data.description);
                  newS.push(parseInt(p.data.stock));
                  newC.push(parseInt(p.data.stock) * parseInt(p.data.cost));
                  newPe.push(parseInt(p.data.pending));
              });
          });
          setProducts(newP);
          setLabels(newL);
          setStocks(newS);
          setCosts(newC);
          setPending(newPe);
      }

      getData();
  }, []);

  const configStock = {
      labels,
      datasets: [
        {
          data: stocks,
          backgroundColor: colors,
          borderWidth: 1,
        },
      ]
  };

  const configCost = {
    labels,
    datasets: [
      {
        data: costs,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ]
  };

  const configPending = {
    labels,
    datasets: [
      {
        data: pending,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ]
  };
  
  const configOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      }
    }
  }

  return (
      <div className="containerLogged">
          <Sidebar page="dashboard" mode={mode} setMode={setMode}/>
          <div className="content">

              <div className="container-cards">
                <div className="card">
                  <FcDatabase size={50}/>
                  <div>
                    <h1>{ products.length }</h1>
                    <h3>Total de productos</h3>
                  </div>                  
                </div>
                <div className="card">
                  <FcCalculator size={50}/>
                  <div>
                    <h1>$ { products.reduce((a, b) => {return a + (parseInt(b.data.stock) * parseInt(b.data.cost))}, 0 ) }</h1>
                    <h3>Total de costo</h3>
                  </div>
                </div>
                <div className="card">
                  <FcInspection size={50}/>
                  <div>
                    <h1>{ products.reduce((a, b) => {return a + parseInt(b.data.pending)}, 0 ) }</h1>
                    <h3>Unidades pendientes</h3>
                  </div>
                </div>
              </div>

              <div className="container-cards">
                <div className="card-chart">
                  <h2 style={{ marginBottom: '1rem' }}>Stock actual por producto</h2>
                  <div className="container-chart">
                    <div style={{ width: '70%', marginRight: '10px' }}><Bar data={configStock} options={configOptions}/></div>
                    <div style={{ width: '30%' }}><Doughnut data={configStock} options={configOptions}/></div>
                  </div>
                </div>

                <div className="card-chart">
                  <h2 style={{ marginBottom: '1rem' }}>Costo total por producto</h2>
                  <div className="container-chart">
                    <div style={{ width: '70%', marginRight: '10px' }}><Bar data={configCost} options={configOptions}/></div>
                    <div style={{ width: '30%' }}><Doughnut data={configCost} options={configOptions}/></div>
                  </div>
                </div>

                <div className="card-chart">
                  <h2 style={{ marginBottom: '1rem' }}>Unidades pendientes por producto</h2>
                  <div className="container-chart">
                    <div style={{ width: '70%', marginRight: '10px'}}><Bar data={configPending} options={configOptions} /></div>
                    <div style={{ width: '30%' }}><Doughnut data={configPending} options={configOptions}/></div>
                  </div>
                </div>
              </div>
          </div>
      </div>
  )
}

export default Dashboard
