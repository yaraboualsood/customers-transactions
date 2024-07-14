import React, { useState, useEffect } from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";
import _ from "lodash";
import styles from "./home.module.scss";

const staticData = {
  customers: [
    { id: 1, name: "Ahmed Ali" },
    { id: 2, name: "Aya Elsayed" },
    { id: 3, name: "Mina Adel" },
    { id: 4, name: "Sarah Reda" },
    { id: 5, name: "Mohamed Sayed" },
    { id: 6, name: "Merna Tarek" },
    { id: 7, name: "Sama Alaa" },
    { id: 8, name: "Lamia Ahmed" },
    { id: 9, name: "Mai Mohamed" },
    { id: 10, name: "Yara Maher" },
  ],
  transactions: [
    { id: 1, customer_id: 1, date: "2022-01-01", amount: 1000 },
    { id: 2, customer_id: 1, date: "2022-01-02", amount: 2000 },
    { id: 3, customer_id: 2, date: "2022-01-01", amount: 550 },
    { id: 4, customer_id: 3, date: "2022-01-01", amount: 500 },
    { id: 5, customer_id: 2, date: "2022-01-02", amount: 1300 },
    { id: 6, customer_id: 4, date: "2022-01-01", amount: 750 },
    { id: 7, customer_id: 3, date: "2022-01-02", amount: 1250 },
    { id: 8, customer_id: 5, date: "2022-01-01", amount: 2500 },
    { id: 9, customer_id: 5, date: "2022-01-02", amount: 875 },
    { id: 10, customer_id: 6, date: "2022-01-02", amount: 875 },
    { id: 11, customer_id: 7, date: "2022-01-02", amount: 570 },
    { id: 12, customer_id: 8, date: "2022-01-02", amount: 600 },
    { id: 13, customer_id: 9, date: "2022-01-02", amount: 890 },
    { id: 14, customer_id: 10, date: "2022-01-02", amount: 900 }
  ]
};

const Home = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (selectedCustomerId !== null) {
      const customerTransactions = staticData.transactions.filter(transaction => transaction.customer_id === selectedCustomerId);
      const groupedData = _.groupBy(customerTransactions, "date");
      const chartData = Object.keys(groupedData).map(date => ({
        name: date,
        totalAmount: groupedData[date].reduce((sum, transaction) => sum + transaction.amount, 0)
      }));
      setData(chartData);
    }
  }, [selectedCustomerId]);

  return (
    <div className={styles.home}>
      <div className=" container d-flex flex-column flex-md-row justify-content-between align-items-center px-4">
        <div className="flex-grow-1 pt-5">
          <select onChange={(e) => setSelectedCustomerId(parseInt(e.target.value))} className="form-select mb-3">
            <option value="">Select Customer</option>
            {staticData.customers.map(customer => (
              <option key={customer.id} value={customer.id}>{customer.name}</option>
            ))}
          </select>
          <div className="chart-container bg-white p-4 rounded-4">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data}>
                <Bar dataKey="totalAmount" fill="#E090AD" width={10} maxBarSize={35} radius={[20, 20, 0, 0]} />
                <XAxis dataKey="name" />
                <YAxis />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
