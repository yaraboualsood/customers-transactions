import { useState } from "react";
import { BsChevronDown, BsSearch, BsSliders, BsChevronRight, BsChevronLeft } from "react-icons/bs";
import _ from "lodash";

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
    { id: 3, customer_id: 2, date: "2022-01-01", amount: 550 },
    { id: 6, customer_id: 4, date: "2022-01-01", amount: 750 },
    { id: 7, customer_id: 3, date: "2022-01-02", amount: 1250 },
    { id: 9, customer_id: 5, date: "2022-01-02", amount: 875 },
    { id: 10, customer_id: 6, date: "2022-01-02", amount: 550 },
    { id: 11, customer_id: 7, date: "2022-01-02", amount: 570 },
    { id: 12, customer_id: 8, date: "2022-01-02", amount: 600 },
    { id: 13, customer_id: 9, date: "2022-01-02", amount: 890 },
    { id: 14, customer_id: 10, date: "2022-01-02", amount: 900 }
  ]
};

function CustomerTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterByAmount, setFilterByAmount] = useState("");
  const [startItem, setStartItem] = useState(0);
  const [endItem, setEndItem] = useState(8);

  const filteredCustomers = staticData.customers.filter((customer) => {
    const customerTransactions = staticData.transactions.filter(transaction => transaction.customer_id === customer.id);
    const totalAmount = customerTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

    return (
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterByAmount === "" || totalAmount >= parseFloat(filterByAmount))
    );
  });


  const paginations = _.range(0, Math.ceil(filteredCustomers.length / 8));

  return (
    <div className="container">
      <div className="customer-list mt-5">
     
        <div className="d-flex flex-wrap">
          <h1 className="pe-5">Customer Transactions</h1>
          <div className="search">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Customer"
              className="form-control"
            />
          </div>
          <div className="search ms-2">
            <input
              type="number"
              value={filterByAmount}
              onChange={(e) => setFilterByAmount(e.target.value)}
              placeholder="Filter by Amount"
              className="form-control"
            />
          </div>
        </div>
   
      <div className="table">
        <table className=" my-2 text-center rounded-3 overflow-hidden">
          <thead>
            <tr style={{ background: '#E090AD' }}>
              <td>Customer Name</td>
              <td>Transaction Date</td>
              <td>Transaction Amount</td>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.slice(startItem, endItem).map((customer) => {
              const customerTransactions = staticData.transactions.filter(transaction => transaction.customer_id === customer.id);
              return customerTransactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{customer.name}</td>
                  <td >{transaction.date}</td>
                  <td >{transaction.amount}</td>
                </tr>
              ));
            })}
          </tbody>
        </table>
        <div className="tfooter">
          <div className="showing">
            {endItem < filteredCustomers.length ? (
              <span>
                Showing {startItem + 1}-{endItem} from {filteredCustomers.length}
              </span>
            ) : (
              <span>
                Showing {startItem + 1}-{filteredCustomers.length} from {filteredCustomers.length}
              </span>
            )}
          </div>
          <ul>
            <li
              onClick={() => {
                if (startItem >= 8) {
                  setStartItem(startItem - 8);
                  setEndItem(endItem - 8);
                }
              }}
            >
              <BsChevronLeft />
            </li>
            {paginations.map((value) => {
              if (filteredCustomers.length / 8 > value) {
                return (
                  <li key={value}
                    className={`${startItem === value * 8 ? "active" : ""}`}
                    onClick={() => {
                      setStartItem(value * 8);
                      setEndItem((value + 1) * 8);
                    }}
                  >
                    {value + 1}
                  </li>
                );
              }
            })}
            <li
              onClick={() => {
                if (startItem <= 8 * (Math.ceil(filteredCustomers.length / 8) - 2)) {
                  setStartItem(startItem + 8);
                  setEndItem(endItem + 8);
                }
              }}
            >
              <BsChevronRight />
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
}

export default CustomerTable;
